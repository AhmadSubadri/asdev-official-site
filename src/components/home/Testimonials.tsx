'use client';

import Link from 'next/link';
import Button from '@/components/shared/Button';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal';

export type HomeTestimonialItem = {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatarUrl: string;
  rating: number;
};

type TestimonialsProps = {
  testimonials: HomeTestimonialItem[];
};

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

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`Rating ${rating} dari 5`}>
      {Array.from({ length: 5 }).map((_, index) => {
        const active = index < rating;
        return (
          <svg
            key={`star-${index}`}
            viewBox="0 0 20 20"
            className={`h-4 w-4 ${active ? 'text-amber-500' : 'text-slate-300 dark:text-slate-700'}`}
            fill="currentColor"
          >
            <path d="M9.05 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 0 0-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.363-1.118L2.978 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292Z" />
          </svg>
        );
      })}
    </div>
  );
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  return (
    <section className="section bg-slate-100/60 dark:bg-slate-900/30">
      <div className="container mx-auto px-4">
        <Reveal className="mb-10 text-center">
          <span className="inline-flex rounded-full border border-primary-200 bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-primary-700 dark:border-primary-900 dark:bg-primary-900/30 dark:text-primary-200">
            Client Testimonials
          </span>
          <h2 className="section-heading mt-4">Apa Kata Klien Tentang ASDEV</h2>
          <p className="section-subheading mx-auto">
            Keputusan teknis terbaik selalu lahir dari kolaborasi yang jelas, cepat, dan bisa dipertanggungjawabkan.
          </p>
        </Reveal>

        <Stagger className="grid grid-cols-1 gap-5 md:grid-cols-3" stagger={0.08}>
          {testimonials.map((item) => (
            <StaggerItem key={item.id} className="surface-card h-full p-6">
              <div className="flex items-center gap-3">
                <img
                  src={item.avatarUrl}
                  alt={item.name}
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-slate-200 dark:ring-slate-700"
                />
                <div>
                  <p className="text-sm font-black text-slate-900 dark:text-slate-100">{item.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{item.role} • {item.company}</p>
                </div>
              </div>

              <div className="mt-4">
                <Stars rating={item.rating} />
              </div>

              <blockquote className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                "{item.content}"
              </blockquote>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-10 surface-card p-8 md:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100">Lebih dari Vendor, Kami Partner Eksekusi</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
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

            <div className="grid gap-4 sm:grid-cols-2">
              {trustSignals.map((item) => (
                <div key={item.title} className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
                  <p className="text-3xl font-black text-slate-900 dark:text-slate-100">{item.title}</p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

