'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { registerUser } from '@/app/actions/register'
import { ShieldCheck, User, Mail, Lock, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react'

export default function RegisterPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<{ type: 'success' | 'error' | '', text: string }>({ type: '', text: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus({ type: '', text: '' })

    try {
      const res = await registerUser({ name, email, password })
      if (res.success) {
        setStatus({ type: 'success', text: res.message || 'Registration successful!' })
        setTimeout(() => {
          router.push('/login')
        }, 2000)
      } else {
        setStatus({ type: 'error', text: res.error || 'Failed to register.' })
      }
    } catch (err: any) {
      setStatus({ type: 'error', text: err.message || 'An unexpected error occurred.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative flex flex-col w-full bg-[#F9F6F0] min-h-screen pt-24 justify-center items-center px-4 bg-grain">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg border border-gray-100 p-8 space-y-6 bg-grain">
        
        {/* Brand/Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="flex flex-col items-center">
            <span className="font-serif text-2xl tracking-wide font-bold text-[#1A3C2E]">
              YASHOBHAGYA
            </span>
            <span className="text-[9px] tracking-[0.2em] font-sans font-semibold uppercase text-gray-500 -mt-1">
              Enterprises
            </span>
          </Link>
          <h2 className="text-xl font-serif font-bold text-[#1C1C1C] pt-4">
            Create an Account
          </h2>
          <p className="text-xs text-gray-500 font-sans">
            Register to request quotes and manage bulk material orders.
          </p>
        </div>

        {/* Notices */}
        {status.text && (
          <div
            className={`p-3.5 rounded-lg text-xs font-medium flex items-start gap-2.5 border ${
              status.type === 'success'
                ? 'bg-green-50 text-green-700 border-green-200'
                : 'bg-red-50 text-red-700 border-red-200'
            }`}
          >
            {status.type === 'success' ? (
              <CheckCircle size={16} className="shrink-0 mt-0.5" />
            ) : (
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
            )}
            <span>{status.text}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Your Full Name</label>
            <div className="relative flex items-center">
              <User size={16} className="absolute left-3.5 text-gray-400" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Yash Vardhan"
                className="w-full bg-[#F9F6F0] rounded-lg pl-10 pr-4 py-2.5 text-sm border border-gray-200 focus:outline-none focus:border-[#1A3C2E] focus:ring-1 focus:ring-[#1A3C2E] font-sans"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Email Address</label>
            <div className="relative flex items-center">
              <Mail size={16} className="absolute left-3.5 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. partner@factory.com"
                className="w-full bg-[#F9F6F0] rounded-lg pl-10 pr-4 py-2.5 text-sm border border-gray-200 focus:outline-none focus:border-[#1A3C2E] focus:ring-1 focus:ring-[#1A3C2E] font-sans"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Password</label>
            <div className="relative flex items-center">
              <Lock size={16} className="absolute left-3.5 text-gray-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full bg-[#F9F6F0] rounded-lg pl-10 pr-4 py-2.5 text-sm border border-gray-200 focus:outline-none focus:border-[#1A3C2E] focus:ring-1 focus:ring-[#1A3C2E] font-sans"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-primary py-3 text-xs uppercase tracking-wider font-bold"
            >
              {isSubmitting ? 'Registering Account...' : 'Register User'}
            </button>
          </div>
        </form>

        {/* Footer Redirect */}
        <div className="text-center pt-2 border-t border-gray-100 text-xs text-gray-500">
          Already have an account?{' '}
          <Link href="/login" className="text-[#C4862A] hover:underline font-semibold flex items-center justify-center gap-0.5 mt-1">
            Sign In Here <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </div>
  )
}
