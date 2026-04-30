'use client';

import Link from 'next/link';
import Button from '@/components/shared/Button';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal';

const services = [
  {
    id: 1,
    title: 'Website Company Profile',
    description: 'Website profesional untuk memperkuat kredibilitas bisnis dan meningkatkan konversi lead.',
    tag: 'Brand Presence',
  },
  {
    id: 2,
    title: 'Mobile App Development',
    description: 'Pengembangan aplikasi Android & iOS yang ringan, stabil, dan siap scale sesuai kebutuhan bisnis.',
    tag: 'Mobile Product',
  },
  {
    id: 3,
    title: 'Custom Web Application',
    description: 'Dashboard, CRM, ERP, dan sistem internal yang disesuaikan dengan alur operasional bisnis.',
    tag: 'Internal System',
  },
  {
    id: 4,
    title: 'API Integration & Automation',
    description: 'Integrasi pembayaran, WhatsApp, email, dan third-party API untuk mempercepat proses kerja.',
    tag: 'Automation',
  },
  {
    id: 5,
    title: 'UI/UX System Design',
    description: 'Desain antarmuka modern dengan design system konsisten untuk pengalaman pengguna lebih baik.',
    tag: 'Experience',
  },
  {
    id: 6,
    title: 'Maintenance & Support',
    description: 'Pendampingan teknis berkelanjutan agar sistem tetap aman, terkontrol, dan mudah dikembangkan.',
    tag: 'Reliability',
  },
];

export default function ServicesPreview() {
  return (
    <section className="section">
      <div className="container mx-auto px-4">
        <Reveal className="mb-14 text-center">
          <span className="inline-flex rounded-full border border-primary-200 bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-primary-700 dark:border-primary-900 dark:bg-primary-900/30 dark:text-primary-200">
            ASDEV Service Stack
          </span>
          <h2 className="section-heading mt-4">Layanan yang Mendorong Pertumbuhan</h2>
          <p className="section-subheading mx-auto">
            Dari website sampai aplikasi mobile, setiap layanan dirancang agar eksekusi cepat, kualitas terjaga, dan dampaknya terukur.
          </p>
        </Reveal>

        <Stagger className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          {services.map((service) => (
            <StaggerItem key={service.id} className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-primary-300 hover:shadow-xl dark:border-slate-700 dark:bg-slate-900">
              <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-primary-500/10 blur-2xl" />
              <span className="relative inline-flex rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                {service.tag}
              </span>
              <h3 className="relative mt-4 text-xl font-black text-slate-900 dark:text-slate-100">{service.title}</h3>
              <p className="relative mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{service.description}</p>
              <div className="relative mt-5 text-sm font-semibold text-primary-500 transition group-hover:translate-x-1">Scope detail tersedia</div>
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
