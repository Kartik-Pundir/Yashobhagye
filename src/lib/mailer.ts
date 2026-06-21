import nodemailer from 'nodemailer'
import path from 'path'

// Singleton transporter — reused across calls
let transporter: nodemailer.Transporter | null = null

export function getTransporter(): nodemailer.Transporter | null {
  const user = process.env.GMAIL_USER
  const pass = process.env.GMAIL_APP_PASSWORD

  if (!user || !pass) {
    console.warn("GMAIL_USER or GMAIL_APP_PASSWORD not set. Email sending disabled.")
    return null
  }

  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass }
    })
  }

  return transporter
}

// Logo as a CID attachment — works in all email clients including Gmail
const LOGO_PATH = path.join(process.cwd(), 'public', 'images', 'logo.jpg')

export async function sendMail(options: {
  to: string
  subject: string
  html: string
  text?: string
}): Promise<void> {
  const t = getTransporter()
  if (!t) return

  const plainText = options.text || options.html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()

  await t.sendMail({
    from: `"Yashobhagya Enterprises" <${process.env.GMAIL_USER}>`,
    replyTo: process.env.GMAIL_USER,
    to: options.to,
    subject: options.subject,
    html: options.html,
    text: plainText,
    attachments: [
      {
        filename: 'logo.jpg',
        path: LOGO_PATH,
        cid: 'yashobhagya-logo' // referenced as cid:yashobhagya-logo in HTML
      }
    ],
    headers: {
      'X-Mailer': 'Yashobhagya Mailer',
      'List-Unsubscribe': `<mailto:${process.env.GMAIL_USER}?subject=unsubscribe>`
    }
  })
}
