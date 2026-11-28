import assert from "node:assert/strict";
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { createRequire } from "node:module";
import { runInNewContext } from "node:vm";
import test from "node:test";
import ts from "typescript";
import nextConfig from "../next.config.mjs";

const require = createRequire(import.meta.url);

// Compile the real TS modules in memory: no generated source files or test dependencies.
function loadTs(path, overrides = {}, globals = {}, suffix = "") {
  const source = readFileSync(new URL(`../${path}`, import.meta.url), "utf8") + suffix;
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  });
  const exports = {};
  runInNewContext(outputText, {
    exports,
    require: (id) => overrides[id] ?? require(id),
    ...globals,
  }, { filename: path });
  return exports;
}

const contactDataModule = loadTs("src/data/contact.ts");
const validation = loadTs("src/lib/contactValidation.ts", {
  "@/data/contact": contactDataModule,
});
const validInput = {
  name: "Visitor", email: "visitor@example.com", subject: "Hello", message: "A message",
};

function route({ env = { NODE_ENV: "production" }, sendResult = {}, throws = false } = {}) {
  let now = 1_000_000;
  const sent = [];
  const logs = [];
  const routeModule = loadTs("src/app/api/contact/route.ts", {
    "@/data/contact": contactDataModule,
    "@/lib/contactValidation": validation,
    resend: { Resend: class {
      emails = { send: async (email) => {
        sent.push(email);
        if (throws) throw new Error("Sensitive provider error");
        return sendResult;
      } };
    } },
  }, {
    process: { env },
    URL,
    Date: class extends Date { static now() { return now; } },
    console: {
      info: (...args) => logs.push(args.join(" ")),
      error: (...args) => logs.push(args.join(" ")),
    },
  }, "\nexport const __test = { rateLimitStore, isRateLimited };");
  return { ...routeModule, sent, logs, advance: (ms) => { now += ms; } };
}

function request(body = validInput, headers = {}) {
  return new Request("https://portfolio.test/api/contact", {
    method: "POST",
    headers: { host: "portfolio.test", "content-type": "application/json", ...headers },
    body: JSON.stringify(body),
  });
}

test("shared validation sanitizes single-line headers, preserving message newlines", () => {
  const { data, errors } = validation.validateContactInput({
    ...validInput, name: " Visitor\r\nName ", subject: "Hello\r\nBcc: other",
    email: "\r\nvisitor@example.com\n", message: "First\nSecond",
  });
  assert.equal(Object.keys(errors).length, 0);
  assert.equal(data.name, "Visitor Name");
  assert.equal(data.subject, "Hello Bcc: other");
  assert.equal(data.email, validInput.email);
  assert.equal(data.message, "First\nSecond");
});

test("shared validation rejects required, malformed and oversized fields", () => {
  assert.equal(Object.keys(validation.validateContactInput({}).errors).length, 3);
  assert.ok(validation.validateContactInput({ ...validInput, email: "bad" }).errors.email);
  assert.ok(validation.validateContactInput({ ...validInput, name: 1 }).errors.name);
  for (const [field, limit] of Object.entries(validation.CONTACT_FIELD_LIMITS)) {
    assert.ok(validation.validateContactInput({ ...validInput, [field]: "x".repeat(limit + 1) }).errors[field]);
  }
  assert.equal(Object.keys(validation.validateContactInput({
    ...validInput, name: "x".repeat(120), subject: "x".repeat(200), message: "x".repeat(4000),
  }).errors).length, 0);
});

test("POST rejects cross-origin and malformed origins; permits same host or no Origin", async () => {
  for (const origin of ["https://evil.test", "null", "not-a-url", "https://portfolio.test:444"]) {
    assert.equal((await route().POST(request(validInput, { origin }))).status, 403);
  }
  const api = route({ env: { NODE_ENV: "development" } });
  assert.equal((await api.POST(request(validInput, { origin: "https://portfolio.test" }))).status, 200);
  assert.equal((await api.POST(request())).status, 200);
});

