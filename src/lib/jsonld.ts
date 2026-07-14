import type { Locale } from './i18n';

interface JsonLdContext {
  '@context': 'https://schema.org';
  '@type': string;
  [key: string]: unknown;
}

export function organizationJsonLd(locale: Locale = 'ar'): JsonLdContext {
  const names = {
    ar: 'الروابط',
    en: 'AlRawaabit',
    fr: 'AlRawaabit',
  };
  const descriptions = {
    ar: 'شركة تسويق رقمي مصرية متخصصة في تطوير المواقع، SEO، AEO، و GEO. نخدم السوق المصري والخليجي.',
    en: 'Egyptian digital marketing agency specialized in web development, SEO, AEO, and GEO. Serving Egypt and Gulf markets.',
    fr: 'Agence de marketing digital égyptienne spécialisée dans le développement web, SEO, AEO et GEO. Desservant les marchés égyptien et du Golfe.',
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: names[locale],
    alternateName: 'AlRawaabit',
    url: 'https://alrawaabit.com',
    logo: 'https://alrawaabit.com/media/logo.png',
    sameAs: [
      'https://www.facebook.com/RawaabitDigitalMarketing',
      'https://www.instagram.com/rawaabitdigitalmarketing/',
      'https://www.linkedin.com/company/rawaabit-digital-marketing/',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+20-111-130-6090',
      contactType: 'customer service',
      availableLanguage: ['Arabic', 'English', 'French'],
      areaServed: ['EG', 'SA', 'AE', 'KW', 'QA', 'BH', 'OM'],
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: '17 Abdel Jalil St, Ibn Sander Square',
      addressLocality: 'Cairo',
      addressCountry: 'EG',
    },
    description: descriptions[locale],
    foundingDate: '2021',
    knowsAbout: [
      'Web Development',
      'Search Engine Optimization',
      'Answer Engine Optimization',
      'Generative Engine Optimization',
      'Digital Marketing',
    ],
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: '30.0444',
        longitude: '31.2357',
      },
      geoRadius: '2000000',
    },
  };
}

export function localBusinessJsonLd(locale: Locale = 'ar'): JsonLdContext {
  const names = {
    ar: 'الروابط',
    en: 'AlRawaabit',
    fr: 'AlRawaabit',
  };
  const descriptions = {
    ar: 'شركة تسويق رقمي وتطوير ويب في القاهرة، مصر. متخصصون في SEO، AEO، GEO للسوق المصري والخليجي.',
    en: 'Digital marketing and web development company in Cairo, Egypt. Specialized in SEO, AEO, GEO for Egypt and Gulf markets.',
    fr: 'Société de marketing digital et développement web au Caire, Égypte. Spécialisée en SEO, AEO, GEO pour les marchés égyptien et du Golfe.',
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: names[locale],
    description: descriptions[locale],
    url: 'https://alrawaabit.com',
    telephone: '+20-111-130-6090',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '17 Abdel Jalil St, Ibn Sander Square, Al-Zaytoun',
      addressLocality: 'Cairo',
      addressCountry: 'EG',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '30.0444',
      longitude: '31.2357',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        opens: '09:00',
        closes: '17:00',
      },
    ],
    priceRange: '$$',
    currenciesAccepted: 'EGP, USD, SAR, AED',
    paymentAccepted: 'Cash, Credit Card, Bank Transfer',
    areaServed: ['EG', 'SA', 'AE', 'KW', 'QA', 'BH', 'OM'],
    availableLanguage: ['Arabic', 'English', 'French'],
  };
}

export function websiteJsonLd(locale: Locale = 'ar'): JsonLdContext {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: locale === 'ar' ? 'الروابط' : 'AlRawaabit',
    url: `https://alrawaabit.com/${locale === 'ar' ? '' : locale}/`,
    inLanguage: locale,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `https://alrawaabit.com/${locale === 'ar' ? '' : locale + '/' }search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function webPageJsonLd(params: {
  name: string;
  description: string;
  url: string;
  locale: Locale;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  author?: string;
}): JsonLdContext {
  const { name, description, url, locale, image, datePublished, dateModified, author } = params;
  const baseUrl = locale === 'ar' ? 'https://alrawaabit.com' : `https://alrawaabit.com/${locale}`;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    url: `${baseUrl}${url}`,
    inLanguage: locale,
    isPartOf: {
      '@type': 'WebSite',
      name: locale === 'ar' ? 'الروابط' : 'AlRawaabit',
      url: baseUrl,
    },
    ...(image && { image: `${baseUrl}${image}` }),
    ...(datePublished && { datePublished }),
    ...(dateModified && { dateModified }),
    ...(author && {
      author: {
        '@type': 'Person',
        name: author,
      },
    }),
  };
}

export function serviceJsonLd(params: {
  name: string;
  description: string;
  url: string;
  locale: Locale;
  serviceType: string;
  areaServed: string[];
  provider: {
    name: string;
    url: string;
  };
}): JsonLdContext {
  const { name, description, url, locale, serviceType, areaServed, provider } = params;
  const baseUrl = locale === 'ar' ? 'https://alrawaabit.com' : `https://alrawaabit.com/${locale}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    serviceType,
    provider: {
      '@type': 'Organization',
      name: provider.name,
      url: provider.url,
    },
    areaServed: areaServed.map((country) => ({
      '@type': 'Country',
      name: country,
    })),
    url: `${baseUrl}${url}`,
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: `${baseUrl}${url}`,
      availableLanguage: ['Arabic', 'English', 'French'],
    },
  };
}

export function faqPageJsonLd(faqs: Array<{ question: string; answer: string }>, locale: Locale = 'ar'): JsonLdContext {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
    inLanguage: locale,
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; url: string }>, locale: Locale = 'ar'): JsonLdContext {
  const baseUrl = locale === 'ar' ? 'https://alrawaabit.com' : `https://alrawaabit.com/${locale}`;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${baseUrl}${item.url}`,
    })),
  };
}

export function articleJsonLd(params: {
  headline: string;
  description: string;
  url: string;
  locale: Locale;
  image?: string;
  datePublished: string;
  dateModified: string;
  authorName: string;
  publisherName?: string;
}): JsonLdContext {
  const { headline, description, url, locale, image, datePublished, dateModified, authorName, publisherName = 'AlRawaabit' } = params;
  const baseUrl = locale === 'ar' ? 'https://alrawaabit.com' : `https://alrawaabit.com/${locale}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    url: `${baseUrl}${url}`,
    inLanguage: locale,
    image: image ? `${baseUrl}${image}` : undefined,
    datePublished,
    dateModified,
    author: {
      '@type': 'Person',
      name: authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: publisherName,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/media/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}${url}`,
    },
  };
}