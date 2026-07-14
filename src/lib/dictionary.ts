import { notFound } from 'next/navigation';
import { locales, defaultLocale, type Locale } from '@/lib/i18n';

const dictionaries = {
  ar: () => import('@/messages/ar.json').then((module) => module.default),
  en: () => import('@/messages/en.json').then((module) => module.default),
  fr: () => import('@/messages/fr.json').then((module) => module.default),
};

export async function getDictionary(locale: Locale) {
  if (!locales.includes(locale)) notFound();
  return dictionaries[locale]();
}