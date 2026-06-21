import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { 
  LayoutDashboard, 
  Inbox, 
  MessageSquare, 
  Flame, 
  Image as ImageIcon, 
  Users, 
  Settings, 
  LogOut, 
  ArrowLeft 
} from 'lucide-react'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  const user = session?.user as any
  const isLoggedIn = !!session
  const isAdmin = user?.role === 'ADMIN' || user?.role === 'SUB_ADMIN'

  // Server-side redirect if not authenticated or not administrator
  if (!isLoggedIn || !isAdmin) {
    redirect('/login')
  }

  const sidebarLinks = [
    { name: 'Overview', href: '/admin', icon: <LayoutDashboard size={18} /> },
    { name: 'Enquiries', href: '/admin/enquiries', icon: <Inbox size={18} /> },
    { name: 'Chat Leads', href: '/admin/chat-leads', icon: <MessageSquare size={18} /> },
    { name: 'Products', href: '/admin/products', icon: <Flame size={18} /> },
    { name: 'Gallery', href: '/admin/gallery', icon: <ImageIcon size={18} /> },
  ]

  // STRICT Admin checks for User Management
  const isStrictAdmin = user?.role === 'ADMIN'

  return (
    <div className="min-h-screen flex bg-[#F9F6F0] font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1C1C1C] text-white flex flex-col border-r border-[#E8D5B0]/10 bg-grain shrink-0">
        {/* Sidebar Header */}
        <div className="p-6 border-b border-[#E8D5B0]/10 flex flex-col">
          <Link href="/" className="flex flex-col">
            <span className="font-serif text-lg tracking-wide font-bold text-[#E8D5B0]">
              YASHOBHAGYA
            </span>
            <span className="text-[8px] tracking-[0.2em] font-sans font-semibold uppercase text-white/40 -mt-1">
              Admin Terminal
            </span>
          </Link>
          <div className="mt-4 flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] text-white/50 tracking-wider uppercase font-semibold">
              {user.role}: {user.name?.split(' ')[0]}
            </span>
          </div>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-grow p-4 space-y-1">
          {sidebarLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-white/70 hover:bg-[#1A3C2E] hover:text-white transition duration-150"
            >
              {link.icon}
              {link.name}
            </Link>
          ))}

          {/* User Management (Admin Only) */}
          {isStrictAdmin && (
            <Link
              href="/admin/users"
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-white/70 hover:bg-[#1A3C2E] hover:text-white transition duration-150"
            >
              <Users size={18} />
              User Manager
            </Link>
          )}

          <Link
            href="/admin/settings"
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-white/70 hover:bg-[#1A3C2E] hover:text-white transition duration-150"
          >
            <Settings size={18} />
            Site Settings
          </Link>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-[#E8D5B0]/10 space-y-2">
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs text-white/60 hover:text-white hover:bg-white/5 transition"
          >
            <ArrowLeft size={14} />
            Back to Website
          </Link>
          <a
            href="/api/auth/signout"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs text-red-400 hover:text-red-300 hover:bg-red-500/5 transition"
          >
            <LogOut size={14} />
            Log Out Session
          </a>
        </div>
      </aside>

      {/* Main Content Pane */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        <header className="h-16 border-b border-gray-200/60 bg-white flex items-center justify-between px-8 bg-grain shrink-0">
          <h1 className="font-serif text-lg font-bold text-[#1A3C2E]">Yashobhagya Management Console</h1>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500 font-sans">
              Logged in: <strong>{user.email}</strong>
            </span>
          </div>
        </header>
        
        <div className="p-8 max-w-7xl w-full mx-auto space-y-8 flex-grow">
          {children}
        </div>
      </main>
    </div>
  )
}
