'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Button from '@/components/shared/Button';
import { trackEvent } from '@/lib/analytics';

const highlights = [
  { label: 'Project Delivered', value: '50+' },
  { label: 'Client Satisfaction', value: '100%' },
  { label: 'Years Experience', value: '5+' },
];

const capabilities = ['Website & Landing Page', 'Custom Web App', 'Integrasi API', 'UI/UX Design'];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-28 md:pt-32">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-primary-200/40 blur-3xl dark:bg-primary-900/20" />
        <div className="absolute -left-20 bottom-16 h-72 w-72 rounded-full bg-secondary-200/40 blur-3xl dark:bg-secondary-900/30" />
      </div>

      <div className="container mx-auto px-4">
        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center rounded-full border border-primary-200 bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-primary-700 dark:border-primary-900 dark:bg-primary-900/30 dark:text-primary-200">
              ASDEV Solution Technology
            </span>

            <h1 className="mt-6 text-4xl font-black leading-tight text-slate-900 md:text-6xl dark:text-slate-100">
              Bangun Produk Digital yang
              <span className="block text-primary-500">Siap Scale Sejak Hari Pertama</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg dark:text-slate-300">
              Kami membantu bisnis merancang, membangun, dan mengembangkan website serta sistem digital dengan pendekatan engineering yang rapi, cepat, dan terukur.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact">
                <Button size="lg" onClick={() => trackEvent({ event: 'cta_click', label: 'hero_consultation' })}>
                  Jadwalkan Konsultasi
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button variant="outline" size="lg" onClick={() => trackEvent({ event: 'cta_click', label: 'hero_portfolio' })}>
                  Lihat Portofolio
                </Button>
              </Link>
            </div>

            <div className="mt-10 grid max-w-2xl grid-cols-3 gap-4">
              {highlights.map((item) => (
                <div key={item.label} className="surface-card px-4 py-4">
                  <p className="text-2xl font-black text-slate-900 dark:text-slate-100">{item.value}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.08em] text-slate-500 dark:text-slate-400">{item.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="surface-card relative overflow-hidden p-7"
          >
            <div className="absolute right-0 top-0 h-28 w-28 rounded-bl-[3rem] bg-primary-500" />
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">Core Capability</p>
            <h3 className="mt-3 text-2xl font-black text-slate-900 dark:text-slate-100">End-to-End Delivery</h3>

            <div className="mt-6 space-y-3">
              {capabilities.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: 0.25 + index * 0.08 }}
                  className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-900"
                >
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{item}</span>
                  <span className="h-2 w-2 rounded-full bg-primary-500" />
                </motion.div>
              ))}
            </div>

            <div className="mt-7 rounded-xl bg-slate-950 px-4 py-4 text-slate-100 dark:bg-slate-800">
              <p className="text-sm leading-relaxed">
                Fokus kami bukan hanya desain cantik, tetapi arsitektur yang maintainable agar website CV Anda siap bertumbuh jadi startup.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
