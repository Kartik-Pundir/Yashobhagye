import { anthropic } from '@ai-sdk/anthropic'
import { streamText } from 'ai'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // Safety fallback: if no API key is configured, return a mock response
    if (!process.env.ANTHROPIC_API_KEY) {
      console.warn("ANTHROPIC_API_KEY is not set. Simulating chatbot response.")
      
      const lastMessage = messages[messages.length - 1]?.content || ""
      const text = lastMessage.toLowerCase().trim()
      let reply = ""

      console.log("CHATBOT DEBUG - Last Message Content:", lastMessage)
      console.log("CHATBOT DEBUG - Full Messages Array:", JSON.stringify(messages))

      const hasBriquette = text.includes("briquette") || text.includes("mustard") || text.includes("sawdust") || text.includes("bagasse")
      const hasFirewood = text.includes("firewood") || text.includes("wood") || text.includes("liptis") || text.includes("poplar") || text.includes("poppler") || text.includes("sisam") || text.includes("sheesham") || text.includes("babul") || text.includes("kikar")
      const hasSalt = text.includes("salt") || text.includes("namak") || text.includes("mineral") || text.includes("rock") || text.includes("sendha") || text.includes("black") || text.includes("kala") || text.includes("suzi")
      const hasAddress = text.includes("address") || text.includes("office") || text.includes("location") || text.includes("branch") || text.includes("factory") || text.includes("located") || text.includes("situated") || text.includes("where is your") || text.includes("where are you")
      const hasDelivery = text.includes("deliver") || text.includes("delivery") || text.includes("ship") || text.includes("shipping") || text.includes("transport") || text.includes("fleet") || text.includes("freight") || text.includes("truck") || text.includes("pan-india") || text.includes("where")
      const hasPrice = text.includes("price") || text.includes("cost") || text.includes("quote") || text.includes("contract") || text.includes("pricing") || text.includes("rate") || text.includes("charges")
      const hasContact = text.includes("contact") || text.includes("email") || text.includes("phone") || text.includes("number") || text.includes("whatsapp") || text.includes("call")
      const hasProducts = text.includes("product") || text.includes("catalog") || text.includes("offering") || text.includes("list") || text.includes("sell") || text.includes("supply") || text.includes("variety")
      const hasGreeting = text.includes("hello") || text.includes("hi") || text.includes("hey") || text.includes("welcome")
      const hasMinOrder = text.includes("minimum") || text.includes("min order") || text.includes("minimum order") || text.includes("moq") || text.includes("least quantity") || text.includes("small order")
      const hasPayment = text.includes("payment") || text.includes("pay") || text.includes("advance") || text.includes("credit") || text.includes("upi") || text.includes("bank") || text.includes("neft") || text.includes("rtgs") || text.includes("cheque")
      const hasSample = text.includes("sample") || text.includes("trial") || text.includes("test") || text.includes("demo")
      const hasQuality = text.includes("quality") || text.includes("certif") || text.includes("iso") || text.includes("standard") || text.includes("grade") || text.includes("specification") || text.includes("moisture") || text.includes("calorific")
      const hasAbout = text.includes("about") || text.includes("company") || text.includes("yashobhagya") || text.includes("who are you") || text.includes("tell me about") || text.includes("your business")
      const hasTime = text.includes("time") || text.includes("hours") || text.includes("open") || text.includes("when") || text.includes("timing") || text.includes("available")

      if (hasMinOrder) {
        reply = "Our minimum order quantity is:\n• Firewood: 5 Metric Tons (MT)\n• Biomass Briquettes: 3 MT\n• Salts: 1 MT\n\nFor larger contract volumes (monthly 50+ MT), we offer special pricing and dedicated account managers. Please share your name and phone number to discuss your requirements!"
      } else if (hasPayment) {
        reply = "We accept all major payment modes:\n• Bank Transfer (NEFT/RTGS)\n• UPI / Google Pay\n• Cheque (for registered buyers)\n• 30-day credit terms available for verified bulk buyers\n\nFor new clients, we typically require 50% advance and 50% on dispatch. Share your name and phone to discuss credit terms with our sales team!"
      } else if (hasSample) {
        reply = "Yes, we provide samples! Here's how:\n• Briquettes: 10-20 kg sample bags available\n• Firewood: Small bundles for calorific testing\n• Salts: 1-5 kg sample pouches\n\nSamples are dispatched via courier at actual freight cost. Please share your name, phone number, and delivery address and we'll arrange it right away!"
      } else if (hasQuality) {
        reply = "Our products meet strict quality standards:\n• Firewood: Moisture content below 15%, seasoned for 6+ months\n• Briquettes: Calorific value 3800-4500 Kcal/kg, ash content below 8%\n• Salts: Processed at our certified Gangalhedi factory\n\nWe provide quality test reports and certificates on request. Share your name and phone number for detailed specifications!"
      } else if (hasAbout) {
        reply = "Yashobhagya Enterprises is a Pan-India manufacturer and bulk supplier of premium biofuels and natural mineral salts. Founded and operated from Roorkee (Uttarakhand) and Saharanpur (Uttar Pradesh), we run our own processing plant in Gangalhedi and a self-owned fleet of 20+ cargo trucks for direct delivery across India. We serve 50+ industries including food processing, brick kilns, sugar mills, and pharmaceutical companies. How can we help you today?"
      } else if (hasTime) {
        reply = "Our business hours are Monday to Saturday, 9:00 AM to 7:00 PM IST. You can reach us at +91 81918 50001 or WhatsApp us at wa.me/918191850001 anytime — we respond within 2 hours during business hours. Would you like us to call you back at a specific time?"
      } else if (hasBriquette) {
        reply = "We manufacture high-density biomass briquettes in bulk: Mustard husk, Wood sawdust, and Sugarcane Bagasse briquettes. They are highly efficient coal replacements for boilers, brick kilns, and metal furnaces. We ship in bulk PAN India. Could you please share your name and phone number so our sales division can calculate a freight and volume quote?"
      } else if (hasFirewood) {
        reply = "We supply seasoned Liptis (Eucalyptus), Poppler (Poplar), Mix Wood, Sheesham (Sisam), and Babul logs. We size them to fit your boiler or kiln requirements and deliver PAN India. Would you like a price estimate? Please share your name and phone number!"
      } else if (hasSalt) {
        reply = "Our salt lineup includes Rock Salt (Sendha Namak), processed Black Salt (Kala Namak), Suzi Salt, and bulk Natural Mineral Salts. They are processed at our Gangalhedi factory. What volume are you looking for? Share your name and phone number, and our sales team will get back to you shortly!"
      } else if (hasAddress) {
        reply = "We have branch offices in Roorkee (Sakumbari Enclave) and Saharanpur (Kapil Vihar Colony), and our main processing factory is located in Gangalhedi, Saharanpur, UP (PIN 247341). Our contact email is pundirranjeet@gmail.com. Can I help you request a quote for your area? Please share your name and phone number!"
      } else if (hasDelivery) {
        reply = "Yashobhagya Enterprises guarantees PAN India delivery! We manage shipping using our self-owned transport truck fleet of over 20 cargo trucks directly from our Gangalhedi processing unit. Please share your name, phone number, and delivery pin code so we can quote you shipping rates."
      } else if (hasPrice) {
        reply = "We offer competitive contract-based wholesale pricing based on your monthly requirements. To provide a precise quote, please share your name, phone number, product interest, and monthly volume requirement."
      } else if (hasContact) {
        reply = "You can reach us at pundirranjeet@gmail.com or via phone at +91 81918 50001. We are open Monday to Saturday, 9:00 AM to 7:00 PM IST. Would you like a callback? Please share your name and phone number."
      } else if (hasProducts) {
        reply = "Yashobhagya Enterprises supplies:\n1. Biofuels: Seasoned Firewood (Liptis, Poplar, Mix Wood, Sheesham, Babul) and Biomass Briquettes (Mustard, Sawdust, Bagasse).\n2. Salts: Black Salt (Kala Namak), Rock Salt (Sendha Namak), Suzi Salt, and bulk Natural Mineral Salts.\nAll materials are processed in our own facilities and delivered PAN India. Please share your name and phone number to request samples or get a callback!"
      } else if (hasGreeting) {
        reply = "Hello! Welcome to Yashobhagya Enterprises. We manufacture and supply premium biofuels (biomass briquettes, split seasoned firewood logs) and natural mineral salts in bulk. How can I help you today? Please share your name and phone number to request a quote or callback!"
      } else {
        reply = "Thank you for reaching out. We supply seasoned firewood, biomass briquettes, and natural mineral salts in bulk PAN India. Could you please share your name, phone number, and question details so our sales managers can reach you directly with a personalized response?"
      }

      // Simple mock streaming response format
      return new Response(
        JSON.stringify({
          id: "mock-id",
          role: "assistant",
          content: reply,
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      )
    }

    const result = await streamText({
      model: anthropic('claude-3-5-sonnet-20241022'),
      system: `You are a helpful, professional sales assistant for Yashobhagya Enterprises, a leading manufacturer and supplier of premium biofuels (firewood varieties like Liptis, Poplar, Mix Wood, Sheesham, Babul; and biomass briquettes like Mustard, Sawdust, Bagasse) and natural mineral/food salts (Black Salt, Rock Salt, Suzi Salt, Natural Mineral Salts).
      Key details:
      - We deliver PAN India using our self-owned transport fleet and third-party logistics.
      - Contact phone number: +91 81918 50001 / 8191850001
      - Contact email: pundirranjeet@gmail.com
      - Corporate Leadership: Yashobhagya Enterprises management team.
      - Corporate Offices: 
        1. Roorkee Branch: C-10, Sakumbari Enclave, Roorkee, Haridwar, Uttarakhand - 247667.
        2. Saharanpur Branch: House No. 3/3501, Kapil Vihar Colony, Saharanpur, Uttar Pradesh - 247001.
        3. Main Factory Unit: Bhagwanpur Road, Opp. Dak Bungalow, Gangalhedi, Saharanpur, Uttar Pradesh - 247341.
      - Help customers with specifications, pricing estimates, and shipping quotes.
      Always be polite, professional, and concise. Do NOT mention names of specific directors or MDs (like Ranjeet Singh or Dr. Meena Kumari Tomar) in your answers.
      
      If someone wants a quote or to place an order, you MUST collect their name and phone number. When they provide these details, use the submitLead tool to register their lead. After submitting, thank them and tell them that our sales team will reach out shortly.`,
      messages,
      tools: {
        submitLead: {
          description: 'Submit customer contact details for a product quote or bulk supply enquiry.',
          parameters: z.object({
            name: z.string().describe('The name of the customer.'),
            phone: z.string().describe('The phone number of the customer.'),
            query: z.string().describe('The product interest or inquiry details.'),
          }),
          execute: async ({ name, phone, query }: any) => {
            try {
              const lead = await prisma.chatLead.create({
                data: { name, phone, query }
              })
              return {
                success: true,
                message: `Lead recorded successfully for ${name}. Our sales team will contact you shortly at ${phone}.`,
                leadId: lead.id
              }
            } catch (e) {
              console.error("Failed to save chat lead to database:", e)
              return {
                success: false,
                message: "Failed to register lead in database. Please contact us directly via the contact form or phone.",
                leadId: ""
              }
            }
          }
        }
      } as any
    })

    return result.toTextStreamResponse()
  } catch (error: any) {
    console.error("Chat API Route Error:", error)
    return new Response(
      JSON.stringify({ error: error.message || "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    )
  }
}
