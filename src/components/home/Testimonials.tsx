'use client';

import Link from 'next/link';
import Button from '@/components/shared/Button';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal';

const trustSignals = [
  {
    title: '5+ Tahun',
    desc: 'pengalaman freelancer dan delivery project.',
  },
  {
    title: 'Rapid Loop',
    desc: 'iterasi cepat agar keputusan bisnis tidak menunggu lama.',
  },
  {
    title: 'Scope Jelas',
    desc: 'setiap sprint disertai status, risiko, dan langkah berikutnya.',
  },
  {
    title: 'Quality Focus',
    desc: 'arsitektur dibuat maintainable agar mudah scale.',
  },
];

export default function Testimonials() {
  return (
    <section className="section bg-slate-100/60 dark:bg-slate-900/30">
      <div className="container mx-auto px-4">
        <Reveal className="surface-card p-8 md:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <h2 className="section-heading text-left">Lebih dari Vendor, Kami Partner Eksekusi</h2>
              <p className="section-subheading text-left">
                Untuk tahap awal, Anda belum perlu tim besar. Yang Anda butuhkan adalah partner teknis yang bisa bergerak cepat, terstruktur, dan bisa dipercaya.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/about">
                  <Button variant="outline">Pelajari Cara Kerja Kami</Button>
                </Link>
                <Link href="/contact">
                  <Button>Diskusi Kebutuhan Anda</Button>
                </Link>
              </div>
            </div>

            <Stagger className="grid gap-4 sm:grid-cols-2" stagger={0.08}>
              {trustSignals.map((item) => (
                <StaggerItem key={item.title} className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
                  <p className="text-3xl font-black text-slate-900 dark:text-slate-100">{item.title}</p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{item.desc}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
