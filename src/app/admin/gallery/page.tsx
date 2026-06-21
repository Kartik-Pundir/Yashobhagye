import { prisma } from '@/lib/prisma'
import GalleryManagerClient from '@/components/GalleryManagerClient'

export default async function AdminGalleryPage() {
  let images = []

  try {
    images = await prisma.galleryImage.findMany({
      orderBy: { order: 'asc' }
    })
  } catch (error) {
    console.error("Failed to query database gallery images in admin page, using fallbacks:", error)
    
    // Safety Fallback list
    images = [
      { id: "gi-1", url: "/images/firewood-mix.jpg", order: 0 },
      { id: "gi-2", url: "/images/mustard-briquettes.png", order: 1 },
      { id: "gi-3", url: "/images/sawdust-briquettes-v2.jpg", order: 2 },
      { id: "gi-4", url: "/images/bagasse-briquettes.jpg", order: 3 },
      { id: "gi-5", url: "/images/black-salt.jpg", order: 4 },
      { id: "gi-6", url: "/images/rock-salt.jpg", order: 5 },
      { id: "gi-7", url: "/images/suzi-salt-v3.jpg", order: 6 },
      { id: "gi-8", url: "/images/industrial-salt-v2.jpg", order: 7 },
      { id: "gi-9", url: "/images/firewood-poppler-v2.jpg", order: 8 },
      { id: "gi-10", url: "/images/firewood-liptis-v2.jpg", order: 9 },
      { id: "gi-11", url: "/images/firewood-babul-v2.jpg", order: 10 },
      { id: "gi-12", url: "/images/firewood-sisam-v2.jpg", order: 11 },
    ]
  }

  return (
    <div className="space-y-6">
      <GalleryManagerClient initialImages={images} />
    </div>
  )
}
