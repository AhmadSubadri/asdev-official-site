# ASDEV Website Blueprint (Startup-Ready)

## 1) Tujuan Utama
- Membangun brand trust untuk `CV Asdev Solusi Teknologi` dengan identitas `ASDEV Solution Technology`.
- Menjadi mesin akuisisi lead (bukan hanya company profile statis).
- Menyediakan CMS internal (CRUD) agar konten bisa diupdate kapan pun tanpa edit kode.

## 2) Positioning Brand
- Karakter: profesional, cepat, rapi, engineering-driven.
- Core message: "Membantu bisnis bertumbuh lewat solusi digital yang terukur."
- Visual direction:
  - Warna utama: merah (`primary`) + biru navy (`secondary`) dari logo.
  - UI modern dengan kontras kuat, tipografi tegas, whitespace lega.
  - Wajib dark/light mode (sudah diterapkan di fondasi).

## 3) Information Architecture (Public)
- `/` Beranda: value proposition, layanan unggulan, portofolio ringkas, CTA.
- `/about` Profil perusahaan, visi-misi, cara kerja.
- `/services` Layanan detail (dinamis dari database).
- `/portfolio` Case study/proyek (dinamis dari database).
- `/blog` Insight/artikel (dinamis dari database).
- `/blog/[slug]` Detail artikel.
- `/contact` Form lead + WhatsApp CTA.

## 4) CMS / Admin Scope (CRUD)
Fase awal:
- Services
- Portfolio
- Blog
- Contact Messages

Fase lanjutan:
- Team members
- Testimonials
- FAQ
- Global site settings (nomor WA, email, alamat, SEO default)

## 5) Funnel & Conversion
- CTA primer di setiap halaman: konsultasi / audit gratis.
- Form contact dengan field kebutuhan proyek + budget range + timeline.
- Auto-reply email + notifikasi internal.
- Integrasi WhatsApp untuk respon cepat.

## 6) Rekomendasi Stack
- Frontend + Backend: Next.js (App Router)
- ORM: Prisma
- DB: PostgreSQL (Neon / Supabase)
- Styling: Tailwind CSS
- Animasi: Framer Motion
- Auth Admin: JWT cookie (sudah ada)

## 7) Deployment Gratis (MVP) + Catatan
- Deploy app: Vercel Hobby
- Database: Neon Free atau Supabase Free

Catatan penting:
- Vercel Hobby ditujukan untuk personal/small-scale non-commercial. Untuk operasional startup komersial, siapkan upgrade Pro saat mulai aktif produksi.

## 8) Roadmap Implementasi
- Phase 1 (minggu 1): branding polish + dark/light + dynamic pages + basic SEO.
- Phase 2 (minggu 2): admin CRUD lengkap (create/update/delete UI) + upload image.
- Phase 3 (minggu 3): analytics, lead scoring, testimonial pipeline, optimasi performa.
- Phase 4: automasi sales (CRM ringan) + retainer support.

## 9) KPI Launch
- Conversion rate form contact.
- Jumlah lead qualified per bulan.
- Kecepatan load (Core Web Vitals).
- Jumlah artikel yang terbit per bulan.

## 10) Next Technical Priority
1. Lengkapi halaman admin `services/portfolio/blog/messages` agar CRUD end-to-end.
2. Migrasi database dari SQLite ke PostgreSQL untuk produksi.
3. Tambahkan image uploader (Cloudinary/Supabase Storage) agar konten admin mudah.
4. Tambahkan table `SiteSetting` untuk data brand yang sering berubah.
