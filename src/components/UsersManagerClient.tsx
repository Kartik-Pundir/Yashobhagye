'use client'

import { useState } from 'react'
import { Plus, Trash2, ShieldAlert, Award, User, Mail, Send, CheckCircle2 } from 'lucide-react'
import { updateUserRole, deleteUser, inviteAdminEmail } from '@/app/actions/admin'

interface UserRecord {
  id: string
  name: string | null
  email: string | null
  role: 'USER' | 'SUB_ADMIN' | 'ADMIN'
  createdAt: Date
}

interface UsersManagerClientProps {
  initialUsers: UserRecord[]
}

export default function UsersManagerClient({ initialUsers }: UsersManagerClientProps) {
  const [users, setUsers] = useState<UserRecord[]>(initialUsers)
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteRole, setInviteRole] = useState<'ADMIN' | 'SUB_ADMIN'>('SUB_ADMIN')
  const [isInviting, setIsInviting] = useState(false)
  const [inviteSuccess, setInviteSuccess] = useState('')
  const [loadingId, setLoadingId] = useState<string | null>(null)

  const handleRoleChange = async (userId: string, newRole: 'USER' | 'SUB_ADMIN' | 'ADMIN') => {
    setLoadingId(userId)
    try {
      const res = await updateUserRole(userId, newRole as any)
      if (res.success && res.user) {
        setUsers(prev =>
          prev.map(u => (u.id === userId ? { ...u, role: res.user!.role as any } : u))
        )
      } else {
        alert(res.error || "Failed to update role")
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoadingId(userId)
      setLoadingId(null)
    }
  }

  const handleDelete = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user? This will log them out and delete their record permanently.")) return
    setLoadingId(userId)
    try {
      const res = await deleteUser(userId)
      if (res.success) {
        setUsers(prev => prev.filter(u => u.id !== userId))
      } else {
        alert(res.error || "Failed to delete user")
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoadingId(null)
    }
  }

  const handleInviteSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inviteEmail.trim()) return

    setIsInviting(true)
    setInviteSuccess('')

    try {
      const res = await inviteAdminEmail(inviteEmail, inviteRole as any)
      if (res.success && res.user) {
        setUsers(prev => [...prev, {
          id: res.user!.id,
          name: res.user!.name,
          email: res.user!.email,
          role: res.user!.role as any,
          createdAt: new Date()
        }])
        setInviteSuccess(`Successfully invited! Email: ${inviteEmail}. Temporary Password: ${res.tempPassword}`)
        setInviteEmail('')
      } else {
        alert(res.error || "Failed to invite user")
      }
    } catch (err) {
      console.error(err)
    } finally {
      setIsInviting(false)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Invite Section */}
      <div className="lg:col-span-4 bg-white p-6 rounded-xl border border-gray-100 shadow-sm bg-grain space-y-4">
        <div>
          <h3 className="font-serif text-lg font-bold text-[#1A3C2E]">Invite Admin Staff</h3>
          <p className="text-xs text-gray-500 font-sans mt-0.5">Pre-create administrative roles using email parameters.</p>
        </div>

        {inviteSuccess && (
          <div className="p-3.5 bg-green-50 border border-green-200 rounded-lg text-xs text-green-800 flex items-start gap-2">
            <CheckCircle2 size={16} className="shrink-0 mt-0.5 text-green-600" />
            <span className="leading-relaxed font-sans">{inviteSuccess}</span>
          </div>
        )}

        <form onSubmit={handleInviteSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Email Address</label>
            <div className="relative flex items-center">
              <Mail size={14} className="absolute left-3 text-gray-400" />
              <input
                type="email"
                required
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder="staff@yashobhagya.com"
                className="w-full bg-[#F9F6F0] rounded-lg pl-9 pr-3 py-2 text-xs border border-gray-200 focus:outline-none focus:border-[#1A3C2E] focus:ring-1 focus:ring-[#1A3C2E] font-sans"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Target Role</label>
            <select
              value={inviteRole}
              onChange={(e) => setInviteRole(e.target.value as any)}
              className="w-full bg-[#F9F6F0] rounded-lg px-3 py-2 text-xs border border-gray-200 focus:outline-none focus:border-[#1A3C2E] focus:ring-1 focus:ring-[#1A3C2E] cursor-pointer"
            >
              <option value="SUB_ADMIN">Sub-Admin (Operations)</option>
              <option value="ADMIN">Admin (Full Control)</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isInviting || !inviteEmail.trim()}
            className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#C4862A] hover:bg-[#d89b3f] text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition shadow-sm font-title"
          >
            <Send size={12} />
            {isInviting ? 'Inviting Account...' : 'Dispatch Invite'}
          </button>
        </form>
      </div>

      {/* Users List Table */}
      <div className="lg:col-span-8 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden bg-grain">
        <div className="p-6 border-b border-gray-100">
          <h3 className="font-serif text-lg font-bold text-[#1A3C2E]">Registered User Directory</h3>
          <p className="text-xs text-gray-500 font-sans mt-0.5">Edit user permissions or demote accounts live.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs font-sans">
            <thead>
              <tr className="bg-[#F9F6F0] text-gray-500 uppercase tracking-wider font-bold border-b border-gray-200">
                <th className="p-4">User Details</th>
                <th className="p-4">Role status</th>
                <th className="p-4">Created Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-600">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50/50 transition duration-150">
                  {/* Info */}
                  <td className="p-4 space-y-1">
                    <p className="font-bold text-gray-800 flex items-center gap-1.5">
                      <User size={14} className="text-gray-400" />
                      {u.name || 'Unnamed Client'}
                    </p>
                    <p className="text-gray-400 pl-5">{u.email}</p>
                  </td>

                  {/* Role Selection */}
                  <td className="p-4">
                    {loadingId === u.id ? (
                      <span className="text-gray-400 italic">Processing...</span>
                    ) : (
                      <select
                        value={u.role}
                        onChange={(e) => handleRoleChange(u.id, e.target.value as any)}
                        className="bg-[#F9F6F0] border border-gray-200 text-gray-700 py-1.5 px-2.5 rounded font-semibold text-[10px] tracking-wide uppercase cursor-pointer"
                      >
                        <option value="USER">User</option>
                        <option value="SUB_ADMIN">Sub-Admin</option>
                        <option value="ADMIN">Admin</option>
                      </select>
                    )}
                  </td>

                  {/* Date */}
                  <td className="p-4 text-gray-400">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>

                  {/* Delete */}
                  <td className="p-4 text-right">
                    {loadingId === u.id ? (
                      <span className="text-gray-400 italic">Processing...</span>
                    ) : (
                      <button
                        onClick={() => handleDelete(u.id)}
                        title="Delete User Account"
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded transition inline-flex"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
