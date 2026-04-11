import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined }

let prisma: PrismaClient | null = null

try {
  if (!globalForPrisma.prisma) {
    prisma = new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
    })
    globalForPrisma.prisma = prisma
  } else {
    prisma = globalForPrisma.prisma
  }
} catch (error) {
  console.error('Prisma Client initialization error:', error)
  // Return a proxy that won't crash but will show errors when used
  prisma = null
}

// Export a proxy object that handles undefined gracefully
export const db = new Proxy({} as any, {
  get: (target: any, prop: string | symbol) => {
    if (prisma === null) {
      return undefined
    }
    return (prisma as any)[prop]
  },
}) as PrismaClient










