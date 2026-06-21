<div align="center">

<img src="public/images/logo.jpg" alt="Yashobhagya Logo" width="100" height="100" style="border-radius: 50%;" />

# 🌿 Yashobhagya Enterprises

### *Natural Energy. Reliable Supply. Every Time.*

**Premium Biofuels · Natural Mineral Salts · Pan-India Logistics**

[![Next.js](https://img.shields.io/badge/Next.js-16.2.9-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://typescriptlang.org)
[![Prisma](https://img.shields.io/badge/Prisma-7.8-2D3748?style=for-the-badge&logo=prisma)](https://prisma.io)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)

</div>

---

## ✨ What is this?

The **official full-stack business website** for Yashobhagya Enterprises — a Pan-India manufacturer and bulk supplier of:

- 🪵 **Premium Seasoned Firewood** — Babul, Sisam, Liptis, Poplar & mixed varieties
- 🧱 **Biomass Briquettes** — Mustard, Sawdust & Bagasse (eco-friendly fuel)
- 🧂 **Natural Mineral Salts** — Black Salt (Kala Namak), Rock Salt (Sendha Namak) & Suzi Salt

Built from the ground up with a focus on **performance, elegance, and business utility**.

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router + Turbopack) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS v4 + UnoCSS |
| **Database** | PostgreSQL via Neon (serverless) |
| **ORM** | Prisma 7 |
| **Auth** | NextAuth v5 (credentials + role-based) |
| **Email** | Nodemailer + Gmail SMTP |
| **AI Chatbot** | Anthropic Claude (via AI SDK) |
| **File Uploads** | Uploadthing |
| **Animations** | Framer Motion + Three.js |
| **Charts** | Recharts |

---

## 🎯 Key Features

### 🏪 Public Website
- Stunning animated homepage with 3D background (Three.js)
- Full product catalog with categories and use cases
- Contact & bulk quote request form
- Photo gallery with lightbox
- About, Why Us, and company story pages
- WhatsApp direct connect integration
- SEO optimized — sitemap.xml, robots.txt, full metadata

### 📧 Automated Email System
- **Enquiry confirmation** — customers get an instant branded email when they submit a query
- **"We Will Reach You Soon"** — separate card for general enquiries
- **Quote request confirmation** — detailed card for specific product requests with next steps
- **Welcome email** — sent to new users on registration
- All emails feature the company logo, brand colors, and contact details

### 🤖 AI Sales Chatbot
- Powered by Anthropic Claude
- Answers product queries, pricing, and logistics questions
- Captures chat leads automatically to the database

### 🛠️ Admin Dashboard
- Protected with role-based auth (Admin / Sub-Admin)
- Manage enquiries, products, gallery, users & site settings
- Analytics with charts
- Drag-and-drop gallery reordering
- Image upload via Uploadthing

---

## 📁 Project Structure

```
src/
├── app/
│   ├── (public pages)     # Home, Products, About, Contact, Gallery
│   ├── admin/             # Protected admin dashboard
│   ├── api/               # Auth + AI chat routes
│   └── actions/           # Server actions (enquiry, register, admin)
├── components/            # Reusable UI components
└── lib/
    ├── emails.ts          # Branded HTML email templates
    ├── mailer.ts          # Nodemailer transporter
    └── prisma.ts          # Prisma client singleton
prisma/
├── schema.prisma          # DB schema
└── seed.ts                # Database seeder
public/images/             # Product & company images
```

---

## ⚙️ Getting Started

```bash
# Clone the repo
git clone https://github.com/Kartik-Pundir/Yashobhagye.git
cd Yashobhagye

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Fill in your DATABASE_URL, AUTH_SECRET, GMAIL credentials, etc.

# Push database schema
npx prisma db push

# Seed the database
npx prisma db seed

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

---

## 🔐 Environment Variables

```env
DATABASE_URL=           # PostgreSQL connection string (Neon recommended)
AUTH_SECRET=            # NextAuth signing secret
NEXTAUTH_URL=           # App URL
ANTHROPIC_API_KEY=      # Claude AI for chatbot
GMAIL_USER=             # Gmail address for sending emails
GMAIL_APP_PASSWORD=     # Gmail App Password (16 chars)
UPLOADTHING_SECRET=     # Uploadthing file upload secret
UPLOADTHING_APP_ID=     # Uploadthing app ID
```

---

## 🏢 About Yashobhagya Enterprises

Headquartered across **Roorkee (Uttarakhand)** and **Saharanpur (Uttar Pradesh)**, Yashobhagya Enterprises operates its own processing plant in Gangalhedi and runs self-owned transport logistics for Pan-India delivery.

> *Delivering quality natural resources to industries, institutions, and bulk buyers across India.*

📞 **+91 81918 50001** &nbsp;|&nbsp; 🕐 Mon–Sat, 9 AM – 7 PM IST

---

<div align="center">

**Built with ❤️ for Yashobhagya Enterprises**

</div>
