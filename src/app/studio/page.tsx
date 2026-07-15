import { redirect } from 'next/navigation';

/**
 * Redirects /studio to the dedicated Studio deployment.
 * Set NEXT_PUBLIC_STUDIO_URL to your Studio's Vercel URL
 * (e.g. https://alrawaabit-cms.vercel.app).
 *
 * If unset, falls back to Sanity's hosted Studio URL.
 */
export default function StudioRedirect() {
  const url =
    process.env.NEXT_PUBLIC_STUDIO_URL ||
    'https://alrawaabit.sanity.studio';
  redirect(url);
}