'use client';

import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal';

const differentiators = [
  {
    id: 1,
    title: 'Product Thinking',
    description: 'Setiap fitur diprioritaskan berdasarkan impact bisnis, bukan sekadar daftar permintaan.',
  },
  {
    id: 2,
    title: 'Clean Engineering',
    description: 'Codebase dibuat rapi dan maintainable agar mudah scale saat bisnis berkembang.',
  },
  {
    id: 3,
    title: 'Transparent Delivery',
    description: 'Progress, scope, dan risiko dibuka jelas sehingga keputusan Anda tetap terkontrol.',
  },
  {
    id: 4,
    title: 'Conversion Driven',
    description: 'UI bukan hanya menarik, tetapi diarahkan untuk meningkatkan trust dan konversi lead.',
  },
];

export default function Advantages() {
  return (
    <section className="section bg-slate-100/60 dark:bg-slate-900/30">
      <div className="container mx-auto px-4">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <Reveal>
            <h2 className="section-heading">Kenapa Klien Memilih ASDEV</h2>
            <p className="section-subheading">
              Anda butuh partner yang paham bisnis dan teknologi sekaligus. Kami bekerja dengan pendekatan strategis, bukan template.
            </p>
          </Reveal>

          <Stagger className="grid gap-4 sm:grid-cols-2" stagger={0.08}>
            {differentiators.map((item) => (
              <StaggerItem key={item.id} className="surface-card p-6">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-primary-600 dark:text-primary-300">0{item.id}</p>
                <h3 className="mt-3 text-lg font-black text-slate-900 dark:text-slate-100">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{item.description}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
