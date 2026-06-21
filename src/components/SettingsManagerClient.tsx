'use client'

import { useState } from 'react'
import { Save, CheckCircle2, AlertCircle, MessageCircle, Phone, Mail, MapPin } from 'lucide-react'
import { updateSiteSettings } from '@/app/actions/admin'

interface SiteSetting {
  id: string
  whatsappNumber: string
  contactEmail: string
  contactPhone: string
  address: string
}

interface SettingsManagerClientProps {
  initialSettings: SiteSetting
}

export default function SettingsManagerClient({ initialSettings }: SettingsManagerClientProps) {
  const [whatsappNumber, setWhatsappNumber] = useState(initialSettings.whatsappNumber)
  const [contactEmail, setContactEmail] = useState(initialSettings.contactEmail)
  const [contactPhone, setContactPhone] = useState(initialSettings.contactPhone)
  const [address, setAddress] = useState(initialSettings.address)
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<{ type: 'success' | 'error' | '', text: string }>({ type: '', text: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus({ type: '', text: '' })

    try {
      const res = await updateSiteSettings({
        whatsappNumber,
        contactEmail,
        contactPhone,
        address
      })

      if (res.success) {
        setStatus({
          type: 'success',
          text: "Site settings updated successfully. Changes are now live across the website!"
        })
      } else {
        setStatus({
          type: 'error',
          text: res.error || "Failed to update settings"
        })
      }
    } catch (err: any) {
      setStatus({
        type: 'error',
        text: err.message || "An unexpected error occurred."
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Editor Form */}
      <div className="lg:col-span-8 bg-white p-8 rounded-xl border border-gray-100 shadow-sm bg-grain space-y-6">
        <div>
          <h2 className="font-serif text-xl font-bold text-[#1A3C2E]">Site Global Coordinates</h2>
          <p className="text-xs text-gray-500 font-sans mt-0.5">Edit corporate coordinates and contact routes. Updates render live on headers and footer maps.</p>
        </div>

        {status.text && (
          <div
            className={`p-4 rounded-lg text-sm font-medium flex items-start gap-3 border ${
              status.type === 'success'
                ? 'bg-green-50 text-green-700 border-green-200'
                : 'bg-red-50 text-red-700 border-red-200'
            }`}
          >
            {status.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 shrink-0 text-green-600" />
            ) : (
              <AlertCircle className="w-5 h-5 shrink-0 text-red-600" />
            )}
            <span>{status.text}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500">WhatsApp Sales Number *</label>
              <div className="relative flex items-center">
                <MessageCircle size={16} className="absolute left-3 text-gray-400" />
                <input
                  type="text"
                  required
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  placeholder="e.g. 919876543210"
                  className="w-full bg-[#F9F6F0] rounded-lg pl-10 pr-3 py-2.5 text-xs border border-gray-200 focus:outline-none focus:border-[#1A3C2E] focus:ring-1 focus:ring-[#1A3C2E] font-sans"
                />
              </div>
              <p className="text-[10px] text-gray-400">Please enter numbers only including country code, e.g. 91 for India.</p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Contact Phone Label *</label>
              <div className="relative flex items-center">
                <Phone size={16} className="absolute left-3 text-gray-400" />
                <input
                  type="text"
                  required
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder="e.g. +91-98765-43210"
                  className="w-full bg-[#F9F6F0] rounded-lg pl-10 pr-3 py-2.5 text-xs border border-gray-200 focus:outline-none focus:border-[#1A3C2E] focus:ring-1 focus:ring-[#1A3C2E] font-sans"
                />
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Contact Email *</label>
            <div className="relative flex items-center">
              <Mail size={16} className="absolute left-3 text-gray-400" />
              <input
                type="email"
                required
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="e.g. sales@yashobhagya.com"
                className="w-full bg-[#F9F6F0] rounded-lg pl-10 pr-3 py-2.5 text-xs border border-gray-200 focus:outline-none focus:border-[#1A3C2E] focus:ring-1 focus:ring-[#1A3C2E] font-sans"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Displayed Corporate Address *</label>
            <div className="relative flex items-start">
              <MapPin size={16} className="absolute left-3 top-3.5 text-gray-400" />
              <textarea
                required
                rows={3}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter full street, warehouse, state, and pincode coordinates"
                className="w-full bg-[#F9F6F0] rounded-lg pl-10 pr-3 py-2.5 text-xs border border-gray-200 focus:outline-none focus:border-[#1A3C2E] focus:ring-1 focus:ring-[#1A3C2E] font-sans"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-[#1A3C2E] hover:bg-[#28503e] text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition shadow-sm font-title"
            >
              <Save size={14} />
              {isSubmitting ? 'Saving settings...' : 'Update Settings'}
            </button>
          </div>
        </form>
      </div>

      {/* Visual Preview */}
      <div className="lg:col-span-4 bg-white p-6 rounded-xl border border-gray-100 shadow-sm bg-grain space-y-4 text-xs font-sans">
        <h3 className="font-serif text-sm font-bold text-gray-800 border-b border-gray-100 pb-2">Footer Live Preview</h3>
        
        <div className="space-y-3 pt-2">
          <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">Contact Column</p>
          <div className="space-y-2 text-gray-600">
            <div className="flex gap-2 items-start">
              <MapPin size={14} className="text-[#C4862A] shrink-0 mt-0.5" />
              <span>{address || 'Address placeholder'}</span>
            </div>
            <div className="flex gap-2 items-center">
              <Phone size={12} className="text-[#C4862A] shrink-0" />
              <span>{contactPhone || 'Phone placeholder'}</span>
            </div>
            <div className="flex gap-2 items-center">
              <Mail size={12} className="text-[#C4862A] shrink-0" />
              <span className="underline">{contactEmail || 'Email placeholder'}</span>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider mb-2">WhatsApp Redirect</p>
          <div className="p-3 bg-[#F9F6F0] rounded-lg text-[10px] text-gray-600 break-all">
            https://wa.me/{whatsappNumber || 'number'}
          </div>
        </div>
      </div>
    </div>
  )
}
