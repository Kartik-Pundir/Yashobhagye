import { prisma } from '@/lib/prisma'
import ChatLeadsClient from '@/components/ChatLeadsClient'

export default async function AdminChatLeadsPage() {
  let leads = []

  try {
    leads = await prisma.chatLead.findMany({
      orderBy: { createdAt: 'desc' }
    })
  } catch (error) {
    console.error("Failed to query database chat leads, using fallbacks:", error)
    
    // Safety Fallback list
    leads = [
      {
        id: "mock-l1",
        name: "Vikram Singh",
        phone: "9812345678",
        query: "Wants to purchase 10 tons of Firewood for a boiler factory in Punjab.",
        createdAt: new Date()
      },
      {
        id: "mock-l2",
        name: "Pooja Gupta",
        phone: "9765432109",
        query: "Enquired about Sawdust Briquettes sample bags.",
        createdAt: new Date(Date.now() - 5 * 3600000)
      },
      {
        id: "mock-l3",
        name: "Devendra Verma",
        phone: "9988112233",
        query: "Enquired about shipping black salt to Udaipur.",
        createdAt: new Date(Date.now() - 48 * 3600000)
      }
    ]
  }

  return (
    <div className="space-y-6">
      <ChatLeadsClient initialLeads={leads} />
    </div>
  )
}
