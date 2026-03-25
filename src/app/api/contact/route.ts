import { NextResponse } from "next/server";
import { Resend } from "resend";
import { portfolioData } from "@/data/portfolio";

/**
 * PRODUCTION CONTACT FORM API
 * Uses Resend (https://resend.com) to dispatch real emails.
 */

export async function POST(req: Request) {
  // Initialize Resend lazily inside the handler to prevent build-time errors
  const resend = new Resend(process.env.RESEND_API_KEY || "re_placeholder_for_build");
  
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    // 1. Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // 2. Production Dispatch
    // If an API key is present, we attempt a real send.
    // Otherwise, we fallback to terminal logging for safety.
    if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== "re_your_api_key_here") {
      const { data, error } = await resend.emails.send({
        from: "Portfolio Contact <onboarding@resend.dev>", // Change this if you verify a domain
        to: process.env.CONTACT_RECEIVER_EMAIL || portfolioData.contact.receiverEmail,
        replyTo: email,
        subject: `[Portfolio] ${subject || "New Message"}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #3b82f6;">New Message from ${name}</h2>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject || "N/A"}</p>
            <div style="margin-top: 20px; padding: 15px; background: #f9f9f9; border-radius: 5px;">
               <p style="white-space: pre-wrap;">${message}</p>
            </div>
          </div>
        `,
      });

      if (error) {
        console.error("RESEND_ERROR:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json({ message: "Email sent successfully!", id: data?.id }, { status: 200 });
    } 

    // 3. Fallback / Dev Mode
    console.log("-----------------------------------------");
    console.log("MOCK MODE: No valid RESEND_API_KEY found in .env.local");
    console.log(`From: ${name} (${email})`);
    console.log(`Message: ${message}`);
    console.log("-----------------------------------------");

    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json(
      { message: "Dev Mode: Message logged to terminal. Add your API key to send real emails!" },
      { status: 200 }
    );

  } catch (error) {
    console.error("CONTACT_API_ERROR:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
