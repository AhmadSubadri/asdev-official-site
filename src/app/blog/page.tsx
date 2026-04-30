import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { db } from '@/lib/db';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal';

export const metadata: Metadata = {
  title: 'Blog - ASDEV Solution Technology',
  description: 'Insight praktis ASDEV seputar software development, product strategy, dan transformasi digital bisnis.',
};

const fallbackPosts = [
  {
    id: 'fallback-1',
    title: 'Membangun Website Bisnis yang Siap Scale',
    slug: 'website-bisnis-siap-scale',
    excerpt: 'Panduan ringkas menyusun fondasi teknis website agar performa stabil saat traffic naik.',
    image: '/brand/asdev-logo-light.png',
    createdAt: new Date('2026-01-10'),
    category: 'Website',
  },
  {
    id: 'fallback-2',
    title: 'Checklist Integrasi API untuk Operasional Perusahaan',
    slug: 'checklist-integrasi-api',
    excerpt: 'Langkah terstruktur agar integrasi antar sistem tidak menimbulkan data ganda dan error proses bisnis.',
    image: '/brand/asdev-logo-dark.png',
    createdAt: new Date('2026-02-12'),
    category: 'Integrasi',
  },
  {
    id: 'fallback-3',
    title: 'Cara Menentukan Prioritas Fitur di Fase Awal Produk',
    slug: 'prioritas-fitur-fase-awal',
    excerpt: 'Framework sederhana untuk memilih fitur yang paling berdampak pada bisnis dan user.',
    image: '/brand/asdev-logo-light.png',
    createdAt: new Date('2026-03-03'),
    category: 'Product',
  },
];

async function getArticles() {
  try {
    return await db.blogArticle.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
      take: 24,
    });
  } catch (error) {
    console.error('Failed to fetch blog articles:', error);
    return [];
  }
}

export default async function Blog() {
  const posts = await getArticles();

  const renderedPosts =
    posts.length > 0
      ? posts.map((post) => ({
          id: post.id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt || post.content.slice(0, 140) + '...',
          image: post.image || '/brand/asdev-logo-light.png',
          createdAt: post.createdAt,
          category: 'Insight',
        }))
      : fallbackPosts;

  return (
    <div className="pt-16">
      <section className="bg-gradient-to-br from-slate-50 to-white py-20 dark:from-slate-950 dark:to-slate-900">
        <div className="container mx-auto px-4">
          <Reveal>
            <span className="inline-flex rounded-full border border-primary-200 bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-primary-700 dark:border-primary-900 dark:bg-primary-900/30 dark:text-primary-200">
              ASDEV Insights
            </span>
            <h1 className="mt-6 text-4xl font-black text-slate-900 md:text-6xl dark:text-slate-100">Artikel untuk Keputusan Teknologi yang Lebih Tajam</h1>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg dark:text-slate-300">
              Konten kami berfokus pada implementasi nyata: dari strategi produk, engineering execution, hingga optimasi platform digital.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container mx-auto px-4">
          <Stagger className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3" stagger={0.09}>
            {renderedPosts.map((post) => (
              <StaggerItem
                key={post.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="relative h-52 w-full bg-slate-100 dark:bg-slate-800">
                  <Image src={post.image} alt={post.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 33vw" />
                </div>
                <div className="p-6">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700 dark:bg-primary-900/40 dark:text-primary-200">
                      {post.category}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {new Date(post.createdAt).toLocaleDateString('id-ID')}
                    </span>
                  </div>
                  <h3 className="mb-2 line-clamp-2 text-lg font-black text-slate-900 dark:text-slate-100">{post.title}</h3>
                  <p className="mb-5 line-clamp-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{post.excerpt}</p>
                  <Link href={`/blog/${post.slug}`} className="text-sm font-semibold text-primary-500 hover:text-primary-600">
                    Baca selengkapnya
                  </Link>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </div>
  );
}
