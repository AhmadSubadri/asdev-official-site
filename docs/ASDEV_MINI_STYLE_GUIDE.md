# ASDEV Mini Style Guide

## 1. Brand Position
- Nama brand: `ASDEV Solution Technology`
- Entitas hukum: `CV Asdev Solusi Teknologi`
- Positioning ringkas: partner delivery produk digital yang cepat, rapi, dan business-oriented.

## 2. Voice & Tone
- Gaya bahasa: profesional, jelas, langsung ke manfaat bisnis.
- Hindari: klaim berlebihan, jargon teknis tanpa konteks, kalimat terlalu panjang.
- Formula copy: `Masalah bisnis -> Solusi ASDEV -> Dampak terukur`.

## 3. Color System
- Primary: `#D62D2D` (aksi/CTA/highlight)
- Secondary: `#0D2A7A` (trust/enterprise tone)
- Slate base: `#0F172A` hingga `#F8FAFC` untuk teks & surface
- Rule:
  - Tombol utama pakai `primary`.
  - Section gelap pakai gradien `secondary -> primary`.
  - Rasio kontras teks minimal AA.

## 4. Typography
- Body: `Plus Jakarta Sans`
- Display heading: `Sora`
- Technical snippets: `JetBrains Mono`
- Hierarchy:
  - H1: 48-60 px (desktop), 36-40 px (mobile)
  - H2: 36-48 px
  - Body: 16-18 px
  - Meta/caption: 12-13 px uppercase tracking ringan

## 5. Layout & Spacing
- Container: max-width Tailwind container + `px-4`.
- Section vertical spacing: `py-20` sampai `py-28`.
- Card radius: `rounded-2xl`.
- Rule: satu section, satu pesan utama, satu CTA utama.

## 6. Motion System
- Reveal default: `fade-up` dari `y=18-20`, duration `0.45-0.55s`.
- Stagger list/grid: delay antar item `0.08-0.10s`.
- Easing: `[0.22, 1, 0.36, 1]`.
- Jangan animasikan semua elemen sekaligus; fokus ke heading, card, CTA.

## 7. Component Patterns
- `surface-card`: kartu utama untuk layanan/insight.
- `section-heading` + `section-subheading`: heading standar semua halaman.
- CTA primer: tombol merah solid.
- CTA sekunder: outline netral dengan hover primary.

## 8. Visual Don'ts
- Hindari emoji sebagai elemen utama UI.
- Hindari lebih dari 2 gradien kuat dalam satu viewport.
- Hindari teks center terlalu panjang (>3 baris paragraf).

## 9. Asset Naming
- Logo utama: `public/brand/asdev-logo-light.png`
- Logo alt dark: `public/brand/asdev-logo-dark.png`
- Metadata image route: `/opengraph-image`, `/twitter-image`, `/icon`, `/apple-icon`

## 10. Content Checklist Sebelum Publish
- Heading menjawab value proposition.
- Ada CTA yang jelas di atas fold.
- Ada bukti trust (pengalaman, proses, portofolio, testimoni).
- Cek dark/light mode tetap terbaca.
