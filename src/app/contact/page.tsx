import { Metadata } from 'next';
import ContactPageClient from '@/components/contact/ContactPageClient';

export const metadata: Metadata = {
  title: 'Kontak - ASDEV Solution Technology',
  description:
    'Hubungi ASDEV Solution Technology untuk diskusi website, web app, automasi bisnis, dan implementasi solusi digital.',
};

export default function ContactPage() {
  return <ContactPageClient />;
}
