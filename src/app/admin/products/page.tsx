import { prisma } from '@/lib/prisma'
import ProductsManagerClient from '@/components/ProductsManagerClient'

export default async function AdminProductsPage() {
  let products = []

  try {
    products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' }
    })
  } catch (error) {
    console.error("Failed to query database products, using fallbacks:", error)
    
    // Safety Fallback list
    products = [
      {
        id: "fb-1",
        name: "All Varieties of Firewood",
        slug: "all-varieties-of-firewood",
        description: "Premium mix of seasoned and split acacia, eucalyptus, and mango wood. Known for high calorific output and extremely low moisture content. Sourced sustainably.",
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
        description: "Renewable biomass briquettes manufactured from sugarcane bagasse crop residues. Superior combustion efficiency and high calorific performance.",
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
        id: "fb-6",
        name: "Rock Salt (Sendha Namak)",
        slug: "rock-salt",
        description: "Pure, organic, unrefined rock salt crystals sourced from natural salt range deposits. Rich in trace minerals, offering a cleaner, healthier alternative to refined table salt.",
        category: "Salts",
        useCases: ["Culinary Seasoning", "Food Preservation", "Water Softening systems", "Spa and Wellness Therapies"],
        image: "/images/rock-salt.jpg",
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
  }

  return (
    <div className="space-y-6">
      <ProductsManagerClient initialProducts={products} />
    </div>
  )
}
