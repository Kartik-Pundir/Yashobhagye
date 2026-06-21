'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Mail, Lock, ArrowRight, AlertCircle, CheckCircle, HelpCircle } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')
    setSuccess(false)

    try {
      const res = await signIn('credentials', {
        email: email.toLowerCase().trim(),
        password,
        redirect: false
      })

      if (res?.error) {
        setError("Invalid email address or password. Please try again.")
      } else {
        setSuccess(true)
        // Delay redirect slightly to show success checkmark
        setTimeout(() => {
          router.push('/')
          router.refresh()
        }, 1500)
      }
    } catch (err: any) {
      setError("Failed to connect to authentication server. Please try again.")
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
            Welcome Back
          </h2>
          <p className="text-xs text-gray-500 font-sans">
            Sign in to access your staff dashboard or customer logs.
          </p>
        </div>

        {/* Status Alerts */}
        {error && (
          <div className="p-3.5 rounded-lg text-xs font-medium bg-red-50 text-red-700 border border-red-200 flex items-start gap-2.5">
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="p-3.5 rounded-lg text-xs font-medium bg-green-50 text-green-700 border border-green-200 flex items-start gap-2.5">
            <CheckCircle size={16} className="shrink-0 mt-0.5" />
            <span>Login successful! Redirecting you now...</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Email Address</label>
            <div className="relative flex items-center">
              <Mail size={16} className="absolute left-3.5 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. admin@yashobhagya.com"
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
                placeholder="••••••••"
                className="w-full bg-[#F9F6F0] rounded-lg pl-10 pr-4 py-2.5 text-sm border border-gray-200 focus:outline-none focus:border-[#1A3C2E] focus:ring-1 focus:ring-[#1A3C2E] font-sans"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting || success}
              className="w-full btn-primary py-3 text-xs uppercase tracking-wider font-bold"
            >
              {isSubmitting ? 'Verifying Credentials...' : 'Sign In'}
            </button>
          </div>
        </form>

        {/* Demo Credentials Info Alert */}
        <div className="p-3.5 rounded-lg text-xs bg-amber-50/50 text-amber-800 border border-amber-200/50 flex gap-2">
          <HelpCircle size={16} className="shrink-0 mt-0.5" />
          <div className="space-y-1 text-[11px]">
            <p className="font-semibold">Default Credentials:</p>
            <p><strong>Admin:</strong> admin@yashobhagya.com | adminpassword123</p>
            <p><strong>Sub-Admin:</strong> subadmin@yashobhagya.com | subadmin123</p>
          </div>
        </div>

        {/* Footer Redirect */}
        <div className="text-center pt-2 border-t border-gray-100 text-xs text-gray-500">
          New buyer or factory coordinator?{' '}
          <Link href="/register" className="text-[#C4862A] hover:underline font-semibold flex items-center justify-center gap-0.5 mt-1">
            Register an Account <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </div>
  )
}
