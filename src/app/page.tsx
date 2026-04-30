import HeroSection from '@/components/home/HeroSection';
import ServicesPreview from '@/components/home/ServicesPreview';
import Advantages from '@/components/home/Advantages';
import PortfolioPreview from '@/components/home/PortfolioPreview';
import CaseStudyMetrics from '@/components/home/CaseStudyMetrics';
import CTASection from '@/components/home/CTASection';
import Testimonials, { type HomeTestimonialItem } from '@/components/home/Testimonials';
import { db } from '@/lib/db';
import { getSiteSettings } from '@/lib/site-settings';

const fallbackTestimonials: HomeTestimonialItem[] = [
  {
    id: 'fallback-1',
    name: 'Rafi Pratama',
    role: 'Founder',
    company: 'Urban Supply',
    content:
      'Tim ASDEV membantu kami merapikan website dan alur lead masuk. Hasilnya proses sales jadi jauh lebih cepat dan terukur.',
    avatarUrl: '/brand/asdev-logo-light.png',
    rating: 5,
  },
  {
    id: 'fallback-2',
    name: 'Nadia Putri',
    role: 'Marketing Manager',
    company: 'Aksara Edu',
    content:
      'Komunikasi clear, progres transparan, dan delivery cepat. Sangat membantu tim internal kami yang butuh partner eksekusi lincah.',
    avatarUrl: '/brand/asdev-logo-dark.png',
    rating: 5,
  },
  {
    id: 'fallback-3',
    name: 'Aditya Wijaya',
    role: 'COO',
    company: 'Nusantara Logistik',
    content:
      'Bukan cuma develop, tapi ikut mikir prioritas fitur dan dampak bisnisnya. Itu yang bikin kolaborasi terasa beda.',
    avatarUrl: '/brand/asdev-logo-light.png',
    rating: 5,
  },
];

type TestimonialDelegate = {
  findMany: (args: {
    where: { published: boolean };
    orderBy: Array<{ order: 'asc' | 'desc' } | { createdAt: 'asc' | 'desc' }>;
    take: number;
  }) => Promise<
    Array<{
      id: string;
      name: string;
      role: string | null;
      company: string | null;
      content: string;
      avatarUrl: string | null;
      rating: number;
    }>
  >;
};

async function getHomepageTestimonials(): Promise<HomeTestimonialItem[]> {
  try {
    const delegate = (db as unknown as { testimonial?: TestimonialDelegate }).testimonial;
    if (!delegate || typeof delegate.findMany !== 'function') return fallbackTestimonials;

    const rows = await delegate.findMany({
      where: { published: true },
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
      take: 6,
    });

    if (!rows.length) return fallbackTestimonials;

    return rows.map((item) => ({
      id: item.id,
      name: item.name,
      role: item.role || 'Client',
      company: item.company || 'ASDEV Partner',
      content: item.content,
      avatarUrl: item.avatarUrl || '/brand/asdev-logo-light.png',
      rating: Math.min(5, Math.max(1, item.rating || 5)),
    }));
  } catch (error) {
    console.error('Failed to fetch testimonials:', error);
    return fallbackTestimonials;
  }
}

export default async function Home() {
  const settings = await getSiteSettings();
  const testimonials = await getHomepageTestimonials();

  return (
    <>
      <HeroSection />
      <ServicesPreview />
      <Advantages />
      <PortfolioPreview />
      <CaseStudyMetrics />
      <Testimonials testimonials={testimonials} />
      <CTASection whatsappNumber={settings.whatsappNumber} />
    </>
  );
}
