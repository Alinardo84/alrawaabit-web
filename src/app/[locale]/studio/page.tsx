import { redirect } from 'next/navigation';
import { type Locale, defaultLocale, locales } from '@/lib/i18n';

/**
 * Redirects /{locale}/studio to the dedicated Studio deployment.
 * Set NEXT_PUBLIC_STUDIO_URL to your Studio's Vercel URL
 * (e.g. https://alrawaabit-cms.vercel.app).
 *
 * If unset, falls back to Sanity's hosted Studio URL.
 *
 * Available under every locale so users can hit /ar/studio, /en/studio, /fr/studio.
 */
export default async function StudioRedirect({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = (locales as readonly string[]).includes(raw) ? (raw as Locale) : defaultLocale;
  const url =
    process.env.NEXT_PUBLIC_STUDIO_URL ||
    'https://alrawaabit.sanity.studio';
  redirect(url);
}