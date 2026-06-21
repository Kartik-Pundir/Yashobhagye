'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Plus, Trash2, ArrowLeft, ArrowRight, X, Sparkles } from 'lucide-react'
import { addGalleryImage, deleteGalleryImage, reorderGalleryImages } from '@/app/actions/admin'

interface GalleryImage {
  id: string
  url: string
  order: number
}

interface GalleryManagerClientProps {
  initialImages: GalleryImage[]
}

export default function GalleryManagerClient({ initialImages }: GalleryManagerClientProps) {
  const [images, setImages] = useState<GalleryImage[]>(
    [...initialImages].sort((a, b) => a.order - b.order)
  )
  const [newUrl, setNewUrl] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleAddImage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newUrl.trim()) return

    setIsSubmitting(true)
    setError('')

    try {
      const res = await addGalleryImage(newUrl)
      if (res.success && res.image) {
        setImages(prev => [...prev, (res.image as any)].sort((a, b) => a.order - b.order))
        setNewUrl('')
      } else {
        setError(res.error || "Failed to add image")
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this image?")) return

    try {
      const res = await deleteGalleryImage(id)
      if (res.success) {
        setImages(prev => prev.filter(img => img.id !== id))
      } else {
        alert(res.error || "Failed to delete image")
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleMove = async (index: number, direction: 'left' | 'right') => {
    const newIndex = direction === 'left' ? index - 1 : index + 1
    if (newIndex < 0 || newIndex >= images.length) return

    const reorderedList = [...images]
    // Swap items in memory
    const temp = reorderedList[index]
    reorderedList[index] = reorderedList[newIndex]
    reorderedList[newIndex] = temp

    // Update order values
    const payload = reorderedList.map((img, idx) => ({
      id: img.id,
      order: idx
    }))

    // Optimistic Update
    setImages(reorderedList.map((img, idx) => ({ ...img, order: idx })))

    try {
      const res = await reorderGalleryImages(payload)
      if (!res.success) {
        // Rollback
        setImages(images)
        alert(res.error || "Failed to save image order changes")
      }
    } catch (err) {
      console.error(err)
      setImages(images)
    }
  }

  const loadUnsplashPreset = () => {
    const index = Math.floor(Math.random() * 10) + 100
    setNewUrl(`https://images.unsplash.com/photo-${1500000000000 + index * 1000000}?auto=format&fit=crop&q=80&w=800`)
  }

  return (
    <div className="space-y-8">
      {/* Header and Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Upload Form */}
        <div className="lg:col-span-4 bg-white p-6 rounded-xl border border-gray-100 shadow-sm bg-grain space-y-4">
          <div>
            <h3 className="font-serif text-lg font-bold text-[#1A3C2E]">Add Media Image</h3>
            <p className="text-xs text-gray-500 font-sans mt-0.5">Upload new images to the client gallery.</p>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs font-medium text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleAddImage} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Image URL</label>
              <input
                type="text"
                required
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full bg-[#F9F6F0] rounded-lg px-3 py-2 text-xs border border-gray-200 focus:outline-none focus:border-[#1A3C2E] focus:ring-1 focus:ring-[#1A3C2E]"
              />
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                disabled={isSubmitting || !newUrl.trim()}
                className="flex-grow flex items-center justify-center gap-1.5 px-3 py-2.5 bg-[#1A3C2E] hover:bg-[#28503e] text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition disabled:bg-gray-300"
              >
                <Plus size={14} />
                Save Image
              </button>
              
              <button
                type="button"
                onClick={loadUnsplashPreset}
                title="Generate Unsplash Industrial URL preset"
                className="px-3 py-2.5 border border-gray-200 hover:border-[#C4862A] text-gray-500 hover:text-[#C4862A] rounded-lg text-xs transition inline-flex items-center"
              >
                <Sparkles size={14} />
              </button>
            </div>
          </form>
        </div>

        {/* Gallery Grid Reordering */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm bg-grain">
            <h3 className="font-serif text-lg font-bold text-[#1A3C2E]">Arrange Image Grid Order</h3>
            <p className="text-xs text-gray-500 font-sans mt-0.5">Use left/right arrows to shift order. First image displays top-left in the client masonry.</p>
          </div>

          {images.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-200">
              <p className="text-gray-500 text-xs">No gallery images uploaded yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {images.map((img, idx) => (
                <div
                  key={img.id}
                  className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm flex flex-col bg-grain group"
                >
                  {/* Image Frame */}
                  <div className="relative h-36 w-full">
                    <Image
                      src={img.url}
                      alt={`Gallery slot ${img.order}`}
                      fill
                      className="object-cover"
                    />
                    <button
                      onClick={() => handleDelete(img.id)}
                      className="absolute top-2 right-2 p-1.5 bg-red-600/80 hover:bg-red-600 rounded-full text-white backdrop-blur-sm transition border border-red-500"
                    >
                      <Trash2 size={12} />
                    </button>
                    <div className="absolute bottom-2 left-2 px-1.5 py-0.5 bg-black/60 rounded text-[9px] font-bold text-white uppercase tracking-wider">
                      Pos {idx + 1}
                    </div>
                  </div>

                  {/* Ordering Controls */}
                  <div className="p-2 bg-gray-50 border-t border-gray-100 flex items-center justify-between gap-1">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => handleMove(idx, 'left')}
                      className="p-1 rounded text-gray-500 hover:bg-gray-200 hover:text-black transition disabled:opacity-30 disabled:hover:bg-transparent"
                    >
                      <ArrowLeft size={14} />
                    </button>
                    <span className="text-[10px] font-bold text-gray-400">Order: {img.order}</span>
                    <button
                      type="button"
                      disabled={idx === images.length - 1}
                      onClick={() => handleMove(idx, 'right')}
                      className="p-1 rounded text-gray-500 hover:bg-gray-200 hover:text-black transition disabled:opacity-30 disabled:hover:bg-transparent"
                    >
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
