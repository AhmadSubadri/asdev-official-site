'use client';

import Link from 'next/link';
import Button from '@/components/shared/Button';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal';

const services = [
  {
    id: 1,
    title: 'Website Company Profile',
    description: 'Website profesional untuk memperkuat kredibilitas bisnis dan meningkatkan konversi lead.',
  },
  {
    id: 2,
    title: 'Custom Web Application',
    description: 'Dashboard, CRM, ERP, dan sistem internal yang disesuaikan dengan alur operasional bisnis.',
  },
  {
    id: 3,
    title: 'API Integration & Automation',
    description: 'Integrasi pembayaran, WhatsApp, email, dan third-party API untuk mempercepat proses kerja.',
  },
  {
    id: 4,
    title: 'UI/UX System Design',
    description: 'Desain antarmuka modern dengan design system yang konsisten untuk pengalaman pengguna lebih baik.',
  },
  {
    id: 5,
    title: 'Performance Optimization',
    description: 'Audit dan optimasi performa agar website cepat, stabil, dan SEO-friendly di semua perangkat.',
  },
  {
    id: 6,
    title: 'Maintenance & Support',
    description: 'Pendampingan teknis berkelanjutan agar sistem tetap aman, terkontrol, dan mudah dikembangkan.',
  },
];

export default function ServicesPreview() {
  return (
    <section className="section">
      <div className="container mx-auto px-4">
        <Reveal className="mb-14 text-center">
          <h2 className="section-heading">Layanan yang Mendorong Pertumbuhan</h2>
          <p className="section-subheading mx-auto">
            Setiap layanan dirancang untuk satu tujuan utama: membantu CV Anda naik kelas menjadi startup dengan fondasi produk digital yang solid.
          </p>
        </Reveal>

        <Stagger className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          {services.map((service) => (
            <StaggerItem key={service.id} className="surface-card group p-6">
              <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary-500/10 text-primary-600 dark:text-primary-300">
                <span className="h-2.5 w-2.5 rounded-full bg-current" />
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-slate-100">{service.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{service.description}</p>
              <div className="mt-5 text-sm font-semibold text-primary-500 transition group-hover:translate-x-1">Scope detail tersedia</div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-12 text-center" y={14}>
          <Link href="/services">
            <Button variant="outline" size="lg">Eksplor Seluruh Layanan</Button>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
