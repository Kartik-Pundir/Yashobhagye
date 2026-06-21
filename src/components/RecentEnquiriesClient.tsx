'use client'

import { useState } from 'react'
import { Check, Clock, Trash2, Eye, RefreshCw } from 'lucide-react'
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

interface RecentEnquiriesClientProps {
  initialEnquiries: Enquiry[]
}

export default function RecentEnquiriesClient({ initialEnquiries }: RecentEnquiriesClientProps) {
  const [enquiries, setEnquiries] = useState<Enquiry[]>(initialEnquiries)
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'NEW': return 'bg-amber-100 text-amber-800'
      case 'IN_PROGRESS': return 'bg-blue-100 text-blue-800'
      case 'RESOLVED': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden bg-grain">
      <div className="p-6 border-b border-gray-100 flex items-center justify-between">
        <h3 className="font-serif text-lg font-bold text-[#1A3C2E]">Recent Bulk Enquiries</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs font-sans">
          <thead>
            <tr className="bg-[#F9F6F0] text-gray-500 uppercase tracking-wider font-bold border-b border-gray-200">
              <th className="p-4">Contact</th>
              <th className="p-4">Product interest</th>
              <th className="p-4">Message summary</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-600">
            {enquiries.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-400">
                  No enquiries recorded.
                </td>
              </tr>
            ) : (
              enquiries.map((enq) => (
                <tr key={enq.id} className="hover:bg-gray-50/50 transition duration-150">
                  {/* Contact Details */}
                  <td className="p-4 space-y-1">
                    <p className="font-bold text-gray-800">{enq.name}</p>
                    <p className="text-gray-400">{enq.phone}</p>
                    <p className="text-gray-400">{enq.email}</p>
                  </td>
                  
                  {/* Product Interest */}
                  <td className="p-4">
                    <span className="font-semibold text-[#1A3C2E]">{enq.product}</span>
                  </td>

                  {/* Message details */}
                  <td className="p-4 max-w-xs">
                    <p className="truncate text-gray-500" title={enq.message}>
                      {enq.message}
                    </p>
                    <p className="text-[10px] text-gray-400 mt-1">
                      {new Date(enq.createdAt).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </td>

                  {/* Status badge */}
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${getStatusColor(enq.status)}`}>
                      {enq.status}
                    </span>
                  </td>

                  {/* Action controls */}
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
  )
}
