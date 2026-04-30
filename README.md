# 🚀 Asdev Digital Solution - Website

Website company profile profesional untuk **Asdev Digital Solution** - Solusi teknologi terpercaya untuk transformasi digital bisnis.

## 📋 Fitur Utama

✅ **Halaman Publik:**
- Beranda dengan Hero Section, Services Preview, Advantages, Portfolio Preview, dan CTA
- Tentang Kami (About)
- Layanan (Services) - Detail lengkap setiap layanan
- Portofolio (Portfolio) - Showcase project
- Blog - Artikel edukasi  
- Kontak (Contact) - Form submission + WhatsApp integration

✅ **Admin Panel:**
- Authentication dengan JWT + Secure Cookies
- Dashboard Overview
- CRUD Management untuk Services, Portfolio, Blog, Messages

✅ **Teknologi:**
- Next.js 14+ | React | Tailwind CSS | Framer Motion
- Node.js | Prisma ORM | PostgreSQL
- JWT Authentication | Zod Validation

## 🛠️ Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Setup environment
cp .env.example .env.local
# Edit .env.local dengan DATABASE_URL

# 3. Push database schema
npx prisma db push

# 4. Run development
npm run dev
```

Buka: http://localhost:3000
Admin: http://localhost:3000/admin

## 🔐 Demo Credentials

- Email: `admin@asdev.id`
- Password: `admin123`

## 📦 Build & Deploy

```bash
# Build for production
npm run build

# Deploy to Vercel
vercel deploy
```

## 📊 Project Status

- ✅ Frontend Pages (Home, About, Services, Portfolio, Blog, Contact)
- ✅ Admin Panel with Auth
- ✅ API Routes (CRUD)
- ✅ Database Schema (Prisma)
- ✅ Responsive Design
- ⏳ Email Integration
- ⏳ WhatsApp Business API

## 📖 Documentation

Full documentation available in README.md or docs/ folder

---

**Status**: Production Ready 🎉
**Last Updated**: 2024-04-08

## Deployment Notes (Vercel + Prisma)

- Gunakan database PostgreSQL di Vercel (`DATABASE_URL`).
- Build sudah otomatis menjalankan `prisma generate` + `prisma migrate deploy`.
- Lihat panduan lengkap: `docs/VERCEL_DEPLOY.md`.