test("POST rejects malformed JSON and invalid payloads", async () => {
  const api = route();
  for (const body of [null, [], {}, { ...validInput, email: "bad" }]) {
    assert.equal((await api.POST(request(body))).status, 400);
  }
  assert.equal((await api.POST(new Request("https://portfolio.test/api/contact", {
    method: "POST", body: "{",
  }))).status, 400);
});

test("production returns 503 for absent or placeholder API keys without logging PII", async () => {
  for (const key of [undefined, "re_your_api_key_here"]) {
    const api = route({ env: { NODE_ENV: "production", RESEND_API_KEY: key } });
    const res = await api.POST(request());
    assert.equal(res.status, 503);
    assert.equal((await res.json()).ok, false);
    assert.equal(api.logs.length, 0);
    assert.equal(api.sent.length, 0);
  }
});

test("development skips delivery without logging contact data", async () => {
  const api = route({ env: { NODE_ENV: "development" } });
  assert.equal((await api.POST(request())).status, 200);
  assert.ok(!api.logs.join(" ").includes(validInput.email));
  assert.ok(!api.logs.join(" ").includes(validInput.message));
});

test("honeypot returns success without delivery", async () => {
  const api = route();
  assert.equal((await api.POST(request({ website: "spam" }))).status, 200);
  assert.equal(api.sent.length, 0);
});

test("POST blocks sixth request and permits requests when the window expires", async () => {
  const api = route({ env: { NODE_ENV: "development" } });
  for (let i = 0; i < 5; i++) assert.equal((await api.POST(request())).status, 200);
  assert.equal((await api.POST(request())).status, 429);
  api.advance(15 * 60 * 1000);
  assert.equal((await api.POST(request())).status, 200);
});

test("rate limiter prunes all expired keys and caps the map at 500, evicting oldest", () => {
  const api = route();
  const { isRateLimited, rateLimitStore } = api.__test;
  for (let i = 0; i < 500; i++) isRateLimited(`ip-${i}`);
  assert.equal(rateLimitStore.size, 500);
  isRateLimited("ip-new");
  assert.equal(rateLimitStore.size, 500);
  assert.equal(rateLimitStore.has("ip-0"), false);
  assert.equal(rateLimitStore.has("ip-1"), true);
  api.advance(15 * 60 * 1000);
  isRateLimited("fresh");
  assert.equal(rateLimitStore.size, 1);
});

test("delivery uses sanitized headers and escaped HTML", async () => {
  const api = route({ env: { NODE_ENV: "production", RESEND_API_KEY: "test-key" } });
  assert.equal((await api.POST(request({
    ...validInput, name: "<Visitor>\r\nName", subject: "Hello\r\nWorld", message: "<script>",
  }))).status, 200);
  assert.equal(api.sent[0].subject, "[Portfolio] Hello World");
  assert.ok(api.sent[0].html.includes("&lt;Visitor&gt; Name"));
  assert.ok(api.sent[0].html.includes("&lt;script&gt;"));
});

test("delivery failures return 500 without leaking provider details", async () => {
  for (const options of [{ sendResult: { error: { message: validInput.email } } }, { throws: true }]) {
    const api = route({ ...options, env: { NODE_ENV: "production", RESEND_API_KEY: "test-key" } });
    assert.equal((await api.POST(request())).status, 500);
    assert.ok(!api.logs.join(" ").includes(validInput.email));
    assert.ok(!api.logs.join(" ").includes("Sensitive provider error"));
  }
});

test("security headers apply to all routes", async () => {
  const [rule] = await nextConfig.headers();
  assert.equal(rule.source, "/(.*)");
  assert.deepEqual(Object.fromEntries(rule.headers.map(({ key, value }) => [key, value])), {
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  });
});

test("all 30 project screenshots remain available", () => {
  const { projects } = loadTs("src/data/work.ts").workData;
  assert.equal(projects.length, 10);
  const screens = projects.flatMap((project) => project.screens);
  assert.equal(screens.length, 30);
  for (const screen of screens) {
    assert.ok(existsSync(new URL(`../public${screen}`, import.meta.url)), screen);
  }
});

