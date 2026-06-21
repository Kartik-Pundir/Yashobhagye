import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

let prismaInstance: PrismaClient
const rawConnectionString = process.env.DATABASE_URL

function getConnectionString(url: string | undefined): string | undefined {
  if (!url) return undefined
  if (url.startsWith('prisma+postgres://')) {
    try {
      const parsedUrl = new URL(url)
      const apiKey = parsedUrl.searchParams.get('api_key')
      if (apiKey) {
        const decoded = Buffer.from(apiKey, 'base64').toString('utf-8')
        const json = JSON.parse(decoded)
        if (json.databaseUrl) {
          return json.databaseUrl
        }
      }
    } catch (e) {
      console.error("Failed to parse prisma+postgres DATABASE_URL:", e)
    }
  }
  return url
}

const connectionString = getConnectionString(rawConnectionString)

if (globalForPrisma.prisma) {
  prismaInstance = globalForPrisma.prisma
} else {
  if (connectionString) {
    const pool = new Pool({ connectionString })
    const adapter = new PrismaPg(pool)
    prismaInstance = new PrismaClient({ adapter })
  } else {
    // Safe fallback for compilation and build steps where environment vars may be blank
    prismaInstance = new PrismaClient()
  }
}

export const prisma = prismaInstance

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
export default prisma
