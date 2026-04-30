'use client';

import Link from 'next/link';
import Button from '@/components/shared/Button';
import { Reveal } from '@/components/motion/Reveal';
import { trackEvent } from '@/lib/analytics';

interface CTASectionProps {
  whatsappNumber: string;
}

export default function CTASection({ whatsappNumber }: CTASectionProps) {
  return (
    <section className="section">
      <div className="container mx-auto px-4">
        <Reveal className="relative overflow-hidden rounded-3xl bg-[linear-gradient(120deg,#0d2a7a_0%,#1b2c56_45%,#d62d2d_100%)] p-8 text-white shadow-2xl md:p-12">
          <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-20 -left-14 h-56 w-56 rounded-full bg-white/10 blur-2xl" />

          <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/75">Mulai dari sekarang</p>
              <h2 className="mt-3 text-3xl font-black leading-tight md:text-5xl">
                Siapkan Website CV Anda Menjadi Mesin Branding dan Akuisisi Klien
              </h2>
              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/85 md:text-base">
                Jika Anda serius membangun startup, website harus menjadi aset bisnis jangka panjang. Kami siap bantu dari strategi, desain, sampai implementasi.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="w-full !bg-white !text-slate-900 hover:!bg-slate-100 focus:!ring-white/40"
                  onClick={() => trackEvent({ event: 'cta_click', label: 'footer_consultation' })}
                >
                  Konsultasi Gratis
                </Button>
              </Link>
              <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full !border-white/80 !bg-transparent !text-white hover:!border-white hover:!bg-white/10 focus:!ring-white/40"
                  onClick={() => trackEvent({ event: 'cta_click', label: 'footer_whatsapp' })}
                >
                  Chat WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
