import { db } from '@/lib/db';

export interface PublicSiteSettings {
  siteName: string;
  siteShortName: string;
  siteTagline: string;
  legalCompanyName: string;
  logoLightUrl: string;
  logoDarkUrl: string;
  supportEmail: string;
  phoneDisplay: string;
  whatsappNumber: string;
  addressText: string;
  businessHours: string;
  websiteUrl: string;
  seoDefaultDescription: string;
  facebookUrl: string;
  instagramUrl: string;
  linkedinUrl: string;
}

type SiteSettingRecord = Awaited<ReturnType<typeof db.siteSetting.findUnique>>;

export const DEFAULT_SITE_SETTINGS: PublicSiteSettings = {
  siteName: 'ASDEV Solution Technology',
  siteShortName: 'ASDEV',
  siteTagline: 'Solusi teknologi terpercaya untuk transformasi digital bisnis',
  legalCompanyName: 'CV Asdev Solusi Teknologi',
  logoLightUrl: '/brand/asdev-logo-light.png',
  logoDarkUrl: '/brand/asdev-logo-dark.png',
  supportEmail: 'info@asdev.id',
  phoneDisplay: '+62 812-3456-7890',
  whatsappNumber: '6281234567890',
  addressText: 'Indonesia',
  businessHours: 'Senin - Jumat, 09:00 - 18:00 WIB',
  websiteUrl: 'https://asdev-digital.com',
  seoDefaultDescription:
    'Kami menyediakan layanan website development, mobile app, sistem informasi, dan UI/UX design untuk transformasi digital bisnis Anda.',
  facebookUrl: '',
  instagramUrl: '',
  linkedinUrl: '',
};

function normalizeWhatsApp(input: string) {
  const digits = input.replace(/\D/g, '');
  if (!digits) return DEFAULT_SITE_SETTINGS.whatsappNumber;
  if (digits.startsWith('0')) return `62${digits.slice(1)}`;
  return digits;
}

function toPublicSettings(record: NonNullable<SiteSettingRecord>): PublicSiteSettings {
  return {
    siteName: String(record.siteName || DEFAULT_SITE_SETTINGS.siteName),
    siteShortName: String(record.siteShortName || DEFAULT_SITE_SETTINGS.siteShortName),
    siteTagline: String(record.siteTagline || DEFAULT_SITE_SETTINGS.siteTagline),
    legalCompanyName: String(record.legalCompanyName || DEFAULT_SITE_SETTINGS.legalCompanyName),
    logoLightUrl: String(record.logoLightUrl || DEFAULT_SITE_SETTINGS.logoLightUrl),
    logoDarkUrl: String(record.logoDarkUrl || DEFAULT_SITE_SETTINGS.logoDarkUrl),
    supportEmail: String(record.supportEmail || DEFAULT_SITE_SETTINGS.supportEmail),
    phoneDisplay: String(record.phoneDisplay || DEFAULT_SITE_SETTINGS.phoneDisplay),
    whatsappNumber: normalizeWhatsApp(String(record.whatsappNumber || DEFAULT_SITE_SETTINGS.whatsappNumber)),
    addressText: String(record.addressText || DEFAULT_SITE_SETTINGS.addressText),
    businessHours: String(record.businessHours || DEFAULT_SITE_SETTINGS.businessHours),
    websiteUrl: String(record.websiteUrl || DEFAULT_SITE_SETTINGS.websiteUrl),
    seoDefaultDescription: String(
      record.seoDefaultDescription || DEFAULT_SITE_SETTINGS.seoDefaultDescription
    ),
    facebookUrl: String(record.facebookUrl || ''),
    instagramUrl: String(record.instagramUrl || ''),
    linkedinUrl: String(record.linkedinUrl || ''),
  };
}

export async function getSiteSettings(): Promise<PublicSiteSettings> {
  try {
    const existing = await db.siteSetting.findUnique({
      where: { singletonKey: 'default' },
    });

    if (!existing) {
      const created = await db.siteSetting.create({
        data: {
          singletonKey: 'default',
          ...DEFAULT_SITE_SETTINGS,
        },
      });
      return toPublicSettings(created);
    }

    return toPublicSettings(existing);
  } catch (error) {
    console.error('Failed to load site settings:', error);
    return DEFAULT_SITE_SETTINGS;
  }
}
