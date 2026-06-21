import 'dotenv/config'
import { prisma } from '../src/lib/prisma'
import { Role, EnquiryStatus } from '@prisma/client'
import bcrypt from 'bcryptjs'

async function main() {
  console.log('Seeding database...')

  // 1. Clean existing data
  await prisma.account.deleteMany({})
  await prisma.session.deleteMany({})
  await prisma.user.deleteMany({})
  await prisma.product.deleteMany({})
  await prisma.enquiry.deleteMany({})
  await prisma.chatLead.deleteMany({})
  await prisma.galleryImage.deleteMany({})
  await prisma.siteSetting.deleteMany({})

  // 2. Create default Admin
  const hashedPassword = await bcrypt.hash('adminpassword123', 10)
  const admin = await prisma.user.create({
    data: {
      name: 'Admin Yashobhagya',
      email: 'admin@yashobhagya.com',
      password: hashedPassword,
      role: Role.ADMIN,
    },
  })
  console.log(`Created default Admin user: ${admin.email}`)

  // 3. Create default Sub-Admin
  const subAdminPassword = await bcrypt.hash('subadmin123', 10)
  const subAdmin = await prisma.user.create({
    data: {
      name: 'SubAdmin Yashobhagya',
      email: 'subadmin@yashobhagya.com',
      password: subAdminPassword,
      role: Role.SUB_ADMIN,
    },
  })
  console.log(`Created default Sub-Admin user: ${subAdmin.email}`)

  // 4. Create default SiteSettings
  const settings = await prisma.siteSetting.create({
    data: {
      id: 'default',
      whatsappNumber: '918191850001',
      contactEmail: 'pundirranjeet@gmail.com',
      contactPhone: '+91 81918 50001',
      address: 'Yashobhagya Enterprises, Roorkee, Uttarakhand, India - 247667',
    },
  })
  console.log('Created default site settings.')

  // 5. Create default Products
  const products = [
    {
      name: 'All Varieties of Firewood',
      slug: 'all-varieties-of-firewood',
      description: 'Premium mix of seasoned and split acacia, eucalyptus, and mango wood. Known for high calorific output and extremely low moisture content. Sourced sustainably.',
      category: 'Firewood',
      useCases: ['Boiler Fuel', 'Domestic Heating', 'Commercial Cooking', 'Industrial Furnaces'],
      image: '/images/firewood.jpg',
      active: true,
    },
    {
      name: 'Biofuel Firewood',
      slug: 'biofuel-firewood',
      description: 'High-density seasoned wood logs harvested and prepared for industrial combustion. Low moisture content, high energy density, and sustainable sourcing.',
      category: 'Firewood',
      useCases: ['Industrial Boilers', 'Furnaces', 'Brick Kilns', 'Co-generation Plants'],
      image: '/images/biofuel-firewood-v2.jpg',
      active: true,
    },
    {
      name: 'Mustard Briquettes',
      slug: 'mustard-briquettes',
      description: 'Eco-friendly biomass fuel briquettes made from compressed mustard crop waste. Provides intense heat, long burn times, and consistent energy value with minimal residue.',
      category: 'Briquettes',
      useCases: ['Industrial Boilers', 'Brick Kilns', 'Ceramic Processing', 'Metal Melting Furnaces'],
      image: '/images/mustard-briquettes.png',
      active: true,
    },
    {
      name: 'Sawdust Briquettes',
      slug: 'sawdust-briquettes',
      description: 'High-density biomass briquettes made of pure compressed wood sawdust. Standard shape, easy to handle, low ash content, and highly efficient carbon neutral option.',
      category: 'Briquettes',
      useCases: ['Power Plants', 'Industrial Furnaces', 'Commercial Pizza Ovens', 'Textile Mills'],
      image: '/images/sawdust-briquettes-v2.jpg',
      active: true,
    },
    {
      name: 'Bagasse Briquettes',
      slug: 'bagasse-briquettes',
      description: 'Renewable biomass briquettes manufactured from sugarcane bagasse crop residues. Superior combustion efficiency and high calorific performance.',
      category: 'Briquettes',
      useCases: ['Sugar Mill Co-generation', 'Paper and Pulp Industries', 'Chemical Plants', 'Food Processing'],
      image: '/images/bagasse-briquettes.jpg',
      active: true,
    },
    {
      name: 'Black Salt (Kala Namak)',
      slug: 'black-salt',
      description: 'Traditional mineral-rich rock salt processed under precise conditions to generate its unique sulfurous aroma and taste. Extensively used in culinary and medicinal contexts.',
      category: 'Salts',
      useCases: ['Spices and Condiments', 'Ayurvedic Remedies', 'Salad Seasonings', 'Chemical Manufacturing'],
      image: '/images/black-salt.jpg',
      active: true,
    },
    {
      name: 'Rock Salt (Sendha Namak)',
      slug: 'rock-salt',
      description: 'Pure, organic, unrefined rock salt crystals sourced from natural salt range deposits. Rich in trace minerals, offering a cleaner, healthier alternative to refined table salt.',
      category: 'Salts',
      useCases: ['Culinary Seasoning', 'Food Preservation', 'Water Softening systems', 'Spa and Wellness Therapies'],
      image: '/images/rock-salt.jpg',
      active: true,
    },
    {
      name: 'Suzi Salt',
      slug: 'suzi-salt',
      description: 'Fine-grade processed salt optimized for culinary applications, snack seasonings, and food production. Free-flowing with standard mineral balance.',
      category: 'Salts',
      useCases: ['Food Processing', 'Snack Manufacturing', 'Table Seasonings', 'Bakery Formulations'],
      image: '/images/suzi-salt-v3.jpg',
      active: true,
    },
    {
      name: 'Natural Mineral Salts',
      slug: 'industrial-salt',
      description: 'High-purity raw mineral salt crystals designed for chemical manufacturing, food processing, water softening, and industrial applications. Available in bulk bags.',
      category: 'Salts',
      useCases: ['Chemical Manufacturing', 'Water Softening', 'Textile Dyeing', 'Ice Melt Formulations'],
      image: '/images/industrial-salt-v2.jpg',
      active: true,
    },
  ]

  for (const product of products) {
    await prisma.product.create({
      data: product,
    })
  }
  console.log('Seeded default products.')

  // 6. Create sample Enquiries
  await prisma.enquiry.createMany({
    data: [
      {
        name: 'Rajesh Kumar',
        phone: '9267953513',
        email: 'rajesh@kumarindustries.com',
        product: 'Mustard Briquettes',
        message: 'Looking for a bulk supply of 50 tons of Mustard Briquettes per month. Please share price quote and shipping timeline for Haryana location.',
        status: EnquiryStatus.NEW,
      },
      {
        name: 'Amit Patel',
        phone: '9822334455',
        email: 'amit@patelfoods.in',
        product: 'Rock Salt',
        message: 'We require high purity Sendha Namak crystals in 25kg bags for food processing. Daily requirement approx 2 tons.',
        status: EnquiryStatus.IN_PROGRESS,
      },
      {
        name: 'Sunita Sharma',
        phone: '9988776655',
        email: 'sunita@ayurvedahealth.org',
        product: 'Black Salt',
        message: 'Seeking premium grade Kala Namak for therapeutic product formulation. Please send samples and pricing list.',
        status: EnquiryStatus.RESOLVED,
      },
    ],
  })
  console.log('Seeded sample enquiries.')

  // 7. Create sample Chat Leads
  await prisma.chatLead.createMany({
    data: [
      {
        name: 'Vikram Singh',
        phone: '9267953513',
        query: 'Wants to purchase 10 tons of Firewood for a boiler factory in Punjab.',
      },
      {
        name: 'Pooja Gupta',
        phone: '9765432109',
        query: 'Enquired about Sawdust Briquettes sample bags.',
      },
    ],
  })
  console.log('Seeded sample chat leads.')

  const galleryImages = [
    { url: '/images/firewood-mix.jpg', order: 0 },
    { url: '/images/mustard-briquettes.png', order: 1 },
    { url: '/images/sawdust-briquettes-v2.jpg', order: 2 },
    { url: '/images/bagasse-briquettes.jpg', order: 3 },
    { url: '/images/black-salt.jpg', order: 4 },
    { url: '/images/rock-salt.jpg', order: 5 },
    { url: '/images/suzi-salt-v3.jpg', order: 6 },
    { url: '/images/industrial-salt-v2.jpg', order: 7 },
    { url: '/images/firewood-poppler-v2.jpg', order: 8 },
    { url: '/images/firewood-liptis-v2.jpg', order: 9 },
    { url: '/images/firewood-babul-v2.jpg', order: 10 },
    { url: '/images/firewood-sisam-v2.jpg', order: 11 },
  ]
  for (const img of galleryImages) {
    await prisma.galleryImage.create({
      data: img,
    })
  }
  console.log('Seeded sample gallery images.')

  console.log('Database seeding completed successfully.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
