import { prisma } from '@/lib/prisma'
import ContactFormClient from '@/components/ContactFormClient'
import { Phone, Mail, MapPin, MessageCircle, Clock } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function ContactPage() {
  let settings;
  try {
    settings = await prisma.siteSetting.findUnique({
      where: { id: 'default' }
    })
  } catch (error) {
    console.error("Failed to query database site settings in contact page, using fallbacks:", error)
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

  return (
    <div className="relative flex flex-col w-full bg-[#F9F6F0] min-h-screen pt-24">
      {/* Page Header */}
      <section className="relative py-20 bg-[#1A3C2E] text-white overflow-hidden bg-grain">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#C4862A_1px,transparent_1px)] [background-size:24px_24px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#E8D5B0] font-title px-3 py-1 rounded-full bg-white/5 border border-white/10">
            Get In Touch
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#E8D5B0]">Contact Our Team</h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-white/75 font-sans leading-relaxed">
            Have questions about bulk orders, pricing agreements, custom salt specifications, or logistics transport? Speak with our managers today.
          </p>
        </div>
      </section>

      {/* Form & Info Grid */}
      <section className="py-24 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            {/* Contact Information Column */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-[#C4862A] font-title">
                  Corporate Offices
                </span>
                <h2 className="text-3xl font-serif font-bold text-[#1A3C2E]">
                  We are here to assist your operations.
                </h2>
                <p className="text-sm text-gray-600 font-sans leading-relaxed">
                  Our team coordinates with logistics operators, warehouse managers, and institutional buyers daily. Connect via form or direct phone for immediate load bookings.
                </p>
              </div>

              {/* Information Cards */}
              <div className="space-y-4">
                <div className="bg-white rounded-xl border border-gray-100 p-6 flex flex-col gap-6 shadow-sm bg-grain">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#F9F6F0] flex items-center justify-center shrink-0 text-[#C4862A]">
                      <MapPin size={20} />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-serif text-sm font-bold text-[#1A3C2E]">Roorkee Branch Office</h4>
                      <p className="text-xs text-gray-500 font-sans leading-relaxed">
                        C-10, Ward No. 12,<br />
                        Mohanpura Mohhmadpur, Sakumbari Enclave, Mohanpura,<br />
                        Roorkee, District Haridwar, Uttarakhand – 247667.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 border-t border-gray-100/60 pt-4">
                    <div className="w-10 h-10 rounded-lg bg-[#F9F6F0] flex items-center justify-center shrink-0 text-[#C4862A]">
                      <MapPin size={20} />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-serif text-sm font-bold text-[#1A3C2E]">Saharanpur Branch Office</h4>
                      <p className="text-xs text-gray-500 font-sans leading-relaxed">
                        House No. 3/3501, Floor No. 0,<br />
                        Ice Factory Wali Gali, Paper Mill Road, Kapil Vihar Colony,<br />
                        Saharanpur, District Saharanpur, Uttar Pradesh – 247001.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 border-t border-gray-100/60 pt-4">
                    <div className="w-10 h-10 rounded-lg bg-[#F9F6F0] flex items-center justify-center shrink-0 text-[#C4862A]">
                      <MapPin size={20} />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-serif text-sm font-bold text-[#1A3C2E]">Main Processing Factory</h4>
                      <p className="text-xs text-gray-500 font-sans leading-relaxed">
                        Bhagwanpur Road, Opposite Dak Bungalow,<br />
                        Sabzi Mandi, Gangoh/Gangalhedi,<br />
                        Saharanpur, Uttar Pradesh – 247341.<br />
                        <span className="font-semibold text-gray-700">PIN Code: 247341 (Gangalhedi)</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-100 p-6 flex items-start gap-4 shadow-sm bg-grain">
                  <div className="w-10 h-10 rounded-lg bg-[#F9F6F0] flex items-center justify-center shrink-0 text-[#C4862A]">
                    <Phone size={18} />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-bold text-[#1A3C2E] mb-1">Direct Lines</h4>
                    <p className="text-xs text-gray-500 font-sans">{settings.contactPhone}</p>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-100 p-6 flex items-start gap-4 shadow-sm bg-grain">
                  <div className="w-10 h-10 rounded-lg bg-[#F9F6F0] flex items-center justify-center shrink-0 text-[#C4862A]">
                    <Mail size={18} />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-bold text-[#1A3C2E] mb-1">Sales Inquiries</h4>
                    <a href={`mailto:${settings.contactEmail}`} className="text-xs text-gray-500 hover:text-[#C4862A] hover:underline font-sans transition">
                      {settings.contactEmail}
                    </a>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-100 p-6 flex items-start gap-4 shadow-sm bg-grain">
                  <div className="w-10 h-10 rounded-lg bg-[#F9F6F0] flex items-center justify-center shrink-0 text-[#C4862A]">
                    <Clock size={18} />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-bold text-[#1A3C2E] mb-1">Business Hours</h4>
                    <p className="text-xs text-gray-500 font-sans">Monday – Saturday: 9:00 AM – 7:00 PM IST</p>
                  </div>
                </div>
              </div>

              {/* WhatsApp Call to Action */}
              <div className="pt-2">
                <a
                  href={`https://wa.me/${settings.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#C4862A] text-white hover:bg-[#d89b3f] px-6 py-4 rounded-xl font-title font-medium transition duration-200 shadow-md"
                >
                  <MessageCircle size={18} />
                  Direct Connect to WhatsApp Sales
                </a>
              </div>
            </div>

            {/* General Contact Form Column */}
            <div className="lg:col-span-7">
              <ContactFormClient />
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Location Map Section */}
      <section className="py-12 bg-white bg-grain border-t border-gray-100 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h3 className="font-serif text-2xl font-bold text-[#1A3C2E]">Our Location</h3>
            <p className="text-xs text-gray-500 font-sans mt-1">Visit our main plant or coordinate shipments directly.</p>
          </div>
          
          {/* OpenStreetMap iframe or map box */}
          <div className="relative h-96 w-full rounded-xl overflow-hidden shadow-md border border-gray-200">
            <iframe
              src="https://maps.google.com/maps?q=Roorkee,%20Uttarakhand,%20India&t=&z=13&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  )
}