test("all 10 project demo videos exist with exact casing", () => {
  const { projects } = loadTs("src/data/work.ts").workData;
  const videoFiles = new Set(readdirSync(new URL("../public/assets/videos/", import.meta.url)));
  const videos = projects.map((project) => project.demoVideo).filter(Boolean);
  assert.equal(videos.length, 10);
  for (const video of videos) {
    assert.ok(video.startsWith("/assets/videos/"), video);
    assert.ok(videoFiles.has(video.slice("/assets/videos/".length)), video);
  }
});

test("late texture loads follow the latest active screen without restarting loaders", () => {
  const refs = [];
  const effects = [];
  const pending = [];
  let refIndex = 0;
  let effectIndex = 0;
  const react = {
    useRef: (value) => {
      const index = refIndex++;
      return refs[index] ??= { current: value };
    },
    useEffect: (run, deps) => {
      const index = effectIndex++;
      const previous = effects[index];
      if (!previous || deps.some((value, i) => value !== previous.deps[i])) {
        previous?.cleanup?.();
        effects[index] = { deps, cleanup: run() };
      }
    },
  };
  class Texture {
    disposed = false;
    dispose() { this.disposed = true; }
  }
  const textures = loadTs("src/components/phone/textures.ts", {
    react,
    "@/data/hero": { heroData: { phoneScreens: [{ label: "One", src: "one" }, { label: "Two", src: "two" }] } },
    three: {
      CanvasTexture: Texture,
      TextureLoader: class {
        load(src, callback) { pending.push({ src, callback }); }
      },
    },
  }, { document: { createElement: () => ({ getContext: () => null }) } });
  const material = { current: { map: null, needsUpdate: false } };
  const render = (active) => {
    refIndex = 0;
    effectIndex = 0;
    textures.useScreenTextures(0.5, active, material, true);
  };
  render(0);
  render(1);
  assert.equal(pending.length, 2);
  const inactive = new Texture();
  pending[0].callback(inactive);
  assert.notEqual(material.current.map, inactive);
  const active = new Texture();
  pending[1].callback(active);
  assert.equal(material.current.map, active);
  for (const effect of effects) effect.cleanup?.();
  assert.equal(inactive.disposed, true);
  assert.equal(active.disposed, true);
  const late = new Texture();
  pending[0].callback(late);
  assert.equal(late.disposed, true);
});

test("section data files export only literal objects and import only content types", () => {
  const directory = new URL("../src/data/", import.meta.url);
  const files = readdirSync(directory).sort();
  assert.deepEqual(files, ["about.ts", "contact.ts", "hero.ts", "layout.ts", "skills.ts", "work.ts"]);
  const assertLiteral = (node, file) => {
    if (ts.isObjectLiteralExpression(node)) {
      for (const property of node.properties) {
        assert.ok(ts.isPropertyAssignment(property), `${file}: no methods, getters, shorthand or spreads`);
        assert.ok(ts.isIdentifier(property.name) || ts.isStringLiteral(property.name), `${file}: no computed keys`);
        assertLiteral(property.initializer, file);
      }
    } else if (ts.isArrayLiteralExpression(node)) {
      node.elements.forEach((element) => assertLiteral(element, file));
    } else if (ts.isPrefixUnaryExpression(node)) {
      assert.ok(
        [ts.SyntaxKind.MinusToken, ts.SyntaxKind.PlusToken].includes(node.operator) &&
          ts.isNumericLiteral(node.operand),
        `${file}: only signed number literals are allowed`,
      );
    } else {
      assert.ok(
        ts.isStringLiteral(node) || ts.isNumericLiteral(node) ||
          [ts.SyntaxKind.TrueKeyword, ts.SyntaxKind.FalseKeyword, ts.SyntaxKind.NullKeyword].includes(node.kind),
        `${file}: data must not contain expressions or runtime logic`,
      );
    }
  };
  for (const file of files) {
    const source = ts.createSourceFile(file, readFileSync(new URL(file, directory), "utf8"), ts.ScriptTarget.Latest, true);
    let exportCount = 0;
    for (const statement of source.statements) {
      if (ts.isImportDeclaration(statement)) {
        assert.equal(statement.importClause?.isTypeOnly, true, `${file}: only type imports allowed`);
        assert.equal(statement.moduleSpecifier.text, "@/types/content");
        continue;
      }
      assert.ok(ts.isVariableStatement(statement), `${file}: no interfaces, functions, or other statements`);
      assert.ok(statement.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword));
      assert.ok(statement.declarationList.flags & ts.NodeFlags.Const);
      assert.equal(statement.declarationList.declarations.length, 1);
      const [declaration] = statement.declarationList.declarations;
      assert.equal(declaration.name.getText(source), `${file.slice(0, -3)}Data`);
      assert.ok(ts.isObjectLiteralExpression(declaration.initializer));
      assertLiteral(declaration.initializer, file);
      exportCount++;
    }
    assert.equal(exportCount, 1, `${file}: one section data export expected`);
  }
});

