export const dynamic = 'force-dynamic'

import { db } from '@/lib/db'
import { sendContactNotification, sendContactReply } from '@/lib/email'
import { rateLimit, getClientIP, sanitizeInput } from '@/lib/security'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// Validation schema
const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().max(20).optional(),
  subject: z.string().max(200).optional(),
  message: z.string().min(10).max(5000),
})

export async function POST(request: NextRequest) {
  try {
    const clientIP = getClientIP(request)

    // Rate limiting: 5 requests per 1 hour per IP
    const rateLimitResult = rateLimit(clientIP, 5, 3600000)
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        {
          success: false,
          message: 'Terlalu banyak permintaan. Silakan coba lagi nanti.',
          retryAfter: rateLimitResult.retryAfter,
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(rateLimitResult.retryAfter),
          },
        }
      )
    }

    const body = await request.json()

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(body.name),
      email: sanitizeInput(body.email),
      phone: body.phone ? sanitizeInput(body.phone) : undefined,
      subject: body.subject ? sanitizeInput(body.subject) : undefined,
      message: sanitizeInput(body.message),
    }

    // Validate input
    const validatedData = contactSchema.parse(sanitizedData)

    // Save to database (if db available)
    let contactMessage = null
    try {
      if (db) {
        contactMessage = await db.contactMessage.create({
          data: {
            name: validatedData.name,
            email: validatedData.email,
            phone: validatedData.phone || null,
            subject: validatedData.subject || null,
            message: validatedData.message,
          },
        })
      }
    } catch (dbError) {
      console.error('Database error (continuing anyway):', dbError)
    }

    // Send admin notification email
    await sendContactNotification(validatedData)

    // Send auto-reply to visitor
    await sendContactReply(validatedData.email, validatedData.name)

    return NextResponse.json(
      {
        success: true,
        message: 'Pesan Anda telah dikirim. Kami akan menghubungi Anda segera.',
        data: contactMessage,
      },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validasi gagal',
          errors: error.issues.map((issue) => ({
            path: issue.path.join('.'),
            message: issue.message,
          })),
        },
        { status: 400 }
      )
    }

    console.error('Contact API Error:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Terjadi kesalahan saat mengirim pesan',
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    {
      message: 'Contact API endpoint. Use POST to submit contact form.',
    },
    { status: 200 }
  )
}

// Handle OPTIONS for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    headers: {
      'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_APP_URL || '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  })
}


