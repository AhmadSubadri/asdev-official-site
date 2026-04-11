import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://asdev-digital.com'),
  title: {
    default: "Asdev Digital Solution - Solusi Teknologi Terpercaya",
    template: "%s | Asdev Digital Solution",
  },
  description: "Kami menyediakan layanan website development, mobile app, sistem informasi, dan UI/UX design untuk transformasi digital bisnis Anda.",
  keywords: "asdev, digital solution, website development, mobile app, sistem informasi, ui/ux design, jakarta",
  authors: [{ name: "Asdev Digital Solution" }],
  creator: "Asdev Digital Solution",
  publisher: "Asdev Digital Solution",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://asdev-digital.com',
    siteName: "Asdev Digital Solution",
    title: "Asdev Digital Solution - Solusi Teknologi Terpercaya",
    description: "Website development, mobile app, sistem informasi, dan UI/UX design untuk transformasi digital bisnis Anda.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Asdev Digital Solution",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Asdev Digital Solution",
    description: "Solusi teknologi terpercaya untuk transformasi digital bisnis Anda",
    images: ["/twitter-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
      data-scroll-behavior="smooth"
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="language" content="Indonesian" />
        <meta name="theme-color" content="#D62D2D" />
        {/* Preconnect to external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Canonical URL */}
        <link rel="canonical" href={process.env.NEXT_PUBLIC_APP_URL || 'https://asdev-digital.com'} />
        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Asdev Digital Solution",
              url: process.env.NEXT_PUBLIC_APP_URL || 'https://asdev-digital.com',
              description: "Solusi teknologi terpercaya untuk transformasi digital bisnis",
              address: {
                "@type": "PostalAddress",
                addressCountry: "ID",
                addressLocality: "Jakarta",
                postalCode: "12000",
              },
              telephone: "+62812345678",
              email: "info@asdev.id",
              sameAs: [
                "https://www.facebook.com/asdev",
                "https://www.instagram.com/asdev",
                "https://www.linkedin.com/company/asdev",
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-gray-900" suppressHydrationWarning>
        <Navbar />
        <main className="flex-1 pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}



