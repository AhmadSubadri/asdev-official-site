'use client';

import { useState } from 'react';
import Button from '@/components/shared/Button';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal';
import { trackEvent } from '@/lib/analytics';

interface ContactPageClientProps {
  supportEmail: string;
  phoneDisplay: string;
  whatsappNumber: string;
  addressText: string;
  businessHours: string;
}

export default function ContactPageClient({
  supportEmail,
  phoneDisplay,
  whatsappNumber,
  addressText,
  businessHours,
}: ContactPageClientProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        setStatus('error');
        return;
      }

      setStatus('success');
      trackEvent({ event: 'form_submit', label: 'contact_form_success' });
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-16">
      <section className="bg-gradient-to-br from-slate-50 to-white py-20 dark:from-slate-950 dark:to-slate-900">
        <div className="container mx-auto px-4">
          <Reveal>
            <span className="inline-flex rounded-full border border-primary-200 bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-primary-700 dark:border-primary-900 dark:bg-primary-900/30 dark:text-primary-200">
              Contact ASDEV
            </span>
            <h1 className="mt-6 text-4xl font-black text-slate-900 md:text-6xl dark:text-slate-100">Mari Bangun Proyek Digital Anda Bersama Kami</h1>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg dark:text-slate-300">
              Ceritakan kebutuhan Anda. Kami bantu merumuskan solusi, estimasi, dan langkah implementasi yang realistis.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <Reveal className="surface-card p-8" y={16}>
              {status === 'success' && (
                <div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-900/20 dark:text-emerald-300">
                  Terima kasih, pesan Anda sudah terkirim. Tim ASDEV akan menghubungi Anda segera.
                </div>
              )}

              {status === 'error' && (
                <div className="mb-6 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-900/50 dark:bg-rose-900/20 dark:text-rose-300">
                  Terjadi kendala saat mengirim pesan. Silakan coba lagi atau hubungi kami via WhatsApp.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Field label="Nama" name="name" value={formData.name} onChange={handleChange} placeholder="Nama Anda" required />
                  <Field label="Email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email aktif" required />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Field label="Nomor Telepon" name="phone" value={formData.phone} onChange={handleChange} placeholder="08xxxxxxxxxx" />
                  <Field label="Subjek" name="subject" value={formData.subject} onChange={handleChange} placeholder="Contoh: Website Company Profile" />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-200">Detail Kebutuhan</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Ceritakan target bisnis, fitur utama, dan timeline yang Anda inginkan"
                    required
                    rows={6}
                    className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                  />
                </div>

                <Button type="submit" size="lg" isLoading={loading}>
                  Kirim Permintaan Diskusi
                </Button>
              </form>
            </Reveal>

            <Stagger className="space-y-4" stagger={0.08}>
              <StaggerItem className="surface-card p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">Email</p>
                <a
                  href={`mailto:${supportEmail}`}
                  className="mt-2 block text-lg font-black text-slate-900 hover:text-primary-600 dark:text-slate-100"
                  onClick={() => trackEvent({ event: 'cta_click', label: 'contact_email' })}
                >
                  {supportEmail}
                </a>
              </StaggerItem>

              <StaggerItem className="surface-card p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">WhatsApp</p>
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 block text-lg font-black text-slate-900 hover:text-primary-600 dark:text-slate-100"
                  onClick={() => trackEvent({ event: 'cta_click', label: 'contact_whatsapp' })}
                >
                  {phoneDisplay}
                </a>
              </StaggerItem>

              <StaggerItem className="surface-card p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">Lokasi & Waktu Kerja</p>
                <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">{addressText}</p>
                <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">{businessHours}</p>
              </StaggerItem>

              <StaggerItem className="overflow-hidden rounded-2xl bg-[linear-gradient(120deg,#0d2a7a_0%,#1c2d57_45%,#d62d2d_100%)] p-6 text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/75">Consulting Flow</p>
                <p className="mt-2 text-lg font-black">{'Discovery Call -> Scope -> Proposal'}</p>
                <p className="mt-2 text-sm text-white/85">Kami mulai dari memahami konteks bisnis Anda agar solusi teknis benar-benar relevan.</p>
              </StaggerItem>
            </Stagger>
          </div>
        </div>
      </section>
    </div>
  );
}

interface FieldProps {
  label: string;
  name: string;
  value: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Field({ label, name, value, placeholder, required, type = 'text', onChange }: FieldProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-200">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
      />
    </div>
  );
}
