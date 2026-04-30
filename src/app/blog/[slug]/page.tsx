import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';

function estimateReadingTime(content: string) {
  const words = content.replace(/<[^>]*>/g, ' ').trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const article = await db.blogArticle.findUnique({
    where: { slug },
  });

  if (!article || !article.published) {
    return { title: 'Blog | ASDEV Solution Technology' };
  }

  return {
    title: `${article.title} | ASDEV Solution Technology`,
    description: article.excerpt || 'Artikel terbaru ASDEV seputar software engineering dan digital growth.',
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const article = await db.blogArticle.findUnique({
    where: { slug },
  });

  if (!article || !article.published) notFound();

  const readingTime = estimateReadingTime(article.content);

  return (
    <article className="mx-auto max-w-6xl px-4 py-16 md:py-20">
      <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
        <div>
          <header className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary-600 dark:text-primary-300">ASDEV Insights</p>
            <h1 className="mt-4 text-3xl font-black leading-tight text-slate-900 md:text-5xl dark:text-slate-100">{article.title}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
              <span>
                {new Date(article.updatedAt).toLocaleDateString('id-ID', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
              <span className="h-1 w-1 rounded-full bg-slate-400" />
              <span>{readingTime} menit baca</span>
            </div>
            {article.image && (
              <img
                src={article.image}
                alt={article.title}
                className="mt-8 h-64 w-full rounded-2xl object-cover shadow-xl md:h-96"
              />
            )}
          </header>

          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-10">
            <div
              className="prose prose-slate max-w-none dark:prose-invert prose-headings:font-black prose-a:text-primary-500 prose-strong:font-semibold prose-p:leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: article.content.replace(/\n/g, '<br>'),
              }}
            />
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/blog" className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-primary-400 hover:text-primary-600 dark:border-slate-700 dark:text-slate-200 dark:hover:border-primary-500 dark:hover:text-primary-300">
              Kembali ke Blog
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-xl bg-primary-500 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-600">
              Diskusikan Kebutuhan Digital
            </Link>
          </div>
        </div>

        <aside className="h-max rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">Butuh Partner Eksekusi?</p>
          <h3 className="mt-3 text-xl font-black text-slate-900 dark:text-slate-100">ASDEV siap bantu dari ide sampai launch</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            Cocok untuk Anda yang ingin website dan sistem digital terkelola rapi, cepat, dan siap scale.
          </p>
          <div className="mt-5 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <p>- Website company profile & landing page</p>
            <p>- Dashboard internal dan automasi proses</p>
            <p>- Integrasi API dan optimasi performa</p>
          </div>
          <Link href="/contact" className="mt-6 inline-flex w-full justify-center rounded-xl bg-secondary-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-secondary-600">
            Konsultasi Gratis
          </Link>
        </aside>
      </div>
    </article>
  );
}
