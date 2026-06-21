'use client'

import { useState } from 'react'
import { Download, Trash2, Search, Calendar, Phone, User } from 'lucide-react'
import { deleteChatLead } from '@/app/actions/admin'

interface ChatLead {
  id: string
  name: string
  phone: string
  query: string | null
  createdAt: Date
}

interface ChatLeadsClientProps {
  initialLeads: ChatLead[]
}

export default function ChatLeadsClient({ initialLeads }: ChatLeadsClientProps) {
  const [leads, setLeads] = useState<ChatLead[]>(initialLeads)
  const [search, setSearch] = useState('')
  const [loadingId, setLoadingId] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this chat lead?")) return
    setLoadingId(id)
    try {
      const res = await deleteChatLead(id)
      if (res.success) {
        setLeads(prev => prev.filter(l => l.id !== id))
      } else {
        alert(res.error || "Failed to delete")
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoadingId(null)
    }
  }

  // Search logic
  const filtered = leads.filter(lead => {
    return (
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.phone.includes(search) ||
      (lead.query && lead.query.toLowerCase().includes(search.toLowerCase()))
    )
  })

  // Export to CSV Function
  const exportToCSV = () => {
    const headers = ['ID', 'Customer Name', 'Phone Number', 'Original Query', 'Created At']
    const rows = filtered.map(lead => [
      lead.id,
      lead.name,
      lead.phone,
      lead.query || '',
      new Date(lead.createdAt).toISOString()
    ])

    const csvContent = [
      headers.join(','),
      ...rows.map(r => r.map(val => `"${val.replace(/"/g, '""')}"`).join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute('download', `Yashobhagya_ChatLeads_${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-xl border border-gray-100 shadow-sm bg-grain">
        <div>
          <h2 className="font-serif text-xl font-bold text-[#1A3C2E]">Chatbot Leads</h2>
          <p className="text-xs text-gray-500 font-sans mt-0.5">Contact coordinates gathered by the floating AI Sales Agent.</p>
        </div>

        {/* CSV Export Button */}
        <div>
          <button
            onClick={exportToCSV}
            disabled={filtered.length === 0}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#C4862A] hover:bg-[#d89b3f] text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition shadow-sm disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <Download size={14} />
            Export to CSV
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative flex items-center">
        <Search className="absolute left-4 text-gray-400 w-4 h-4" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search chat leads by name, phone, or captured query details..."
          className="w-full bg-white rounded-xl pl-11 pr-4 py-3 text-sm border border-gray-200/80 focus:outline-none focus:border-[#1A3C2E] focus:ring-1 focus:ring-[#1A3C2E] font-sans shadow-sm"
        />
      </div>

      {/* Table grid */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden bg-grain">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs font-sans">
            <thead>
              <tr className="bg-[#F9F6F0] text-gray-500 uppercase tracking-wider font-bold border-b border-gray-200">
                <th className="p-4">Lead Date</th>
                <th className="p-4">Customer Name</th>
                <th className="p-4">Phone Number</th>
                <th className="p-4">Inquiry / Query context</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-600">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-gray-400">
                    No matching chat leads recorded.
                  </td>
                </tr>
              ) : (
                filtered.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50/40 transition duration-150">
                    {/* Date */}
                    <td className="p-4 whitespace-nowrap text-gray-400">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={12} className="text-gray-400 shrink-0" />
                        <span>
                          {new Date(lead.createdAt).toLocaleDateString(undefined, {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                    </td>

                    {/* Name */}
                    <td className="p-4 font-bold text-gray-800">
                      <div className="flex items-center gap-1.5">
                        <User size={12} className="text-[#C4862A]" />
                        <span>{lead.name}</span>
                      </div>
                    </td>

                    {/* Phone */}
                    <td className="p-4">
                      <div className="flex items-center gap-1.5 font-semibold text-gray-700">
                        <Phone size={12} className="text-[#1A3C2E] shrink-0" />
                        <span>{lead.phone}</span>
                      </div>
                    </td>

                    {/* Context */}
                    <td className="p-4 max-w-sm">
                      <p className="text-gray-500 italic">
                        {lead.query ? `"${lead.query}"` : 'No message recorded'}
                      </p>
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-right">
                      {loadingId === lead.id ? (
                        <span className="text-gray-400 italic text-[10px]">Processing...</span>
                      ) : (
                        <button
                          onClick={() => handleDelete(lead.id)}
                          title="Delete Lead"
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded transition inline-flex"
                        >
                          <Trash2 size={14} />
                        </button>
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
