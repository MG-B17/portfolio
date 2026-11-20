# AGENTS.md

Guidance for AI coding agents working in this repository. Read this before changing code.

## Project Overview

Personal portfolio site for Mostafa Galal El Bakri (Flutter developer), built as a
single-page Next.js application with a procedural three.js phone in the hero, an
animated background, scroll reveals, and a contact form backed by Resend.

- **Framework:** Next.js (App Router, server components by default)
- **Language:** TypeScript (`strict: true`), path alias `@/*` → `src/*`
- **UI:** React, Tailwind CSS, plain CSS in `src/app/globals.css`
- **3D:** `three`, `@react-three/fiber`, `@react-three/drei`
- **Email:** `resend` (contact API route only)
- **Tests:** Node's built-in test runner (`node --test`) with `typescript` used for AST checks

## Commands

| Purpose | Command |
| --- | --- |
| Dev server | `npm run dev` |
| Production build | `npm run build` |
| Lint | `npm run lint` |
| Tests | `npm test` |
| Type check | `npx tsc --noEmit` |

Run `npx tsc --noEmit`, `npm run lint`, and `npm test` before considering a change done.
All tests in `tests/contact.test.mjs` must pass.

## Folder Structure

```
src/
  app/                    Next.js App Router
    layout.tsx            Root metadata, fonts, global shell
    page.tsx              Home page composition (sections only)
    projects/page.tsx     Projects listing page
    globals.css           Global styles and design tokens
    api/contact/route.ts  POST /api/contact (validation, rate limit, Resend)
  sections/               One component per page section
    HeroSection.tsx  WorkSection.tsx  SkillsSection.tsx
    AboutSection.tsx ContactSection.tsx
  components/
    layout/               Header, Footer, BackgroundLines, ScrollProgress, WhatsAppButton
    ui/                   Reusable pieces: CaseStudy, ContactForm, DeviceStatusBar,
                          PhoneFrame, SectionReveal, SpotlightCard
    phone/                Hero 3D phone: PhoneStage, PhoneScene, FlagshipPhoneModel,
                          textures.ts, usePhoneMotion.ts
  data/                   Pure content for each section (see Strict Data Rule)
    layout.ts hero.ts work.ts skills.ts about.ts contact.ts
  lib/                    Framework-free logic (e.g. contactValidation.ts)
  types/content.ts        Shared content interfaces, the source of truth for data files
tests/contact.test.mjs    Validation, content, AST purity, and a11y copy tests
docs/                     Plans and review notes (no runtime effect)
public/assets/            Static images (profile photo, project screenshots)
```

Rules of thumb:

- Sections compose components; they do not own content.
- `src/lib/` stays framework-free so it can be unit tested with plain Node.
- Components never call the contact API directly; `ContactForm` posts and surfaces results.
- Do not add `.gitkeep` files or empty directories under `public/` or `src/`.
- Do not edit generated output (`.next/`, `next-env.d.ts`, `tsconfig.tsbuildinfo`).

## Strict Data Rule (test-enforced)

`src/data/*.ts` are the single source of content. `tests/contact.test.mjs` parses them
with the TypeScript AST and fails the build on any violation.

Each data file must:

- Import **only** types: `import type { XData } from "@/types/content";`
- Export **exactly one** `const` named `<file>Data` (e.g. `contactData`).
- Contain **only a pure object literal**: strings, numbers, booleans, `null`, arrays,
  and nested object literals.
- Have **no** functions, methods, getters, spreads, computed keys, template literals,
  concatenation, or any other runtime expression/logic.

Components and sections must contain **no hardcoded copy or accessibility strings**:

- No literal JSX text (e.g. `<p>Hello</p>`).
- No string-literal `aria-label`, `alt`, `title`, or `placeholder` attributes.
- All copy comes from `src/data/*.ts`; all markup lives in `.tsx` files.

When adding content: extend the interface in `src/types/content.ts`, add the value to
the relevant data file, then consume it in the component. Never inline text as a shortcut.

## Security Invariants (contact API)

`src/app/api/contact/route.ts` and `src/lib/contactValidation.ts` implement:

- **CR/LF sanitization:** name, email, and subject have `[\r\n]+` collapsed to a space and
  are trimmed, preventing header/email injection. Message is trimmed only (multiline is valid).
- **Origin verification:** when an `Origin` header is present it must be `http(s)` and its
  `host` must equal the request `Host`; otherwise respond `403`.
- **Bounded rate limiter:** in-memory map keyed by client IP, 5 requests per 15-minute window,
  with stale-entry pruning and a 500-key cap. Keep it bounded; never let it grow unbounded.
- **Honeypot:** non-empty `website` field returns a fake `200 OK` without sending email.
- **Output escaping:** every user value interpolated into email HTML passes through
  `escapeHtml`. Never interpolate raw input into HTML.
- **Secrets:** only `RESEND_API_KEY` and optional `CONTACT_RECEIVER_EMAIL` are read from
  `process.env`. Never hardcode keys or log message bodies/PII. Errors are logged as codes only.

Keep validation limits and error copy in `contactData.form`; do not duplicate them in components.

## Performance Invariants

- Pointer/scroll/resize listeners use `{ passive: true }` (`BackgroundLines`, `ScrollProgress`,
  `SpotlightCard`, `usePhoneMotion`).
- Pointer movement is batched into `requestAnimationFrame`; no state updates per native event.
- Scroll and pointer values shared with animation loops live in refs, not React state.
- `BackgroundLines` and the phone scene pause when off-screen/hidden (`IntersectionObserver`,
  `visibilitychange`) and honor `prefers-reduced-motion`.
- The hero uses the procedural `FlagshipPhoneModel`; do not reintroduce a GLB loader path.
- Avoid adding heavy client bundles: keep `"use client"` scoped to interactive leaves.

## Testing Workflow

1. Make the change in the smallest correct layer (`data` → `types` → component).
2. `npx tsc --noEmit` — types and data-shape errors.
3. `npm run lint` — ESLint (Next.js config).
4. `npm test` — all 18 tests, including data purity, no hardcoded copy, and contact validation.
5. For UI/3D changes, also run `npm run build` and check the page in `npm run dev`.

When a test encodes a rule (pure data, no inline copy, Tailwind globs), fix the source of
the violation rather than loosening the test.

## Conventions

- Match existing formatting (2-space indent, double quotes, trailing commas in multi-line literals).
- Prefer named exports in `data`, `lib`; default exports for React components.
- Keep doc-as-comment noise low; use `docs/plans/` and `docs/reviews/` for longer notes.
- Do not commit or push unless the user asks. Do not add dependencies without approval.
