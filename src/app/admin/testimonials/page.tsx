'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Button from '@/components/shared/Button';
import ImageUploadField from '@/components/admin/ImageUploadField';
import { useAdminAuthGuard } from '@/components/admin/useAdminAuthGuard';
import { AdminLoadingState } from '@/components/admin/AdminLoadingState';

type TestimonialItem = {
  id: string;
  name: string;
  role?: string | null;
  company?: string | null;
  content: string;
  avatarUrl?: string | null;
  rating: number;
  published: boolean;
  order: number;
  createdAt: string;
};

const emptyForm = {
  id: '',
  name: '',
  role: '',
  company: '',
  content: '',
  avatarUrl: '',
  rating: '5',
  published: true,
  order: '0',
};

export default function AdminTestimonialsPage() {
  const { checkingAuth } = useAdminAuthGuard();
  const [items, setItems] = useState<TestimonialItem[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState('');
  const [form, setForm] = useState(emptyForm);

  const loadData = async () => {
    setLoadingData(true);
    try {
      const response = await fetch('/api/testimonials');
      const json = await response.json();
      setItems(json?.data || []);
    } catch {
      setStatus('Gagal memuat data testimoni');
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (!checkingAuth) loadData();
  }, [checkingAuth]);

  const resetForm = () => setForm(emptyForm);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setStatus('');

    try {
      const payload = {
        name: form.name,
        role: form.role || undefined,
        company: form.company || undefined,
        content: form.content,
        avatarUrl: form.avatarUrl || undefined,
        rating: Number(form.rating || 5),
        published: form.published,
        order: Number(form.order || 0),
      };

      const isEdit = Boolean(form.id);
      const endpoint = isEdit ? `/api/testimonials/${form.id}` : '/api/testimonials';
      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await response.json();
      if (!response.ok) {
        setStatus(json?.message || 'Gagal menyimpan testimoni');
        return;
      }

      setStatus(isEdit ? 'Testimoni berhasil diperbarui' : 'Testimoni berhasil ditambahkan');
      resetForm();
      await loadData();
    } catch {
      setStatus('Terjadi kesalahan saat menyimpan testimoni');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item: TestimonialItem) => {
    setForm({
      id: item.id,
      name: item.name,
      role: item.role || '',
      company: item.company || '',
      content: item.content,
      avatarUrl: item.avatarUrl || '',
      rating: String(item.rating || 5),
      published: item.published,
      order: String(item.order),
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Hapus testimoni ini?')) return;

    try {
      const response = await fetch(`/api/testimonials/${id}`, { method: 'DELETE' });
      const json = await response.json();
      if (!response.ok) {
        setStatus(json?.message || 'Gagal menghapus testimoni');
        return;
      }

      setStatus('Testimoni berhasil dihapus');
      await loadData();
    } catch {
      setStatus('Terjadi kesalahan saat menghapus testimoni');
    }
  };

  if (checkingAuth || loadingData) return <AdminLoadingState label="Memuat testimoni..." />;

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-slate-100/60 py-10 dark:bg-slate-900/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary-600 dark:text-primary-300">Admin Module</p>
            <h1 className="mt-2 text-3xl font-black text-slate-900 dark:text-slate-100">Manage Testimonials</h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Kelola social proof untuk meningkatkan trust calon klien.</p>
          </div>
          <Link href="/admin" className="text-sm font-semibold text-primary-500 hover:text-primary-600">Kembali ke Dashboard</Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.05fr_1.2fr]">
          <section className="surface-card p-6">
            <h2 className="text-xl font-black text-slate-900 dark:text-slate-100">{form.id ? 'Edit Testimoni' : 'Tambah Testimoni'}</h2>
            {status && <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{status}</p>}

            <form onSubmit={handleSave} className="mt-5 space-y-4">
              <Field label="Nama Klien" value={form.name} onChange={(v) => setForm((p) => ({ ...p, name: v }))} required />
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Jabatan" value={form.role} onChange={(v) => setForm((p) => ({ ...p, role: v }))} />
                <Field label="Perusahaan" value={form.company} onChange={(v) => setForm((p) => ({ ...p, company: v }))} />
              </div>
              <Field label="Isi Testimoni" value={form.content} onChange={(v) => setForm((p) => ({ ...p, content: v }))} required multiline rows={5} />
              <ImageUploadField
                label="Foto Klien (opsional)"
                value={form.avatarUrl}
                onChange={(v) => setForm((p) => ({ ...p, avatarUrl: v }))}
                folder="testimonials"
              />

              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Rating (1-5)" value={form.rating} onChange={(v) => setForm((p) => ({ ...p, rating: v }))} type="number" min={1} max={5} required />
                <Field label="Urutan" value={form.order} onChange={(v) => setForm((p) => ({ ...p, order: v }))} type="number" />
              </div>

              <label className="flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-200">
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(e) => setForm((p) => ({ ...p, published: e.target.checked }))}
                />
                Tampilkan di website
              </label>

              <div className="flex gap-3">
                <Button type="submit" isLoading={saving}>{form.id ? 'Update Testimoni' : 'Simpan Testimoni'}</Button>
                {form.id && <Button type="button" variant="outline" onClick={resetForm}>Batal Edit</Button>}
              </div>
            </form>
          </section>

          <section className="surface-card p-6">
            <h2 className="text-xl font-black text-slate-900 dark:text-slate-100">Daftar Testimoni</h2>
            <div className="mt-4 space-y-3">
              {items.map((item) => (
                <article key={item.id} className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-black text-slate-900 dark:text-slate-100">{item.name}</p>
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        {[item.role, item.company].filter(Boolean).join(' | ') || 'Tanpa jabatan/perusahaan'}
                      </p>
                      <p className="mt-2 line-clamp-3 text-sm text-slate-600 dark:text-slate-300">{item.content}</p>
                      <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">Rating: {item.rating}/5 | Order: {item.order} | {item.published ? 'Published' : 'Hidden'}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button type="button" size="sm" variant="outline" onClick={() => handleEdit(item)}>Edit</Button>
                      <Button type="button" size="sm" onClick={() => handleDelete(item.id)} className="bg-rose-600 hover:bg-rose-700">Hapus</Button>
                    </div>
                  </div>
                </article>
              ))}
              {items.length === 0 && <p className="text-sm text-slate-500 dark:text-slate-400">Belum ada testimoni.</p>}
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
  rows = 4,
  type = 'text',
  min,
  max,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
  type?: string;
  min?: number;
  max?: number;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-slate-800 dark:text-slate-200">{label}</label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          rows={rows}
          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          min={min}
          max={max}
          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
        />
      )}
    </div>
  );
}

