export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import { DEFAULT_SITE_SETTINGS, getSiteSettings } from '@/lib/site-settings';

const settingsSchema = z.object({
  siteName: z.string().min(2).max(120),
  siteShortName: z.string().min(2).max(40),
  siteTagline: z.string().min(8).max(180),
  legalCompanyName: z.string().min(2).max(180),
  logoLightUrl: z.string().min(1).max(500),
  logoDarkUrl: z.string().min(1).max(500),
  supportEmail: z.string().email(),
  phoneDisplay: z.string().min(6).max(60),
  whatsappNumber: z.string().min(8).max(30),
  addressText: z.string().min(2).max(200),
  businessHours: z.string().min(2).max(200),
  websiteUrl: z.string().url(),
  seoDefaultDescription: z.string().min(20).max(320),
  facebookUrl: z.string().optional().or(z.literal('')),
  instagramUrl: z.string().optional().or(z.literal('')),
  linkedinUrl: z.string().optional().or(z.literal('')),
});

function normalizeSocialUrl(url?: string) {
  if (!url) return '';
  if (!url.trim()) return '';
  return url.trim();
}

export async function GET() {
  const settings = await getSiteSettings();
  return NextResponse.json({ success: true, data: settings });
}

export async function PUT(request: NextRequest) {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const validated = settingsSchema.parse(body);

    const payload = {
      singletonKey: 'default',
      ...DEFAULT_SITE_SETTINGS,
      ...validated,
      whatsappNumber: validated.whatsappNumber.replace(/\D/g, ''),
      facebookUrl: normalizeSocialUrl(validated.facebookUrl),
      instagramUrl: normalizeSocialUrl(validated.instagramUrl),
      linkedinUrl: normalizeSocialUrl(validated.linkedinUrl),
    };

    await db.siteSetting.upsert({
      where: { singletonKey: 'default' },
      update: payload,
      create: payload,
    });

    const settings = await getSiteSettings();
    return NextResponse.json({ success: true, message: 'Pengaturan berhasil disimpan', data: settings });
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

    console.error('Settings update error:', error);
    return NextResponse.json({ success: false, message: 'Gagal menyimpan pengaturan' }, { status: 500 });
  }
}
