'use client';

import Link from 'next/link';
import Button from '@/components/shared/Button';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal';

const portfolioProjects = [
  {
    id: 1,
    title: 'Portal Corporate & Lead Generation',
    description: 'Website company profile dengan struktur konten yang fokus membangun trust dan mengubah visitor jadi lead.',
    category: 'Corporate Website',
  },
  {
    id: 2,
    title: 'Operational Dashboard System',
    description: 'Sistem internal untuk monitoring operasional harian, approval flow, dan pelaporan manajemen.',
    category: 'Web Application',
  },
  {
    id: 3,
    title: 'Sales Funnel Landing System',
    description: 'Landing page modular untuk campaign ads dengan tracking conversion dan integrasi CRM.',
    category: 'Growth Platform',
  },
];

export default function PortfolioPreview() {
  return (
    <section className="section">
      <div className="container mx-auto px-4">
        <Reveal className="mb-14 text-center">
          <h2 className="section-heading">Portofolio yang Relevan dengan Kebutuhan Bisnis</h2>
          <p className="section-subheading mx-auto">
            Kami membangun solusi digital yang bukan hanya terlihat bagus, tetapi benar-benar dipakai dan menghasilkan dampak operasional.
          </p>
        </Reveal>

        <Stagger className="grid grid-cols-1 gap-6 md:grid-cols-3" stagger={0.08}>
          {portfolioProjects.map((project) => (
            <StaggerItem key={project.id} className="surface-card overflow-hidden">
              <div className="relative h-44 bg-[linear-gradient(125deg,#0d2a7a_0%,#d62d2d_90%)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.25),transparent_40%)]" />
              </div>

              <div className="p-6">
                <span className="inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700 dark:bg-primary-900/40 dark:text-primary-200">
                  {project.category}
                </span>
                <h3 className="mt-3 text-xl font-black text-slate-900 dark:text-slate-100">{project.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{project.description}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-12 text-center" y={14}>
          <Link href="/portfolio">
            <Button size="lg">Lihat Portofolio Lengkap</Button>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
