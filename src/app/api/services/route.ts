export const dynamic = 'force-dynamic'

import { db } from '@/lib/db'
import { getAuthUser } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const serviceSchema = z.object({
  title: z.string().min(3, 'Judul minimal 3 karakter'),
  description: z.string().min(10, 'Deskripsi minimal 10 karakter'),
  icon: z.string().optional(),
  detail: z.string().optional(),
  image: z.string().optional(),
  order: z.number().optional().default(0),
})

// GET all services
export async function GET() {
  try {
    const services = await db.service.findMany({
      orderBy: { order: 'asc' },
    })

    return NextResponse.json(
      {
        success: true,
        data: services,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Fetch services error:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Gagal mengambil data layanan',
      },
      { status: 500 }
    )
  }
}

// POST create service
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const user = await getAuthUser()
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: 'Unauthorized',
        },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validatedData = serviceSchema.parse(body)

    const service = await db.service.create({
      data: validatedData,
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Layanan berhasil dibuat',
        data: service,
      },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validasi gagal',
          errors: error.issues,
        },
        { status: 400 }
      )
    }

    console.error('Create service error:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Gagal membuat layanan',
      },
      { status: 500 }
    )
  }
}
