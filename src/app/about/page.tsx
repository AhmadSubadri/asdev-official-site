import { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/shared/Button';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal';

export const metadata: Metadata = {
  title: 'Tentang Kami',
  description:
    'Profil perusahaan: visi, nilai kerja, dan pendekatan delivery untuk membantu bisnis bertumbuh lewat teknologi.',
};

const principles = [
  {
    title: 'Business First',
    description: 'Keputusan teknis selalu dikaitkan ke tujuan bisnis: efisiensi, growth, dan pengalaman pelanggan.',
  },
  {
    title: 'Execution Discipline',
    description: 'Proses kerja jelas dari scope, timeline, QA, hingga handover agar project tetap terkontrol.',
  },
  {
    title: 'Long-term Architecture',
    description: 'Solusi dibangun agar mudah dikembangkan saat bisnis Anda bergerak dari CV menuju startup scale-up.',
  },
  {
    title: 'Transparent Collaboration',
    description: 'Komunikasi progres, kendala, dan opsi keputusan dilakukan terbuka sepanjang implementasi.',
  },
];

const timeline = [
  { year: '2020', text: 'Memulai sebagai praktik freelance dengan fokus web development.' },
  { year: '2022', text: 'Menangani proyek sistem internal dan automasi untuk berbagai sektor bisnis.' },
  { year: '2024', text: 'Memperluas layanan ke product strategy, UI/UX, dan technical partnership.' },
  { year: '2026', text: 'Bertransformasi sebagai ASDEV Solution Technology untuk mendorong startup-ready delivery.' },
];

export default function About() {
  return (
    <div className="pt-16">
      <section className="bg-gradient-to-br from-slate-50 to-white py-20 dark:from-slate-950 dark:to-slate-900">
        <div className="container mx-auto px-4">
          <Reveal>
            <span className="inline-flex rounded-full border border-primary-200 bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-primary-700 dark:border-primary-900 dark:bg-primary-900/30 dark:text-primary-200">
              Company Story
            </span>
            <h1 className="mt-6 text-4xl font-black leading-tight text-slate-900 md:text-6xl dark:text-slate-100">
              Membangun Solusi Digital yang
              <span className="block text-primary-500">Bisa Dipakai, Bukan Sekadar Dipamerkan</span>
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg dark:text-slate-300">
              ASDEV Solution Technology lahir dari pengalaman lebih dari 5 tahun di lapangan. Kami memahami kebutuhan owner bisnis yang butuh partner teknis cepat, rapi, dan bisa diandalkan.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr]">
            <Reveal className="surface-card p-7 md:p-9">
              <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100">Siapa Kami</h2>
              <p className="mt-5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                Kami adalah tim product-minded developer yang membantu bisnis merancang, membangun, dan mengembangkan platform digital. Fokus kami mencakup website branding, sistem operasional internal, dan integrasi proses bisnis.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                Pendekatan kami menyeimbangkan kualitas engineering, kecepatan delivery, dan hasil bisnis. Dengan itu, platform yang Anda bangun hari ini tetap relevan untuk pertumbuhan besok.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/services">
                  <Button variant="outline">Eksplor Layanan</Button>
                </Link>
                <Link href="/contact">
                  <Button>Konsultasi Strategi</Button>
                </Link>
              </div>
            </Reveal>

            <Reveal className="surface-card p-7 md:p-9" delay={0.1}>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-600 dark:text-primary-300">Journey</p>
              <Stagger className="mt-5 space-y-4" stagger={0.1}>
                {timeline.map((item) => (
                  <StaggerItem key={item.year} className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
                    <p className="text-sm font-black text-slate-900 dark:text-slate-100">{item.year}</p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{item.text}</p>
                  </StaggerItem>
                ))}
              </Stagger>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section bg-slate-100/60 dark:bg-slate-900/30">
        <div className="container mx-auto px-4">
          <Reveal className="mb-12 text-center">
            <h2 className="section-heading">Prinsip Kerja Kami</h2>
            <p className="section-subheading mx-auto">Empat prinsip ini menjaga setiap project tetap bernilai bagi bisnis, bukan hanya selesai secara teknis.</p>
          </Reveal>

          <Stagger className="grid grid-cols-1 gap-5 md:grid-cols-2" stagger={0.09}>
            {principles.map((item) => (
              <StaggerItem key={item.title} className="surface-card p-6">
                <h3 className="text-xl font-black text-slate-900 dark:text-slate-100">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{item.description}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </div>
  );
}
