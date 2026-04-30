export const dynamic = 'force-dynamic';

import { db } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const updateSchema = z.object({
  name: z.string().min(2).optional(),
  role: z.string().optional(),
  company: z.string().optional(),
  content: z.string().min(20).optional(),
  avatarUrl: z.string().optional(),
  rating: z.number().int().min(1).max(5).optional(),
  published: z.boolean().optional(),
  order: z.number().int().optional(),
});

type TestimonialDelegate = {
  update: (args: { where: { id: string }; data: Record<string, unknown> }) => Promise<any>;
  delete: (args: { where: { id: string } }) => Promise<any>;
};

function getDelegate(): TestimonialDelegate | null {
  const delegate = (db as unknown as { testimonial?: TestimonialDelegate }).testimonial;
  if (!delegate) return null;
  if (typeof delegate.update !== 'function' || typeof delegate.delete !== 'function') return null;
  return delegate;
}

async function ensureAuth() {
  const user = await getAuthUser();
  return !!user;
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await ensureAuth())) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const delegate = getDelegate();
    if (!delegate) {
      return NextResponse.json({ success: false, message: 'Model testimoni belum tersedia di database' }, { status: 503 });
    }

    const { id } = await params;
    const body = await request.json();
    const parsed = updateSchema.parse(body);
    const data = {
      ...parsed,
      role: parsed.role ?? undefined,
      company: parsed.company ?? undefined,
      avatarUrl: parsed.avatarUrl ?? undefined,
    };

    const updated = await delegate.update({
      where: { id },
      data,
    });

    return NextResponse.json({ success: true, message: 'Testimoni berhasil diupdate', data: updated });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.issues }, { status: 400 });
    }

    console.error('Update testimonial error:', error);
    return NextResponse.json({ success: false, message: 'Gagal mengupdate testimoni' }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await ensureAuth())) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const delegate = getDelegate();
    if (!delegate) {
      return NextResponse.json({ success: false, message: 'Model testimoni belum tersedia di database' }, { status: 503 });
    }

    const { id } = await params;
    await delegate.delete({ where: { id } });

    return NextResponse.json({ success: true, message: 'Testimoni berhasil dihapus' });
  } catch (error) {
    console.error('Delete testimonial error:', error);
    return NextResponse.json({ success: false, message: 'Gagal menghapus testimoni' }, { status: 500 });
  }
}

