export const dynamic = 'force-dynamic';

import { db } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const updateSchema = z.object({
  read: z.boolean().optional(),
  replied: z.boolean().optional(),
});

async function ensureAuth() {
  const user = await getAuthUser();
  return !!user;
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await ensureAuth())) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const data = updateSchema.parse(body);

    const message = await db.contactMessage.update({
      where: { id },
      data,
    });

    return NextResponse.json({ success: true, message: 'Status pesan diperbarui', data: message });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.issues }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: 'Gagal memperbarui status pesan' }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await ensureAuth())) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    await db.contactMessage.delete({ where: { id } });
    return NextResponse.json({ success: true, message: 'Pesan berhasil dihapus' });
  } catch {
    return NextResponse.json({ success: false, message: 'Gagal menghapus pesan' }, { status: 500 });
  }
}
