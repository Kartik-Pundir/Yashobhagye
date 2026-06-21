'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'

interface GalleryImage {
  id: string
  url: string
  order: number
}

interface GalleryClientProps {
  images: GalleryImage[]
}

export default function GalleryClient({ images }: GalleryClientProps) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null)

  const openLightbox = (index: number) => {
    setActiveIdx(index)
  }

  const closeLightbox = () => {
    setActiveIdx(null)
  }

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    if (activeIdx === null) return
    setActiveIdx((activeIdx + 1) % images.length)
  }

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    if (activeIdx === null) return
    setActiveIdx((activeIdx - 1 + images.length) % images.length)
  }

  return (
    <div className="space-y-12">
      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((img, idx) => (
          <div
            key={img.id}
            onClick={() => openLightbox(idx)}
            className="relative h-72 rounded-xl overflow-hidden group cursor-pointer border border-gray-200/50 hover:shadow-lg transition-all duration-300 shadow-sm"
          >
            <Image
              src={img.url}
              alt={`Yashobhagya facility image ${idx + 1}`}
              fill
              className="object-cover group-hover:scale-103 transition duration-500 filter brightness-95 group-hover:brightness-100"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 transform scale-90 group-hover:scale-100 transition duration-300">
                <Maximize2 size={18} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Lightbox */}
      <AnimatePresence>
        {activeIdx !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4">
            {/* Backdrop click to close */}
            <div className="absolute inset-0 cursor-zoom-out" onClick={closeLightbox} />

            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-10 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition"
            >
              <X size={28} />
            </button>

            {/* Left Control */}
            <button
              onClick={prevImage}
              className="absolute left-6 z-10 text-white/70 hover:text-white p-3 border border-white/10 rounded-full hover:bg-white/5 transition"
            >
              <ChevronLeft size={28} />
            </button>

            {/* Image Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl w-full h-[70vh] sm:h-[80vh] z-10"
            >
              <Image
                src={images[activeIdx].url}
                alt={`Yashobhagya lightbox image ${activeIdx + 1}`}
                fill
                className="object-contain"
                priority
              />
            </motion.div>

            {/* Right Control */}
            <button
              onClick={nextImage}
              className="absolute right-6 z-10 text-white/70 hover:text-white p-3 border border-white/10 rounded-full hover:bg-white/5 transition"
            >
              <ChevronRight size={28} />
            </button>

            {/* Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-xs tracking-wider uppercase font-semibold">
              Image {activeIdx + 1} of {images.length}
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
