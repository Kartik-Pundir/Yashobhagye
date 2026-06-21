'use server'

import { prisma } from '@/lib/prisma'
import { sendMail } from '@/lib/mailer'
import { buildGeneralEnquiryEmail, buildProductEnquiryEmail } from '@/lib/emails'

interface QuoteRequest {
  name: string
  phone: string
  email: string
  product: string
  message: string
}

export async function submitQuoteRequest(data: QuoteRequest) {
  const { name, phone, email, product, message } = data

  if (!name || !phone || !email || !product || !message) {
    return { success: false, error: "All fields are required." }
  }

  try {
    // 1. Save Enquiry to Database
    const enquiry = await prisma.enquiry.create({
      data: {
        name,
        phone,
        email,
        product,
        message,
        status: 'NEW'
      }
    })

    // 2. Send Emails via Nodemailer/Gmail
    try {
      // 2a. Internal admin notification
      await sendMail({
        to: 'pundirranjeet@gmail.com',
        subject: `New Bulk Quote Request: ${product} from ${name}`,
        html: `
          <h2>New Enquiry Details</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Product Interest:</strong> ${product}</p>
          <p><strong>Message:</strong></p>
          <p style="background-color:#f9f9f9;padding:12px;border-left:4px solid #1A3C2E;font-style:italic;">
            ${message.replace(/\n/g, '<br/>')}
          </p>
          <hr/>
          <p style="font-size:11px;color:#888;">Submitted via Yashobhagya Enterprises Website</p>
        `
      })

      // 2b. Customer confirmation email — type depends on product selected
      const isGeneralEnquiry = product === 'General Enquiry'
      await sendMail({
        to: email,
        subject: isGeneralEnquiry
          ? `We'll Reach You Soon — Yashobhagya Enterprises`
          : `Your Quote Request Received — Yashobhagya Enterprises`,
        html: isGeneralEnquiry
          ? buildGeneralEnquiryEmail({ name, phone, email, message })
          : buildProductEnquiryEmail({ name, phone, email, product, message })
      })

      console.log(`Emails dispatched for enquiry ${enquiry.id}`)
    } catch (emailErr) {
      console.error("Email delivery failed:", emailErr)
      // Non-fatal — do not block the response if email fails
    }

    return { success: true, message: "Your quote request has been submitted successfully. Our sales team will contact you shortly." }
  } catch (error: any) {
    console.error("Server Action Enquiry Error:", error)
    return { success: false, error: error.message || "Failed to submit request. Please try again." }
  }
}
