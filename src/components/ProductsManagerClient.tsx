'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Plus, Edit2, Trash2, Eye, EyeOff, X } from 'lucide-react'
import { createProduct, updateProduct, deleteProduct } from '@/app/actions/admin'

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

interface ProductsManagerClientProps {
  initialProducts: Product[]
}

export default function ProductsManagerClient({ initialProducts }: ProductsManagerClientProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  
  // Modal & Form States
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('Briquettes')
  const [useCases, setUseCases] = useState('')
  const [image, setImage] = useState('')
  const [active, setActive] = useState(true)
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const openAddModal = () => {
    setEditingProduct(null)
    setName('')
    setDescription('')
    setCategory('Briquettes')
    setUseCases('Boilers, Furnaces')
    setImage('https://images.unsplash.com/photo-1588880593970-dfd726d9ee14?auto=format&fit=crop&q=80&w=800')
    setActive(true)
    setIsModalOpen(true)
    setError('')
  }

  const openEditModal = (product: Product) => {
    setEditingProduct(product)
    setName(product.name)
    setDescription(product.description)
    setCategory(product.category)
    setUseCases(product.useCases.join(', '))
    setImage(product.image)
    setActive(product.active)
    setIsModalOpen(true)
    setError('')
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingProduct(null)
    setError('')
  }

  const handleActiveToggle = async (product: Product) => {
    const newActive = !product.active
    // Optimistic update
    setProducts(prev => prev.map(p => p.id === product.id ? { ...p, active: newActive } : p))
    
    try {
      const res = await updateProduct(product.id, { active: newActive })
      if (!res.success) {
        // Rollback
        setProducts(prev => prev.map(p => p.id === product.id ? { ...p, active: product.active } : p))
        alert(res.error || "Failed to update product state")
      }
    } catch (err) {
      console.error(err)
      // Rollback
      setProducts(prev => prev.map(p => p.id === product.id ? { ...p, active: product.active } : p))
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product? This will remove it from the database.")) return
    
    try {
      const res = await deleteProduct(id)
      if (res.success) {
        setProducts(prev => prev.filter(p => p.id !== id))
      } else {
        alert(res.error || "Failed to delete product")
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    const parsedUseCases = useCases.split(',').map(s => s.trim()).filter(s => s.length > 0)
    const productData = {
      name,
      description,
      category,
      useCases: parsedUseCases,
      image,
      active
    }

    try {
      if (editingProduct) {
        // UPDATE
        const res = await updateProduct(editingProduct.id, productData)
        if (res.success && res.product) {
          setProducts(prev => prev.map(p => p.id === editingProduct.id ? (res.product as any) : p))
          closeModal()
        } else {
          setError(res.error || "Failed to update product")
        }
      } else {
        // CREATE
        const res = await createProduct(productData)
        if (res.success && res.product) {
          setProducts(prev => [...prev, (res.product as any)])
          closeModal()
        } else {
          setError(res.error || "Failed to create product")
        }
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-xl border border-gray-100 shadow-sm bg-grain">
        <div>
          <h2 className="font-serif text-xl font-bold text-[#1A3C2E]">Products Directory</h2>
          <p className="text-xs text-gray-500 font-sans mt-0.5">Add, edit, or toggle visibility of catalog items shown on the website.</p>
        </div>

        <div>
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#1A3C2E] hover:bg-[#28503e] text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition shadow-sm font-title"
          >
            <Plus size={16} />
            Add New Product
          </button>
        </div>
      </div>

      {/* Grid of Products */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className={`bg-white rounded-xl border p-5 flex flex-col gap-4 shadow-sm hover:shadow-md transition bg-grain ${
              !product.active ? 'opacity-70 border-dashed border-gray-300' : 'border-gray-100/80'
            }`}
          >
            {/* Image Thumbnail */}
            <div className="relative h-44 w-full rounded-lg overflow-hidden bg-gray-100">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
              <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/60 rounded text-[9px] text-[#E8D5B0] font-bold uppercase tracking-wider">
                {product.category}
              </div>
              <button
                onClick={() => handleActiveToggle(product)}
                className={`absolute top-2 right-2 p-1.5 rounded-full backdrop-blur-sm transition border ${
                  product.active
                    ? 'bg-green-500/80 text-white border-green-400'
                    : 'bg-gray-500/80 text-white border-gray-400'
                }`}
                title={product.active ? 'Hide from website' : 'Show on website'}
              >
                {product.active ? <Eye size={12} /> : <EyeOff size={12} />}
              </button>
            </div>

            {/* Details */}
            <div className="space-y-2 flex-grow">
              <h3 className="font-serif text-base font-bold text-gray-800 flex items-center justify-between gap-2">
                <span>{product.name}</span>
                {!product.active && <span className="text-[9px] font-bold font-sans tracking-wide uppercase px-1.5 py-0.5 bg-gray-100 rounded text-gray-400">Hidden</span>}
              </h3>
              <p className="text-[11px] text-gray-500 font-sans leading-relaxed line-clamp-3">
                {product.description}
              </p>
            </div>

            {/* Actions */}
            <div className="border-t border-gray-100 pt-3 flex gap-2 justify-end">
              <button
                onClick={() => openEditModal(product)}
                className="flex items-center gap-1 px-3 py-1.5 border border-gray-200 hover:border-[#C4862A] hover:text-[#C4862A] rounded-md text-xs font-semibold uppercase tracking-wider text-gray-600 transition"
              >
                <Edit2 size={12} />
                Edit
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="flex items-center gap-1 px-3 py-1.5 border border-gray-200 hover:border-red-500 hover:text-red-500 rounded-md text-xs font-semibold uppercase tracking-wider text-gray-600 transition"
              >
                <Trash2 size={12} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeModal} />

          <div className="relative bg-white w-full max-w-lg rounded-xl overflow-hidden shadow-2xl border border-gray-200 bg-grain z-10 flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="bg-[#1A3C2E] p-5 flex items-center justify-between border-b border-[#E8D5B0]/20 text-white">
              <h3 className="font-serif text-lg font-bold text-[#E8D5B0]">
                {editingProduct ? 'Edit Catalogue Item' : 'Add Catalogue Item'}
              </h3>
              <button
                onClick={closeModal}
                className="text-white/60 hover:text-white p-1 rounded-full transition hover:bg-white/10"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form content */}
            <form onSubmit={handleFormSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs font-medium text-red-700">
                  {error}
                </div>
              )}

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Product Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Mustard Briquettes"
                  className="w-full bg-[#F9F6F0] rounded-lg px-4 py-2.5 text-xs border border-gray-200 focus:outline-none focus:border-[#1A3C2E] focus:ring-1 focus:ring-[#1A3C2E]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Category *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-[#F9F6F0] rounded-lg px-4 py-2.5 text-xs border border-gray-200 focus:outline-none focus:border-[#1A3C2E] focus:ring-1 focus:ring-[#1A3C2E] cursor-pointer"
                  >
                    <option value="Firewood">Firewood</option>
                    <option value="Briquettes">Briquettes</option>
                    <option value="Salts">Salts</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Initial State *</label>
                  <select
                    value={active ? 'active' : 'hidden'}
                    onChange={(e) => setActive(e.target.value === 'active')}
                    className="w-full bg-[#F9F6F0] rounded-lg px-4 py-2.5 text-xs border border-gray-200 focus:outline-none focus:border-[#1A3C2E] focus:ring-1 focus:ring-[#1A3C2E] cursor-pointer"
                  >
                    <option value="active">Active (Visible)</option>
                    <option value="hidden">Inactive (Hidden)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Image Source URL *</label>
                <input
                  type="text"
                  required
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-[#F9F6F0] rounded-lg px-4 py-2.5 text-xs border border-gray-200 focus:outline-none focus:border-[#1A3C2E] focus:ring-1 focus:ring-[#1A3C2E]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Use Cases (Comma-separated) *</label>
                <input
                  type="text"
                  required
                  value={useCases}
                  onChange={(e) => setUseCases(e.target.value)}
                  placeholder="Boilers, furnaces, heating, seasoning"
                  className="w-full bg-[#F9F6F0] rounded-lg px-4 py-2.5 text-xs border border-gray-200 focus:outline-none focus:border-[#1A3C2E] focus:ring-1 focus:ring-[#1A3C2E]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Catalogue Description *</label>
                <textarea
                  required
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detailed specifications, weight, density and raw material sources..."
                  className="w-full bg-[#F9F6F0] rounded-lg px-4 py-2.5 text-xs border border-gray-200 focus:outline-none focus:border-[#1A3C2E] focus:ring-1 focus:ring-[#1A3C2E]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary py-3 text-xs uppercase tracking-wider font-bold"
                >
                  {isSubmitting
                    ? 'Processing database write...'
                    : editingProduct
                      ? 'Save Product Details'
                      : 'Add Product to Catalogue'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
