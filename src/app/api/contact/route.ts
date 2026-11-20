import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactData } from "@/data/contact";
import { validateContactInput } from "@/lib/contactValidation";

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

const rateLimitStore = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  for (const [key, entries] of rateLimitStore) {
    const live = entries.filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);
    if (live.length) rateLimitStore.set(key, live);
    else rateLimitStore.delete(key);
  }
  if (!rateLimitStore.has(ip) && rateLimitStore.size >= 500) {
    const oldest = rateLimitStore.keys().next().value;
    if (oldest !== undefined) rateLimitStore.delete(oldest);
  }
  const timestamps = (rateLimitStore.get(ip) ?? []).filter(
    (ts) => now - ts < RATE_LIMIT_WINDOW_MS
  );
  if (timestamps.length >= RATE_LIMIT_MAX) {
    rateLimitStore.set(ip, timestamps);
    return true;
  }
  timestamps.push(now);
  rateLimitStore.set(ip, timestamps);
  return false;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function POST(req: Request) {
  try {
    const origin = req.headers.get("origin");
    if (origin) {
      let validOrigin = false;
      try {
        const parsed = new URL(origin);
        validOrigin =
          (parsed.protocol === "https:" || parsed.protocol === "http:") &&
          parsed.host === req.headers.get("host");
      } catch {
        // Reject malformed and opaque origins.
      }
      if (!validOrigin) {
        return NextResponse.json(
          { ok: false, error: "Invalid request origin." },
          { status: 403 }
        );
      }
    }
    const forwardedFor = req.headers.get("x-forwarded-for");
    const clientIp =
      forwardedFor?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        {
          ok: false,
          error: "Too many messages sent recently. Please wait a few minutes.",
        },
        { status: 429 }
      );
    }

    const body = (await req.json().catch(() => null)) as Record<
      string,
      unknown
    > | null;

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { ok: false, error: "Invalid request payload." },
        { status: 400 }
      );
    }

    // Hidden honeypot: pretend success for bots without sending email
    const honeypot = typeof body.website === "string" ? body.website.trim() : "";
    if (honeypot.length > 0) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const { data, errors } = validateContactInput(body);
    if (Object.keys(errors).length) {
      return NextResponse.json(
        { ok: false, error: Object.values(errors)[0] },
        { status: 400 }
      );
    }
    const { name, email, subject, message } = data;

    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey && apiKey !== "re_your_api_key_here") {
      const resend = new Resend(apiKey);
      const { error } = await resend.emails.send({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: process.env.CONTACT_RECEIVER_EMAIL || contactData.email,
        replyTo: email,
        subject: `[Portfolio] ${subject || "New message"}`,
        html: `
          <div style="font-family: Inter, sans-serif; padding: 20px; color: #20211f;">
            <h2 style="margin: 0 0 12px;">New message from ${escapeHtml(name)}</h2>
            <p style="margin: 0 0 6px;"><strong>Email:</strong> ${escapeHtml(email)}</p>
            ${subject ? `<p style="margin: 0 0 16px;"><strong>Subject:</strong> ${escapeHtml(subject)}</p>` : ""}
            <div style="margin-top: 16px; padding: 14px; border: 1px solid #d9dad6; white-space: pre-wrap;">
              ${escapeHtml(message)}
            </div>
          </div>
        `,
      });

      if (error) {
        console.error("RESEND_ERROR: Email delivery failed.");
        return NextResponse.json(
          { ok: false, error: "Could not send email right now. Please try again." },
          { status: 500 }
        );
      }

      return NextResponse.json({ ok: true }, { status: 200 });
    }

    if (process.env.NODE_ENV === "production") {
      return NextResponse.json(
        { ok: false, error: "Email service is unavailable. Please email me directly." },
        { status: 503 }
      );
    }
    console.info("Contact email skipped: development email service is not configured.");
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    console.error("CONTACT_API_ERROR: Request failed.");
    return NextResponse.json(
      { ok: false, error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
