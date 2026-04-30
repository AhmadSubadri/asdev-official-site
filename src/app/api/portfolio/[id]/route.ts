export const dynamic = 'force-dynamic';

import { db } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const updateSchema = z.object({
  title: z.string().min(3).optional(),
  description: z.string().min(10).optional(),
  image: z.string().optional(),
  category: z.string().min(2).optional(),
  link: z.string().optional(),
  technologies: z.string().optional(),
  order: z.number().optional(),
});

async function ensureAuth() {
  const user = await getAuthUser();
  return !!user;
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await ensureAuth())) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const data = updateSchema.parse(body);

    const portfolio = await db.portfolio.update({
      where: { id },
      data,
    });

    return NextResponse.json({ success: true, message: 'Portfolio berhasil diupdate', data: portfolio });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.issues }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: 'Gagal mengupdate portfolio' }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await ensureAuth())) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    await db.portfolio.delete({ where: { id } });
    return NextResponse.json({ success: true, message: 'Portfolio berhasil dihapus' });
  } catch {
    return NextResponse.json({ success: false, message: 'Gagal menghapus portfolio' }, { status: 500 });
  }
}
