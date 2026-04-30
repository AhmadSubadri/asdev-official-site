'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Button from '@/components/shared/Button';
import { useAdminAuthGuard } from '@/components/admin/useAdminAuthGuard';
import { AdminLoadingState } from '@/components/admin/AdminLoadingState';

type MessageItem = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  subject?: string | null;
  message: string;
  read: boolean;
  replied: boolean;
  createdAt: string;
};

export default function AdminMessagesPage() {
  const { checkingAuth } = useAdminAuthGuard();
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [status, setStatus] = useState('');

  const loadData = async () => {
    setLoadingData(true);
    try {
      const response = await fetch('/api/messages');
      const json = await response.json();
      if (!response.ok) {
        setStatus(json?.message || 'Gagal memuat pesan');
        return;
      }
      setMessages(json?.data || []);
    } catch {
      setStatus('Gagal memuat pesan');
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (!checkingAuth) loadData();
  }, [checkingAuth]);

  const updateStatus = async (id: string, patch: Partial<Pick<MessageItem, 'read' | 'replied'>>) => {
    try {
      const response = await fetch(`/api/messages/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patch),
      });
      const json = await response.json();
      if (!response.ok) {
        setStatus(json?.message || 'Gagal update status');
        return;
      }
      await loadData();
    } catch {
      setStatus('Gagal update status');
    }
  };

  const removeMessage = async (id: string) => {
    if (!window.confirm('Hapus pesan ini?')) return;
    try {
      const response = await fetch(`/api/messages/${id}`, { method: 'DELETE' });
      const json = await response.json();
      if (!response.ok) {
        setStatus(json?.message || 'Gagal menghapus pesan');
        return;
      }
      setStatus('Pesan berhasil dihapus');
      await loadData();
    } catch {
      setStatus('Gagal menghapus pesan');
    }
  };

  if (checkingAuth || loadingData) return <AdminLoadingState label="Memuat pesan..." />;

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-slate-100/60 py-10 dark:bg-slate-900/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary-600 dark:text-primary-300">Admin Module</p>
            <h1 className="mt-2 text-3xl font-black text-slate-900 dark:text-slate-100">Manage Messages</h1>
          </div>
          <Link href="/admin" className="text-sm font-semibold text-primary-500 hover:text-primary-600">Kembali ke Dashboard</Link>
        </div>

        <section className="surface-card p-6">
          {status && <p className="mb-3 text-sm text-slate-600 dark:text-slate-300">{status}</p>}
          <div className="space-y-4">
            {messages.map((msg) => (
              <article key={msg.id} className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-black text-slate-900 dark:text-slate-100">{msg.name}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">{msg.email}{msg.phone ? ` • ${msg.phone}` : ''}</p>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{new Date(msg.createdAt).toLocaleString('id-ID')}</p>
                  </div>
                  <div className="flex gap-2">
                    <span className={`rounded-full px-2 py-1 text-xs font-semibold ${msg.read ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'}`}>
                      {msg.read ? 'Read' : 'Unread'}
                    </span>
                    <span className={`rounded-full px-2 py-1 text-xs font-semibold ${msg.replied ? 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300' : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200'}`}>
                      {msg.replied ? 'Replied' : 'Pending'}
                    </span>
                  </div>
                </div>

                {msg.subject && <p className="mt-4 text-sm font-semibold text-slate-800 dark:text-slate-200">Subjek: {msg.subject}</p>}
                <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-slate-600 dark:text-slate-300">{msg.message}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Button type="button" size="sm" variant="outline" onClick={() => updateStatus(msg.id, { read: !msg.read })}>
                    Tandai {msg.read ? 'Belum Dibaca' : 'Sudah Dibaca'}
                  </Button>
                  <Button type="button" size="sm" variant="outline" onClick={() => updateStatus(msg.id, { replied: !msg.replied })}>
                    Tandai {msg.replied ? 'Belum Dibalas' : 'Sudah Dibalas'}
                  </Button>
                  <a href={`mailto:${msg.email}`} className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-primary-400 hover:text-primary-600 dark:border-slate-700 dark:text-slate-200">
                    Balas Email
                  </a>
                  <Button type="button" size="sm" onClick={() => removeMessage(msg.id)} className="bg-rose-600 hover:bg-rose-700">Hapus</Button>
                </div>
              </article>
            ))}
            {messages.length === 0 && <p className="text-sm text-slate-500 dark:text-slate-400">Belum ada pesan masuk.</p>}
          </div>
        </section>
      </div>
    </div>
  );
}
