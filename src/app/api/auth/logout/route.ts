export const dynamic = 'force-dynamic'

import { clearAuthCookie } from '@/lib/auth'
import { NextResponse } from 'next/server'

export async function POST() {
  try {
    await clearAuthCookie()
    return NextResponse.json(
      {
        success: true,
        message: 'Logout berhasil',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Logout Error:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Terjadi kesalahan saat logout',
      },
      { status: 500 }
    )
  }
}
