import { Inter, Noto_Sans_Arabic } from 'next/font/google';
import Link from 'next/link';
import { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { locales, defaultLocale, type Locale, localeNames, localeDirs, localeFlags } from '@/lib/i18n';
import { organizationJsonLd, localBusinessJsonLd, websiteJsonLd } from '@/lib/jsonld';

export const dynamic = 'force-dynamic';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  variable: '--font-noto-arabic',
  display: 'swap',
});

const siteName = 'AlRawaabit';
const descriptions: Record<Locale, string> = {
  ar: 'شركة تسويق رقمي مصرية متخصصة في تطوير المواقع، SEO، AEO، و GEO. نخدم السوق المصري والخليجي.',
  en: 'Egyptian digital marketing agency specialized in web development, SEO, AEO, and GEO. Serving Egypt and Gulf markets.',
  fr: 'Agence de marketing digital égyptienne spécialisée dans le développement web, SEO, AEO et GEO. Desservant les marchés égyptien et du Golfe.',
};

// Use string for locale in params to match Next.js generated types
type LocaleParams = Promise<{ locale: string }>;

function getValidLocale(locale: string): Locale {
  return locales.includes(locale as Locale) ? (locale as Locale) : defaultLocale;
}

export async function generateMetadata({ params }: { params: LocaleParams }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = getValidLocale(rawLocale);

  const jsonLd = [
    organizationJsonLd(locale),
    localBusinessJsonLd(locale),
    websiteJsonLd(locale),
  ];

  const baseUrl = locale === 'ar' ? 'https://alrawaabit.com' : `https://alrawaabit.com/${locale}`;

  return {
    title: {
      default: siteName,
      template: `%s | ${siteName}`,
    },
    description: descriptions[locale],
    keywords: [
      'digital marketing agency',
      'web development',
      'SEO services',
      'AEO services',
      'GEO services',
      'Egypt',
      'Gulf',
      'Saudi Arabia',
      'UAE',
    ],
    authors: [{ name: 'AlRawaabit' }],
    creator: 'AlRawaabit',
    publisher: 'AlRawaabit',
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
    openGraph: {
      type: 'website',
      locale: locale === 'ar' ? 'ar_EG' : locale === 'fr' ? 'fr_FR' : 'en_US',
      alternateLocale: locales.filter((l) => l !== locale).map((l) => (l === 'ar' ? 'ar_EG' : l === 'fr' ? 'fr_FR' : 'en_US')),
      url: `${baseUrl}/`,
      siteName,
      title: siteName,
      description: descriptions[locale],
      images: [
        {
          url: `${baseUrl}/media/og-${locale}.png`,
          width: 1200,
          height: 630,
          alt: siteName,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: siteName,
      description: descriptions[locale],
      images: [`${baseUrl}/media/og-${locale}.png`],
      creator: '@rawaabit',
    },
    alternates: {
      canonical: `${baseUrl}/`,
      languages: Object.fromEntries(
        locales.map((l) => [l, l === 'ar' ? 'https://alrawaabit.com/' : `https://alrawaabit.com/${l}/`])
      ),
    },
    other: {
      'theme-color': '#0F172A',
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: LocaleParams;
}) {
  const { locale: rawLocale } = await params;
  const locale = getValidLocale(rawLocale);
  const dir = localeDirs[locale];
  const htmlLang = locale === 'ar' ? 'ar' : locale === 'fr' ? 'fr' : 'en';

  const jsonLd = [
    organizationJsonLd(locale),
    localBusinessJsonLd(locale),
    websiteJsonLd(locale),
  ];

  return (
    <html lang={htmlLang} dir={dir} className={`${inter.variable} ${notoSansArabic.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="sitemap" href={`/sitemap-${locale}.xml`} />
        <link rel="alternate" type="application/json" title="LLMs.txt" href="/llms.txt" />
      </head>
      <body className="min-h-screen bg-white font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-orange-600 text-white px-4 py-2 rounded-lg"
        >
          Skip to main content
        </a>
        <Header locale={locale} />
        <main id="main-content" className="pt-16 lg:pt-20">
          {children}
        </main>
        <Footer locale={locale} />
      </body>
    </html>
  );
}