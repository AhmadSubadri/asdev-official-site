# Vercel + Prisma Deployment Checklist

## 1) Database provider
Project ini sekarang menggunakan Prisma `postgresql` provider.

Set environment variable `DATABASE_URL` di Vercel (Production + Preview):

- `postgresql://USER:PASSWORD@HOST:5432/DBNAME?sslmode=require`

## 2) Build command
Script `build` sudah menjalankan:

- `prisma generate`
- `prisma migrate deploy`
- `next build`

Jadi saat push ke branch yang auto-deploy, migration akan diaplikasikan otomatis.

## 3) Migration source control
Pastikan folder berikut ikut ke git:

- `prisma/migrations/**`
- `prisma/migrations/migration_lock.toml`
- `prisma/schema.prisma`

## 4) Required env vars
Minimal wajib:

- `DATABASE_URL`
- `JWT_SECRET`
- `NEXT_PUBLIC_APP_URL`

Template ada di `.env.example`.

## 5) First deploy notes
Jika production DB sudah punya tabel dari cara lama/manual, `prisma migrate deploy` bisa gagal karena history belum sinkron.
Dalam kasus itu lakukan baseline migration sekali, lalu deploy ulang.
