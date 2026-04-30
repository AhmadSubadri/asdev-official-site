export const dynamic = 'force-dynamic';

import { db } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const updateSchema = z.object({
  title: z.string().min(3).optional(),
  slug: z.string().min(3).optional(),
  content: z.string().min(50).optional(),
  excerpt: z.string().optional(),
  image: z.string().optional(),
  published: z.boolean().optional(),
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

    if (data.slug) {
      const existing = await db.blogArticle.findFirst({
        where: { slug: data.slug, NOT: { id } },
      });

      if (existing) {
        return NextResponse.json({ success: false, message: 'Slug sudah digunakan' }, { status: 400 });
      }
    }

    const article = await db.blogArticle.update({
      where: { id },
      data,
    });

    return NextResponse.json({ success: true, message: 'Artikel berhasil diupdate', data: article });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.issues }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: 'Gagal mengupdate artikel' }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await ensureAuth())) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    await db.blogArticle.delete({ where: { id } });
    return NextResponse.json({ success: true, message: 'Artikel berhasil dihapus' });
  } catch {
    return NextResponse.json({ success: false, message: 'Gagal menghapus artikel' }, { status: 500 });
  }
}
