/**
 * Lightweight Sanity client using native fetch — no external dependencies.
 * Avoids heavy `next-sanity` / `@sanity/client` packages that pull
 * in `swr`, `styled-components`, and React 19 experimental hooks.
 * 
 * Uses Next.js fetch caching for ISR.
 */

import { apiVersion, dataset, projectId } from '../env';

function getBaseUrl() {
  return `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}`;
}

type FetchOptions = {
  preview?: boolean;
  revalidate?: number | false;
  tags?: string[];
};

export async function sanityFetch<T = unknown>(
  query: string,
  params: Record<string, unknown> = {},
  { preview = false, revalidate = 60, tags = [] }: FetchOptions = {}
): Promise<T> {
  if (!projectId || projectId === 'your_project_id_here' || projectId === 'placeholder-project-id') {
    // When Sanity is not configured yet, return an empty result so the
    // build succeeds and pages render with fallback content.
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[sanity] Project ID missing — returning null query result');
    }
    return null as T;
  }

  const url = new URL(getBaseUrl());
  url.searchParams.set('query', query);
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null) url.searchParams.set(`$${k}`, JSON.stringify(v));
  }

  const next: { revalidate?: number | false; cache?: string; tags?: string[] } = {};
  if (preview) next.revalidate = 0;
  else if (revalidate === false) next.cache = 'force-cache';
  else if (typeof revalidate === 'number') next.revalidate = revalidate;
  if (tags.length) next.tags = tags;

  const token = preview ? process.env.SANITY_API_TOKEN : undefined;

  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    next,
  });

  if (!res.ok) {
    throw new Error(`[sanity] fetch failed: ${res.status} ${res.statusText}`);
  }
  const json = await res.json();
  return json.result as T;
}

// Re-export a compact GROQ template-tag helper
export function groq(strings: TemplateStringsArray, ...values: unknown[]) {
  let q = '';
  for (let i = 0; i < strings.length; i++) {
    q += strings[i];
    if (i < values.length) q += String(values[i]);
  }
  return q;
}