test("section content retains featured order, contact limits and layout configuration", () => {
  const { workData } = loadTs("src/data/work.ts");
  const { heroData } = loadTs("src/data/hero.ts");
  const { layoutData } = loadTs("src/data/layout.ts");
  const { skillsData } = loadTs("src/data/skills.ts");
  assert.equal(workData.projects.filter((project) => project.featured).slice(0, 2).map((project) => project.slug).join(","), "daftari,bridge-x");
  assert.equal(Number(heroData.stats[0].value), workData.projects.length);
  assert.ok(layoutData.nav.some((item) => item.href === "/#skills"));
  assert.equal(layoutData.whatsapp.href, contactDataModule.contactData.links.find((link) => link.label === "WhatsApp").href);
  assert.equal(validation.CONTACT_FIELD_LIMITS, contactDataModule.contactData.form.limits);
  assert.equal(layoutData.statusBarTime, "9:41");
  assert.equal(layoutData.backgroundBlueprints.outlines.length, 6);
  assert.equal(layoutData.backgroundBlueprints.links.length, 3);
  assert.equal(skillsData.tiles.state.inspectorLeft, "emit(Loaded)");
});

test("every project exposes at least one link or demo video", () => {
  const { workData } = loadTs("src/data/work.ts");
  for (const project of workData.projects) {
    assert.ok(
      project.github || project.demoVideo || project.linkedin || project.live,
      `${project.slug}: needs a GitHub, demoVideo, LinkedIn, or live link`,
    );
  }
  const bySlug = Object.fromEntries(workData.projects.map((project) => [project.slug, project]));
  assert.equal(bySlug["up-to-do"].linkedin, undefined);
  assert.equal(bySlug["zoyota-ecommerce"].linkedin, undefined);
});

test("Tailwind scans the moved page sections for production styles", () => {
  const { default: config } = loadTs("tailwind.config.ts");
  assert.ok(config.content.includes("./src/sections/**/*.{js,ts,jsx,tsx,mdx}"));
});

test("components and sections contain no hardcoded JSX copy or accessibility labels", () => {
  const scan = (directory) => {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const path = new URL(entry.name, directory);
      if (entry.isDirectory()) {
        scan(new URL(`${entry.name}/`, directory));
      } else if (entry.name.endsWith(".tsx")) {
        const source = ts.createSourceFile(entry.name, readFileSync(path, "utf8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
        const visit = (node) => {
          if (ts.isJsxText(node)) {
            assert.ok(!/\p{L}/u.test(node.text.trim()), `${path.pathname}: "${node.text.trim()}" belongs in section data`);
          }
          if (ts.isJsxAttribute(node) && ["aria-label", "alt", "title", "placeholder"].includes(node.name.getText(source))) {
            assert.ok(!node.initializer || !ts.isStringLiteral(node.initializer), `${path.pathname}: accessibility copy belongs in section data`);
          }
          ts.forEachChild(node, visit);
        };
        visit(source);
      }
    }
  };
  scan(new URL("../src/components/", import.meta.url));
  scan(new URL("../src/sections/", import.meta.url));
});
