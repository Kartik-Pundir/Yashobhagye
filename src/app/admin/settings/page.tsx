import { prisma } from '@/lib/prisma'
import SettingsManagerClient from '@/components/SettingsManagerClient'

export default async function AdminSettingsPage() {
  let settings = null

  try {
    settings = await prisma.siteSetting.findUnique({
      where: { id: 'default' }
    })
  } catch (error) {
    console.error("Failed to query database settings in admin page, using default settings fallbacks:", error)
  }

  if (!settings) {
    settings = {
      id: 'default',
      whatsappNumber: '918191850001',
      contactEmail: 'info@yashobhagya.com',
      contactPhone: '+91 81918 50001',
      address: 'Yashobhagya Enterprises, Roorkee, Uttarakhand, India - 247667',
      updatedAt: new Date()
    }
  }

  return (
    <div className="space-y-6">
      <SettingsManagerClient initialSettings={settings} />
    </div>
  )
}
