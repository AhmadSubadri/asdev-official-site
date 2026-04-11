import { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const article = await db.blogArticle.findUnique({
    where: { slug: params.slug },
  });

  if (!article) return { title: "Blog | Asdev Digital" };

  return {
    title: `${article.title} | Asdev Digital`,
    description:
      article.excerpt || "Artikel terbaru tentang teknologi dan development.",
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = await db.blogArticle.findUnique({
    where: { slug: params.slug, published: true },
  });

  if (!article) notFound();

  return (
    <article className="max-w-4xl mx-auto py-20 px-4">
      <header className="mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-black mb-6 text-neutral-900 leading-tight">
          {article.title}
        </h1>
        <div className="text-xl text-neutral-500">
          {new Date(article.updatedAt).toLocaleDateString("id-ID", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
        {article.image && (
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-64 md:h-96 object-cover rounded-2xl mt-8 shadow-2xl mx-auto max-w-2xl"
          />
        )}
      </header>

      <div
        className="prose prose-neutral max-w-none prose-headings:font-black prose-h2:text-3xl prose-h3:text-2xl prose-a:text-primary-500 prose-strong:font-semibold prose-img:rounded-xl prose-img:shadow-lg prose-pre:bg-neutral-900 prose-code:font-mono prose-code:bg-neutral-100 prose-code:px-2 prose-code:py-1 prose-code:rounded"
        dangerouslySetInnerHTML={{
          __html: article.content.replace(/\n/g, "<br>"),
        }}
      />

      <div className="mt-20 pt-12 border-t border-neutral-200 text-center">
        <a
          href="/blog"
          className="inline-flex items-center gap-2 text-primary-500 hover:text-primary-600 font-semibold transition-colors"
        >
          ← Kembali ke Blog
        </a>
      </div>
    </article>
  );
}
