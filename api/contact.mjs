// api/contact.mjs
//
// POST /api/contact
// Sends the portfolio contact form submission as an email via Resend.
//
// Requires environment variables on Vercel:
//   RESEND_API_KEY   — from resend.com/api-keys
//   CONTACT_TO_EMAIL — where messages should land (defaults to your email below)
//
// Uses .mjs on purpose — same reasoning as now-playing.mjs: it forces Node
// to treat this as an ES module unconditionally, sidestepping the
// package.json "type" bundling issue entirely.

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL || "umaryaksambi@gmail.com";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function buildEmailHtml({ name, email, message }) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");
  const timestamp = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });

  return `
<!DOCTYPE html>
<html>
  <body style="margin:0; padding:0; background-color:#0a0a0a; font-family: 'Courier New', Courier, monospace;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0a0a; padding: 32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" style="max-width: 560px; background-color:#111111; border:1px solid #262626; border-radius:8px; overflow:hidden;">
            <!-- terminal title bar -->
            <tr>
              <td style="background-color:#1a1a1a; padding: 12px 16px; border-bottom:1px solid #262626;">
                <span style="display:inline-block; width:10px; height:10px; border-radius:50%; background-color:#ff5f56; margin-right:6px;">&nbsp;</span>
                <span style="display:inline-block; width:10px; height:10px; border-radius:50%; background-color:#ffbd2e; margin-right:6px;">&nbsp;</span>
                <span style="display:inline-block; width:10px; height:10px; border-radius:50%; background-color:#27c93f; margin-right:12px;">&nbsp;</span>
                <span style="color:#8a8a8a; font-size:12px; vertical-align:middle;">contact-form — new-message.sh</span>
              </td>
            </tr>
            <!-- body -->
            <tr>
              <td style="padding: 24px;">
                <p style="color:#39ff88; font-size:13px; margin:0 0 20px 0;">$ cat new_message.txt</p>

                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
                  <tr>
                    <td style="color:#6b6b6b; font-size:11px; text-transform:uppercase; letter-spacing:0.06em; padding-bottom:6px;">// from</td>
                  </tr>
                  <tr>
                    <td style="color:#f5f5f5; font-size:16px; font-weight:bold; padding-bottom:3px;">${safeName}</td>
                  </tr>
                  <tr>
                    <td>
                      <a href="mailto:${safeEmail}" style="color:#39ff88; font-size:13px; text-decoration:none;">${safeEmail}</a>
                    </td>
                  </tr>
                </table>

                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:8px;">
                  <tr>
                    <td style="color:#6b6b6b; font-size:11px; text-transform:uppercase; letter-spacing:0.06em; padding-bottom:8px;">// message</td>
                  </tr>
                  <tr>
                    <td style="background-color:#0a0a0a; border:1px solid #262626; border-radius:6px; padding:16px; color:#d4d4d4; font-size:14px; line-height:1.6;">
                      ${safeMessage}
                    </td>
                  </tr>
                </table>

                <p style="color:#4a4a4a; font-size:11px; margin: 20px 0 0 0; padding-top:14px; border-top:1px solid #262626;">
                  received ${timestamp} IST &middot; via umaryaksambi.vercel.app/contact
                </p>
              </td>
            </tr>
          </table>

          <p style="color:#4a4a4a; font-size:11px; margin-top:16px; font-family: 'Courier New', Courier, monospace;">
            // hit reply to respond directly — reply-to is already set to ${safeEmail}
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function buildEmailText({ name, email, message }) {
  return [
    `New message from ${name} (${email})`,
    "",
    message,
    "",
    "---",
    "via umaryaksambi.vercel.app/contact",
  ].join("\n");
}
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  if (!RESEND_API_KEY) {
    return res.status(500).json({ success: false, message: "Email service not configured" });
  }

  let body = req.body;
  // Vercel usually parses JSON bodies automatically; guard in case it doesn't.
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ success: false, message: "Invalid request body" });
    }
  }

  const { name, email, message, botcheck } = body || {};

  // Honeypot — real visitors never fill this hidden field. Pretend success
  // so bots don't learn anything, but skip actually sending an email.
  if (botcheck) {
    return res.status(200).json({ success: true });
  }

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  if (!EMAIL_PATTERN.test(email)) {
    return res.status(400).json({ success: false, message: "Invalid email address" });
  }

  try {
    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Portfolio Contact Form <onboarding@resend.dev>",
        to: [CONTACT_TO_EMAIL],
        reply_to: [email],
        subject: `New message from ${name} — portfolio contact form`,
        html: buildEmailHtml({ name, email, message }),
        text: buildEmailText({ name, email, message }),
      }),
    });

    if (!resendRes.ok) {
      const errText = await resendRes.text();
      console.error("Resend error:", errText);
      return res.status(502).json({ success: false, message: "Failed to send email" });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("contact function error:", err);
    return res.status(500).json({ success: false, message: "Unexpected server error" });
  }
}
