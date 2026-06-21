import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react'

export default async function Footer() {
  let settings;
  try {
    settings = await prisma.siteSetting.findUnique({
      where: { id: 'default' }
    })
  } catch (error) {
    console.error("Failed to fetch settings for footer, falling back:", error)
  }
  
  if (!settings) {
    settings = {
      id: 'default',
      whatsappNumber: '918191850001',
      contactEmail: 'pundirranjeet@gmail.com',
      contactPhone: '+91 81918 50001',
      address: 'Yashobhagya Enterprises, Roorkee, Uttarakhand, India - 247667',
      updatedAt: new Date()
    }
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#1C1C1C] text-white/80 border-t border-[#E8D5B0]/10 pt-16 pb-8 bg-grain">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand and Description */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3 text-white">
              <Image
                src="/images/logo.jpg"
                alt="Yashobhagya Logo"
                width={36}
                height={36}
                className="h-9 w-auto rounded-md object-contain brightness-95"
              />
              <div className="flex flex-col">
                <span className="font-serif text-lg tracking-wide font-bold text-[#E8D5B0]">
                  YASHOBHAGYA
                </span>
                <span className="text-[9px] tracking-[0.25em] font-sans font-semibold uppercase text-white/50 -mt-1">
                  Enterprises
                </span>
              </div>
            </Link>
            <p className="text-sm text-white/60 leading-relaxed font-sans">
              Natural Energy. Reliable Supply. Every Time. We are leading manufacturers and suppliers of quality firewood, biomass briquettes, and natural mineral salts.
            </p>
            <div className="pt-2">
              <a
                href={`https://wa.me/${settings.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#C4862A] hover:bg-[#d89b3f] text-white px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition duration-200"
              >
                <MessageCircle size={16} />
                WhatsApp Sales
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-bold text-[#E8D5B0] mb-4">Quick Links</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="text-white/70 hover:text-[#C4862A] transition duration-200">Home</Link>
              </li>
              <li>
                <Link href="/about" className="text-white/70 hover:text-[#C4862A] transition duration-200">About Us</Link>
              </li>
              <li>
                <Link href="/products" className="text-white/70 hover:text-[#C4862A] transition duration-200">Products</Link>
              </li>
              <li>
                <Link href="/why" className="text-white/70 hover:text-[#C4862A] transition duration-200">Why Yashobhagya</Link>
              </li>
              <li>
                <Link href="/gallery" className="text-white/70 hover:text-[#C4862A] transition duration-200">Gallery</Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/70 hover:text-[#C4862A] transition duration-200">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-serif text-lg font-bold text-[#E8D5B0] mb-4">Our Products</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/products?category=Firewood" className="text-white/70 hover:text-[#C4862A] transition duration-200">All Varieties of Firewood</Link>
              </li>
              <li>
                <Link href="/products?category=Briquettes" className="text-white/70 hover:text-[#C4862A] transition duration-200">Mustard Briquettes</Link>
              </li>
              <li>
                <Link href="/products?category=Briquettes" className="text-white/70 hover:text-[#C4862A] transition duration-200">Sawdust Briquettes</Link>
              </li>
              <li>
                <Link href="/products?category=Briquettes" className="text-white/70 hover:text-[#C4862A] transition duration-200">Bagasse Briquettes</Link>
              </li>
              <li>
                <Link href="/products?category=Salts" className="text-white/70 hover:text-[#C4862A] transition duration-200">Black Salt (Kala Namak)</Link>
              </li>
              <li>
                <Link href="/products?category=Salts" className="text-white/70 hover:text-[#C4862A] transition duration-200">Rock Salt (Sendha Namak)</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="font-serif text-lg font-bold text-[#E8D5B0] mb-4">Contact Details</h3>
            <ul className="space-y-4 text-sm font-sans">
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="text-[#C4862A] shrink-0 mt-0.5" />
                <div className="space-y-1 text-white/75">
                  <span className="font-semibold text-white block">Roorkee Office:</span>
                  <span>C-10, Sakumbari Enclave, Roorkee, UK</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="text-[#C4862A] shrink-0 mt-0.5" />
                <div className="space-y-1 text-white/75">
                  <span className="font-semibold text-white block">Saharanpur Office:</span>
                  <span>Capil Vihar Colony, Saharanpur, UP</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="text-[#C4862A] shrink-0 mt-0.5" />
                <div className="space-y-1 text-white/75">
                  <span className="font-semibold text-white block">Main Factory Unit:</span>
                  <span>Gangalhedi, Saharanpur, UP - 247341</span>
                </div>
              </li>
              <li className="flex items-center gap-2.5 pt-2 border-t border-white/5">
                <Phone size={14} className="text-[#C4862A] shrink-0" />
                <span className="text-white/75">{settings.contactPhone}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={14} className="text-[#C4862A] shrink-0" />
                <a href={`mailto:${settings.contactEmail}`} className="text-white/75 hover:underline hover:text-[#C4862A] transition">
                  {settings.contactEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#E8D5B0]/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-white/40 gap-4">
          <div>
            © {currentYear} Yashobhagya Enterprises. All rights reserved.
          </div>
          <div className="flex gap-6">
            <Link href="/login" className="text-white/60 hover:text-[#C4862A] transition">Staff Login</Link>
            <span className="text-white/10">|</span>
            <span className="tracking-wide">Natural Energy. Sustainable Supply.</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
