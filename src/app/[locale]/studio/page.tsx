import { redirect } from 'next/navigation';

/**
 * Redirects /{locale}/studio to the dedicated Studio deployment.
 * Set NEXT_PUBLIC_STUDIO_URL to your Studio's Vercel URL
 * (e.g. https://alrawaabit-cms.vercel.app).
 *
 * If unset, falls back to Sanity's hosted Studio URL.
 *
 * Lives under [locale] so the i18n middleware accepts the path;
 * the redirect target itself is locale-independent.
 */
export default async function StudioRedirect({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params; // satisfy Next.js [locale] segment typing
  redirect(
    process.env.NEXT_PUBLIC_STUDIO_URL || 'https://alrawaabit.sanity.studio'
  );
}