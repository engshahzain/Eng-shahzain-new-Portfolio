import { NextResponse } from "next/server";
import { Resend } from "resend";

// Uses environment variable first, with your key as a fallback for local testing
const resend = new Resend(process.env.RESEND_API_KEY);
function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, projectType, message, trap } = body;

    // 1. Honeypot bot check
    if (trap) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // 2. Basic field validation
    if (!name || !email || !projectType || !message) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 },
      );
    }

    const safeName = escapeHtml(name.trim());
    const safeEmail = escapeHtml(email.trim());
    const safeProjectType = escapeHtml(projectType.trim());
    const safeMessage = escapeHtml(message.trim()).replace(/\n/g, "<br/>");

    // 3. Send email via Resend
    const { data, error } = await resend.emails.send({
      from: "Portfolio Inquiry <onboarding@resend.dev>",
      // Once enigmasystems.io is verified in Resend, you can change 'from' to:
      // from: "Enigma Systems <hello@enigmasystems.io>",
      to: ["2005shahzain@gmail.com"],
      replyTo: email.trim(),
      subject: `New Inquiry: ${projectType} — from ${name}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background-color: #09090b; color: #ffffff; padding: 32px; border-radius: 16px; border: 1px solid #27272a;">
          <div style="border-bottom: 1px solid #27272a; padding-bottom: 16px; margin-bottom: 24px;">
            <span style="font-family: monospace; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: #10b981; font-weight: 700;">
              Enigma Systems // New Portfolio Lead
            </span>
            <h1 style="margin: 8px 0 0 0; font-size: 24px; color: #ffffff;">
              ${safeProjectType}
            </h1>
          </div>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 8px 0; color: #a1a1aa; font-size: 14px; width: 120px;">Client Name:</td>
              <td style="padding: 8px 0; color: #ffffff; font-size: 15px; font-weight: 600;">${safeName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #a1a1aa; font-size: 14px;">Client Email:</td>
              <td style="padding: 8px 0; font-size: 15px;">
                <a href="mailto:${safeEmail}" style="color: #34d399; text-decoration: none;">${safeEmail}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #a1a1aa; font-size: 14px;">Scope:</td>
              <td style="padding: 8px 0; color: #ffffff; font-size: 15px;">${safeProjectType}</td>
            </tr>
          </table>

          <div style="background-color: #18181b; border-left: 3px solid #10b981; padding: 20px; border-radius: 8px;">
            <p style="margin: 0 0 8px 0; font-size: 12px; font-family: monospace; text-transform: uppercase; letter-spacing: 1px; color: #a1a1aa;">
              What is slow, manual or broken:
            </p>
            <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #e4e4e7;">
              ${safeMessage}
            </p>
          </div>

          <p style="margin-top: 24px; font-size: 12px; color: #71717a;">
            Hit <strong>Reply</strong> directly in your email client to respond to ${safeName} (${safeEmail}).
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id }, { status: 200 });
  } catch (error) {
    console.error("Contact Route Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
