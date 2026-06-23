import Image from 'next/image'
import { Leaf, Award, Shield, Eye, Flame, Compass } from 'lucide-react'

export default function AboutPage() {
  const values = [
    {
      icon: <Leaf className="w-6 h-6 text-[#C4862A]" />,
      title: "Ecological Sustainability",
      description: "We repurpose mustard husks, agricultural crop bagasse, and wood sawdust, preventing forest clearance and agricultural smoke pollution through biomass compaction."
    },
    {
      icon: <Award className="w-6 h-6 text-[#C4862A]" />,
      title: "Precision Standards",
      description: "From sizing firewood to maintaining custom sulfur levels in Black Salt formulations, our quality criteria ensure institutional-grade deliveries."
    },
    {
      icon: <Shield className="w-6 h-6 text-[#C4862A]" />,
      title: "Transparent Integrity",
      description: "We value long-term partnerships over short-term returns. We conduct accurate scale measurements and offer fixed-rate contract pricing options."
    },
    {
      icon: <Flame className="w-6 h-6 text-[#C4862A]" />,
      title: "Energy Independence",
      description: "We empower micro, small, and medium businesses to switch from imported fossil fuels (coal, gas) to Indian-harvested, low-carbon green biofuels."
    }
  ]

  return (
    <div className="relative flex flex-col w-full bg-[#F9F6F0] min-h-screen pt-24">
      {/* Page Header */}
      <section className="relative py-20 bg-[#1A3C2E] text-white overflow-hidden bg-grain">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#C4862A_1px,transparent_1px)] [background-size:24px_24px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#E8D5B0] font-title px-3 py-1 rounded-full bg-white/5 border border-white/10">
            Our Story & Values
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#E8D5B0]">About Yashobhagya Enterprises</h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-white/75 font-sans leading-relaxed">
            Supplying sustainable biofuel energies and raw mineral resources across India with dedicated logistics and strict quality controls.
          </p>
        </div>
      </section>

      {/* Story & Facility Section */}
      <section className="py-24 bg-white bg-grain">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Story Content */}
            <div className="space-y-6">
              <h2 className="text-3xl font-serif font-bold text-[#1A3C2E]">
                From Humble Roots to Industrial Supply Leadership
              </h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-sans">
                Founded over a decade ago, Yashobhagya Enterprises started as a local supplier of seasoned firewood. Recognizing the rising demand for green energy alternatives and the environmental damage caused by crop residue burning, we expanded our operations into compressed biomass briquettes.
              </p>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-sans">
                Today, our facility processes thousands of tons of biomass residues annually, translating crop wastes like mustard husk, sawdust, and bagasse into high-grade fuel briquettes. Along with biofuels, we have established a state-of-the-art salt processing division, supplying high-mineral Black Salt (Kala Namak) and Rock Salt (Sendha Namak) to food manufacturers and exporters.
              </p>
              <div className="border-l-4 border-[#C4862A] pl-4 italic text-sm text-[#1A3C2E] font-medium py-1">
                "Our mission is to replace carbon-heavy coal with sustainable, crop-derived biofuels, providing reliable supply chains that heavy industries can trust, all while keeping costs competitive."
              </div>
            </div>

            {/* Gallery Image */}
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-lg border border-[#E8D5B0]/20">
              <Image
                src="/images/firewood-mix.jpg"
                alt="Firewood seasoning area"
                fill
                className="object-cover hover:scale-102 transition duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-24 bg-[#F9F6F0] bg-grain border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[#C4862A] font-title mb-3">Our Foundation</h2>
            <h3 className="text-3xl font-serif font-bold text-[#1A3C2E]">The Values That Guide Us</h3>
            <p className="mt-4 text-base text-gray-600 font-sans">
              Our principles form the foundation of how we communicate with clients, maintain manufacturing sites, and handle logistics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((v, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-8 border border-gray-100/80 shadow-sm flex items-start gap-5 hover:shadow-md transition bg-grain"
              >
                <div className="w-12 h-12 rounded-lg bg-[#F9F6F0] flex items-center justify-center shrink-0">
                  {v.icon}
                </div>
                <div className="space-y-2">
                  <h4 className="font-serif text-lg font-bold text-[#1A3C2E]">{v.title}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed font-sans">{v.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team/Leadership Section */}
      <section className="py-24 bg-white bg-grain">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[#C4862A] font-title mb-3">Leadership</h2>
            <h3 className="text-3xl font-serif font-bold text-[#1A3C2E]">Our Leadership Team</h3>
            <p className="mt-4 text-base text-gray-600 font-sans">
              Our management combines decades of expertise in agricultural sourcing, processing engineering, and institutional logistics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                name: "Dr. Meena Kumari Tomar",
                role: "Company MD",
                initials: "MT",
                bio: "Dr. Meena Kumari Tomar brings over 15 years of administrative expertise and environmental advocacy to her role as Managing Director. Holding a Ph.D. in Resource Economics, she has led Yashobhagya Enterprises in establishing itself as a trusted partner for green biofuels and industrial minerals across northern India, focusing on sustainable crop residue processing and localized circular economies.",
                focus: "Strategic Operations, Environmental Economics & Corporate Relations"
              },
              {
                name: "Ranjeet Singh",
                role: "Director",
                initials: "RS",
                bio: "Ranjeet Singh directs industrial production, coordinates plant safety guidelines, and manages our private transport logistics network. With comprehensive experience in bulk manufacturing operations, he maintains rigorous quality control procedures for moisture contents and heat metrics, guaranteeing seamless direct-to-plant shipments for all corporate clients.",
                focus: "Supply Chain Management, Plant Operations & Quality Assurance"
              }
            ].map((member, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#E8D5B0]/30 rounded-2xl p-8 hover:shadow-lg hover:border-[#C4862A] transition-all duration-300 flex flex-col bg-grain text-center relative overflow-hidden group"
              >
                {/* Visual Accent */}
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#1A3C2E] via-[#C4862A] to-[#1A3C2E] opacity-75" />
                
                {/* Initials Circle Profile */}
                <div className="w-16 h-16 rounded-full bg-[#1A3C2E] text-[#E8D5B0] flex items-center justify-center font-serif text-xl font-bold mx-auto mb-6 shadow-md border border-[#E8D5B0]/20 group-hover:scale-105 transition-transform duration-300">
                  {member.initials}
                </div>

                <div className="space-y-4 flex-grow">
                  <div>
                    <h4 className="font-serif text-xl font-bold text-[#1A3C2E]">{member.name}</h4>
                    <p className="text-xs text-[#C4862A] font-title font-semibold uppercase tracking-wider mt-1">{member.role}</p>
                  </div>
                  
                  <p className="text-sm text-gray-600 font-sans leading-relaxed text-justify">
                    {member.bio}
                  </p>
                  
                  <div className="pt-4 border-t border-gray-100 mt-auto text-left">
                    <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold block mb-1">Core Focus Area</span>
                    <span className="text-xs font-medium text-[#1A3C2E] font-sans">{member.focus}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
