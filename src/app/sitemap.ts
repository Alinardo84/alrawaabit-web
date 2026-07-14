import { MetadataRoute } from 'next';
import { locales } from '@/lib/i18n';

const baseUrl = 'https://alrawaabit.com';

const staticRoutes = [
  '',
  '/about',
  '/services/web-development',
  '/services/seo',
  '/services/aeo',
  '/services/geo',
  '/case-studies',
  '/contact',
  '/legal/privacy',
  '/legal/terms',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    const localePrefix = locale === 'ar' ? '' : `/${locale}`;
    
    for (const route of staticRoutes) {
      const url = `${baseUrl}${localePrefix}${route}`;
      urls.push({
        url,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1.0 : route === '/contact' ? 0.8 : 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [
              l,
              l === 'ar' ? `${baseUrl}${route}` : `${baseUrl}/${l}${route}`,
            ])
          ),
        },
      });
    }
  }

  return urls;
}