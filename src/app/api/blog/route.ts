export const dynamic = 'force-dynamic'

import { db } from '@/lib/db'
import { getAuthUser } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const blogSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3),
  content: z.string().min(50),
  excerpt: z.string().optional(),
  image: z.string().optional(),
  published: z.boolean().optional().default(false),
})

export async function GET() {
  try {
    const articles = await db.blogArticle.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json({ success: true, data: articles }, { status: 200 })
  } catch (error) {
    console.error('Fetch blog error:', error)
    return NextResponse.json({ success: false, message: 'Gagal mengambil data' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser()
    if (!user) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })

    const body = await request.json()
    const validatedData = blogSchema.parse(body)

    // Check if slug already exists
    const existingArticle = await db.blogArticle.findUnique({
      where: { slug: validatedData.slug },
    })

    if (existingArticle) {
      return NextResponse.json({ success: false, message: 'Slug sudah digunakan' }, { status: 400 })
    }

    const article = await db.blogArticle.create({ data: validatedData })

    return NextResponse.json(
      { success: true, message: 'Artikel berhasil dibuat', data: article },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.issues },
        { status: 400 }
      )
    }
    return NextResponse.json({ success: false, message: 'Gagal membuat artikel' }, { status: 500 })
  }
}

