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

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  if (!RESEND_API_KEY) {
    return res
      .status(500)
      .json({ success: false, message: "Email service not configured" });
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
        html: `
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
        `,
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
