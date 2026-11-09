import transporter from "../config/nodemailer.config.js";

// Helper function to escape HTML characters
const escapeHtml = (unsafe) => {
  if (!unsafe) return "";
  return unsafe
    .toString()
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

export const contactUs = async (req, res) => {
  const { name, email, phone, message, recaptcha } = req.body;

  try {
    // Verify reCAPTCHA
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    const response = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${secretKey}&response=${recaptcha}`,
      }
    );

    const data = await response.json();
    if (!data.success) {
      return res
        .status(400)
        .json({ message: "reCAPTCHA verification failed." });
    }

    // Escape all user inputs to prevent HTML injection
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone);
    const safeMessage = escapeHtml(message);

    const mail = {
      from: safeName, // Use escaped name here too
      to: "patrick@exel-tech.com",
      subject: "Contact Form Submission",
      html: `
<!DOCTYPE html>
<html lang="en" style="margin:0;padding:0;">
  <head>
    <meta charset="utf-8">
    <meta name="color-scheme" content="light dark">
    <meta name="supported-color-schemes" content="light dark">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Contact Form Submission</title>
    <style>
      /* Mobile-friendly adjustments for clients that support <style> */
      @media screen and (max-width:600px) {
        .container { width: 100% !important; }
        .content { padding: 24px !important; }
      }
      /* Dark mode tweaks for clients that support it */
      @media (prefers-color-scheme: dark) {
        .bg { background-color: #121212 !important; }
        .card { background-color: #1e1e1e !important; }
        .text { color: #e5e5e5 !important; }
        .muted { color: #b3b3b3 !important; }
        .divider { border-color: #2a2a2a !important; }
      }
    </style>
  </head>
  <body class="bg" style="margin:0;padding:0;background-color:#f6f7fb;">
    <!-- Preheader (hidden preview text) -->
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
      New contact form submission received.
    </div>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
      <tr>
        <td align="center" style="padding:32px;">
          <table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:600px;max-width:100%;">
            <!-- Header -->
            <tr>
              <td align="center" style="padding:12px 24px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                  <tr>
                    <td align="left" class="text" style="font-family:Segoe UI, Roboto, Helvetica, Arial, sans-serif;font-size:14px;color:#4b5563;">
                      Contact Form Submission
                    </td>
                    <td align="right">
                      <span class="muted" style="font-family:Segoe UI, Roboto, Helvetica, Arial, sans-serif;font-size:12px;color:#6b7280;">
                        ${new Date().toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Card -->
            <tr>
              <td class="card" style="background:#ffffff;border-radius:12px;box-shadow:0 4px 12px rgba(17,24,39,0.08);padding:8px;">
                <!-- Accent border -->
                <div style="height:4px;width:100%;background:linear-gradient(90deg,#4f46e5,#06b6d4);border-radius:12px 12px 0 0;"></div>

                <!-- Content -->
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                  <tr>
                    <td class="content text" style="padding:32px;font-family:Segoe UI, Roboto, Helvetica, Arial, sans-serif;color:#111827;">
                      <h2 style="margin:0 0 16px;font-size:20px;line-height:1.4;color:#111827;">
                        New message received
                      </h2>
                      <p class="muted" style="margin:0 0 24px;font-size:14px;line-height:1.6;color:#6b7280;">
                        You're receiving this email because ${safeName} submitted your contact form. Details are below.
                      </p>

                      <!-- Details -->
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                        <tr>
                          <td style="padding:0 0 16px;">
                            <div style="font-size:12px;color:#6b7280;margin-bottom:4px;font-family:Segoe UI, Roboto, Helvetica, Arial, sans-serif;">
                              Name
                            </div>
                            <div style="font-size:16px;color:#111827;font-family:Segoe UI, Roboto, Helvetica, Arial, sans-serif;">
                              ${safeName}
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:0 0 16px;">
                            <div style="font-size:12px;color:#6b7280;margin-bottom:4px;font-family:Segoe UI, Roboto, Helvetica, Arial, sans-serif;">
                              Email
                            </div>
                            <div style="font-size:16px;color:#111827;font-family:Segoe UI, Roboto, Helvetica, Arial, sans-serif;">
                              <a href="mailto:${safeEmail}" style="color:#2563eb;text-decoration:none;">${safeEmail}</a>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:0 0 16px;">
                            <div style="font-size:12px;color:#6b7280;margin-bottom:4px;font-family:Segoe UI, Roboto, Helvetica, Arial, sans-serif;">
                              Phone
                            </div>
                            <div style="font-size:16px;color:#111827;font-family:Segoe UI, Roboto, Helvetica, Arial, sans-serif;">
                              <a href="tel:${safePhone}" style="color:#2563eb;text-decoration:none;">${safePhone}</a>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:0;">
                            <div style="font-size:12px;color:#6b7280;margin-bottom:4px;font-family:Segoe UI, Roboto, Helvetica, Arial, sans-serif;">
                              Message
                            </div>
                            <div style="font-size:16px;color:#111827;font-family:Segoe UI, Roboto, Helvetica, Arial, sans-serif;line-height:1.6;">
                              ${safeMessage}
                            </div>
                          </td>
                        </tr>
                      </table>

                      <!-- Divider -->
                      <hr class="divider" style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;">

                      <!-- Footer actions -->
                      <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                        <tr>
                          <td>
                            <a href="mailto:${safeEmail}" style="display:inline-block;background:#06b6d4;color:#ffffff;text-decoration:none;font-family:Segoe UI, Roboto, Helvetica, Arial, sans-serif;font-size:14px;padding:10px 16px;border-radius:8px;">
                              Reply to ${safeName}
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td align="center" style="padding:16px 24px;">
    
                <p class="muted" style="margin:8px 0 0;font-family:Segoe UI, Roboto, Helvetica, Arial, sans-serif;font-size:11px;color:#9ca3af;line-height:1.6;">
                  You received this email because a user submitted your site's contact form.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
 `,
    };

    await transporter.sendMail(mail);
    res.json({ message: "Message Sent" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Message failed to send", error: error.message });
  }
};

export const willpgmContact = async (req, res) => {
  const { name, email, phone, message } = req.body;

  try {
    // Escape all user inputs to prevent HTML injection
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone);
    const safeMessage = escapeHtml(message);

    const mail = {
      from: "patrick@exel-tech.com",
      to: "hangryan@gmail.com",
      subject: "Contact Form Submission",
      html: `
<!DOCTYPE html>
<html lang="en" style="margin:0;padding:0;">
  <head>
    <meta charset="utf-8">
    <meta name="color-scheme" content="light dark">
    <meta name="supported-color-schemes" content="light dark">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Contact Form Submission</title>
    <style>
      /* Mobile-friendly adjustments for clients that support <style> */
      @media screen and (max-width:600px) {
        .container { width: 100% !important; }
        .content { padding: 24px !important; }
      }
      /* Dark mode tweaks for clients that support it */
      @media (prefers-color-scheme: dark) {
        .bg { background-color: #121212 !important; }
        .card { background-color: #1e1e1e !important; }
        .text { color: #e5e5e5 !important; }
        .muted { color: #b3b3b3 !important; }
        .divider { border-color: #2a2a2a !important; }
      }
    </style>
  </head>
  <body class="bg" style="margin:0;padding:0;background-color:#f6f7fb;">
    <!-- Preheader (hidden preview text) -->
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
      New contact form submission received.
    </div>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
      <tr>
        <td align="center" style="padding:32px;">
          <table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:600px;max-width:100%;">
            <!-- Header -->
            <tr>
              <td align="center" style="padding:12px 24px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                  <tr>
                    <td align="left" class="text" style="font-family:Segoe UI, Roboto, Helvetica, Arial, sans-serif;font-size:14px;color:#4b5563;">
                      Contact Form Submission
                    </td>
                    <td align="right">
                      <span class="muted" style="font-family:Segoe UI, Roboto, Helvetica, Arial, sans-serif;font-size:12px;color:#6b7280;">
                        ${new Date().toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Card -->
            <tr>
              <td class="card" style="background:#ffffff;border-radius:12px;box-shadow:0 4px 12px rgba(17,24,39,0.08);padding:8px;">
                <!-- Accent border -->
                <div style="height:4px;width:100%;background:linear-gradient(90deg,#4f46e5,#06b6d4);border-radius:12px 12px 0 0;"></div>

                <!-- Content -->
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                  <tr>
                    <td class="content text" style="padding:32px;font-family:Segoe UI, Roboto, Helvetica, Arial, sans-serif;color:#111827;">
                      <h2 style="margin:0 0 16px;font-size:20px;line-height:1.4;color:#111827;">
                        New message received
                      </h2>
                      <p class="muted" style="margin:0 0 24px;font-size:14px;line-height:1.6;color:#6b7280;">
                        You're receiving this email because ${safeName} submitted your contact form. Details are below.
                      </p>

                      <!-- Details -->
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                        <tr>
                          <td style="padding:0 0 16px;">
                            <div style="font-size:12px;color:#6b7280;margin-bottom:4px;font-family:Segoe UI, Roboto, Helvetica, Arial, sans-serif;">
                              Name
                            </div>
                            <div style="font-size:16px;color:#111827;font-family:Segoe UI, Roboto, Helvetica, Arial, sans-serif;">
                              ${safeName}
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:0 0 16px;">
                            <div style="font-size:12px;color:#6b7280;margin-bottom:4px;font-family:Segoe UI, Roboto, Helvetica, Arial, sans-serif;">
                              Email
                            </div>
                            <div style="font-size:16px;color:#111827;font-family:Segoe UI, Roboto, Helvetica, Arial, sans-serif;">
                              <a href="mailto:${safeEmail}" style="color:#2563eb;text-decoration:none;">${safeEmail}</a>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:0 0 16px;">
                            <div style="font-size:12px;color:#6b7280;margin-bottom:4px;font-family:Segoe UI, Roboto, Helvetica, Arial, sans-serif;">
                              Phone
                            </div>
                            <div style="font-size:16px;color:#111827;font-family:Segoe UI, Roboto, Helvetica, Arial, sans-serif;">
                              <a href="tel:${safePhone}" style="color:#2563eb;text-decoration:none;">${safePhone}</a>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:0;">
                            <div style="font-size:12px;color:#6b7280;margin-bottom:4px;font-family:Segoe UI, Roboto, Helvetica, Arial, sans-serif;">
                              Message
                            </div>
                            <div style="font-size:16px;color:#111827;font-family:Segoe UI, Roboto, Helvetica, Arial, sans-serif;line-height:1.6;">
                              ${safeMessage}
                            </div>
                          </td>
                        </tr>
                      </table>

                      <!-- Divider -->
                      <hr class="divider" style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;">

                      <!-- Footer actions -->
                      <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                        <tr>
                          <td>
                            <a href="mailto:${safeEmail}" style="display:inline-block;background:#06b6d4;color:#ffffff;text-decoration:none;font-family:Segoe UI, Roboto, Helvetica, Arial, sans-serif;font-size:14px;padding:10px 16px;border-radius:8px;">
                              Reply to ${safeName}
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td align="center" style="padding:16px 24px;">
    
                <p class="muted" style="margin:8px 0 0;font-family:Segoe UI, Roboto, Helvetica, Arial, sans-serif;font-size:11px;color:#9ca3af;line-height:1.6;">
                  You received this email because a user submitted your site's contact form.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`,
    };

    await transporter.sendMail(mail);
    res.json({ status: "Message Sent" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: "Message failed to send", error: error.message });
  }
};
