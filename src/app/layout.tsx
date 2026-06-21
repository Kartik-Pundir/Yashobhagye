import type { Metadata } from "next"
import { Inter, Playfair_Display, DM_Sans } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Chatbot from "@/components/Chatbot"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dmsans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Yashobhagya Enterprises | Premium Biofuels & Natural Mineral Salts",
  description: "Manufacturer and supply firm of premium seasoned firewood, eco-friendly biomass briquettes (mustard, sawdust, bagasse), and premium black and rock salts. Sourced sustainably, delivered pan-India with self-owned transport logistics.",
  keywords: ["firewood supply", "biomass briquettes India", "mustard briquettes", "sawdust briquettes", "bagasse briquettes", "black salt bulk", "rock salt supplier", "natural mineral salts India", "Yashobhagya Enterprises"],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F9F6F0] text-[#2D2D2D] selection:bg-[#C4862A] selection:text-white">
        <Navbar />
        <main className="flex-grow flex flex-col">
          {children}
        </main>
        <Footer />
        <Chatbot />
      </body>
    </html>
  )
}
