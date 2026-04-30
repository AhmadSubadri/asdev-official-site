import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { Markdown } from '@/components/Markdown';
import ArticleShare from '@/components/blog/ArticleShare';
import { markdownToPlainText, slugifyHeading } from '@/lib/markdown';
import { getSiteSettings } from '@/lib/site-settings';

function estimateReadingTime(content: string) {
  const words = markdownToPlainText(content).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function extractToc(content: string) {
  return content
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((line) => line.match(/^(#{2,3})\s+(.+)$/))
    .filter((item): item is RegExpMatchArray => Boolean(item))
    .map((item) => ({
      level: item[1].length as 2 | 3,
      text: item[2].trim(),
      id: slugifyHeading(item[2]),
    }))
    .filter((item) => Boolean(item.id));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const settings = await getSiteSettings();
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || settings.websiteUrl || 'https://asdev-digital.com';

  const article = await db.blogArticle.findUnique({
    where: { slug },
  });

  if (!article || !article.published) {
    return { title: 'Blog' };
  }

  return {
    title: article.title,
    description: article.excerpt || `Artikel terbaru ${settings.siteShortName} seputar software engineering dan digital growth.`,
    alternates: {
      canonical: `${baseUrl}/blog/${article.slug}`,
    },
    openGraph: {
      type: 'article',
      url: `${baseUrl}/blog/${article.slug}`,
      title: article.title,
      description: article.excerpt || `Artikel terbaru ${settings.siteShortName} seputar software engineering dan digital growth.`,
      publishedTime: article.createdAt.toISOString(),
      modifiedTime: article.updatedAt.toISOString(),
      images: [article.image || `${baseUrl}/opengraph-image`],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt || `Artikel terbaru ${settings.siteShortName} seputar software engineering dan digital growth.`,
      images: [article.image || `${baseUrl}/twitter-image`],
    },
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const settings = await getSiteSettings();
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || settings.websiteUrl || 'https://asdev-digital.com';

  const article = await db.blogArticle.findUnique({
    where: { slug },
  });

  if (!article || !article.published) notFound();

  const articleDescription =
    article.excerpt || markdownToPlainText(article.content).slice(0, 170) || `Insight terbaru dari ${settings.siteShortName}.`;
  const readingTime = estimateReadingTime(article.content);
  const toc = extractToc(article.content);
  const shareUrl = `${baseUrl}/blog/${article.slug}`;
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: articleDescription,
    image: article.image || `${baseUrl}/opengraph-image`,
    datePublished: article.createdAt.toISOString(),
    dateModified: article.updatedAt.toISOString(),
    author: {
      '@type': 'Organization',
      name: settings.siteName,
    },
    publisher: {
      '@type': 'Organization',
      name: settings.siteName,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/icon`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/blog/${article.slug}`,
    },
  };

  return (
    <article className="mx-auto max-w-7xl px-4 py-14 md:py-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] xl:gap-12">
        <div>
          <header className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary-600 dark:text-primary-300">{settings.siteShortName} Insights</p>
            <h1 className="mt-4 text-3xl font-black leading-tight text-slate-900 md:text-5xl dark:text-slate-100">{article.title}</h1>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base dark:text-slate-300">{articleDescription}</p>
            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
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
              <span className="h-1 w-1 rounded-full bg-slate-400" />
              <span>{article.published ? 'Published' : 'Draft'}</span>
            </div>
            {article.image && (
              <img
                src={article.image}
                alt={article.title}
                className="mt-8 h-64 w-full rounded-2xl object-cover shadow-xl md:h-[26rem]"
              />
            )}
          </header>

          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-10">
            <Markdown content={article.content} />
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

        <aside className="space-y-4 lg:sticky lg:top-24 lg:h-max">
          <ArticleShare url={shareUrl} title={article.title} description={articleDescription} />

          {toc.length > 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">On This Page</p>
              <ul className="mt-3 space-y-2">
                {toc.map((item) => (
                  <li key={`${item.id}-${item.level}`}>
                    <a
                      href={`#${item.id}`}
                      className={`block text-sm text-slate-600 transition hover:text-primary-600 dark:text-slate-300 dark:hover:text-primary-300 ${item.level === 3 ? 'pl-3' : ''}`}
                    >
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">Butuh Partner Eksekusi?</p>
            <h3 className="mt-3 text-xl font-black text-slate-900 dark:text-slate-100">{settings.siteShortName} siap bantu dari ide sampai launch</h3>
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
          </div>
        </aside>
      </div>
    </article>
  );
}
