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

const floatingIcons = [
  { name: 'React', icon: 'https://cdn.simpleicons.org/react/61DAFB', top: '18%', duration: 34, delay: 0, reverse: false },
  { name: 'Next.js', icon: 'https://cdn.simpleicons.org/nextdotjs/111111', top: '32%', duration: 40, delay: 7, reverse: true },
  { name: 'Laravel', icon: 'https://cdn.simpleicons.org/laravel/FF2D20', top: '46%', duration: 38, delay: 12, reverse: false },
  { name: 'Flutter', icon: 'https://cdn.simpleicons.org/flutter/02569B', top: '60%', duration: 44, delay: 3, reverse: true },
  { name: 'MySQL', icon: 'https://cdn.simpleicons.org/mysql/4479A1', top: '74%', duration: 42, delay: 9, reverse: false },
];

const mobileFloatingIcons = [
  { name: 'React', icon: 'https://cdn.simpleicons.org/react/61DAFB', top: '26%', duration: 28, delay: 0, reverse: false },
  { name: 'Laravel', icon: 'https://cdn.simpleicons.org/laravel/FF2D20', top: '44%', duration: 34, delay: 8, reverse: true },
  { name: 'MySQL', icon: 'https://cdn.simpleicons.org/mysql/4479A1', top: '62%', duration: 31, delay: 13, reverse: false },
];

export default function About() {
  return (
    <div className="pt-16">
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-white py-20 dark:from-slate-950 dark:to-slate-900">
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(to_right,rgba(100,116,139,0.14)_1px,transparent_1px),linear-gradient(to_bottom,rgba(100,116,139,0.14)_1px,transparent_1px)] [background-size:34px_34px] dark:opacity-20" />

        <div className="pointer-events-none absolute inset-0 overflow-hidden lg:hidden">
          {mobileFloatingIcons.map((item) => (
            <div
              key={`mobile-${item.name}`}
              className={`about-fly-item about-fly-item-mobile ${item.reverse ? 'about-fly-item-reverse' : ''}`}
              style={{
                top: item.top,
                animationDuration: `${item.duration}s`,
                animationDelay: `-${item.delay}s`,
              }}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200/80 bg-white/65 shadow-sm backdrop-blur dark:border-slate-700/70 dark:bg-slate-900/55">
                <img src={item.icon} alt={item.name} className="h-4 w-4 object-contain" />
              </div>
            </div>
          ))}
        </div>

        <div className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block">
          {floatingIcons.map((item) => (
            <div
              key={item.name}
              className={`about-fly-item ${item.reverse ? 'about-fly-item-reverse' : ''}`}
              style={{
                top: item.top,
                animationDuration: `${item.duration}s`,
                animationDelay: `-${item.delay}s`,
              }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200/80 bg-white/70 shadow-md backdrop-blur dark:border-slate-700/70 dark:bg-slate-900/60">
                <img src={item.icon} alt={item.name} className="h-5 w-5 object-contain" />
              </div>
            </div>
          ))}
        </div>

        <div className="container relative z-10 mx-auto px-4">
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

            <div className="mt-8 flex flex-wrap gap-3">
              {['Website', 'Mobile App', 'System Development', 'API Integration', 'UI/UX'].map((item) => (
                <span key={item} className="rounded-full border border-slate-200 bg-white/90 px-3 py-1 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-300">
                  {item}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr]">
            <Reveal className="surface-card p-7 md:p-9">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-600 dark:text-primary-300">Who We Are</p>
              <h2 className="mt-3 text-3xl font-black text-slate-900 dark:text-slate-100">Siapa Kami</h2>
              <p className="mt-5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                Kami adalah tim product-minded developer yang membantu bisnis merancang, membangun, dan mengembangkan platform digital. Fokus kami mencakup website branding, sistem operasional internal, dan integrasi proses bisnis.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                Pendekatan kami menyeimbangkan kualitas engineering, kecepatan delivery, dan hasil bisnis. Dengan itu, platform yang Anda bangun hari ini tetap relevan untuk pertumbuhan besok.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { value: '50+', label: 'Project' },
                  { value: '5+', label: 'Tahun' },
                  { value: '100%', label: 'Komitmen' },
                  { value: 'Fast', label: 'Delivery' },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-center dark:border-slate-700 dark:bg-slate-900">
                    <p className="text-xl font-black text-slate-900 dark:text-slate-100">{item.value}</p>
                    <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500 dark:text-slate-400">{item.label}</p>
                  </div>
                ))}
              </div>

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
              <div className="relative mt-6 pl-6">
                <div className="absolute left-[9px] top-1 h-[calc(100%-1.5rem)] w-px bg-gradient-to-b from-primary-400 to-slate-200 dark:to-slate-700" />
                <Stagger className="space-y-4" stagger={0.1}>
                  {timeline.map((item) => (
                    <StaggerItem key={item.year} className="relative rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
                      <span className="absolute -left-6 top-4 h-3 w-3 rounded-full bg-primary-500 ring-4 ring-primary-100 dark:ring-primary-900/40" />
                      <p className="text-sm font-black text-slate-900 dark:text-slate-100">{item.year}</p>
                      <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{item.text}</p>
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>
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
            {principles.map((item, index) => (
              <StaggerItem key={item.title} className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900">
                <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-primary-500/10 blur-2xl" />
                <p className="relative text-xs font-bold uppercase tracking-[0.1em] text-primary-600 dark:text-primary-300">0{index + 1}</p>
                <h3 className="relative mt-3 text-xl font-black text-slate-900 dark:text-slate-100">{item.title}</h3>
                <p className="relative mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{item.description}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </div>
  );
}
