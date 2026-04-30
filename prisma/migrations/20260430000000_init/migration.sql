-- CreateTable
CREATE TABLE "User" (
  "id" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "password" TEXT NOT NULL,
  "name" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
  "id" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "icon" TEXT,
  "detail" TEXT,
  "image" TEXT,
  "order" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Portfolio" (
  "id" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "image" TEXT NOT NULL,
  "category" TEXT NOT NULL,
  "link" TEXT,
  "technologies" TEXT,
  "order" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Portfolio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlogArticle" (
  "id" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "content" TEXT NOT NULL,
  "excerpt" TEXT,
  "image" TEXT,
  "published" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "BlogArticle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactMessage" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "phone" TEXT,
  "subject" TEXT,
  "message" TEXT NOT NULL,
  "read" BOOLEAN NOT NULL DEFAULT false,
  "replied" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "ContactMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteSetting" (
  "id" TEXT NOT NULL,
  "singletonKey" TEXT NOT NULL DEFAULT 'default',
  "siteName" TEXT NOT NULL DEFAULT 'ASDEV Solution Technology',
  "siteShortName" TEXT NOT NULL DEFAULT 'ASDEV',
  "siteTagline" TEXT NOT NULL DEFAULT 'Solusi teknologi terpercaya untuk transformasi digital bisnis',
  "legalCompanyName" TEXT NOT NULL DEFAULT 'CV Asdev Solusi Teknologi',
  "logoLightUrl" TEXT NOT NULL DEFAULT '/brand/asdev-logo-light.png',
  "logoDarkUrl" TEXT NOT NULL DEFAULT '/brand/asdev-logo-dark.png',
  "supportEmail" TEXT NOT NULL DEFAULT 'info@asdev.id',
  "phoneDisplay" TEXT NOT NULL DEFAULT '+62 812-3456-7890',
  "whatsappNumber" TEXT NOT NULL DEFAULT '6281234567890',
  "addressText" TEXT NOT NULL DEFAULT 'Indonesia',
  "businessHours" TEXT NOT NULL DEFAULT 'Senin - Jumat, 09:00 - 18:00 WIB',
  "websiteUrl" TEXT NOT NULL DEFAULT 'https://asdev-digital.com',
  "seoDefaultDescription" TEXT NOT NULL DEFAULT 'Kami menyediakan layanan website development, mobile app, sistem informasi, dan UI/UX design untuk transformasi digital bisnis Anda.',
  "facebookUrl" TEXT,
  "instagramUrl" TEXT,
  "linkedinUrl" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "SiteSetting_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "BlogArticle_slug_key" ON "BlogArticle"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "SiteSetting_singletonKey_key" ON "SiteSetting"("singletonKey");
