import { Metadata } from 'next';
import ContactPageClient from '@/components/contact/ContactPageClient';
import { getSiteSettings } from '@/lib/site-settings';

export const metadata: Metadata = {
  title: 'Kontak',
  description:
    'Hubungi tim kami untuk diskusi website, web app, automasi bisnis, dan implementasi solusi digital.',
};

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <ContactPageClient
      supportEmail={settings.supportEmail}
      phoneDisplay={settings.phoneDisplay}
      whatsappNumber={settings.whatsappNumber}
      addressText={settings.addressText}
      businessHours={settings.businessHours}
    />
  );
}
