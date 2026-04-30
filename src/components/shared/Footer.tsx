import Link from 'next/link';
import BrandLogo from '@/components/shared/BrandLogo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-slate-900 py-12 text-slate-100 dark:border-slate-800 dark:bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="mb-10 grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <BrandLogo inverted />
            <p className="mt-4 text-sm leading-relaxed text-slate-300">
              ASDEV Solution Technology membantu bisnis bertumbuh melalui website, sistem, dan aplikasi modern.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.1em] text-slate-200">Navigasi</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><Link href="/">Beranda</Link></li>
              <li><Link href="/about">Tentang Kami</Link></li>
              <li><Link href="/services">Layanan</Link></li>
              <li><Link href="/portfolio">Portofolio</Link></li>
              <li><Link href="/blog">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.1em] text-slate-200">Fokus Layanan</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>Website & Landing Page</li>
              <li>Web App Internal</li>
              <li>Integrasi API & Otomasi</li>
              <li>UI/UX Design</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.1em] text-slate-200">Kontak</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <a href="mailto:info@asdev.id" className="transition hover:text-primary-300">info@asdev.id</a>
              </li>
              <li>
                <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="transition hover:text-primary-300">
                  +62 812-3456-7890
                </a>
              </li>
              <li>Indonesia</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-3 border-t border-slate-700 pt-6 text-xs text-slate-400 md:flex-row md:items-center">
          <p>&copy; {currentYear} ASDEV Solution Technology. All rights reserved.</p>
          <p>CV Asdev Solusi Teknologi</p>
        </div>
      </div>
    </footer>
  );
}
