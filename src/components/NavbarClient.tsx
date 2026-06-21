'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, LogOut, LayoutDashboard, User as UserIcon } from 'lucide-react'

interface NavbarClientProps {
  session: any
}

export default function NavbarClient({ session }: NavbarClientProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  // Track scroll position to update navbar design
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    // Run once initially
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Products', href: '/products' },
    { name: 'Why Us', href: '/why' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/contact' },
  ]

  const isLoggedIn = !!session?.user
  const isAdmin = session?.user?.role === 'ADMIN' || session?.user?.role === 'SUB_ADMIN'

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#1A3C2E]/95 backdrop-blur-md shadow-md border-b border-[#E8D5B0]/10 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/images/logo.jpg"
                alt="Yashobhagya Logo"
                width={40}
                height={40}
                className="h-10 w-auto rounded-md object-contain"
              />
              <div className="flex flex-col">
                <span className={`font-serif text-lg sm:text-xl tracking-wide font-bold transition-colors duration-300 ${
                  isScrolled ? 'text-[#E8D5B0]' : 'text-[#1A3C2E]'
                }`}>
                  YASHOBHAGYA
                </span>
                <span className={`text-[9px] tracking-[0.25em] font-sans font-semibold uppercase -mt-1 ${
                  isScrolled ? 'text-white/60' : 'text-[#2D2D2D]/60'
                }`}>
                  Enterprises
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`font-title text-sm tracking-wide font-medium transition-colors duration-200 ${
                    isScrolled
                      ? isActive
                        ? 'text-[#C4862A]'
                        : 'text-white hover:text-[#E8D5B0]'
                      : isActive
                        ? 'text-[#C4862A]'
                        : 'text-[#2D2D2D] hover:text-[#1A3C2E]'
                  }`}
                >
                  {link.name}
                </Link>
              )
            })}
          </div>

          {/* Desktop Auth Controls */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-3">
                {isAdmin && (
                  <Link
                    href="/admin"
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#1A3C2E] bg-[#E8D5B0] hover:bg-[#d5bd8e] rounded-md transition duration-200"
                  >
                    <LayoutDashboard size={14} />
                    Dashboard
                  </Link>
                )}
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-current text-xs">
                  <UserIcon size={14} className={isScrolled ? 'text-white/80' : 'text-[#2D2D2D]/80'} />
                  <span className={`font-medium ${isScrolled ? 'text-white/90' : 'text-[#2D2D2D]/90'}`}>
                    {session.user.name?.split(' ')[0]}
                  </span>
                </div>
                <Link
                  href="/api/auth/signout"
                  className={`flex items-center gap-1 px-3 py-1.5 text-xs transition duration-200 ${
                    isScrolled ? 'text-white/70 hover:text-white' : 'text-[#2D2D2D]/70 hover:text-black'
                  }`}
                >
                  <LogOut size={14} />
                  Sign Out
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  href="/login"
                  className={`font-title text-sm font-medium transition duration-200 ${
                    isScrolled ? 'text-white/80 hover:text-white' : 'text-[#2D2D2D] hover:text-black'
                  }`}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 bg-[#C4862A] text-white hover:bg-[#d89b3f] text-sm font-title font-medium rounded-lg transition duration-200 shadow-sm"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {isLoggedIn && isAdmin && (
              <Link
                href="/admin"
                className="p-2 text-[#E8D5B0] bg-[#1A3C2E] rounded-md"
              >
                <LayoutDashboard size={18} />
              </Link>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-md transition-colors duration-200 ${
                isScrolled
                  ? 'text-white hover:bg-[#1A3C2E]/60'
                  : 'text-[#1A3C2E] hover:bg-black/5'
              }`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="md:hidden bg-[#1A3C2E] border-t border-[#E8D5B0]/10 px-4 pt-2 pb-6 space-y-2 animate-fade-in shadow-xl">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2.5 rounded-md text-base font-title font-medium transition-colors ${
                pathname === link.href
                  ? 'bg-[#C4862A] text-white'
                  : 'text-white/80 hover:bg-[#28503e] hover:text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="border-t border-[#E8D5B0]/10 pt-4 mt-4 space-y-2">
            {isLoggedIn ? (
              <div className="space-y-2">
                <div className="px-3 py-1.5 text-xs text-white/60 flex items-center gap-2">
                  <UserIcon size={14} />
                  Logged in as {session.user.name} ({session.user.role})
                </div>
                {isAdmin && (
                  <Link
                    href="/admin"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center px-4 py-2.5 bg-[#E8D5B0] text-[#1A3C2E] hover:bg-[#d5bd8e] text-sm font-semibold uppercase rounded-md transition"
                  >
                    Admin Dashboard
                  </Link>
                )}
                <Link
                  href="/api/auth/signout"
                  className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-white/80 hover:text-white border border-white/20 hover:bg-white/5 text-sm font-medium rounded-md transition"
                >
                  <LogOut size={16} />
                  Sign Out
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 px-3">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex justify-center items-center py-2.5 text-white/80 border border-white/20 rounded-md text-sm font-medium hover:bg-white/5"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="flex justify-center items-center py-2.5 bg-[#C4862A] text-white rounded-md text-sm font-medium hover:bg-[#d89b3f]"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
