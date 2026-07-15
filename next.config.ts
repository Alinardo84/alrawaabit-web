import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: [],
  outputFileTracingExcludes: {
    '*': ['studio/**', '.agents/**'],
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.higgsfield.ai' },
      { protocol: 'https', hostname: '*.higgsfield.ai' },
      { protocol: 'https', hostname: 'alrawaabit.com' },
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: '*.cdn.sanity.io' },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
        ],
      },
      {
        source: '/sitemap.xml',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=86400, s-maxage=86400' }],
      },
      {
        source: '/robots.txt',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=86400, s-maxage=86400' }],
      },
      {
        source: '/llms.txt',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=86400, s-maxage=86400' }],
      },
    ];
  },
};

export default nextConfig;