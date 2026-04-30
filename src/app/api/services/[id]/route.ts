export const dynamic = 'force-dynamic';

import { db } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const updateSchema = z.object({
  title: z.string().min(3).optional(),
  description: z.string().min(10).optional(),
  icon: z.string().optional(),
  detail: z.string().optional(),
  image: z.string().optional(),
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

    const service = await db.service.update({
      where: { id },
      data,
    });

    return NextResponse.json({ success: true, message: 'Layanan berhasil diupdate', data: service });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.issues }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: 'Gagal mengupdate layanan' }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await ensureAuth())) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    await db.service.delete({ where: { id } });
    return NextResponse.json({ success: true, message: 'Layanan berhasil dihapus' });
  } catch {
    return NextResponse.json({ success: false, message: 'Gagal menghapus layanan' }, { status: 500 });
  }
}
