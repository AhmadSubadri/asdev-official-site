'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import Button from '@/components/shared/Button';
import { useAdminAuthGuard } from '@/components/admin/useAdminAuthGuard';
import { AdminLoadingState } from '@/components/admin/AdminLoadingState';
import ImageUploadField from '@/components/admin/ImageUploadField';

type SettingsForm = {
  siteName: string;
  siteShortName: string;
  siteTagline: string;
  legalCompanyName: string;
  logoLightUrl: string;
  logoDarkUrl: string;
  supportEmail: string;
  phoneDisplay: string;
  whatsappNumber: string;
  addressText: string;
  businessHours: string;
  websiteUrl: string;
  seoDefaultDescription: string;
  facebookUrl: string;
  instagramUrl: string;
  linkedinUrl: string;
};

const emptyForm: SettingsForm = {
  siteName: '',
  siteShortName: '',
  siteTagline: '',
  legalCompanyName: '',
  logoLightUrl: '',
  logoDarkUrl: '',
  supportEmail: '',
  phoneDisplay: '',
  whatsappNumber: '',
  addressText: '',
  businessHours: '',
  websiteUrl: '',
  seoDefaultDescription: '',
  facebookUrl: '',
  instagramUrl: '',
  linkedinUrl: '',
};

export default function AdminSettingsPage() {
  const { checkingAuth } = useAdminAuthGuard();
  const [loadingData, setLoadingData] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState('');
  const [form, setForm] = useState<SettingsForm>(emptyForm);

  const loadData = async () => {
    setLoadingData(true);
    try {
      const response = await fetch('/api/settings');
      const json = await response.json();
      if (!response.ok) {
        setStatus(json?.message || 'Gagal memuat pengaturan');
        return;
      }
      setForm({ ...emptyForm, ...json.data });
    } catch {
      setStatus('Gagal memuat pengaturan');
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (!checkingAuth) loadData();
  }, [checkingAuth]);

  const socialPreview = useMemo(
    () => [form.facebookUrl, form.instagramUrl, form.linkedinUrl].filter(Boolean).length,
    [form.facebookUrl, form.instagramUrl, form.linkedinUrl]
  );

  const saveSettings = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setStatus('');

    try {
      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const json = await response.json();
      if (!response.ok) {
        setStatus(json?.message || 'Gagal menyimpan pengaturan');
        return;
      }

      setForm({ ...emptyForm, ...json.data });
      setStatus('Pengaturan website berhasil diperbarui.');
    } catch {
      setStatus('Terjadi kesalahan saat menyimpan pengaturan.');
    } finally {
      setSaving(false);
    }
  };

  if (checkingAuth || loadingData) return <AdminLoadingState label="Memuat site settings..." />;

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-slate-100/60 py-10 dark:bg-slate-900/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary-600 dark:text-primary-300">Admin Module</p>
            <h1 className="mt-2 text-3xl font-black text-slate-900 dark:text-slate-100">Site Settings</h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Atur identitas brand, kontak, logo, dan SEO global dari satu dashboard.</p>
          </div>
          <Link href="/admin" className="text-sm font-semibold text-primary-500 hover:text-primary-600">Kembali ke Dashboard</Link>
        </div>

        <form onSubmit={saveSettings} className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <section className="surface-card p-6">
            <h2 className="text-xl font-black text-slate-900 dark:text-slate-100">Brand & Identity</h2>
            {status && <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{status}</p>}

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <Field label="Nama Website" value={form.siteName} onChange={(v) => setForm((p) => ({ ...p, siteName: v }))} required />
              <Field label="Nama Singkat" value={form.siteShortName} onChange={(v) => setForm((p) => ({ ...p, siteShortName: v }))} required />
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <Field label="Nama Legal Perusahaan" value={form.legalCompanyName} onChange={(v) => setForm((p) => ({ ...p, legalCompanyName: v }))} required />
              <Field label="Website URL" value={form.websiteUrl} onChange={(v) => setForm((p) => ({ ...p, websiteUrl: v }))} required />
            </div>

            <div className="mt-4">
              <TextAreaField
                label="Tagline"
                value={form.siteTagline}
                onChange={(v) => setForm((p) => ({ ...p, siteTagline: v }))}
                rows={3}
                maxLength={180}
                required
              />
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <ImageUploadField
                label="Logo Light URL"
                value={form.logoLightUrl}
                onChange={(v) => setForm((p) => ({ ...p, logoLightUrl: v }))}
                folder="brand"
                required
              />
              <ImageUploadField
                label="Logo Dark URL"
                value={form.logoDarkUrl}
                onChange={(v) => setForm((p) => ({ ...p, logoDarkUrl: v }))}
                folder="brand"
                required
              />
            </div>

            <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500 dark:text-slate-400">Preview Logo</p>
              <div className="mt-3 grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800">
                  <p className="mb-2 text-xs text-slate-500 dark:text-slate-400">Light</p>
                  <img src={form.logoLightUrl || '/brand/asdev-logo-light.png'} alt="logo light" className="h-14 w-14 rounded-full object-cover" />
                </div>
                <div className="rounded-lg border border-slate-200 bg-slate-900 p-3 dark:border-slate-700">
                  <p className="mb-2 text-xs text-slate-300">Dark</p>
                  <img src={form.logoDarkUrl || '/brand/asdev-logo-dark.png'} alt="logo dark" className="h-14 w-14 rounded-full object-cover" />
                </div>
              </div>
            </div>

            <h2 className="mt-8 text-xl font-black text-slate-900 dark:text-slate-100">Contact & Social</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <Field label="Email" value={form.supportEmail} onChange={(v) => setForm((p) => ({ ...p, supportEmail: v }))} required />
              <Field label="Nomor Telepon (Display)" value={form.phoneDisplay} onChange={(v) => setForm((p) => ({ ...p, phoneDisplay: v }))} required />
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <Field label="Nomor WhatsApp (digits)" value={form.whatsappNumber} onChange={(v) => setForm((p) => ({ ...p, whatsappNumber: v }))} required />
              <Field label="Alamat Singkat" value={form.addressText} onChange={(v) => setForm((p) => ({ ...p, addressText: v }))} required />
            </div>

            <div className="mt-4">
              <TextAreaField
                label="Jam Operasional"
                value={form.businessHours}
                onChange={(v) => setForm((p) => ({ ...p, businessHours: v }))}
                rows={2}
                maxLength={200}
                required
              />
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <Field label="Facebook URL" value={form.facebookUrl} onChange={(v) => setForm((p) => ({ ...p, facebookUrl: v }))} />
              <Field label="Instagram URL" value={form.instagramUrl} onChange={(v) => setForm((p) => ({ ...p, instagramUrl: v }))} />
              <Field label="LinkedIn URL" value={form.linkedinUrl} onChange={(v) => setForm((p) => ({ ...p, linkedinUrl: v }))} />
            </div>
          </section>

          <section className="surface-card h-max p-6">
            <h2 className="text-xl font-black text-slate-900 dark:text-slate-100">SEO & Publish</h2>

            <div className="mt-4">
              <TextAreaField
                label="Default Meta Description"
                value={form.seoDefaultDescription}
                onChange={(v) => setForm((p) => ({ ...p, seoDefaultDescription: v }))}
                rows={5}
                maxLength={320}
                required
              />
            </div>

            <div className="mt-5 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500 dark:text-slate-400">Quick Health Check</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                <li>Nama website: {form.siteName ? 'OK' : 'Belum diisi'}</li>
                <li>Kontak email: {form.supportEmail ? 'OK' : 'Belum diisi'}</li>
                <li>WhatsApp: {form.whatsappNumber ? 'OK' : 'Belum diisi'}</li>
                <li>Social links terisi: {socialPreview}</li>
                <li>Panjang meta description: {form.seoDefaultDescription.length} karakter</li>
              </ul>
            </div>

            <div className="mt-6">
              <Button type="submit" isLoading={saving} size="lg" className="w-full">Simpan Semua Pengaturan</Button>
            </div>
          </section>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  required,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-slate-800 dark:text-slate-200">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
      />
    </div>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
  rows,
  maxLength,
  required,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows: number;
  maxLength: number;
  required?: boolean;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <label className="text-sm font-semibold text-slate-800 dark:text-slate-200">{label}</label>
        <span className="text-xs text-slate-500 dark:text-slate-400">{value.length}/{maxLength}</span>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        maxLength={maxLength}
        required={required}
        className="w-full resize-y rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
      />
    </div>
  );
}
