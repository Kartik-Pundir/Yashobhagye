// Branded HTML email templates for Yashobhagya Enterprises
// Colors: #1A3C2E (forest green), #C4862A (amber), #E8D5B0 (cream), #F9F6F0 (warm off-white)


function emailShell(bodyContent: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Yashobhagya Enterprises</title>
</head>
<body style="margin:0;padding:0;background-color:#F0EBE3;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F0EBE3;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 32px rgba(26,60,46,0.10);">

          <!-- TOP GOLD BAR -->
          <tr><td style="background:#C4862A;height:5px;font-size:0;">&nbsp;</td></tr>

          <!-- HEADER with Logo -->
          <tr>
            <td style="background:#1A3C2E;padding:32px 40px 28px;text-align:center;">
              <div style="margin-bottom:16px;">
                <img src="cid:yashobhagya-logo" alt="Yashobhagya Logo" width="64" height="64"
                  style="border-radius:50%;border:3px solid rgba(196,134,42,0.5);display:inline-block;" />
              </div>
              <div style="display:inline-block;background:rgba(255,255,255,0.06);border:1px solid rgba(232,213,176,0.2);border-radius:8px;padding:5px 14px;margin-bottom:12px;">
                <span style="color:#E8D5B0;font-size:9px;letter-spacing:0.25em;font-weight:700;text-transform:uppercase;">Official Communication</span>
              </div>
              <div style="color:#E8D5B0;font-size:26px;font-weight:700;letter-spacing:0.05em;line-height:1.2;font-family:Georgia,serif;">
                YASHOBHAGYA
              </div>
              <div style="color:rgba(232,213,176,0.6);font-size:9px;letter-spacing:0.3em;font-weight:600;text-transform:uppercase;margin-top:4px;">
                ENTERPRISES
              </div>
              <div style="width:48px;height:2px;background:#C4862A;margin:14px auto 0;border-radius:2px;"></div>
            </td>
          </tr>

          <!-- BODY -->
          ${bodyContent}

          <!-- FOOTER -->
          <tr>
            <td style="background:#1A3C2E;padding:28px 40px;text-align:center;">
              <div style="color:#E8D5B0;font-size:11px;font-weight:700;letter-spacing:0.1em;margin-bottom:6px;font-family:Georgia,serif;">
                Yashobhagya Enterprises
              </div>
              <div style="color:rgba(232,213,176,0.5);font-size:10px;line-height:1.8;">
                Premium Biofuels &amp; Natural Mineral Salts &bull; Pan-India Supply
              </div>
              <div style="width:32px;height:1px;background:rgba(196,134,42,0.4);margin:14px auto;"></div>
              <div style="color:rgba(232,213,176,0.4);font-size:9px;line-height:1.6;">
                This is an automated message from Yashobhagya Enterprises.<br/>Please do not reply directly to this email.
              </div>
            </td>
          </tr>

          <!-- BOTTOM GOLD BAR -->
          <tr><td style="background:#C4862A;height:3px;font-size:0;">&nbsp;</td></tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

// Contact details block — reused in both templates
const contactBlock = `
  <div style="background:#F9F6F0;border:1px solid #E8D5B0;border-radius:12px;padding:24px;">
    <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.15em;color:#9ca3af;margin-bottom:16px;">Need Immediate Assistance?</div>
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr><td style="padding:8px 0;">
        <table cellpadding="0" cellspacing="0"><tr>
          <td style="width:32px;height:32px;background:#1A3C2E;border-radius:8px;text-align:center;vertical-align:middle;"><span style="font-size:14px;">📞</span></td>
          <td style="padding-left:12px;">
            <div style="font-size:10px;color:#9ca3af;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;">Direct Line</div>
            <div style="font-size:14px;font-weight:700;color:#1A3C2E;">+91 81918 50001</div>
          </td>
        </tr></table>
      </td></tr>
      <tr><td style="padding:8px 0;">
        <table cellpadding="0" cellspacing="0"><tr>
          <td style="width:32px;height:32px;background:#1A3C2E;border-radius:8px;text-align:center;vertical-align:middle;"><span style="font-size:14px;">✉️</span></td>
          <td style="padding-left:12px;">
            <div style="font-size:10px;color:#9ca3af;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;">Sales Email</div>
            <div style="font-size:13px;font-weight:600;color:#C4862A;">pundirranjeet@gmail.com</div>
          </td>
        </tr></table>
      </td></tr>
      <tr><td style="padding:8px 0;">
        <table cellpadding="0" cellspacing="0"><tr>
          <td style="width:32px;height:32px;background:#1A3C2E;border-radius:8px;text-align:center;vertical-align:middle;"><span style="font-size:14px;">🕐</span></td>
          <td style="padding-left:12px;">
            <div style="font-size:10px;color:#9ca3af;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;">Business Hours</div>
            <div style="font-size:13px;font-weight:600;color:#1A3C2E;">Monday – Saturday, 9:00 AM – 7:00 PM IST</div>
          </td>
        </tr></table>
      </td></tr>
      <tr><td style="padding:8px 0 0;">
        <table cellpadding="0" cellspacing="0"><tr>
          <td style="width:32px;height:32px;background:#1A3C2E;border-radius:8px;text-align:center;vertical-align:middle;"><span style="font-size:14px;">💬</span></td>
          <td style="padding-left:12px;">
            <div style="font-size:10px;color:#9ca3af;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;">WhatsApp</div>
            <a href="https://wa.me/918191850001" style="font-size:13px;font-weight:600;color:#C4862A;text-decoration:none;">wa.me/918191850001</a>
          </td>
        </tr></table>
      </td></tr>
    </table>
  </div>
`

const signOff = (division: string) => `
  <tr>
    <td style="padding:28px 40px 36px;">
      <p style="margin:0 0 6px;font-size:13px;color:#4b5563;line-height:1.8;">Warm regards,</p>
      <div style="font-size:15px;font-weight:700;color:#1A3C2E;font-family:Georgia,serif;">${division}</div>
      <div style="font-size:11px;color:#9ca3af;margin-top:2px;">Roorkee, Uttarakhand &bull; Saharanpur, Uttar Pradesh</div>
    </td>
  </tr>
`

// ─── 1. GENERAL ENQUIRY EMAIL — "We Will Reach You Soon" ─────────────────────
// Shown when product === 'General Enquiry'
export function buildGeneralEnquiryEmail(data: {
  name: string
  email: string
  phone: string
  message: string
}): string {
  const body = `
    <tr><td style="padding:40px 40px 0;">
      <div style="font-size:13px;color:#6b7280;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:8px;">Dear ${escapeHtml(data.name)},</div>
      <h1 style="margin:0 0 16px;font-size:22px;font-weight:700;color:#1A3C2E;font-family:Georgia,serif;line-height:1.3;">We Will Reach You Soon</h1>
      <p style="margin:0;font-size:14px;color:#4b5563;line-height:1.8;">
        Thank you for getting in touch with us. We have received your message and a dedicated executive will contact you
        within <strong style="color:#1A3C2E;">24 business hours</strong> to assist you further.
      </p>
    </td></tr>

    <tr><td style="padding:24px 40px 0;"><div style="height:1px;background:linear-gradient(to right,#E8D5B0,transparent);"></div></td></tr>

    <!-- REACH YOU SOON CARD -->
    <tr><td style="padding:24px 40px 0;">
      <div style="background:linear-gradient(135deg,#1A3C2E 0%,#2d5a47 100%);border-radius:12px;padding:32px;text-align:center;">
        <div style="font-size:40px;margin-bottom:12px;">📞</div>
        <div style="color:#E8D5B0;font-size:18px;font-weight:700;font-family:Georgia,serif;margin-bottom:10px;">We Will Reach You Soon!</div>
        <div style="color:rgba(232,213,176,0.75);font-size:13px;line-height:1.8;max-width:380px;margin:0 auto;">
          Our team has noted your enquiry and will call you on<br/>
          <strong style="color:#C4862A;font-size:15px;">${escapeHtml(data.phone)}</strong><br/>
          within 24 business hours.
        </div>
        <div style="margin-top:20px;padding-top:20px;border-top:1px solid rgba(232,213,176,0.15);">
          <div style="color:rgba(232,213,176,0.5);font-size:10px;text-transform:uppercase;letter-spacing:0.15em;margin-bottom:6px;">Your message</div>
          <div style="color:rgba(232,213,176,0.7);font-size:12px;font-style:italic;line-height:1.7;">"${escapeHtml(data.message)}"</div>
        </div>
      </div>
    </td></tr>

    <!-- CONTACT BLOCK -->
    <tr><td style="padding:24px 40px 0;">${contactBlock}</td></tr>

    ${signOff('Yashobhagya Enterprises Sales Division')}
  `
  return emailShell(body)
}

// ─── 2. PRODUCT ENQUIRY EMAIL — "Thank You for Your Quote Request" ────────────
// Shown when a specific product is selected (not General Enquiry)
export function buildProductEnquiryEmail(data: {
  name: string
  email: string
  phone: string
  product: string
  message: string
}): string {
  const body = `
    <tr><td style="padding:40px 40px 0;">
      <div style="font-size:13px;color:#6b7280;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:8px;">Dear ${escapeHtml(data.name)},</div>
      <h1 style="margin:0 0 16px;font-size:22px;font-weight:700;color:#1A3C2E;font-family:Georgia,serif;line-height:1.3;">Thank You for Your Quote Request!</h1>
      <p style="margin:0;font-size:14px;color:#4b5563;line-height:1.8;">
        We have received your bulk quote request for <strong style="color:#C4862A;">${escapeHtml(data.product)}</strong>.
        Our sales team is reviewing your requirements and will prepare a formal quotation for you.
      </p>
    </td></tr>

    <tr><td style="padding:24px 40px 0;"><div style="height:1px;background:linear-gradient(to right,#E8D5B0,transparent);"></div></td></tr>

    <!-- INQUIRY SUMMARY -->
    <tr><td style="padding:24px 40px 0;">
      <div style="background:#F9F6F0;border-radius:12px;border:1px solid #E8D5B0;overflow:hidden;">
        <div style="background:#1A3C2E;padding:12px 20px;">
          <span style="color:#E8D5B0;font-size:10px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;">Your Quote Request Summary</span>
        </div>
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr><td style="padding:14px 20px;border-bottom:1px solid #E8D5B0;">
            <span style="font-size:10px;color:#9ca3af;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;display:block;margin-bottom:3px;">Product Requested</span>
            <span style="font-size:15px;color:#C4862A;font-weight:700;">${escapeHtml(data.product)}</span>
          </td></tr>
          <tr><td style="padding:14px 20px;border-bottom:1px solid #E8D5B0;">
            <span style="font-size:10px;color:#9ca3af;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;display:block;margin-bottom:3px;">Your Contact Number</span>
            <span style="font-size:14px;color:#1A3C2E;font-weight:600;">${escapeHtml(data.phone)}</span>
          </td></tr>
          <tr><td style="padding:14px 20px;">
            <span style="font-size:10px;color:#9ca3af;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;display:block;margin-bottom:6px;">Your Requirements</span>
            <div style="background:#ffffff;border-left:3px solid #C4862A;border-radius:0 8px 8px 0;padding:12px 14px;">
              <p style="margin:0;font-size:13px;color:#4b5563;line-height:1.7;font-style:italic;">"${escapeHtml(data.message)}"</p>
            </div>
          </td></tr>
        </table>
      </div>
    </td></tr>

    <!-- WHAT HAPPENS NEXT -->
    <tr><td style="padding:24px 40px 0;">
      <div style="background:#F9F6F0;border:1px solid #E8D5B0;border-radius:12px;padding:20px;">
        <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.15em;color:#9ca3af;margin-bottom:14px;">What Happens Next?</div>
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr><td style="padding:6px 0;">
            <table cellpadding="0" cellspacing="0"><tr>
              <td style="width:28px;height:28px;background:#1A3C2E;border-radius:50%;text-align:center;vertical-align:middle;font-size:11px;font-weight:700;color:#E8D5B0;">1</td>
              <td style="padding-left:12px;font-size:13px;color:#4b5563;">Our team reviews your requirements</td>
            </tr></table>
          </td></tr>
          <tr><td style="padding:6px 0;">
            <table cellpadding="0" cellspacing="0"><tr>
              <td style="width:28px;height:28px;background:#1A3C2E;border-radius:50%;text-align:center;vertical-align:middle;font-size:11px;font-weight:700;color:#E8D5B0;">2</td>
              <td style="padding-left:12px;font-size:13px;color:#4b5563;">A sales executive calls you within <strong style="color:#1A3C2E;">24 hours</strong></td>
            </tr></table>
          </td></tr>
          <tr><td style="padding:6px 0;">
            <table cellpadding="0" cellspacing="0"><tr>
              <td style="width:28px;height:28px;background:#1A3C2E;border-radius:50%;text-align:center;vertical-align:middle;font-size:11px;font-weight:700;color:#E8D5B0;">3</td>
              <td style="padding-left:12px;font-size:13px;color:#4b5563;">We send you a formal bulk quotation with pricing &amp; logistics</td>
            </tr></table>
          </td></tr>
        </table>
      </div>
    </td></tr>

    <!-- CONTACT BLOCK -->
    <tr><td style="padding:24px 40px 0;">${contactBlock}</td></tr>

    ${signOff('Yashobhagya Enterprises Sales Division')}
  `
  return emailShell(body)
}

// ─── 3. WELCOME / REGISTRATION EMAIL ─────────────────────────────────────────
export function buildWelcomeEmail(data: { name: string; email: string }): string {
  const body = `
    <tr><td style="padding:40px 40px 0;">
      <div style="font-size:13px;color:#6b7280;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:8px;">Welcome, ${escapeHtml(data.name)}!</div>
      <h1 style="margin:0 0 16px;font-size:22px;font-weight:700;color:#1A3C2E;font-family:Georgia,serif;line-height:1.3;">Thank You for Joining Us</h1>
      <p style="margin:0;font-size:14px;color:#4b5563;line-height:1.8;">
        Your account has been successfully created with Yashobhagya Enterprises.
        You can now request bulk quotes, track your enquiries, and connect with our sales team directly.
      </p>
    </td></tr>

    <tr><td style="padding:24px 40px 0;"><div style="height:1px;background:linear-gradient(to right,#E8D5B0,transparent);"></div></td></tr>

    <!-- WELCOME CARD -->
    <tr><td style="padding:24px 40px 0;">
      <div style="background:linear-gradient(135deg,#1A3C2E 0%,#2d5a47 100%);border-radius:12px;padding:28px;text-align:center;">
        <div style="font-size:36px;margin-bottom:12px;">🌿</div>
        <div style="color:#E8D5B0;font-size:16px;font-weight:700;font-family:Georgia,serif;margin-bottom:8px;">Welcome to Yashobhagya Enterprises</div>
        <div style="color:rgba(232,213,176,0.7);font-size:12px;line-height:1.8;max-width:380px;margin:0 auto;">
          India's trusted supplier of <strong style="color:#C4862A;">Premium Biofuels</strong> &amp;
          <strong style="color:#C4862A;">Natural Mineral Salts</strong> with Pan-India delivery.
        </div>
      </div>
    </td></tr>

    <!-- ACCOUNT DETAILS -->
    <tr><td style="padding:24px 40px 0;">
      <div style="background:#F9F6F0;border-radius:12px;border:1px solid #E8D5B0;overflow:hidden;">
        <div style="background:#1A3C2E;padding:12px 20px;">
          <span style="color:#E8D5B0;font-size:10px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;">Your Account Details</span>
        </div>
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr><td style="padding:14px 20px;border-bottom:1px solid #E8D5B0;">
            <span style="font-size:10px;color:#9ca3af;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;display:block;margin-bottom:3px;">Registered Name</span>
            <span style="font-size:14px;color:#1A3C2E;font-weight:700;">${escapeHtml(data.name)}</span>
          </td></tr>
          <tr><td style="padding:14px 20px;">
            <span style="font-size:10px;color:#9ca3af;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;display:block;margin-bottom:3px;">Registered Email</span>
            <span style="font-size:14px;color:#C4862A;font-weight:600;">${escapeHtml(data.email)}</span>
          </td></tr>
        </table>
      </div>
    </td></tr>

    <!-- CONTACT BLOCK -->
    <tr><td style="padding:24px 40px 0;">${contactBlock}</td></tr>

    ${signOff('Yashobhagya Enterprises Team')}
  `
  return emailShell(body)
}

// ─── HTML escape helper ───────────────────────────────────────────────────────
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
