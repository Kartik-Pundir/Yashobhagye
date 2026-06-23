import { prisma } from '@/lib/prisma'
import ProductGridClient from '@/components/ProductGridClient'
import Image from 'next/image'

export const dynamic = 'force-dynamic'

interface PageProps {
  searchParams: Promise<{ category?: string }>
}

// Fallback products array in case the database connection fails or is empty
const FALLBACK_PRODUCTS = [
  {
    id: "fb-1",
    name: "All Varieties of Firewood",
    slug: "all-varieties-of-firewood",
    description: "Premium mix of seasoned and split acacia, eucalyptus, and mango wood. Known for  output and extremely low moisture content. Sourced sustainably.",
    category: "Firewood",
    useCases: ["Boiler Fuel", "Domestic Heating", "Commercial Cooking", "Industrial Furnaces"],
    image: "/images/firewood.jpg",
    active: true,
  },
  {
    id: "fb-1b",
    name: "Biofuel Firewood",
    slug: "biofuel-firewood",
    description: "High-density seasoned wood logs harvested and prepared for industrial combustion. Low moisture content, high energy density, and sustainable sourcing.",
    category: "Firewood",
    useCases: ["Industrial Boilers", "Furnaces", "Brick Kilns", "Co-generation Plants"],
    image: "/images/biofuel-firewood-v2.jpg",
    active: true,
  },
  {
    id: "fb-2",
    name: "Mustard Briquettes",
    slug: "mustard-briquettes",
    description: "Eco-friendly biomass fuel briquettes made from compressed mustard crop waste. Provides intense heat, long burn times, and consistent energy value with minimal residue.",
    category: "Briquettes",
    useCases: ["Industrial Boilers", "Brick Kilns", "Ceramic Processing", "Metal Melting Furnaces"],
    image: "/images/mustard-briquettes.png",
    active: true,
  },
  {
    id: "fb-3",
    name: "Sawdust Briquettes",
    slug: "sawdust-briquettes",
    description: "High-density biomass briquettes made of pure compressed wood sawdust. Standard shape, easy to handle, low ash content, and highly efficient carbon neutral option.",
    category: "Briquettes",
    useCases: ["Power Plants", "Industrial Furnaces", "Commercial Pizza Ovens", "Textile Mills"],
    image: "/images/sawdust-briquettes-v2.jpg",
    active: true,
  },
  {
    id: "fb-4",
    name: "Bagasse Briquettes",
    slug: "bagasse-briquettes",
    description: "Renewable biomass briquettes manufactured from sugarcane bagasse crop residues. Superior combustion efficiency and  performance.",
    category: "Briquettes",
    useCases: ["Sugar Mill Co-generation", "Paper and Pulp Industries", "Chemical Plants", "Food Processing"],
    image: "/images/bagasse-briquettes.jpg",
    active: true,
  },
  {
    id: "fb-5",
    name: "Black Salt (Kala Namak)",
    slug: "black-salt",
    description: "Traditional mineral-rich rock salt processed under precise conditions to generate its unique sulfurous aroma and taste. Extensively used in culinary and medicinal contexts.",
    category: "Salts",
    useCases: ["Spices and Condiments", "Ayurvedic Remedies", "Salad Seasonings", "Chemical Manufacturing"],
    image: "/images/black-salt.jpg",
    active: true,
  },
  {
    id: "fb-7",
    name: "Suzi Salt",
    slug: "suzi-salt",
    description: "Fine-grade processed salt optimized for culinary applications, snack seasonings, and food production. Free-flowing with standard mineral balance.",
    category: "Salts",
    useCases: ["Food Processing", "Snack Manufacturing", "Table Seasonings", "Bakery Formulations"],
    image: "/images/suzi-salt-v3.jpg",
    active: true,
  },
  {
    id: "fb-8",
    name: "Natural Mineral Salts",
    slug: "industrial-salt",
    description: "High-purity raw mineral salt crystals designed for chemical manufacturing, food processing, water softening, and industrial applications. Available in bulk bags.",
    category: "Salts",
    useCases: ["Chemical Manufacturing", "Water Softening", "Textile Dyeing", "Ice Melt Formulations"],
    image: "/images/industrial-salt-v2.jpg",
    active: true,
  },
]

