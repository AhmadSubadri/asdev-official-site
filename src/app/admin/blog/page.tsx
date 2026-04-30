'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import Button from '@/components/shared/Button';
import { useAdminAuthGuard } from '@/components/admin/useAdminAuthGuard';
import { AdminLoadingState } from '@/components/admin/AdminLoadingState';
import ImageUploadField from '@/components/admin/ImageUploadField';
import { Markdown } from '@/components/Markdown';
import { markdownToPlainText } from '@/lib/markdown';

type BlogItem = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  content: string;
  image?: string | null;
  published: boolean;
  createdAt: string;
};

const emptyForm = {
  id: '',
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  image: '',
  published: false,
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

const snippets = [
  { label: 'H2', text: '\n## Judul Section\n' },
  { label: 'List', text: '\n- Poin pertama\n- Poin kedua\n' },
  { label: 'Link', text: '\n[Label Link](https://example.com)\n' },
  { label: 'Inline Code', text: '`npm run build`' },
  { label: 'Code Block', text: '\n```ts\nconst hello = "ASDEV";\nconsole.log(hello);\n```\n' },
  { label: 'Callout', text: '\n> [!TIP]\n> Pakai command ini untuk build production.\n' },
  { label: 'Table', text: '\n| Fitur | Status | Catatan |\n| --- | --- | --- |\n| Blog markdown | Ready | Support code/callout/table |\n| Share article | Ready | WA, LinkedIn, X, Facebook |\n' },
  { label: 'Quote', text: '\n> Insight penting untuk pembaca.\n' },
];

export default function AdminBlogPage() {
  const { checkingAuth } = useAdminAuthGuard();
  const [items, setItems] = useState<BlogItem[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState('');
  const [form, setForm] = useState(emptyForm);
  const [activePanel, setActivePanel] = useState<'write' | 'preview'>('write');
  const contentRef = useRef<HTMLTextAreaElement | null>(null);

  const loadData = async () => {
    setLoadingData(true);
    try {
      const response = await fetch('/api/blog');
      const json = await response.json();
      setItems(json?.data || []);
    } catch {
      setStatus('Gagal memuat artikel');
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (!checkingAuth) loadData();
  }, [checkingAuth]);

  const resetForm = () => {
    setForm(emptyForm);
    setActivePanel('write');
  };

  const injectSnippet = (snippet: string) => {
    const textarea = contentRef.current;
    if (!textarea) {
      setForm((prev) => ({ ...prev, content: `${prev.content}${snippet}` }));
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const before = form.content.slice(0, start);
    const after = form.content.slice(end);
    const next = `${before}${snippet}${after}`;

    setForm((prev) => ({ ...prev, content: next }));

    requestAnimationFrame(() => {
      textarea.focus();
      const cursor = start + snippet.length;
      textarea.setSelectionRange(cursor, cursor);
    });
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setStatus('');

    try {
      const payload = {
        title: form.title,
        slug: form.slug,
        excerpt: form.excerpt || undefined,
        content: form.content,
        image: form.image || undefined,
        published: form.published,
      };

      const isEdit = Boolean(form.id);
      const endpoint = isEdit ? `/api/blog/${form.id}` : '/api/blog';
      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await response.json();
      if (!response.ok) {
        setStatus(json?.message || 'Gagal menyimpan artikel');
        return;
      }

      setStatus(isEdit ? 'Artikel berhasil diperbarui' : 'Artikel berhasil ditambahkan');
      resetForm();
      await loadData();
    } catch {
      setStatus('Terjadi kesalahan saat menyimpan artikel');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item: BlogItem) => {
    setForm({
      id: item.id,
      title: item.title,
      slug: item.slug,
      excerpt: item.excerpt || '',
      content: item.content,
      image: item.image || '',
      published: item.published,
    });
    setActivePanel('write');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Hapus artikel ini?')) return;
    try {
      const response = await fetch(`/api/blog/${id}`, { method: 'DELETE' });
      const json = await response.json();
      if (!response.ok) {
        setStatus(json?.message || 'Gagal menghapus artikel');
        return;
      }
      setStatus('Artikel berhasil dihapus');
      await loadData();
    } catch {
      setStatus('Terjadi kesalahan saat menghapus artikel');
    }
  };

  const estimatedText = markdownToPlainText(form.content);

  if (checkingAuth || loadingData) return <AdminLoadingState label="Memuat artikel..." />;

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-slate-100/60 py-10 dark:bg-slate-900/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary-600 dark:text-primary-300">Admin Module</p>
            <h1 className="mt-2 text-3xl font-black text-slate-900 dark:text-slate-100">Manage Blog</h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Editor mendukung markdown profesional: heading, list, link, inline code, dan fenced code block.</p>
          </div>
          <Link href="/admin" className="text-sm font-semibold text-primary-500 hover:text-primary-600">Kembali ke Dashboard</Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <section className="surface-card p-6">
            <h2 className="text-xl font-black text-slate-900 dark:text-slate-100">{form.id ? 'Edit Artikel' : 'Tambah Artikel'}</h2>
            {status && <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{status}</p>}

            <form onSubmit={handleSave} className="mt-5 space-y-4">
              <Field label="Judul" value={form.title} onChange={(v) => setForm((p) => ({ ...p, title: v }))} required />
              <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-end">
                <Field label="Slug" value={form.slug} onChange={(v) => setForm((p) => ({ ...p, slug: v }))} required />
                <Button type="button" variant="outline" size="sm" onClick={() => setForm((p) => ({ ...p, slug: slugify(p.title) }))}>
                  Generate Slug
                </Button>
              </div>
              <Field label="Excerpt (opsional)" value={form.excerpt} onChange={(v) => setForm((p) => ({ ...p, excerpt: v }))} multiline />
              <ImageUploadField
                label="Gambar Cover (opsional)"
                value={form.image}
                onChange={(v) => setForm((p) => ({ ...p, image: v }))}
                folder="blog"
              />

              <div className="rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 p-3 dark:border-slate-700">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setActivePanel('write')}
                      className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${activePanel === 'write' ? 'bg-primary-500 text-white' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200'}`}
                    >
                      Write
                    </button>
                    <button
                      type="button"
                      onClick={() => setActivePanel('preview')}
                      className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${activePanel === 'preview' ? 'bg-primary-500 text-white' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200'}`}
                    >
                      Preview
                    </button>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{estimatedText.length} karakter teks terbaca</p>
                </div>

                <div className="border-b border-slate-200 p-3 dark:border-slate-700">
                  <div className="flex flex-wrap gap-2">
                    {snippets.map((snippet) => (
                      <button
                        key={snippet.label}
                        type="button"
                        onClick={() => injectSnippet(snippet.text)}
                        className="rounded-lg border border-slate-300 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:border-primary-400 hover:text-primary-600 dark:border-slate-600 dark:text-slate-200"
                      >
                        {snippet.label}
                      </button>
                    ))}
                  </div>
                </div>

                {activePanel === 'write' ? (
                  <textarea
                    ref={contentRef}
                    value={form.content}
                    onChange={(e) => setForm((p) => ({ ...p, content: e.target.value }))}
                    required
                    rows={14}
                    className="w-full resize-y rounded-b-xl bg-white px-4 py-3 text-sm text-slate-800 outline-none dark:bg-slate-900 dark:text-slate-100"
                    placeholder="Tulis konten artikel dalam format markdown..."
                  />
                ) : (
                  <div className="max-h-[420px] overflow-auto rounded-b-xl bg-white px-4 py-4 dark:bg-slate-900">
                    {form.content.trim() ? (
                      <Markdown content={form.content} />
                    ) : (
                      <p className="text-sm text-slate-500 dark:text-slate-400">Preview akan tampil setelah Anda menulis konten.</p>
                    )}
                  </div>
                )}
              </div>

              <label className="flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-200">
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(e) => setForm((p) => ({ ...p, published: e.target.checked }))}
                />
                Publish artikel
              </label>

              <div className="flex gap-3">
                <Button type="submit" isLoading={saving}>{form.id ? 'Update Artikel' : 'Simpan Artikel'}</Button>
                {form.id && <Button type="button" variant="outline" onClick={resetForm}>Batal Edit</Button>}
              </div>
            </form>
          </section>

          <section className="surface-card p-6">
            <h2 className="text-xl font-black text-slate-900 dark:text-slate-100">Daftar Artikel</h2>
            <div className="mt-4 space-y-3">
              {items.map((item) => (
                <article key={item.id} className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-black text-slate-900 dark:text-slate-100">{item.title}</h3>
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">/{item.slug} | {item.published ? 'Published' : 'Draft'}</p>
                      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 line-clamp-2">{item.excerpt || markdownToPlainText(item.content)}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button type="button" size="sm" variant="outline" onClick={() => handleEdit(item)}>Edit</Button>
                      <Button type="button" size="sm" onClick={() => handleDelete(item.id)} className="bg-rose-600 hover:bg-rose-700">Hapus</Button>
                    </div>
                  </div>
                </article>
              ))}
              {items.length === 0 && <p className="text-sm text-slate-500 dark:text-slate-400">Belum ada artikel.</p>}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  required,
  multiline,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  multiline?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-slate-800 dark:text-slate-200">{label}</label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          rows={4}
          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
        />
      )}
    </div>
  );
}
