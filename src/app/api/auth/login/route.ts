export const dynamic = 'force-dynamic'

import { db } from '@/lib/db'
import { generateToken, setAuthCookie, verifyPassword, hashPassword } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email('Email tidak valid'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
})

// Demo user initialization
async function initializeDemoUser() {
  try {
    if (!db || !db.user) {
      console.warn('Database not available for demo user initialization')
      return
    }

    const existingUser = await db.user.findUnique({
      where: { email: 'admin@asdev.id' },
    })

    if (!existingUser) {
      const hashedPassword = await hashPassword('admin123')
      await db.user.create({
        data: {
          email: 'admin@asdev.id',
          password: hashedPassword,
          name: 'Admin Asdev',
        },
      })
      console.log('Demo user created successfully')
    }
  } catch (error) {
    console.error('Error initializing demo user:', error)
  }
}

export async function POST(request: NextRequest) {
  try {
    // Initialize demo user if db available
    if (db && db.user) {
      await initializeDemoUser()
    }

    const body = await request.json()

    // Validate input
    const validatedData = loginSchema.parse(body)

    // Check if database is available
    if (!db || !db.user) {
      return NextResponse.json(
        {
          success: false,
          message: 'Database tidak tersedia. Setup database terlebih dahulu.',
        },
        { status: 503 }
      )
    }

    // Find user by email
    const user = await db.user.findUnique({
      where: { email: validatedData.email },
    })

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: 'Email atau password salah',
        },
        { status: 401 }
      )
    }

    // Verify password
    const passwordMatch = await verifyPassword(validatedData.password, user.password)

    if (!passwordMatch) {
      return NextResponse.json(
        {
          success: false,
          message: 'Email atau password salah',
        },
        { status: 401 }
      )
    }

    // Generate token
    const token = generateToken(user.id, user.email)

    // Set cookie
    await setAuthCookie(token)

    return NextResponse.json(
      {
        success: true,
        message: 'Login berhasil',
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      },
      { status: 200 }
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

    console.error('Login API Error:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Terjadi kesalahan saat login',
      },
      { status: 500 }
    )
  }
}
