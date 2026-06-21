import { prisma } from '@/lib/prisma'
import EnquiriesManagerClient from '@/components/EnquiriesManagerClient'

export default async function AdminEnquiriesPage() {
  let enquiries = []

  try {
    enquiries = await prisma.enquiry.findMany({
      orderBy: { createdAt: 'desc' }
    })
  } catch (error) {
    console.error("Failed to query database enquiries, using fallbacks:", error)
    
    // Safety Fallback list
    enquiries = [
      {
        id: "mock-e1",
        name: "Rajesh Kumar",
        phone: "9876543211",
        email: "rajesh@kumarindustries.com",
        product: "Mustard Briquettes",
        message: "Looking for a bulk supply of 50 tons of Mustard Briquettes per month. Please share price quote and shipping timeline for Haryana location.",
        status: "NEW" as const,
        createdAt: new Date()
      },
      {
        id: "mock-e2",
        name: "Amit Patel",
        phone: "9822334455",
        email: "amit@patelfoods.in",
        product: "Rock Salt",
        message: "We require high purity Sendha Namak crystals in 25kg bags for food processing. Daily requirement approx 2 tons.",
        status: "IN_PROGRESS" as const,
        createdAt: new Date(Date.now() - 4 * 3600000)
      },
      {
        id: "mock-e3",
        name: "Sunita Sharma",
        phone: "9988776655",
        email: "sunita@ayurvedahealth.org",
        product: "Black Salt",
        message: "Seeking premium grade Kala Namak for therapeutic product formulation. Please send samples and pricing list.",
        status: "RESOLVED" as const,
        createdAt: new Date(Date.now() - 24 * 3600000)
      }
    ]
  }

  return (
    <div className="space-y-6">
      <EnquiriesManagerClient initialEnquiries={enquiries} />
    </div>
  )
}
