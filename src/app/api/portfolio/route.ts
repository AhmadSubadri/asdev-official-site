export const dynamic = 'force-dynamic'

import { db } from '@/lib/db'
import { getAuthUser } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const portfolioSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  image: z.string(),
  category: z.string(),
  link: z.string().optional(),
  technologies: z.string().optional(),
  order: z.number().optional().default(0),
})

export async function GET() {
  try {
    const portfolios = await db.portfolio.findMany({
      orderBy: { order: 'asc' },
    })
    return NextResponse.json({ success: true, data: portfolios }, { status: 200 })
  } catch (error) {
    console.error('Fetch portfolios error:', error)
    return NextResponse.json({ success: false, message: 'Gagal mengambil data' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser()
    if (!user) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })

    const body = await request.json()
    const validatedData = portfolioSchema.parse(body)

    const portfolio = await db.portfolio.create({ data: validatedData })

    return NextResponse.json(
      { success: true, message: 'Portfolio berhasil dibuat', data: portfolio },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.issues }, { status: 400 })
    }
    return NextResponse.json({ success: false, message: 'Gagal membuat portfolio' }, { status: 500 })
  }
}
