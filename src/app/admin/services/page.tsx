'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Button from '@/components/shared/Button';
import { useAdminAuthGuard } from '@/components/admin/useAdminAuthGuard';
import { AdminLoadingState } from '@/components/admin/AdminLoadingState';

type ServiceItem = {
  id: string;
  title: string;
  description: string;
  detail?: string | null;
  icon?: string | null;
  image?: string | null;
  order: number;
};

const emptyForm = {
  id: '',
  title: '',
  description: '',
  detail: '',
  icon: '',
  image: '',
  order: '0',
};

export default function AdminServicesPage() {
  const { checkingAuth } = useAdminAuthGuard();
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState('');
  const [form, setForm] = useState(emptyForm);

  const loadData = async () => {
    setLoadingData(true);
    try {
      const response = await fetch('/api/services');
      const json = await response.json();
      setServices(json?.data || []);
    } catch {
      setStatus('Gagal memuat data layanan');
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
        title: form.title,
        description: form.description,
        detail: form.detail || undefined,
        icon: form.icon || undefined,
        image: form.image || undefined,
        order: Number(form.order || 0),
      };

      const isEdit = Boolean(form.id);
      const endpoint = isEdit ? `/api/services/${form.id}` : '/api/services';
      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await response.json();
      if (!response.ok) {
        setStatus(json?.message || 'Gagal menyimpan layanan');
        return;
      }

      setStatus(isEdit ? 'Layanan berhasil diperbarui' : 'Layanan berhasil ditambahkan');
      resetForm();
      await loadData();
    } catch {
      setStatus('Terjadi kesalahan saat menyimpan layanan');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item: ServiceItem) => {
    setForm({
      id: item.id,
      title: item.title,
      description: item.description,
      detail: item.detail || '',
      icon: item.icon || '',
      image: item.image || '',
      order: String(item.order),
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    const ok = window.confirm('Hapus layanan ini?');
    if (!ok) return;

    try {
      const response = await fetch(`/api/services/${id}`, { method: 'DELETE' });
      const json = await response.json();
      if (!response.ok) {
        setStatus(json?.message || 'Gagal menghapus layanan');
        return;
      }
      setStatus('Layanan berhasil dihapus');
      await loadData();
    } catch {
      setStatus('Terjadi kesalahan saat menghapus layanan');
    }
  };

  if (checkingAuth || loadingData) return <AdminLoadingState label="Memuat layanan..." />;

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-slate-100/60 py-10 dark:bg-slate-900/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary-600 dark:text-primary-300">Admin Module</p>
            <h1 className="mt-2 text-3xl font-black text-slate-900 dark:text-slate-100">Manage Services</h1>
          </div>
          <Link href="/admin" className="text-sm font-semibold text-primary-500 hover:text-primary-600">Kembali ke Dashboard</Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.05fr_1.2fr]">
          <section className="surface-card p-6">
            <h2 className="text-xl font-black text-slate-900 dark:text-slate-100">{form.id ? 'Edit Layanan' : 'Tambah Layanan'}</h2>
            {status && <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{status}</p>}
            <form onSubmit={handleSave} className="mt-5 space-y-4">
              <Field label="Judul" value={form.title} onChange={(v) => setForm((p) => ({ ...p, title: v }))} required />
              <Field label="Deskripsi" value={form.description} onChange={(v) => setForm((p) => ({ ...p, description: v }))} required multiline />
              <Field label="Detail Fitur (pisah koma/new line)" value={form.detail} onChange={(v) => setForm((p) => ({ ...p, detail: v }))} multiline />
              <Field label="Icon" value={form.icon} onChange={(v) => setForm((p) => ({ ...p, icon: v }))} />
              <Field label="URL Gambar" value={form.image} onChange={(v) => setForm((p) => ({ ...p, image: v }))} />
              <Field label="Urutan" value={form.order} onChange={(v) => setForm((p) => ({ ...p, order: v }))} type="number" />

              <div className="flex gap-3">
                <Button type="submit" isLoading={saving}>{form.id ? 'Update Layanan' : 'Simpan Layanan'}</Button>
                {form.id && (
                  <Button type="button" variant="outline" onClick={resetForm}>Batal Edit</Button>
                )}
              </div>
            </form>
          </section>

          <section className="surface-card p-6">
            <h2 className="text-xl font-black text-slate-900 dark:text-slate-100">Daftar Layanan</h2>
            <div className="mt-4 space-y-3">
              {services.map((item) => (
                <article key={item.id} className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-black text-slate-900 dark:text-slate-100">{item.title}</h3>
                      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{item.description}</p>
                      <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">Order: {item.order}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button type="button" size="sm" variant="outline" onClick={() => handleEdit(item)}>Edit</Button>
                      <Button type="button" size="sm" onClick={() => handleDelete(item.id)} className="bg-rose-600 hover:bg-rose-700">Hapus</Button>
                    </div>
                  </div>
                </article>
              ))}
              {services.length === 0 && <p className="text-sm text-slate-500 dark:text-slate-400">Belum ada data layanan.</p>}
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
  type = 'text',
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  multiline?: boolean;
  type?: string;
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
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
        />
      )}
    </div>
  );
}
