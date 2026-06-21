'use server'

import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'
import { Role, EnquiryStatus } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import bcrypt from 'bcryptjs'

// Helper to assert admin / sub-admin session permission
async function assertAdmin() {
  const session = await auth()
  const role = (session?.user as any)?.role
  if (!session || (role !== Role.ADMIN && role !== Role.SUB_ADMIN)) {
    throw new Error("Access Denied: Unauthorized administrative attempt.")
  }
  return session
}

// Helper to assert STRICT Admin permission (some actions like User management require pure ADMIN role)
async function assertStrictAdmin() {
  const session = await auth()
  const role = (session?.user as any)?.role
  if (!session || role !== Role.ADMIN) {
    throw new Error("Access Denied: Strict Administrator clearance required.")
  }
  return session
}

// ==========================================
// 1. ENQUIRIES MANAGEMENT
// ==========================================
export async function updateEnquiryStatus(id: string, status: EnquiryStatus) {
  await assertAdmin()
  try {
    const updated = await prisma.enquiry.update({
      where: { id },
      data: { status }
    })
    revalidatePath('/admin')
    revalidatePath('/admin/enquiries')
    return { success: true, enquiry: updated }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function deleteEnquiry(id: string) {
  await assertAdmin()
  try {
    await prisma.enquiry.delete({
      where: { id }
    })
    revalidatePath('/admin')
    revalidatePath('/admin/enquiries')
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

// ==========================================
// 2. CHAT LEADS MANAGEMENT
// ==========================================
export async function deleteChatLead(id: string) {
  await assertAdmin()
  try {
    await prisma.chatLead.delete({
      where: { id }
    })
    revalidatePath('/admin')
    revalidatePath('/admin/chat-leads')
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

// ==========================================
// 3. PRODUCTS MANAGEMENT
// ==========================================
interface ProductInput {
  name: string
  description: string
  category: string
  useCases: string[]
  image: string
  active: boolean
}

export async function createProduct(data: ProductInput) {
  await assertAdmin()
  try {
    const slug = data.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-')
    const product = await prisma.product.create({
      data: {
        name: data.name,
        slug,
        description: data.description,
        category: data.category,
        useCases: data.useCases,
        image: data.image,
        active: data.active
      }
    })
    revalidatePath('/products')
    revalidatePath('/admin/products')
    return { success: true, product }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function updateProduct(id: string, data: Partial<ProductInput>) {
  await assertAdmin()
  try {
    let slug;
    if (data.name) {
      slug = data.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-')
    }
    const product = await prisma.product.update({
      where: { id },
      data: {
        ...data,
        ...(slug ? { slug } : {})
      }
    })
    revalidatePath('/products')
    revalidatePath('/admin/products')
    return { success: true, product }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function deleteProduct(id: string) {
  await assertAdmin()
  try {
    await prisma.product.delete({
      where: { id }
    })
    revalidatePath('/products')
    revalidatePath('/admin/products')
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

// ==========================================
// 4. GALLERY IMAGES MANAGEMENT
// ==========================================
export async function addGalleryImage(url: string) {
  await assertAdmin()
  try {
    const maxOrder = await prisma.galleryImage.aggregate({
      _max: { order: true }
    })
    const order = (maxOrder._max.order ?? -1) + 1
    const img = await prisma.galleryImage.create({
      data: { url, order }
    })
    revalidatePath('/gallery')
    revalidatePath('/admin/gallery')
    return { success: true, image: img }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function deleteGalleryImage(id: string) {
  await assertAdmin()
  try {
    await prisma.galleryImage.delete({
      where: { id }
    })
    revalidatePath('/gallery')
    revalidatePath('/admin/gallery')
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function reorderGalleryImages(reordered: { id: string, order: number }[]) {
  await assertAdmin()
  try {
    // Transaction to update all orders
    await prisma.$transaction(
      reordered.map(item =>
        prisma.galleryImage.update({
          where: { id: item.id },
          data: { order: item.order }
        })
      )
    )
    revalidatePath('/gallery')
    revalidatePath('/admin/gallery')
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

// ==========================================
// 5. USER MANAGEMENT (Strictly Admin only)
// ==========================================
export async function updateUserRole(userId: string, role: Role) {
  await assertStrictAdmin()
  try {
    const updated = await prisma.user.update({
      where: { id: userId },
      data: { role }
    })
    revalidatePath('/admin/users')
    return { success: true, user: updated }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function deleteUser(userId: string) {
  await assertStrictAdmin()
  try {
    await prisma.user.delete({
      where: { id: userId }
    })
    revalidatePath('/admin/users')
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function inviteAdminEmail(email: string, role: Role) {
  await assertStrictAdmin()
  try {
    // Mock user creation for administrative invite
    // We create a user with a random temp password that they must change,
    // or just pre-create the user so they can log in or register with that email.
    const tempPassword = Math.random().toString(36).substring(2, 10)
    const hashed = await bcrypt.hash(tempPassword, 10)
    const invitedUser = await prisma.user.create({
      data: {
        email: email.toLowerCase().trim(),
        name: `Invited ${role.toLowerCase()}`,
        password: hashed,
        role: role
      }
    })
    
    // In production, send email containing credentials via Resend.
    // For now, log temp credentials.
    console.log(`INVITE SUCCESSFUL: Invited ${role} email: ${email}. Temp Password: ${tempPassword}`)
    revalidatePath('/admin/users')
    return { success: true, tempPassword, user: invitedUser }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

// ==========================================
// 6. SITE SETTINGS MANAGEMENT
// ==========================================
interface SettingsInput {
  whatsappNumber: string
  contactEmail: string
  contactPhone: string
  address: string
}

export async function updateSiteSettings(data: SettingsInput) {
  await assertAdmin()
  try {
    const settings = await prisma.siteSetting.upsert({
      where: { id: 'default' },
      update: data,
      create: {
        id: 'default',
        ...data
      }
    })
    revalidatePath('/')
    revalidatePath('/contact')
    revalidatePath('/admin/settings')
    return { success: true, settings }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}
