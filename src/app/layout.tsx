import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans, Sora } from "next/font/google";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import "./globals.css";

const bodySans = Plus_Jakarta_Sans({
  variable: "--font-body-sans",
  subsets: ["latin"],
  display: "swap",
});

const displaySans = Sora({
  variable: "--font-display-sans",
  subsets: ["latin"],
  display: "swap",
});

const codeMono = JetBrains_Mono({
  variable: "--font-code-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://asdev-digital.com'),
  title: {
    default: "ASDEV Solution Technology - Solusi Teknologi Terpercaya",
    template: "%s | ASDEV Solution Technology",
  },
  description: "Kami menyediakan layanan website development, mobile app, sistem informasi, dan UI/UX design untuk transformasi digital bisnis Anda.",
  keywords: "asdev, digital solution, website development, mobile app, sistem informasi, ui/ux design, jakarta",
  authors: [{ name: "ASDEV Solution Technology" }],
  creator: "ASDEV Solution Technology",
  publisher: "ASDEV Solution Technology",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://asdev-digital.com',
    siteName: "ASDEV Solution Technology",
    title: "ASDEV Solution Technology - Solusi Teknologi Terpercaya",
    description: "Website development, mobile app, sistem informasi, dan UI/UX design untuk transformasi digital bisnis Anda.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "ASDEV Solution Technology",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ASDEV Solution Technology",
    description: "Solusi teknologi terpercaya untuk transformasi digital bisnis Anda",
    images: ["/twitter-image"],
  },
  icons: {
    icon: "/icon",
    apple: "/apple-icon",
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
      className={`${bodySans.variable} ${displaySans.variable} ${codeMono.variable} h-full antialiased scroll-smooth`}
      data-scroll-behavior="smooth"
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="language" content="Indonesian" />
        <meta name="theme-color" content="#D62D2D" />
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('theme');var d=t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d);}catch(e){}})();",
          }}
        />
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
              name: "ASDEV Solution Technology",
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
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100" suppressHydrationWarning>
        <Navbar />
        <main className="flex-1 pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
