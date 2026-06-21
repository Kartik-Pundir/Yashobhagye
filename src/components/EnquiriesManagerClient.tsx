'use client'

import { useState } from 'react'
import { Check, Clock, Trash2, Search, ArrowUpDown, ChevronDown } from 'lucide-react'
import { updateEnquiryStatus, deleteEnquiry } from '@/app/actions/admin'

interface Enquiry {
  id: string
  name: string
  phone: string
  email: string
  product: string
  message: string
  status: 'NEW' | 'IN_PROGRESS' | 'RESOLVED'
  createdAt: Date
}

interface EnquiriesManagerClientProps {
  initialEnquiries: Enquiry[]
}

export default function EnquiriesManagerClient({ initialEnquiries }: EnquiriesManagerClientProps) {
  const [enquiries, setEnquiries] = useState<Enquiry[]>(initialEnquiries)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('ALL')
  const [loadingId, setLoadingId] = useState<string | null>(null)

  const handleStatusUpdate = async (id: string, newStatus: 'NEW' | 'IN_PROGRESS' | 'RESOLVED') => {
    setLoadingId(id)
    try {
      const res = await updateEnquiryStatus(id, newStatus)
      if (res.success && res.enquiry) {
        setEnquiries(prev =>
          prev.map(e => (e.id === id ? { ...e, status: res.enquiry!.status as any } : e))
        )
      } else {
        alert(res.error || "Failed to update status")
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoadingId(null)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this enquiry?")) return
    setLoadingId(id)
    try {
      const res = await deleteEnquiry(id)
      if (res.success) {
        setEnquiries(prev => prev.filter(e => e.id !== id))
      } else {
        alert(res.error || "Failed to delete")
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoadingId(null)
    }
  }

  // Filter & Search Logic
  const filtered = enquiries.filter(enq => {
    const matchesSearch = 
      enq.name.toLowerCase().includes(search.toLowerCase()) ||
      enq.email.toLowerCase().includes(search.toLowerCase()) ||
      enq.product.toLowerCase().includes(search.toLowerCase()) ||
      enq.message.toLowerCase().includes(search.toLowerCase())

    const matchesStatus = filterStatus === 'ALL' || enq.status === filterStatus

    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'NEW': return 'bg-amber-100 text-amber-800'
      case 'IN_PROGRESS': return 'bg-blue-100 text-blue-800'
      case 'RESOLVED': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-xl border border-gray-100 shadow-sm bg-grain">
        <div>
          <h2 className="font-serif text-xl font-bold text-[#1A3C2E]">Customer Inquiries</h2>
          <p className="text-xs text-gray-500 font-sans mt-0.5">Manage quotes, trial sample requests, and wholesale queries.</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 flex-wrap">
          {['ALL', 'NEW', 'IN_PROGRESS', 'RESOLVED'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${
                filterStatus === status
                  ? 'bg-[#1A3C2E] text-white'
                  : 'bg-[#F9F6F0] text-gray-600 hover:bg-gray-100'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative flex items-center">
        <Search className="absolute left-4 text-gray-400 w-4 h-4" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search enquiries by name, product interest, email content..."
          className="w-full bg-white rounded-xl pl-11 pr-4 py-3 text-sm border border-gray-200/80 focus:outline-none focus:border-[#1A3C2E] focus:ring-1 focus:ring-[#1A3C2E] font-sans shadow-sm"
        />
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden bg-grain">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs font-sans">
            <thead>
              <tr className="bg-[#F9F6F0] text-gray-500 uppercase tracking-wider font-bold border-b border-gray-200">
                <th className="p-4">Submission Date</th>
                <th className="p-4">Customer details</th>
                <th className="p-4">Product interest</th>
                <th className="p-4">Inquiry details / Message</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-600">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-gray-400">
                    No matching customer inquiries found.
                  </td>
                </tr>
              ) : (
                filtered.map((enq) => (
                  <tr key={enq.id} className="hover:bg-gray-50/40 transition duration-150 items-start">
                    {/* Submission Date */}
                    <td className="p-4 whitespace-nowrap text-gray-400">
                      {new Date(enq.createdAt).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>

                    {/* Customer */}
                    <td className="p-4 space-y-1">
                      <p className="font-bold text-gray-800">{enq.name}</p>
                      <p className="text-gray-400">{enq.phone}</p>
                      <p className="text-gray-400">{enq.email}</p>
                    </td>

                    {/* Product */}
                    <td className="p-4">
                      <span className="font-semibold text-[#1A3C2E]">{enq.product}</span>
                    </td>

                    {/* Message Details */}
                    <td className="p-4 max-w-sm">
                      <p className="whitespace-pre-line leading-relaxed text-gray-600">
                        {enq.message}
                      </p>
                    </td>

                    {/* Status */}
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${getStatusColor(enq.status)}`}>
                        {enq.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-right space-x-1 whitespace-nowrap">
                      {loadingId === enq.id ? (
                        <span className="text-gray-400 italic text-[10px]">Processing...</span>
                      ) : (
                        <>
                          <button
                            onClick={() => handleStatusUpdate(enq.id, 'IN_PROGRESS')}
                            title="Mark In Progress"
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition inline-flex"
                          >
                            <Clock size={14} />
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(enq.id, 'RESOLVED')}
                            title="Mark Resolved"
                            className="p-1.5 text-green-600 hover:bg-green-50 rounded transition inline-flex"
                          >
                            <Check size={14} />
                          </button>
                          <button
                            onClick={() => handleDelete(enq.id)}
                            title="Delete Enquiry"
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded transition inline-flex"
                          >
                            <Trash2 size={14} />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
