/**
 * Sanity image URL builder (no external deps — uses Sanity CDN directly).
 * Format: https://cdn.sanity.io/images/<projectId>/<dataset>/<assetId>.<format>?<params>
 */

import { projectId, dataset } from '../env';

const CDN_BASE = `https://cdn.sanity.io/images/${projectId}/${dataset}`;

type AssetRef = {
  asset?: {
    _ref?: string;
    _id?: string;
    url?: string;
  };
  _ref?: string;
  _id?: string;
  url?: string;
};

function getAssetId(source: AssetRef | string | undefined | null): string | null {
  if (!source) return null;
  if (typeof source === 'string') {
    if (source.startsWith('http')) return source;
    if (source.includes('-')) return source;
    return null;
  }
  const ref = source.asset?._ref || source._ref || source.asset?._id || source._id;
  return ref || null;
}

function getDirectUrl(source: AssetRef | string | undefined | null): string | null {
  if (typeof source === 'string' && source.startsWith('http')) return source;
  if (!source || typeof source === 'string') return null;
  return source.asset?.url || source.url || null;
}

function buildQueryParams(opts: {
  width?: number;
  height?: number;
  quality?: number;
  fit?: 'max' | 'min' | 'crop' | 'fill';
  auto?: 'format' | 'format,compress';
  bg?: string;
  blur?: number;
} = {}): string {
  const params = new URLSearchParams();
  if (opts.auto) params.set('auto', opts.auto);
  if (typeof opts.width === 'number') params.set('w', String(opts.width));
  if (typeof opts.height === 'number') params.set('h', String(opts.height));
  if (typeof opts.quality === 'number') params.set('q', String(opts.quality));
  if (opts.fit) params.set('fit', opts.fit);
  if (opts.bg) params.set('bg', opts.bg);
  if (typeof opts.blur === 'number') params.set('blur', String(opts.blur));
  const qs = params.toString();
  return qs ? `?${qs}` : '';
}

export function urlFor(
  source: AssetRef | string | undefined | null,
  opts: {
    width?: number;
    height?: number;
    quality?: number;
    fit?: 'max' | 'min' | 'crop' | 'fill';
    auto?: 'format' | 'format,compress';
    bg?: string;
    blur?: number;
  } = {},
): string | null {
  if (!projectId) return null;

  const direct = getDirectUrl(source);
  if (direct) return direct;

  const assetId = getAssetId(source);
  if (!assetId) return null;

  if (assetId.includes('-') && !assetId.includes('/')) {
    return `${CDN_BASE}/${assetId}${buildQueryParams({ auto: 'format', ...opts })}`;
  }
  return null;
}

export function urlForImage(
  source: AssetRef | string | undefined | null,
  width = 1200,
  height?: number,
  quality = 80,
): string | null {
  return urlFor(source, {
    width,
    height,
    quality,
    fit: 'max',
    auto: 'format',
  });
}


export function placeholder(width = 1200, height = 630): string {
  return `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><rect width="${width}" height="${height}" fill="#0F172A"/><text x="50%" y="50%" font-family="sans-serif" font-size="32" fill="#94A3B8" text-anchor="middle" dy=".3em">AlRawaabit</text></svg>`
  )}`;
}