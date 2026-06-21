import { prisma } from '@/lib/prisma'
import UsersManagerClient from '@/components/UsersManagerClient'

export default async function AdminUsersPage() {
  let users = []

  try {
    users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' }
    })
  } catch (error) {
    console.error("Failed to query database users in admin page, using fallbacks:", error)
    
    // Safety Fallback list
    users = [
      {
        id: "mock-u1",
        name: "Admin Yashobhagya",
        email: "admin@yashobhagya.com",
        role: "ADMIN" as const,
        createdAt: new Date()
      },
      {
        id: "mock-u2",
        name: "SubAdmin Yashobhagya",
        email: "subadmin@yashobhagya.com",
        role: "SUB_ADMIN" as const,
        createdAt: new Date()
      },
      {
        id: "mock-u3",
        name: "Client Buyer",
        email: "client@factory.com",
        role: "USER" as const,
        createdAt: new Date(Date.now() - 48 * 3600000)
      }
    ]
  }

  return (
    <div className="space-y-6">
      <UsersManagerClient initialUsers={users} />
    </div>
  )
}
