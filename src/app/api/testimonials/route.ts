export const dynamic = 'force-dynamic';

import { db } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const createSchema = z.object({
  name: z.string().min(2, 'Nama minimal 2 karakter'),
  role: z.string().optional(),
  company: z.string().optional(),
  content: z.string().min(20, 'Testimoni minimal 20 karakter'),
  avatarUrl: z.string().optional(),
  rating: z.number().int().min(1).max(5).optional().default(5),
  published: z.boolean().optional().default(true),
  order: z.number().int().optional().default(0),
});

type TestimonialDelegate = {
  findMany: (args: {
    orderBy: Array<{ order: 'asc' | 'desc' } | { createdAt: 'asc' | 'desc' }>;
  }) => Promise<any[]>;
  create: (args: { data: Record<string, unknown> }) => Promise<any>;
};

function getDelegate(): TestimonialDelegate | null {
  const delegate = (db as unknown as { testimonial?: TestimonialDelegate }).testimonial;
  if (!delegate) return null;
  if (typeof delegate.findMany !== 'function' || typeof delegate.create !== 'function') return null;
  return delegate;
}

export async function GET() {
  try {
    const delegate = getDelegate();
    if (!delegate) {
      return NextResponse.json({ success: true, data: [] }, { status: 200 });
    }

    const items = await delegate.findMany({
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    });

    return NextResponse.json({ success: true, data: items }, { status: 200 });
  } catch (error) {
    console.error('Fetch testimonials error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Gagal mengambil data testimoni',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const delegate = getDelegate();
    if (!delegate) {
      return NextResponse.json({ success: false, message: 'Model testimoni belum tersedia di database' }, { status: 503 });
    }

    const body = await request.json();
    const data = createSchema.parse(body);

    const created = await delegate.create({
      data: {
        ...data,
        role: data.role || null,
        company: data.company || null,
        avatarUrl: data.avatarUrl || null,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Testimoni berhasil ditambahkan',
        data: created,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validasi gagal',
          errors: error.issues,
        },
        { status: 400 }
      );
    }

    console.error('Create testimonial error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Gagal menambahkan testimoni',
      },
      { status: 500 }
    );
  }
}

