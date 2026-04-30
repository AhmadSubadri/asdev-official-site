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

type SiteSettingRecord = {
  siteName?: string | null;
  siteShortName?: string | null;
  siteTagline?: string | null;
  legalCompanyName?: string | null;
  logoLightUrl?: string | null;
  logoDarkUrl?: string | null;
  supportEmail?: string | null;
  phoneDisplay?: string | null;
  whatsappNumber?: string | null;
  addressText?: string | null;
  businessHours?: string | null;
  websiteUrl?: string | null;
  seoDefaultDescription?: string | null;
  facebookUrl?: string | null;
  instagramUrl?: string | null;
  linkedinUrl?: string | null;
};

type SiteSettingDelegate = {
  findUnique: (args: { where: { singletonKey: string } }) => Promise<SiteSettingRecord | null>;
  create: (args: { data: Record<string, unknown> }) => Promise<SiteSettingRecord>;
  upsert: (args: {
    where: { singletonKey: string };
    update: Record<string, unknown>;
    create: Record<string, unknown>;
  }) => Promise<SiteSettingRecord>;
};

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

function toPublicSettings(record?: SiteSettingRecord | null): PublicSiteSettings {
  return {
    siteName: String(record?.siteName || DEFAULT_SITE_SETTINGS.siteName),
    siteShortName: String(record?.siteShortName || DEFAULT_SITE_SETTINGS.siteShortName),
    siteTagline: String(record?.siteTagline || DEFAULT_SITE_SETTINGS.siteTagline),
    legalCompanyName: String(record?.legalCompanyName || DEFAULT_SITE_SETTINGS.legalCompanyName),
    logoLightUrl: String(record?.logoLightUrl || DEFAULT_SITE_SETTINGS.logoLightUrl),
    logoDarkUrl: String(record?.logoDarkUrl || DEFAULT_SITE_SETTINGS.logoDarkUrl),
    supportEmail: String(record?.supportEmail || DEFAULT_SITE_SETTINGS.supportEmail),
    phoneDisplay: String(record?.phoneDisplay || DEFAULT_SITE_SETTINGS.phoneDisplay),
    whatsappNumber: normalizeWhatsApp(String(record?.whatsappNumber || DEFAULT_SITE_SETTINGS.whatsappNumber)),
    addressText: String(record?.addressText || DEFAULT_SITE_SETTINGS.addressText),
    businessHours: String(record?.businessHours || DEFAULT_SITE_SETTINGS.businessHours),
    websiteUrl: String(record?.websiteUrl || DEFAULT_SITE_SETTINGS.websiteUrl),
    seoDefaultDescription: String(record?.seoDefaultDescription || DEFAULT_SITE_SETTINGS.seoDefaultDescription),
    facebookUrl: String(record?.facebookUrl || ''),
    instagramUrl: String(record?.instagramUrl || ''),
    linkedinUrl: String(record?.linkedinUrl || ''),
  };
}

function toDbPayload(data: PublicSiteSettings) {
  return {
    singletonKey: 'default',
    siteName: data.siteName,
    siteShortName: data.siteShortName,
    siteTagline: data.siteTagline,
    legalCompanyName: data.legalCompanyName,
    logoLightUrl: data.logoLightUrl,
    logoDarkUrl: data.logoDarkUrl,
    supportEmail: data.supportEmail,
    phoneDisplay: data.phoneDisplay,
    whatsappNumber: normalizeWhatsApp(data.whatsappNumber),
    addressText: data.addressText,
    businessHours: data.businessHours,
    websiteUrl: data.websiteUrl,
    seoDefaultDescription: data.seoDefaultDescription,
    facebookUrl: data.facebookUrl || null,
    instagramUrl: data.instagramUrl || null,
    linkedinUrl: data.linkedinUrl || null,
  };
}

function getSiteSettingDelegate(): SiteSettingDelegate | null {
  try {
    const delegate = (db as unknown as { siteSetting?: SiteSettingDelegate }).siteSetting;
    if (!delegate) return null;

    if (
      typeof delegate.findUnique !== 'function' ||
      typeof delegate.create !== 'function' ||
      typeof delegate.upsert !== 'function'
    ) {
      return null;
    }

    return delegate;
  } catch (error) {
    console.error('SiteSetting delegate unavailable:', error);
    return null;
  }
}

export async function getSiteSettings(): Promise<PublicSiteSettings> {
  try {
    const delegate = getSiteSettingDelegate();
    if (!delegate) return DEFAULT_SITE_SETTINGS;

    const existing = await delegate.findUnique({
      where: { singletonKey: 'default' },
    });

    if (!existing) {
      const created = await delegate.create({
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

export async function upsertSiteSettings(data: PublicSiteSettings): Promise<PublicSiteSettings> {
  try {
    const delegate = getSiteSettingDelegate();
    if (!delegate) return DEFAULT_SITE_SETTINGS;

    const payload = toDbPayload(data);
    const saved = await delegate.upsert({
      where: { singletonKey: 'default' },
      update: payload,
      create: payload,
    });

    return toPublicSettings(saved);
  } catch (error) {
    console.error('Failed to upsert site settings:', error);
    return DEFAULT_SITE_SETTINGS;
  }
}
