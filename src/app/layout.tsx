import type { Metadata, Viewport } from 'next';
import { JetBrains_Mono, Plus_Jakarta_Sans, Sora } from 'next/font/google';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import AnalyticsTracker from '@/components/analytics/AnalyticsTracker';
import ThemeInitializer from '@/components/shared/ThemeInitializer';
import { getSiteSettings } from '@/lib/site-settings';
import './globals.css';

const bodySans = Plus_Jakarta_Sans({
  variable: '--font-body-sans',
  subsets: ['latin'],
  display: 'swap',
});

const displaySans = Sora({
  variable: '--font-display-sans',
  subsets: ['latin'],
  display: 'swap',
});

const codeMono = JetBrains_Mono({
  variable: '--font-code-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || settings.websiteUrl || 'https://asdev-digital.com';

  return {
    metadataBase: new URL(appUrl),
    title: {
      default: `${settings.siteName} - ${settings.siteTagline}`,
      template: `%s | ${settings.siteName}`,
    },
    description: settings.seoDefaultDescription,
    keywords:
      'asdev, digital solution, website development, mobile app, sistem informasi, ui/ux design, jakarta',
    authors: [{ name: settings.siteName }],
    creator: settings.siteName,
    publisher: settings.siteName,
    openGraph: {
      type: 'website',
      locale: 'id_ID',
      url: appUrl,
      siteName: settings.siteName,
      title: `${settings.siteName} - ${settings.siteTagline}`,
      description: settings.seoDefaultDescription,
      images: [
        {
          url: '/opengraph-image',
          width: 1200,
          height: 630,
          alt: settings.siteName,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: settings.siteName,
      description: settings.seoDefaultDescription,
      images: ['/twitter-image'],
    },
    icons: {
      icon: '/icon',
      apple: '/apple-icon',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: appUrl,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || settings.websiteUrl || 'https://asdev-digital.com';

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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="canonical" href={appUrl} />
      </head>
      <body
        className="min-h-full flex flex-col bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100"
        suppressHydrationWarning
      >
        <ThemeInitializer />
        <AnalyticsTracker />
        <Navbar
          siteName={settings.siteName}
          siteShortName={settings.siteShortName}
          logoLightUrl={settings.logoLightUrl}
          logoDarkUrl={settings.logoDarkUrl}
        />
        <main className="flex-1 pt-20">{children}</main>
        <Footer
          siteName={settings.siteName}
          siteShortName={settings.siteShortName}
          siteTagline={settings.siteTagline}
          legalCompanyName={settings.legalCompanyName}
          supportEmail={settings.supportEmail}
          phoneDisplay={settings.phoneDisplay}
          whatsappNumber={settings.whatsappNumber}
          addressText={settings.addressText}
          logoLightUrl={settings.logoLightUrl}
          logoDarkUrl={settings.logoDarkUrl}
        />
      </body>
    </html>
  );
}
