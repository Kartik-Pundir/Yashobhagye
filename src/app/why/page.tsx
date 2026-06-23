import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle2, ShieldCheck, Scale, Truck, Warehouse, ArrowRight, MessageCircle } from 'lucide-react'

export default function WhyUsPage() {
  const pillars = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-[#C4862A]" />,
      title: "Rigorous Quality Standards",
      subtitle: "On-site analysis verifying moisture, ash, and size.",
      description: "We don't just ship products; we support your factory's production schedule. Our on-site quality control managers inspect every load for moisture content, sizing tolerances, and ash values before the trucks leave the loading bays."
    },
    {
      icon: <Scale className="w-8 h-8 text-[#C4862A]" />,
      title: "Direct Sourcing and Fixed Rates",
      subtitle: "Eliminating middlemen for stable wholesale contracts.",
      description: "By managing the supply loop directly—from local harvesting and crop residue compaction to final delivery—we completely eliminate intermediary brokerage fees. This allows us to provide transparent, fixed-contract pricing to protect your operational margins."
    },
    {
      icon: <Warehouse className="w-8 h-8 text-[#C4862A]" />,
      title: "Year-Round Stock Security",
      subtitle: "Massive buffer yards shielding you from seasonal dips.",
      description: "Seasonal crop cycles and monsoons frequently disrupt biofuel supplies. To protect our regular contract partners, we maintain buffer yards storing thousands of tons of biomass and firewood at our Gagalheri facilities, ensuring uninterrupted deliveries 365 days a year."
    },
    {
      icon: <Truck className="w-8 h-8 text-[#C4862A]" />,
      title: "Self-Owned Transport and Dispatch",
      subtitle: "Direct logistics fleet bypassing broker delays.",
      description: "Standard transport brokers cause loading delays and weight discrepancies. We bypass public brokers entirely by running our own fleet of over 20 cargo trucks, allowing us to control loading schedules, minimize shrinkage, and guarantee on-time arrivals."
    }
  ]

  return (
    <div className="relative flex flex-col w-full bg-[#F9F6F0] min-h-screen pt-24">
      {/* Page Header */}
      <section className="relative py-20 bg-[#1A3C2E] text-white overflow-hidden bg-grain">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#C4862A_1px,transparent_1px)] [background-size:24px_24px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-sans font-bold text-[#E8D5B0]">Why Yashobhagya Enterprises</h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-white/75 font-sans leading-relaxed">
            A reliable raw material partner providing direct supply security, strict quality controls, and owned logistics fleet across India.
          </p>
        </div>
      </section>

      {/* Main Content Pillars Grid */}
      <section className="py-24 z-10 bg-white bg-grain">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-2">
            <h2 className="text-3xl font-sans font-bold text-[#1A3C2E]">How We Protect Your Production Lines</h2>
            <p className="text-sm text-gray-500 font-sans">
              Our business operations are structured around direct-supply consistency, strict quality controls, and unmatched customer service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#E8D5B0]/30 rounded-2xl p-8 hover:shadow-lg hover:border-[#C4862A] transition-all duration-300 flex flex-col bg-grain relative group"
              >
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-xl bg-[#1A3C2E] flex items-center justify-center shrink-0 border border-[#E8D5B0]/20 shadow-md group-hover:scale-105 transition-transform duration-300">
                    {pillar.icon}
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-sans text-lg font-bold text-[#1A3C2E]">{pillar.title}</h3>
                    <p className="text-xs text-gray-500 font-sans italic">{pillar.subtitle}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed font-sans mt-5 flex-grow">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scale & Institutional Trust Segment (Pillar 5) */}
      <section className="py-24 bg-[#F9F6F0] bg-grain border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-[#E8D5B0]/30 rounded-3xl p-8 sm:p-12 shadow-sm flex flex-col md:flex-row gap-8 items-center bg-grain">
            <div className="w-16 h-16 rounded-full bg-[#1A3C2E] flex items-center justify-center shrink-0 border border-[#E8D5B0]/20 shadow-md text-[#E8D5B0]">
              <CheckCircle2 className="w-8 h-8 text-[#C4862A]" />
            </div>
            <div className="space-y-4 text-center md:text-left flex-grow">
              <h3 className="font-sans text-2xl font-bold text-[#1A3C2E]">Committed Institutional Sourcing and Support</h3>
              <p className="text-sm text-gray-600 leading-relaxed font-sans">
                Over 50 manufacturing plants, food processing units, and paper mills across India trust Yashobhagya Enterprises. If there is ever a discrepancy with delivery times, weights, or material specifications, our dedicated coordinators resolve it immediately.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Logistics Spotlight Section */}
      <section className="py-24 bg-[#1A3C2E] text-white bg-grain relative">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C4862A_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl font-sans font-bold text-[#E8D5B0]">
                Pan-India Supply Reliability
              </h2>
              <p className="text-sm sm:text-base text-white/70 leading-relaxed font-sans">
                Our operations span major industrial hubs in North and West India. Whether you require monthly bulk shipments of compressed mustard briquettes to Rajasthan or daily truck dispatches of black salt crystals to food packaging plants in Gujarat, our network ensures direct, trackable transportation.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="border-l-2 border-[#C4862A] pl-4">
                  <h4 className="font-sans text-3xl font-bold text-white">20+</h4>
                  <p className="text-xs text-white/50 uppercase tracking-wide font-title mt-1">Industrial Trucks</p>
                </div>
                <div className="border-l-2 border-[#C4862A] pl-4">
                  <h4 className="font-sans text-3xl font-bold text-white">50+</h4>
                  <p className="text-xs text-white/50 uppercase tracking-wide font-title mt-1">Institutional Clients</p>
                </div>
              </div>
            </div>
            
            <div className="relative h-80 rounded-xl overflow-hidden shadow-xl border border-white/10">
              <Image
                src="/images/truck.png"
                alt="Logistics truck container"
                fill
                className="object-cover filter brightness-95"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-white border-t border-gray-100 bg-grain text-center z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl font-sans font-bold text-[#1A3C2E]">
            Ready to experience better supply consistency?
          </h2>
          <p className="text-sm text-gray-600 font-sans leading-relaxed max-w-xl mx-auto">
            Get in touch with our sales division to discuss bulk delivery contracts, trial shipments, and custom specification matching.
          </p>
          <div className="flex gap-4 justify-center pt-2">
            <Link href="/contact" className="btn-primary">
              Contact Sales
              <ArrowRight size={16} />
            </Link>
            <a
              href="https://wa.me/918191850001"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              <MessageCircle size={16} />
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
