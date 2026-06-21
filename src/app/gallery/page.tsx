import { prisma } from '@/lib/prisma'
import GalleryClient from '@/components/GalleryClient'

const FALLBACK_IMAGES = [
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

export default async function GalleryPage() {
  let images: any[] = []

  try {
    images = await prisma.galleryImage.findMany({
      orderBy: { order: 'asc' }
    })
  } catch (error) {
    console.error("Failed to query database gallery images, using fallbacks:", error)
  }

  if (images.length === 0) {
    images = FALLBACK_IMAGES
  }

  return (
    <div className="relative flex flex-col w-full bg-[#F9F6F0] min-h-screen pt-24">
      {/* Page Header */}
      <section className="relative py-20 bg-[#1A3C2E] text-white overflow-hidden bg-grain">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#C4862A_1px,transparent_1px)] [background-size:24px_24px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#E8D5B0] font-title px-3 py-1 rounded-full bg-white/5 border border-white/10">
            Visual Portfolio
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#E8D5B0]">Media Gallery</h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-white/75 font-sans leading-relaxed">
            Take a look at our production processing lines, seasoning yards, warehouse depots, and heavy logistics operations.
          </p>
        </div>
      </section>

      {/* Masonry Layout */}
      <section className="py-20 z-10 bg-white bg-grain">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GalleryClient images={images} />
        </div>
      </section>
    </div>
  )
}
