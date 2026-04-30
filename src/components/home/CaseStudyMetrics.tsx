'use client';

import Link from 'next/link';
import Button from '@/components/shared/Button';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal';

const metrics = [
  {
    label: 'Waktu Operasional Admin',
    before: '4-6 jam / hari',
    after: '1-2 jam / hari',
    impact: 'hingga 65% lebih efisien',
  },
  {
    label: 'Response Lead Masuk',
    before: '6-12 jam',
    after: '< 1 jam',
    impact: 'lead lebih cepat ditangani',
  },
  {
    label: 'Kecepatan Publish Konten',
    before: 'bergantung developer',
    after: 'langsung dari admin panel',
    impact: 'workflow marketing lebih agile',
  },
];

export default function CaseStudyMetrics() {
  return (
    <section className="section bg-slate-100/60 dark:bg-slate-900/30">
      <div className="container mx-auto px-4">
        <Reveal className="mb-12 text-center">
          <h2 className="section-heading">Dampak yang Bisa Diukur</h2>
          <p className="section-subheading mx-auto">
            Bukan hanya tampilan yang lebih rapi. Solusi digital yang tepat harus memberikan dampak operasional dan bisnis yang nyata.
          </p>
        </Reveal>

        <Stagger className="grid grid-cols-1 gap-5 md:grid-cols-3" stagger={0.09}>
          {metrics.map((item) => (
            <StaggerItem key={item.label} className="surface-card p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500 dark:text-slate-400">{item.label}</p>
              <div className="mt-5 grid gap-3">
                <div className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm dark:border-rose-900/40 dark:bg-rose-900/20">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-rose-700 dark:text-rose-300">Sebelum</p>
                  <p className="mt-1 font-semibold text-rose-800 dark:text-rose-200">{item.before}</p>
                </div>
                <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm dark:border-emerald-900/40 dark:bg-emerald-900/20">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-emerald-700 dark:text-emerald-300">Sesudah</p>
                  <p className="mt-1 font-semibold text-emerald-800 dark:text-emerald-200">{item.after}</p>
                </div>
              </div>
              <p className="mt-4 text-sm font-semibold text-primary-600 dark:text-primary-300">{item.impact}</p>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-10 text-center" y={14}>
          <Link href="/contact">
            <Button size="lg">Diskusikan Target Metrik Bisnis Anda</Button>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
