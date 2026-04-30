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

const capabilities = ['Website & Landing Page', 'Mobile App Development', 'Custom Web App', 'Integrasi API'];

const techStack = [
  { name: 'React', type: 'Frontend', icon: 'https://cdn.simpleicons.org/react/61DAFB', bg: 'bg-sky-500/10' },
  { name: 'Next.js', type: 'Web Framework', icon: 'https://cdn.simpleicons.org/nextdotjs/111111', bg: 'bg-slate-500/10' },
  { name: 'TypeScript', type: 'Language', icon: 'https://cdn.simpleicons.org/typescript/3178C6', bg: 'bg-blue-500/10' },
  { name: 'Node.js', type: 'Backend Runtime', icon: 'https://cdn.simpleicons.org/nodedotjs/5FA04E', bg: 'bg-emerald-500/10' },
  { name: 'Go', type: 'Backend Service', icon: 'https://cdn.simpleicons.org/go/00ADD8', bg: 'bg-cyan-500/10' },
  { name: 'Laravel', type: 'PHP Framework', icon: 'https://cdn.simpleicons.org/laravel/FF2D20', bg: 'bg-rose-500/10' },
  { name: 'CodeIgniter', type: 'PHP Framework', icon: 'https://cdn.simpleicons.org/codeigniter/EF4223', bg: 'bg-orange-500/10' },
  { name: 'Flutter', type: 'Mobile', icon: 'https://cdn.simpleicons.org/flutter/02569B', bg: 'bg-indigo-500/10' },
  { name: 'React Native', type: 'Mobile', icon: 'https://cdn.simpleicons.org/react/61DAFB', bg: 'bg-sky-500/10' },
  { name: 'MySQL', type: 'Database', icon: 'https://cdn.simpleicons.org/mysql/4479A1', bg: 'bg-blue-500/10' },
  { name: 'PostgreSQL', type: 'Database', icon: 'https://cdn.simpleicons.org/postgresql/4169E1', bg: 'bg-violet-500/10' },
  { name: 'Prisma', type: 'ORM', icon: 'https://cdn.simpleicons.org/prisma/2D3748', bg: 'bg-fuchsia-500/10' },
  { name: 'Docker', type: 'Infra', icon: 'https://cdn.simpleicons.org/docker/2496ED', bg: 'bg-blue-500/10' },
  { name: 'Tailwind CSS', type: 'Styling', icon: 'https://cdn.simpleicons.org/tailwindcss/06B6D4', bg: 'bg-cyan-500/10' },
];

const flyingTech = [
  { name: 'React', icon: 'https://cdn.simpleicons.org/react/61DAFB', bg: 'bg-sky-500/10', top: '16%', duration: 34, delay: 0 },
  { name: 'Next.js', icon: 'https://cdn.simpleicons.org/nextdotjs/111111', bg: 'bg-slate-500/10', top: '28%', duration: 39, delay: 6 },
  { name: 'Node.js', icon: 'https://cdn.simpleicons.org/nodedotjs/5FA04E', bg: 'bg-emerald-500/10', top: '44%', duration: 36, delay: 11 },
  { name: 'TypeScript', icon: 'https://cdn.simpleicons.org/typescript/3178C6', bg: 'bg-blue-500/10', top: '60%', duration: 42, delay: 3 },
  { name: 'Flutter', icon: 'https://cdn.simpleicons.org/flutter/02569B', bg: 'bg-cyan-500/10', top: '74%', duration: 46, delay: 9 },
  { name: 'Laravel', icon: 'https://cdn.simpleicons.org/laravel/FF2D20', bg: 'bg-rose-500/10', top: '36%', duration: 44, delay: 15 },
];

const topRowTech = techStack.slice(0, 8);
const bottomRowTech = techStack.slice(8);
const topRowMarquee = [...topRowTech, ...topRowTech];
const bottomRowMarquee = [...bottomRowTech, ...bottomRowTech];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-28 md:pt-32">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-primary-200/40 blur-3xl dark:bg-primary-900/20" />
        <div className="absolute -left-20 bottom-16 h-72 w-72 rounded-full bg-secondary-200/40 blur-3xl dark:bg-secondary-900/30" />
        <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(to_right,rgba(100,116,139,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(100,116,139,0.18)_1px,transparent_1px)] [background-size:36px_36px] dark:opacity-20" />

        <div className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block">
          {flyingTech.map((badge, index) => (
            <div
              key={badge.name}
              className="tech-fly-item"
              style={{
                top: badge.top,
                animationDuration: `${badge.duration}s`,
                animationDelay: `-${badge.delay}s`,
              }}
            >
              <motion.div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200/80 ${badge.bg} shadow-lg backdrop-blur dark:border-slate-700/70`}
                animate={{ y: [0, -10, 0], rotate: [0, 2, -2, 0] }}
                transition={{ duration: 5 + index * 0.5, repeat: Infinity, ease: 'easeInOut' }}
                title={badge.name}
              >
                <img src={badge.icon} alt={badge.name} className="h-6 w-6 object-contain" />
              </motion.div>
            </div>
          ))}
        </div>
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
              Kami membantu bisnis merancang, membangun, dan mengembangkan website, aplikasi mobile, serta sistem digital dengan pendekatan engineering yang rapi, cepat, dan terukur.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {[
                { name: 'React', icon: 'https://cdn.simpleicons.org/react/61DAFB' },
                { name: 'Next.js', icon: 'https://cdn.simpleicons.org/nextdotjs/111111' },
                { name: 'Laravel', icon: 'https://cdn.simpleicons.org/laravel/FF2D20' },
                { name: 'CI3', icon: 'https://cdn.simpleicons.org/codeigniter/EF4223' },
                { name: 'MySQL', icon: 'https://cdn.simpleicons.org/mysql/4479A1' },
              ].map((item) => (
                <span key={item.name} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
                  <img src={item.icon} alt={item.name} className="h-3.5 w-3.5 object-contain" />
                  {item.name}
                </span>
              ))}
            </div>

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
                Fokus kami bukan hanya desain cantik, tetapi arsitektur yang maintainable agar produk digital Anda siap bertumbuh.
              </p>
            </div>
          </motion.div>
        </div>

        <div className="mt-12 rounded-2xl border border-slate-200 bg-white/85 px-3 py-3 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/75">
          <div className="space-y-3">
            <div className="tech-marquee">
              <div className="tech-marquee-track">
                {topRowMarquee.map((tech, index) => (
                  <div
                    key={`top-${tech.name}-${index}`}
                    className="mr-3 inline-flex min-w-[210px] items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={`inline-flex h-7 w-7 items-center justify-center rounded-lg ${tech.bg}`}>
                        <img src={tech.icon} alt={tech.name} className="h-4 w-4 object-contain" />
                      </span>
                      <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">{tech.name}</span>
                    </div>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500 dark:text-slate-400">{tech.type}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="tech-marquee">
              <div className="tech-marquee-track tech-marquee-track-reverse">
                {bottomRowMarquee.map((tech, index) => (
                  <div
                    key={`bottom-${tech.name}-${index}`}
                    className="mr-3 inline-flex min-w-[210px] items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={`inline-flex h-7 w-7 items-center justify-center rounded-lg ${tech.bg}`}>
                        <img src={tech.icon} alt={tech.name} className="h-4 w-4 object-contain" />
                      </span>
                      <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">{tech.name}</span>
                    </div>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500 dark:text-slate-400">{tech.type}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
