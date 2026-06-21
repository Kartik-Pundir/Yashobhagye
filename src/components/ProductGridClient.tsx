'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ClipboardCheck, Sparkles, X, MessageSquare, PhoneCall } from 'lucide-react'
import confetti from 'canvas-confetti'
import { submitQuoteRequest } from '@/app/actions/enquiry'

interface Product {
  id: string
  name: string
  slug: string
  description: string
  category: string
  useCases: string[]
  image: string
  active: boolean
}

interface ProductGridClientProps {
  products: Product[]
}

export default function ProductGridClient({ products }: ProductGridClientProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentCategory = searchParams.get('category') || 'All'

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  
  // Form State
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' })

  const categories = ['All', 'Firewood', 'Briquettes', 'Salts']

  const handleFilterClick = (cat: string) => {
    if (cat === 'All') {
      router.push('/products')
    } else {
      router.push(`/products?category=${cat}`)
    }
  }

  const openQuoteModal = (product: Product) => {
    setSelectedProduct(product)
    setMessage(`Hello, I would like to request a bulk quote for ${product.name}. Please share availability and current pricing for our requirements.`)
    setIsModalOpen(true)
    setStatusMsg({ type: '', text: '' })
  }

  const closeQuoteModal = () => {
    setIsModalOpen(false)
    setSelectedProduct(null)
    setName('')
    setPhone('')
    setEmail('')
    setMessage('')
    setStatusMsg({ type: '', text: '' })
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedProduct) return

    setIsSubmitting(true)
    setStatusMsg({ type: '', text: '' })

    try {
      const res = await submitQuoteRequest({
        name,
        phone,
        email,
        product: selectedProduct.name,
        message
      })

      if (res.success) {
        setStatusMsg({ type: 'success', text: res.message || 'Submitted successfully!' })
        // Confetti explosion
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        })
        setTimeout(() => {
          closeQuoteModal()
        }, 3000)
      } else {
        setStatusMsg({ type: 'error', text: res.error || 'Something went wrong.' })
      }
    } catch (err: any) {
      setStatusMsg({ type: 'error', text: err.message || 'An unexpected error occurred.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-12">
      {/* Category Tabs */}
      <div className="flex justify-center flex-wrap gap-2.5">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleFilterClick(cat)}
            className={`px-5 py-2.5 rounded-lg text-sm font-title font-medium transition duration-200 shadow-sm border ${
              currentCategory === cat
                ? 'bg-[#1A3C2E] border-[#1A3C2E] text-white'
                : 'bg-white border-gray-200 text-[#2D2D2D] hover:border-[#E8D5B0] hover:bg-gray-50'
            }`}
          >
            {cat === 'All' ? 'All Products' : cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-200">
          <p className="text-gray-500 text-sm">No products found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <motion.div
              key={product.id}
              layout
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100/80 hover:shadow-md transition-shadow duration-300 flex flex-col group relative bg-grain"
            >
              {/* Image Frame */}
              <div className="relative h-60 w-full overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-102 transition duration-500"
                />
                <div className="absolute top-3 right-3 bg-[#1A3C2E]/80 backdrop-blur-sm px-2.5 py-1 rounded text-[10px] font-semibold text-[#E8D5B0] uppercase tracking-wider">
                  {product.category}
                </div>
              </div>

              {/* Card Details */}
              <div className="p-6 flex flex-col flex-grow space-y-4">
                <h3 className="font-serif text-xl font-bold text-[#1A3C2E]">
                  {product.name}
                </h3>
                <p className="text-xs text-gray-500 font-sans leading-relaxed flex-grow">
                  {product.description}
                </p>

                {/* Use Cases */}
                <div>
                  <h4 className="text-[10px] uppercase font-bold tracking-wider text-[#C4862A] font-title mb-2">
                    Primary Use Cases:
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {product.useCases.map((use, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-[#F9F6F0] rounded text-[10px] font-medium text-gray-600 border border-gray-100"
                      >
                        {use}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Request Button */}
                <div className="pt-2">
                  <button
                    onClick={() => openQuoteModal(product)}
                    className="w-full btn-outline text-xs uppercase tracking-wider font-bold py-3 hover:bg-[#1A3C2E]"
                  >
                    Request a Quote
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Request Quote Modal */}
      <AnimatePresence>
        {isModalOpen && selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeQuoteModal}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white w-full max-w-lg rounded-xl overflow-hidden shadow-2xl border border-gray-200 bg-grain z-10 flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="bg-[#1A3C2E] p-5 flex items-center justify-between border-b border-[#E8D5B0]/20 text-white">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#E8D5B0]">Request Bulk Quotation</h3>
                  <p className="text-xs text-white/60 font-sans mt-1">Product: {selectedProduct.name}</p>
                </div>
                <button
                  onClick={closeQuoteModal}
                  className="text-white/60 hover:text-white p-1 rounded-full transition hover:bg-white/10"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Form Content */}
              <form onSubmit={handleFormSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
                {statusMsg.text && (
                  <div
                    className={`p-3.5 rounded-lg text-sm font-medium ${
                      statusMsg.type === 'success'
                        ? 'bg-green-50 text-green-700 border border-green-200'
                        : 'bg-red-50 text-red-700 border border-red-200'
                    }`}
                  >
                    {statusMsg.text}
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter full name"
                    className="w-full bg-[#F9F6F0] rounded-lg px-4 py-2.5 text-sm border border-gray-200 focus:outline-none focus:border-[#1A3C2E] focus:ring-1 focus:ring-[#1A3C2E]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full bg-[#F9F6F0] rounded-lg px-4 py-2.5 text-sm border border-gray-200 focus:outline-none focus:border-[#1A3C2E] focus:ring-1 focus:ring-[#1A3C2E]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. buyer@factory.com"
                      className="w-full bg-[#F9F6F0] rounded-lg px-4 py-2.5 text-sm border border-gray-200 focus:outline-none focus:border-[#1A3C2E] focus:ring-1 focus:ring-[#1A3C2E]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Quote Requirements / Message *</label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-[#F9F6F0] rounded-lg px-4 py-2.5 text-sm border border-gray-200 focus:outline-none focus:border-[#1A3C2E] focus:ring-1 focus:ring-[#1A3C2E]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary uppercase tracking-wider font-bold py-3.5"
                  >
                    {isSubmitting ? 'Submitting Details...' : 'Submit Quote Request'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
