import Image from 'next/image'
import Link from 'next/link'
import ThreeBackground from '@/components/ThreeBackground'
import HomeClient from '@/components/HomeClient'
import { Flame, ShieldCheck, Truck, Scale, RefreshCw, Layers, ArrowUpRight, MessageCircle, Mail, Sprout, Leaf, Settings, Trees, Zap, Activity, CupSoda, ChefHat, Candy } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default function Home() {
  const categories = [
    {
      title: "All Kind of Firewood",
      description: "Premium mix of seasoned and split eucalyptus, poplar, sheesham, acacia, and mix hardwood logs tailored for specific boiler heat requirements.",
      image: "/images/firewood-mix.jpg",
      link: "/products?category=Firewood",
      tags: ["Eucalyptus", "Poplar", "Sheesham", "Acacia", "Hardwood Mix"]
    },
    {
      title: "Biomass Briquettes",
      description: "Eco-friendly compressed mustard husk, pure wood sawdust, and sugarcane bagasse briquettes serving as efficient, high-density coal-replacements.",
      image: "/images/sawdust-briquettes-v2.jpg",
      link: "/products?category=Briquettes",
      tags: ["Mustard Residue", "Wood Sawdust", "Sugarcane Bagasse"]
    },
    {
      title: "Industrial & Food Salts",
      description: "High-purity mineral-rich Rock Salt (Sendha Namak), processed Black Salt (Kala Namak), Suzi Salt, and bulk Natural Mineral Salts.",
      image: "/images/rock-salt.jpg",
      link: "/products?category=Salts",
      tags: ["Black Salt", "Rock Salt", "Suzi Salt", "Natural Mineral Salts"]
    }
  ]

  const pillars = [
    {
      icon: <Layers className="w-8 h-8 text-[#C4862A]" />,
      title: "Always In Stock",
      description: "Large-scale factory production and extensive warehouse inventory ensure we fulfill bulk industrial demands consistently, without seasonal disruption."
    },
    {
      icon: <Truck className="w-8 h-8 text-[#C4862A]" />,
      title: "Self-Owned Transport Fleet",
      description: "Our dedicated logistics team and self-owned truck fleet guarantee secure, scheduled direct deliveries to your factory gate or warehouse, pan-India."
    },
    {
      icon: <Scale className="w-8 h-8 text-[#C4862A]" />,
      title: "Competitive Pricing",
      description: "By managing harvesting, factory processing, and shipping directly, we cut intermediaries, delivering institutional bulk goods at industry-best prices."
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-[#C4862A]" />,
      title: "Best Service & QA",
      description: "Every shipment undergoes strict quality control to verify size consistency, moisture constraints, and chemical composition margins before loading."
    },
    {
      icon: <RefreshCw className="w-8 h-8 text-[#C4862A]" />,
      title: "100% Satisfaction",
      description: "Over 50+ manufacturing plants, food processors, and paper mills rely on us as their trusted energy and chemical ingredients partner."
    }
  ]

  return (
    <div className="relative flex flex-col w-full overflow-hidden">
      {/* Hero Section Container */}
      <section className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden">
        {/* WebGL Particle Wave */}
        <ThreeBackground />
        
        {/* Soft layout overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F9F6F0]/20 via-transparent to-[#F9F6F0] z-0 pointer-events-none" />
        
        {/* Scroll-triggered hero text container */}
        <HomeClient />
      </section>

      {/* Product Highlights Section */}
      <section className="py-24 bg-white bg-grain relative z-10 border-t border-gray-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[#C4862A] font-title mb-3">
              Premium Catalogue
            </h2>
            <h3 className="text-3xl sm:text-4xl font-serif font-bold text-[#1A3C2E]">
              Our Main Product Offerings
            </h3>
            <p className="mt-4 text-base text-gray-600 font-sans leading-relaxed">
              We process and pack natural goods meeting high regulatory standards and fuel specifications for heavy industries and food processors alike.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {categories.map((cat, idx) => (
              <div
                key={idx}
                className="group relative flex flex-col bg-[#F9F6F0]/50 rounded-xl overflow-hidden border border-gray-100 hover:border-[#E8D5B0] shadow-sm hover:shadow-lg transition-all duration-300"
              >
                {/* Product Image */}
                <div className="relative h-60 w-full overflow-hidden">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80" />
                  <div className="absolute bottom-4 left-4 flex flex-wrap gap-1.5">
                    {cat.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 bg-white/20 backdrop-blur-md rounded text-[10px] font-semibold text-white uppercase tracking-wider"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h4 className="font-serif text-xl font-bold text-[#1A3C2E] group-hover:text-[#C4862A] transition duration-200">
                    {cat.title}
                  </h4>
                  <p className="mt-3 text-sm text-gray-600 leading-relaxed font-sans flex-grow">
                    {cat.description}
                  </p>
                  <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <Link
                      href={cat.link}
                      className="text-xs font-semibold uppercase tracking-wider text-[#1A3C2E] group-hover:text-[#C4862A] inline-flex items-center gap-1 transition-colors duration-200"
                    >
                      Explore Options
                      <ArrowUpRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Yashobhagya Pillars Section */}
      <section className="py-24 bg-[#F9F6F0] bg-grain border-t border-gray-100 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[#C4862A] font-title mb-3">
              Core Pillars
            </h2>
            <h3 className="text-3xl sm:text-4xl font-serif font-bold text-[#1A3C2E]">
              Why Choose Yashobhagya Enterprises?
            </h3>
            <p className="mt-4 text-base text-gray-600 leading-relaxed font-sans">
              Our business operations are structured around direct-supply consistency, strict quality controls, and unmatched customer service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-8 border border-gray-100/80 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col bg-grain"
              >
                <div className="w-14 h-14 rounded-lg bg-[#F9F6F0] flex items-center justify-center mb-6">
                  {pillar.icon}
                </div>
                <h4 className="font-serif text-lg font-bold text-[#1A3C2E] mb-3">
                  {pillar.title}
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed font-sans flex-grow">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Institutional Clients Section */}
      <section className="py-24 bg-[#F9F6F0] bg-grain border-t border-gray-100 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C4862A] font-title">
              Our Partnerships
            </span>
            <h3 className="text-3xl sm:text-4xl font-serif font-bold text-[#1A3C2E] mt-2">
              Trusted by Industry Leaders
            </h3>
            <p className="mt-4 text-sm text-gray-600 font-sans leading-relaxed">
              We supply biofuel energies and raw mineral resources to over 50+ manufacturing plants, food processing units, and paper mills across India. Here are some of our key clients:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { name: "Panchvati Private Ltd", icon: <Sprout className="w-5 h-5 text-emerald-600" />, color: "bg-emerald-50 text-emerald-700" },
              { name: "Attero Recycle Pvt Ltd", icon: <RefreshCw className="w-5 h-5 text-blue-600" />, color: "bg-blue-50 text-blue-700" },
              { name: "Cleena Industries Pvt Ltd", icon: <ShieldCheck className="w-5 h-5 text-teal-600" />, color: "bg-teal-50 text-teal-700" },
              { name: "Standard Milk Product", icon: <CupSoda className="w-5 h-5 text-sky-600" />, color: "bg-sky-50 text-sky-700" },
              { name: "Metro Frozen Folkks Food Pvt Ltd", icon: <ChefHat className="w-5 h-5 text-indigo-600" />, color: "bg-indigo-50 text-indigo-700" },
              { name: "Green Grahi Solution Pvt Ltd", icon: <Leaf className="w-5 h-5 text-green-600" />, color: "bg-green-50 text-green-700" },
              { name: "Shree Sumati Sugar Pvt Ltd", icon: <Candy className="w-5 h-5 text-amber-600" />, color: "bg-amber-50 text-amber-700" },
              { name: "Naruma Industries Pvt Ltd", icon: <Settings className="w-5 h-5 text-orange-600" />, color: "bg-orange-50 text-orange-700" },
              { name: "Green Pine Industries Pvt Ltd", icon: <Trees className="w-5 h-5 text-emerald-700" />, color: "bg-emerald-50 text-emerald-800" },
              { name: "Livgreen Cleantech Pvt Ltd", icon: <Zap className="w-5 h-5 text-yellow-600" />, color: "bg-yellow-50 text-yellow-700" },
              { name: "Prominat Fibre Pvt Ltd", icon: <Layers className="w-5 h-5 text-purple-600" />, color: "bg-purple-50 text-purple-700" },
              { name: "Lifestick Pharmaceuticals Pvt Ltd", icon: <Activity className="w-5 h-5 text-red-600" />, color: "bg-red-50 text-red-700" }
            ].map((client, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-100/80 rounded-xl p-5 flex items-center gap-4 shadow-sm hover:shadow-md hover:border-[#E8D5B0] hover:scale-[1.02] transition-all duration-300 min-h-[96px] bg-grain group"
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${client.color} group-hover:scale-110 transition duration-300`}>
                  {client.icon}
                </div>
                <div className="text-left">
                  <h4 className="font-serif text-sm font-bold text-[#1A3C2E] leading-tight">
                    {client.name}
                  </h4>
                  <span className="text-[9px] uppercase tracking-wider text-gray-400 font-semibold block mt-0.5">
                    Verified Partner
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials and Stats - Loaded directly from HomeClient inside layout wrapper */}

      {/* Call to Action Banner Section */}
      <section className="py-20 bg-white border-t border-gray-100 bg-grain relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#1A3C2E]">
            Looking for a Reliable Bulk Supply Partner?
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto font-sans leading-relaxed">
            Contact us today for direct wholesale contract pricing, volume shipments, custom salt processing specifications, or sample biofuel testing bags.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <a
              href="https://wa.me/918191850001"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#C4862A] text-white hover:bg-[#d89b3f] px-8 py-4 rounded-lg font-title font-medium transition duration-200 shadow-md"
            >
              <MessageCircle size={18} />
              Chat on WhatsApp
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 border border-[#1A3C2E] text-[#1A3C2E] hover:bg-[#1A3C2E] hover:text-white px-8 py-4 rounded-lg font-title font-medium transition duration-200"
            >
              <Mail size={18} />
              Contact Sales Form
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
