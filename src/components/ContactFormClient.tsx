'use client'

import { useState } from 'react'
import { Send, CheckCircle, AlertCircle, Mail, Phone, MapPin, Clock, FileText, CheckCircle2, ChevronRight } from 'lucide-react'
import { submitQuoteRequest } from '@/app/actions/enquiry'
import confetti from 'canvas-confetti'

export default function ContactFormClient() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [product, setProduct] = useState('General Enquiry')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<{ type: 'success' | 'error' | '', text: string }>({ type: '', text: '' })
  const [submittedData, setSubmittedData] = useState<{
    name: string
    email: string
    phone: string
    product: string
    message: string
  } | null>(null)

  const productsList = [
    'General Enquiry',
    'All Varieties of Firewood',
    'Mustard Briquettes',
    'Sawdust Briquettes',
    'Bagasse Briquettes',
    'Black Salt (Kala Namak)',
    'Rock Salt (Sendha Namak)',
    'Suzi Salt',
    'Natural Mineral Salts'
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus({ type: '', text: '' })

    try {
      const res = await submitQuoteRequest({
        name,
        phone,
        email,
        product,
        message
      })

      if (res.success) {
        setSubmittedData({ name, email, phone, product, message })
        setStatus({ type: 'success', text: res.message || 'Thank you! Your submission has been recorded.' })
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.8 }
        })
        // Clear fields
        setName('')
        setPhone('')
        setEmail('')
        setProduct('General Enquiry')
        setMessage('')
      } else {
        setStatus({ type: 'error', text: res.error || 'Failed to submit the enquiry.' })
      }
    } catch (err: any) {
      setStatus({ type: 'error', text: err.message || 'An unexpected error occurred.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submittedData) {
    return (
      <div className="bg-white rounded-2xl border border-[#E8D5B0]/30 shadow-xl overflow-hidden bg-grain flex flex-col">
        {/* Email Header Card */}
        <div className="bg-[#1A3C2E] p-6 text-center space-y-2 border-b border-[#E8D5B0]/20 relative">
          <div className="absolute top-0 inset-x-0 h-1 bg-[#C4862A]" />
          <h4 className="font-serif text-lg tracking-wide font-bold text-[#E8D5B0]">YASHOBHAGYA ENTERPRISES</h4>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-white font-title text-[10px] font-semibold uppercase tracking-wider">
            <CheckCircle2 size={12} className="text-[#E8D5B0]" />
            Official Confirmation Receipt
          </span>
        </div>

        {/* Email Card Body */}
        <div className="p-6 sm:p-8 space-y-6 flex-grow font-sans text-sm text-gray-700">
          <div className="space-y-2">
            <h5 className="font-serif text-base font-bold text-[#1A3C2E]">Dear {submittedData.name},</h5>
            <p className="leading-relaxed">
              We have successfully received your product inquiry. A confirmation message has been dispatched to <strong className="text-[#1A3C2E]">{submittedData.email}</strong>. Below are the details of your inquiry:
            </p>
          </div>

          {/* Details Table Card */}
          <div className="bg-[#F9F6F0]/60 border border-gray-100/60 rounded-xl p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-3 border-b border-gray-200/30">
              <span className="text-xs text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1"><FileText size={12} /> Contact Number</span>
              <span className="font-medium text-[#1A3C2E]">{submittedData.phone}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-3 border-b border-gray-200/30">
              <span className="text-xs text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1"><FileText size={12} /> Product Interest</span>
              <span className="font-bold text-[#C4862A]">{submittedData.product}</span>
            </div>
            <div className="space-y-1.5">
              <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block">Inquiry Message</span>
              <p className="text-xs text-gray-600 bg-white rounded-lg p-3.5 border border-gray-100 italic leading-relaxed">
                "{submittedData.message}"
              </p>
            </div>
          </div>

          <p className="leading-relaxed">
            Our team coordinates logistics delivery routes (we deliver <strong className="text-[#1A3C2E]">PAN India</strong>) and bulk pricing contracts daily. A sales executive will contact you shortly to provide formal quotation parameters.
          </p>

          {/* Email Card Signature block */}
          <div className="border-t border-gray-100 pt-6 mt-6 space-y-4 text-xs text-gray-500">
            <div className="font-bold text-[#1A3C2E] text-sm font-serif">Yashobhagya Enterprises Sales Division</div>
            
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <Clock size={14} className="text-[#C4862A] shrink-0 mt-0.5" />
                <span><strong>Business Hours:</strong> Monday – Saturday: 9:00 AM – 7:00 PM IST</span>
              </div>
              <div className="flex items-start gap-2">
                <Phone size={14} className="text-[#C4862A] shrink-0 mt-0.5" />
                <span><strong>Direct Line:</strong> +91 81918 50001</span>
              </div>
              <div className="flex items-start gap-2">
                <Mail size={14} className="text-[#C4862A] shrink-0 mt-0.5" />
                <span><strong>Official Email:</strong> pundirranjeet@gmail.com</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={14} className="text-[#C4862A] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span><strong>Corporate Locations:</strong></span>
                  <span className="block text-[11px] text-gray-400">• Roorkee Office: C-10, Sakumbari Enclave, Roorkee, Haridwar, UK - 247667</span>
                  <span className="block text-[11px] text-gray-400">• Saharanpur Office: House No. 3/3501, Kapil Vihar Colony, Saharanpur, UP - 247001</span>
                  <span className="block text-[11px] text-gray-400">• Main Factory: Bhagwanpur Road, Opp. Dak Bungalow, Gagalheri, Saharanpur, UP - 247341</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="bg-gray-50 p-4 border-t border-gray-100 text-center">
          <button
            onClick={() => {
              setSubmittedData(null)
              setStatus({ type: '', text: '' })
            }}
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1A3C2E] hover:text-[#C4862A] transition"
          >
            Submit Another Inquiry
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 bg-grain">
      <h3 className="font-serif text-2xl font-bold text-[#1A3C2E] mb-6">Send Us a Message</h3>
      
      {status.text && (
        <div
          className={`p-4 rounded-lg text-sm font-medium mb-6 flex items-start gap-3 border ${
            status.type === 'success'
              ? 'bg-green-50 text-green-700 border-green-200'
              : 'bg-red-50 text-red-700 border-red-200'
          }`}
        >
          {status.type === 'success' ? (
            <CheckCircle className="w-5 h-5 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 shrink-0" />
          )}
          <span>{status.text}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Your Full Name *</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Vikram Singhania"
            className="w-full bg-[#F9F6F0] rounded-lg px-4 py-3 text-sm border border-gray-200 focus:outline-none focus:border-[#1A3C2E] focus:ring-1 focus:ring-[#1A3C2E] font-sans"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Phone Number *</label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. +91 98765 43210"
              className="w-full bg-[#F9F6F0] rounded-lg px-4 py-3 text-sm border border-gray-200 focus:outline-none focus:border-[#1A3C2E] focus:ring-1 focus:ring-[#1A3C2E] font-sans"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Email Address *</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. buyer@company.com"
              className="w-full bg-[#F9F6F0] rounded-lg px-4 py-3 text-sm border border-gray-200 focus:outline-none focus:border-[#1A3C2E] focus:ring-1 focus:ring-[#1A3C2E] font-sans"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Product Interest *</label>
          <select
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            className="w-full bg-[#F9F6F0] rounded-lg px-4 py-3 text-sm border border-gray-200 focus:outline-none focus:border-[#1A3C2E] focus:ring-1 focus:ring-[#1A3C2E] font-sans appearance-none cursor-pointer"
          >
            {productsList.map((prod) => (
              <option key={prod} value={prod}>
                {prod}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Inquiry Details / Message *</label>
          <textarea
            required
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Please detail your quantity, delivery location, and requirements..."
            className="w-full bg-[#F9F6F0] rounded-lg px-4 py-3 text-sm border border-gray-200 focus:outline-none focus:border-[#1A3C2E] focus:ring-1 focus:ring-[#1A3C2E] font-sans"
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full btn-primary uppercase tracking-wider font-bold py-3.5"
          >
            {isSubmitting ? (
              'Sending Submission...'
            ) : (
              <>
                Submit Enquiry
                <Send size={16} />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
