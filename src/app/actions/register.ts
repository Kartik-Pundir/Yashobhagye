'use server'

import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { sendMail } from '@/lib/mailer'
import { buildWelcomeEmail } from '@/lib/emails'

interface RegisterInput {
  name: string
  email: string
  password: string
}

export async function registerUser(data: RegisterInput) {
  const { name, email, password } = data

  if (!name || !email || !password) {
    return { success: false, error: "All fields are required." }
  }

  if (password.length < 6) {
    return { success: false, error: "Password must be at least 6 characters long." }
  }

  const normalizedEmail = email.toLowerCase().trim()

  try {
    // 1. Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail }
    })

    if (existingUser) {
      return { success: false, error: "An account with this email address already exists." }
    }

    // 2. Hash Password
    const hashedPassword = await bcrypt.hash(password, 10)

    // 3. Create User in Database
    const newUser = await prisma.user.create({
      data: {
        name,
        email: normalizedEmail,
        password: hashedPassword,
        role: 'USER' // default role
      }
    })

    // 4. Send Welcome Email via Nodemailer/Gmail
    try {
      await sendMail({
        to: normalizedEmail,
        subject: `Welcome to Yashobhagya Enterprises, ${name}!`,
        html: buildWelcomeEmail({ name, email: normalizedEmail })
      })
      console.log(`Welcome email sent to ${normalizedEmail}`)
    } catch (emailErr) {
      console.error("Welcome email delivery failed:", emailErr)
      // Non-fatal — registration still succeeds even if email fails
    }

    return {
      success: true,
      message: "Registration successful! You can now log in to your account.",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
      }
    }
  } catch (error: any) {
    console.error("Server Action Register Error:", error)
    return { success: false, error: error.message || "Failed to create account. Please try again." }
  }
}
