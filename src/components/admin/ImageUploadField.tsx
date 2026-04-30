'use client';

import { useRef, useState } from 'react';
import Button from '@/components/shared/Button';

type ImageUploadFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  folder: string;
  required?: boolean;
};

export default function ImageUploadField({ label, value, onChange, folder, required }: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState('');

  const uploadImage = async () => {
    const file = inputRef.current?.files?.[0];
    if (!file) {
      setStatus('Pilih file gambar terlebih dahulu');
      return;
    }

    setUploading(true);
    setStatus('');

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const json = await response.json();
      if (!response.ok) {
        setStatus(json?.message || 'Upload gagal');
        return;
      }

      const uploadedUrl = String(json?.data?.url || '');
      if (uploadedUrl) {
        onChange(uploadedUrl);
      }

      if (inputRef.current) {
        inputRef.current.value = '';
      }

      setStatus('Upload berhasil');
    } catch {
      setStatus('Terjadi kesalahan saat upload');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-slate-800 dark:text-slate-200">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder="https://... atau /uploads/..."
        className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
      />

      <div className="mt-2 flex flex-wrap items-center gap-2">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="block w-full text-xs text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-slate-200 file:px-3 file:py-1.5 file:font-semibold file:text-slate-700 hover:file:bg-slate-300 dark:text-slate-300 dark:file:bg-slate-700 dark:file:text-slate-100"
        />
        <Button type="button" size="sm" variant="outline" onClick={uploadImage} isLoading={uploading}>
          Upload
        </Button>
      </div>

      {status && <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{status}</p>}

      {value && (
        <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-2 dark:border-slate-700 dark:bg-slate-800">
          <img src={value} alt="Preview" className="h-28 w-full rounded-lg object-cover" />
        </div>
      )}
    </div>
  );
}
