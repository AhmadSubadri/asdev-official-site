'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Button from '@/components/shared/Button';

interface Counts {
  services: number;
  portfolio: number;
  blog: number;
  testimonials: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState<Counts>({ services: 0, portfolio: 0, blog: 0, testimonials: 0 });

  useEffect(() => {
    const checkAuthAndLoad = async () => {
      try {
        const auth = await fetch('/api/admin/check');
        if (auth.status === 401) {
          router.push('/admin/login');
          return;
        }

        const [servicesRes, portfolioRes, blogRes, testimonialsRes] = await Promise.all([
          fetch('/api/services'),
          fetch('/api/portfolio'),
          fetch('/api/blog'),
          fetch('/api/testimonials'),
        ]);

        const [servicesData, portfolioData, blogData, testimonialsData] = await Promise.all([
          servicesRes.json(),
          portfolioRes.json(),
          blogRes.json(),
          testimonialsRes.json(),
        ]);

        setCounts({
          services: servicesData?.data?.length || 0,
          portfolio: portfolioData?.data?.length || 0,
          blog: blogData?.data?.length || 0,
          testimonials: testimonialsData?.data?.length || 0,
        });
      } catch {
        router.push('/admin/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndLoad();
  }, [router]);

  const stats = useMemo(
    () => [
      { label: 'Services', count: counts.services },
      { label: 'Portfolio', count: counts.portfolio },
      { label: 'Blog Posts', count: counts.blog },
      { label: 'Testimonials', count: counts.testimonials },
    ],
    [counts]
  );

  const modules = [
    {
      title: 'Services',
      description: 'Kelola layanan utama yang ditawarkan ASDEV.',
      href: '/admin/services',
    },
    {
      title: 'Portfolio',
      description: 'Update project dan case study agar trust meningkat.',
      href: '/admin/portfolio',
    },
    {
      title: 'Blog',
      description: 'Publikasikan insight untuk SEO dan branding authority.',
      href: '/admin/blog',
    },
    {
      title: 'Testimonials',
      description: 'Kelola social proof dari klien agar trust rate meningkat.',
      href: '/admin/testimonials',
    },
    {
      title: 'Messages',
      description: 'Pantau lead masuk dari halaman kontak.',
      href: '/admin/messages',
    },
    {
      title: 'Site Settings',
      description: 'Atur logo, nama website, kontak, dan SEO global.',
      href: '/admin/settings',
    },
  ];

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary-500 border-t-transparent" />
          <p className="text-sm text-slate-600 dark:text-slate-300">Memuat dashboard admin...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-slate-100/60 py-10 dark:bg-slate-900/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="surface-card mb-8 p-6 md:p-7">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary-600 dark:text-primary-300">ASDEV Admin</p>
              <h1 className="mt-2 text-3xl font-black text-slate-900 dark:text-slate-100">Content Control Center</h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
                Kelola layanan, portfolio, dan artikel agar website tetap aktif, relevan, dan siap akuisisi lead.
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>Logout</Button>
          </div>
        </header>

        <section className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="surface-card p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500 dark:text-slate-400">{stat.label}</p>
              <p className="mt-2 text-4xl font-black text-slate-900 dark:text-slate-100">{stat.count}</p>
            </div>
          ))}
        </section>

        <section className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {modules.map((module) => (
            <Link key={module.title} href={module.href} className="surface-card group p-6 transition hover:-translate-y-0.5 hover:shadow-lg">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary-600 dark:text-primary-300">Module</p>
              <h3 className="mt-2 text-2xl font-black text-slate-900 dark:text-slate-100">{module.title}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{module.description}</p>
              <p className="mt-5 text-sm font-semibold text-primary-500 transition group-hover:translate-x-1">Buka Module</p>
            </Link>
          ))}
        </section>
      </div>
    </div>
  );
}
