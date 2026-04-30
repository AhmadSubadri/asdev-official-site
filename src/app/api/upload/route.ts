export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { randomUUID } from 'crypto';
import { mkdir, writeFile } from 'fs/promises';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_EXTENSIONS = new Set(['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg']);
const MIME_TO_EXT: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'image/svg+xml': 'svg',
};

function sanitizeSegment(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9-_]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
}

export async function POST(request: NextRequest) {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const folderInput = String(formData.get('folder') || 'general');
    const folder = sanitizeSegment(folderInput) || 'general';

    if (!(file instanceof File)) {
      return NextResponse.json({ success: false, message: 'File tidak ditemukan' }, { status: 400 });
    }

    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ success: false, message: 'Hanya file gambar yang diizinkan' }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ success: false, message: 'Ukuran gambar maksimal 5MB' }, { status: 400 });
    }

    const fileNameParts = file.name.split('.');
    const fromName = fileNameParts.length > 1 ? fileNameParts.at(-1)?.toLowerCase() : '';
    const ext = (fromName && ALLOWED_EXTENSIONS.has(fromName) ? fromName : MIME_TO_EXT[file.type]) || '';

    if (!ext || !ALLOWED_EXTENSIONS.has(ext)) {
      return NextResponse.json({ success: false, message: 'Format gambar tidak didukung' }, { status: 400 });
    }

    const outputName = `${Date.now()}-${randomUUID().slice(0, 8)}.${ext}`;
    const relativeDir = path.join('uploads', folder);
    const absoluteDir = path.join(process.cwd(), 'public', relativeDir);
    const absolutePath = path.join(absoluteDir, outputName);

    await mkdir(absoluteDir, { recursive: true });
    const arrayBuffer = await file.arrayBuffer();
    await writeFile(absolutePath, Buffer.from(arrayBuffer));

    const url = `/${relativeDir.replace(/\\/g, '/')}/${outputName}`;

    return NextResponse.json({
      success: true,
      message: 'Gambar berhasil diupload',
      data: {
        url,
        size: file.size,
        mime: file.type,
      },
    });
  } catch (error) {
    console.error('Upload image error:', error);
    return NextResponse.json({ success: false, message: 'Gagal upload gambar' }, { status: 500 });
  }
}
