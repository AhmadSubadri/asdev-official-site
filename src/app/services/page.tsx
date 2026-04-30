import { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/shared/Button';
import { db } from '@/lib/db';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal';

export const metadata: Metadata = {
  title: 'Layanan Kami - ASDEV Solution Technology',
  description:
    'Layanan digital ASDEV mencakup website, custom web app, integrasi API, UI/UX design, hingga maintenance berkelanjutan.',
};

const fallbackServices = [
  {
    id: 'fallback-1',
    title: 'Website Development',
    description: 'Website company profile, landing page, dan website bisnis yang modern, cepat, dan SEO-ready.',
    features: ['Company Profile', 'Landing Page', 'Website Bisnis', 'Optimasi SEO Dasar'],
  },
  {
    id: 'fallback-2',
    title: 'Web App & Sistem Internal',
    description: 'Pengembangan dashboard, CRM, ERP, POS, dan sistem custom sesuai alur operasional bisnis Anda.',
    features: ['Dashboard Admin', 'CRM / ERP', 'POS System', 'Role & Permission'],
  },
  {
    id: 'fallback-3',
    title: 'Integrasi API & Otomasi',
    description: 'Integrasi payment gateway, WhatsApp, email, maps, serta otomasi proses bisnis lintas platform.',
    features: ['Payment Gateway', 'WhatsApp Integration', 'Email Automation', 'Data Synchronization'],
  },
  {
    id: 'fallback-4',
    title: 'UI/UX Design',
    description: 'Desain antarmuka modern dengan alur penggunaan yang jelas untuk meningkatkan conversion rate.',
    features: ['Wireframe', 'UI Design System', 'Prototype', 'Usability Improvement'],
  },
];

function extractFeatures(detail?: string | null): string[] {
  if (!detail) return [];

  return detail
    .split(/\r?\n|,|\|/)
    .map((item) => item.trim())
    .filter((item) => item.length > 0)
    .slice(0, 6);
}

async function getServices() {
  try {
    return await db.service.findMany({
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    });
  } catch (error) {
    console.error('Failed to fetch services:', error);
    return [];
  }
}

export default async function Services() {
  const services = await getServices();

  const renderedServices =
    services.length > 0
      ? services.map((service) => {
          const features = extractFeatures(service.detail);
          return {
            id: service.id,
            title: service.title,
            description: service.description,
            features: features.length > 0 ? features : ['Konsultasi kebutuhan', 'Implementasi profesional', 'Support berkelanjutan'],
          };
        })
      : fallbackServices;

  return (
    <div className="pt-16">
      <section className="bg-gradient-to-br from-slate-50 to-white py-20 dark:from-slate-950 dark:to-slate-900">
        <div className="container mx-auto px-4">
          <Reveal>
            <span className="inline-flex rounded-full border border-primary-200 bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-primary-700 dark:border-primary-900 dark:bg-primary-900/30 dark:text-primary-200">
              Service Architecture
            </span>
            <h1 className="mt-6 text-4xl font-black text-slate-900 md:text-6xl dark:text-slate-100">Solusi Terstruktur untuk Kebutuhan Bisnis Nyata</h1>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg dark:text-slate-300">
              Setiap layanan dirancang agar mudah dieksekusi, terukur dampaknya, dan siap berkembang seiring pertumbuhan bisnis Anda.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container mx-auto px-4">
          <Stagger className="grid grid-cols-1 gap-6 md:grid-cols-2" stagger={0.09}>
            {renderedServices.map((service) => (
              <StaggerItem key={service.id} className="surface-card p-7">
                <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{service.description}</p>
                <ul className="mt-6 space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={`${service.id}-${idx}`} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal className="mt-12 rounded-2xl border border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900" y={14}>
            <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100">Butuh Scope Khusus di Luar Paket?</h3>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
              Kami bisa susun paket delivery custom berdasarkan target bisnis, timeline, dan resource yang Anda miliki saat ini.
            </p>
            <div className="mt-6 flex justify-center">
              <Link href="/contact">
                <Button size="lg">Diskusikan Kebutuhan Anda</Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
