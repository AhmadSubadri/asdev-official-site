import { Metadata } from 'next';
import Image from 'next/image';
import { db } from '@/lib/db';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal';

export const metadata: Metadata = {
  title: 'Portofolio - ASDEV Solution Technology',
  description: 'Studi kasus dan implementasi digital dari project yang dikerjakan ASDEV Solution Technology.',
};

const fallbackProjects = [
  {
    id: 'fallback-1',
    title: 'Website Corporate Multi-Halaman',
    category: 'Website',
    description: 'Website company profile modern dengan CMS internal dan optimasi performa.',
    image: '/brand/asdev-logo-light.png',
    technologies: 'Next.js, Prisma, PostgreSQL',
    year: '2026',
    link: '',
  },
  {
    id: 'fallback-2',
    title: 'Dashboard Operasional Bisnis',
    category: 'Sistem Informasi',
    description: 'Dashboard monitoring data harian dengan role-based access dan reporting otomatis.',
    image: '/brand/asdev-logo-dark.png',
    technologies: 'React, Node.js, PostgreSQL',
    year: '2025',
    link: '',
  },
  {
    id: 'fallback-3',
    title: 'Sales Funnel Landing Platform',
    category: 'Growth Platform',
    description: 'Landing system modular untuk campaign digital dengan optimasi conversion.',
    image: '/brand/asdev-logo-light.png',
    technologies: 'Next.js, Analytics, Automation',
    year: '2026',
    link: '',
  },
];

async function getPortfolio() {
  try {
    return await db.portfolio.findMany({
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    });
  } catch (error) {
    console.error('Failed to fetch portfolio:', error);
    return [];
  }
}

export default async function Portfolio() {
  const portfolio = await getPortfolio();
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://asdev-digital.com';

  const renderedProjects =
    portfolio.length > 0
      ? portfolio.map((item) => ({
          id: item.id,
          title: item.title,
          category: item.category,
          description: item.description,
          image: item.image || '/brand/asdev-logo-light.png',
          technologies: item.technologies || '-',
          year: new Date(item.createdAt).getFullYear().toString(),
          link: item.link || '',
        }))
      : fallbackProjects;

  const portfolioListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Portofolio ASDEV Solution Technology',
    itemListElement: renderedProjects.map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'CreativeWork',
        name: project.title,
        description: project.description,
        image: project.image,
        about: project.category,
        url: project.link || `${baseUrl}/portfolio`,
      },
    })),
  };

  return (
    <div className="pt-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioListSchema) }} />
      <section className="bg-gradient-to-br from-slate-50 to-white py-20 dark:from-slate-950 dark:to-slate-900">
        <div className="container mx-auto px-4">
          <Reveal>
            <span className="inline-flex rounded-full border border-primary-200 bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-primary-700 dark:border-primary-900 dark:bg-primary-900/30 dark:text-primary-200">
              Selected Works
            </span>
            <h1 className="mt-6 text-4xl font-black text-slate-900 md:text-6xl dark:text-slate-100">Portofolio Implementasi Digital</h1>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg dark:text-slate-300">
              Kumpulan project yang menunjukkan bagaimana strategi, desain, dan engineering digabungkan untuk menghasilkan solusi yang berdampak.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container mx-auto px-4">
          <Stagger className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
            {renderedProjects.map((project) => (
              <StaggerItem
                key={project.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="relative h-52 w-full bg-slate-100 dark:bg-slate-800">
                  <Image src={project.image} alt={project.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 33vw" />
                </div>
                <div className="p-6">
                  <span className="inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700 dark:bg-primary-900/40 dark:text-primary-200">
                    {project.category}
                  </span>
                  <h3 className="mt-3 text-xl font-black text-slate-900 dark:text-slate-100">{project.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{project.description}</p>
                  <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">Tech: {project.technologies}</p>
                  <div className="mt-5 flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                    <span>{project.year}</span>
                    {project.link ? (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary-500 hover:text-primary-600">
                        Kunjungi
                      </a>
                    ) : (
                      <span className="font-semibold text-primary-500">Case Study</span>
                    )}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal className="mt-14 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-8" y={14}>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary-600 dark:text-primary-300">Case Study Metrics</p>
            <h2 className="mt-3 text-3xl font-black text-slate-900 dark:text-slate-100">Perubahan yang Terjadi Setelah Implementasi</h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              Metrik berikut menggambarkan pola dampak yang umum terjadi ketika proses digitalisasi dieksekusi dengan struktur yang tepat.
            </p>
            <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900/40 dark:bg-emerald-900/20">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-emerald-700 dark:text-emerald-300">Operational Efficiency</p>
                <p className="mt-2 text-2xl font-black text-emerald-800 dark:text-emerald-200">+40% s.d +65%</p>
                <p className="mt-1 text-sm text-emerald-700/80 dark:text-emerald-300">waktu admin lebih hemat per hari.</p>
              </div>
              <div className="rounded-xl border border-sky-200 bg-sky-50 p-4 dark:border-sky-900/40 dark:bg-sky-900/20">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-sky-700 dark:text-sky-300">Lead Response Time</p>
                <p className="mt-2 text-2xl font-black text-sky-800 dark:text-sky-200">hingga 10x lebih cepat</p>
                <p className="mt-1 text-sm text-sky-700/80 dark:text-sky-300">dengan alur notifikasi dan follow-up yang rapi.</p>
              </div>
              <div className="rounded-xl border border-violet-200 bg-violet-50 p-4 dark:border-violet-900/40 dark:bg-violet-900/20">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-violet-700 dark:text-violet-300">Content Velocity</p>
                <p className="mt-2 text-2xl font-black text-violet-800 dark:text-violet-200">publikasi lebih agile</p>
                <p className="mt-1 text-sm text-violet-700/80 dark:text-violet-300">karena update bisa langsung dari panel admin.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