export default async function ProductsPage({ searchParams }: PageProps) {
  // Await the search parameters for Next.js 15+ App Router
  const params = await searchParams
  const categoryFilter = params.category

  let products: any[] = []

  try {
    // Attempt database fetch
    products = await prisma.product.findMany({
      where: {
        active: true,
        ...(categoryFilter && categoryFilter !== 'All' ? { category: categoryFilter } : {})
      },
      orderBy: { createdAt: 'asc' }
    })
  } catch (error) {
    console.error("Failed to fetch products from Prisma, using fallback static data:", error)
  }

  // Fallback if DB query fails or has no products loaded
  if (products.length === 0) {
    products = categoryFilter && categoryFilter !== 'All'
      ? FALLBACK_PRODUCTS.filter(p => p.category === categoryFilter)
      : FALLBACK_PRODUCTS
  }

  return (
    <div className="relative flex flex-col w-full bg-[#F9F6F0] min-h-screen pt-24">
      {/* Page Header */}
      <section className="relative py-20 bg-[#1A3C2E] text-white overflow-hidden bg-grain">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#C4862A_1px,transparent_1px)] [background-size:24px_24px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#E8D5B0] font-title px-3 py-1 rounded-full bg-white/5 border border-white/10">
            Wholesale Catalog
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#E8D5B0]">Our Product Offerings</h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-white/75 font-sans leading-relaxed">
            Premium biofuels and industrial raw salts sourced directly from local producers, backed by quality assurance and self-owned logistics.
          </p>
        </div>
      </section>

      {/* Product Grid & Filters */}
      <section className="py-20 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProductGridClient products={products} />
        </div>
      </section>

      {/* Firewood Varieties Section */}
      {(!categoryFilter || categoryFilter === 'All' || categoryFilter === 'Firewood') && (
        <section className="py-20 bg-white border-t border-gray-100 z-10 bg-grain">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-[#C4862A] font-title">
                Firewood Catalog
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1A3C2E] mt-2">
                Available Firewood Varieties
              </h2>
              <p className="text-sm text-gray-500 font-sans mt-3">
                We harvest and size different types of firewood logs tailored for specific industrial boiler requirements and heat intensity.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                {
                  name: "Liptis (Eucalyptus)",
                  image: "/images/firewood-liptis-v2.jpg",
                  description: "High density eucalyptus wood logs. Burns hot and steady, preferred for heavy industrial boilers.",
                  calorific: "4,000 - 4,400 kcal/kg"
                },
                {
                  name: "Poppler (Poplar)",
                  image: "/images/firewood-poppler-v2.jpg",
                  description: "Lightweight poplar logs. Easy to ignite, ideal for rapid heat startup phases.",
                  calorific: "3,800 - 4,000 kcal/kg"
                },
                {
                  name: "Mix Wood",
                  image: "/images/firewood-mix.jpg",
                  description: "A seasoned combination of local acacia, mango, and hardwood. Standard, cost-effective industrial fuel.",
                  calorific: "3,900 - 4,200 kcal/kg"
                },
                {
                  name: "Sisam (Sheesham)",
                  image: "/images/firewood-sisam-v2.jpg",
                  description: "Premium  hardwood logs. Exceptional heat retention, extremely long burn time.",
                  calorific: "4,500 - 4,800 kcal/kg"
                },
                {
                  name: "Babul (Kikar)",
                  image: "/images/firewood-babul-v2.jpg",
                  description: "Dense acacia firewood logs. Consistent combustion rates and highly efficient energy output.",
                  calorific: "4,300 - 4,500 kcal/kg"
                }
              ].map((wood, idx) => (
                <div key={idx} className="bg-[#F9F6F0]/50 rounded-xl overflow-hidden border border-gray-100 hover:border-[#E8D5B0] shadow-sm transition flex flex-col bg-grain group">
                  <div className="relative h-44 w-full">
                    <Image
                      src={wood.image}
                      alt={wood.name}
                      fill
                      className="object-cover group-hover:scale-102 transition duration-300"
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-grow space-y-2">
                    <h4 className="font-serif text-sm font-bold text-[#1A3C2E]">
                      {wood.name}
                    </h4>
                    <p className="text-[11px] text-gray-500 font-sans leading-relaxed flex-grow">
                      {wood.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
