'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote, CheckCircle, ArrowRight, MessageCircle } from 'lucide-react'
import Link from 'next/link'

// --- Animated Stats Count Up ---
interface StatCounterProps {
  value: number
  suffix?: string
  duration?: number
}

function StatCounter({ value, suffix = '', duration = 1.5 }: StatCounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    if (!isInView) return

    let start = 0
    const end = value
    const totalFrames = Math.min(Math.floor(duration * 60), 120)
    let frame = 0

    const counter = () => {
      frame++
      const progress = frame / totalFrames
      // Ease out quad
      const current = Math.floor(end * (progress * (2 - progress)))
      
      setCount(current)

      if (frame < totalFrames) {
        requestAnimationFrame(counter)
      } else {
        setCount(end)
      }
    }

    requestAnimationFrame(counter)
  }, [isInView, value, duration])

  return (
    <span ref={ref} className="font-serif text-4xl sm:text-5xl font-bold text-[#C4862A] tracking-tight">
      {count}
      {suffix}
    </span>
  )
}

// --- Testimonial Slide Structure ---
interface Testimonial {
  name: string
  role: string
  company: string
  content: string
  rating: number
}

const testimonials: Testimonial[] = [
  {
    name: "A. K. Sharma",
    role: "Plant Procurement Head",
    company: "Attero Recycle Pvt Ltd",
    content: "Yashobhagya Enterprises supplies seasoned split firewood of Poplar and Liptis for our thermal processes. Their logs match our sizing requirements, moisture levels are always below 15%, and logistics dispatch is consistently tracked via their self-owned fleet.",
    rating: 5
  },
  {
    name: "Sunil Dhingra",
    role: "Operations Director",
    company: "Standard Milk Product",
    content: "Switching to Yashobhagya's Mustard and Bagasse biomass briquettes has reduced our fuel cost by 20% compared to local coal. The high-density compaction ensures long burn cycles and excellent thermal efficiency for our pasteurization boiler units.",
    rating: 5
  },
  {
    name: "Dr. Ritu Goel",
    role: "Quality Assurance Head",
    company: "Metro Frozen Folkks Food Pvt Ltd",
    content: "We source our bulk Black Salt (Kala Namak) and Rock Salt (Sendha Namak) ingredients exclusively from Yashobhagya. The purity levels are pristine, free of contaminants, and processed to exact food-grade standards at their Gagalheri unit.",
    rating: 5
  },
  {
    name: "Vikas Singhal",
    role: "Logistics & Utility Lead",
    company: "Cleena Industries Pvt Ltd",
    content: "Yashobhagya is our reliable partner for sawdust biomass briquettes. Even during peak monsoon season, their buffer inventory guarantees uninterrupted deliveries. Their direct supply loop eliminates broker fees and ensures stable rates.",
    rating: 5
  }
]

export default function HomeClient() {
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  const handleNextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const handlePrevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  // Auto scroll testimonials
  useEffect(() => {
    const timer = setInterval(handleNextTestimonial, 6000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="w-full">
      {/* 1. Hero Text staggered entrance animation */}
      <section className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto pt-32 pb-44 sm:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1A3C2E]/10 border border-[#1A3C2E]/10 mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-[#C4862A] animate-pulse"></span>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#1A3C2E] font-title">
            Pan-India Manufacturer & Supplier
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-serif text-[#1A3C2E] leading-tight font-bold mb-6"
        >
          Natural Energy.<br className="hidden sm:inline" />
          <span className="text-[#C4862A]"> Reliable Supply.</span> Every Time.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-base sm:text-xl text-[#2D2D2D]/80 leading-relaxed font-sans max-w-2xl mb-10"
        >
          Yashobhagya Enterprises manufactures and supplies  firewood, high-density biomass briquettes, and premium grade natural mineral salts with 100% customer satisfaction.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 w-full justify-center"
        >
          <Link href="/products" className="btn-primary">
            Explore Products
            <ArrowRight size={18} />
          </Link>
          <Link href="/contact" className="btn-outline">
            Get a Quote
          </Link>
        </motion.div>
      </section>

      {/* 2. Stats Bar Section */}
      <section className="relative z-20 -mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-xl border border-gray-100/80 p-8 sm:p-12 grid grid-cols-2 md:grid-cols-4 gap-8 divide-y-0 divide-x-0 md:divide-x divide-gray-100 bg-grain">
          <div className="flex flex-col items-center justify-center text-center p-2">
            <StatCounter value={30} suffix="+" />
            <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold mt-2">Employees</span>
          </div>
          <div className="flex flex-col items-center justify-center text-center p-2">
            <StatCounter value={50} suffix="+" />
            <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold mt-2">Clients</span>
          </div>
          <div className="flex flex-col items-center justify-center text-center p-2">
            <StatCounter value={10} suffix="+" />
            <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold mt-2">Years of Service</span>
          </div>
          <div className="flex flex-col items-center justify-center text-center p-2">
            <span className="font-serif text-4xl sm:text-5xl font-bold text-[#C4862A] tracking-tight">Pan-India</span>
            <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold mt-2">Delivery Network</span>
          </div>
        </div>
      </section>

      {/* 3. Testimonials Carousel Section */}
      <section className="py-24 bg-[#1A3C2E] text-white bg-grain relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C4862A_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-1 bg-[#E8D5B0]/10 border border-[#E8D5B0]/15 px-3 py-1 rounded-full mb-6">
            <Quote size={12} className="text-[#C4862A]" />
            <span className="text-xs text-[#E8D5B0] font-semibold uppercase tracking-wider font-title">Testimonials</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#E8D5B0] mb-12">
            What Our Clients Say
          </h2>

          <div className="relative min-h-[260px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <p className="text-base sm:text-xl font-sans italic leading-relaxed text-white/90 max-w-3xl mx-auto">
                  "{testimonials[activeTestimonial].content}"
                </p>
                <div>
                  <h4 className="font-serif text-lg font-bold text-[#C4862A]">
                    {testimonials[activeTestimonial].name}
                  </h4>
                  <p className="text-xs text-white/60 font-sans tracking-wide">
                    {testimonials[activeTestimonial].role}, {testimonials[activeTestimonial].company}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={handlePrevTestimonial}
              className="p-2 border border-white/20 rounded-full hover:bg-white/10 hover:border-white/45 transition"
            >
              <ChevronLeft size={20} className="text-[#E8D5B0]" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTestimonial(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === activeTestimonial ? 'w-6 bg-[#C4862A]' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={handleNextTestimonial}
              className="p-2 border border-white/20 rounded-full hover:bg-white/10 hover:border-white/45 transition"
            >
              <ChevronRight size={20} className="text-[#E8D5B0]" />
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
