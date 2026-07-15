'use client';

import { PortableText as PT, type PortableTextComponents } from '@portabletext/react';
import { cn } from '@/lib/utils';

type Block = {
  _type: 'block';
  _key: string;
  style?: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'blockquote';
  children?: Array<{ _type: 'span'; text: string; marks?: string[] }>;
  markDefs?: Array<{ _key: string; _type: 'link' | 'internalLink'; href?: string; blank?: boolean }>;
  listItem?: 'bullet' | 'number';
  level?: number;
};

type InlineImage = {
  _type: 'image';
  _key: string;
  asset?: { _id?: string; _ref?: string; url?: string; metadata?: { lqip?: string } };
  alt?: string;
  caption?: string;
};
type Code = { _type: 'code'; _key: string; language?: string; code?: string; filename?: string };
type Body = Array<Block | InlineImage | Code | { _type: string; _key?: string }>;

interface PortableTextRendererProps {
  value: Body;
  locale: 'ar' | 'en' | 'fr';
  className?: string;
}

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="my-4 text-navy-700 leading-relaxed">{children}</p>,
    h1: ({ children }) => <h1 className="text-4xl font-bold text-navy-900 my-6">{children}</h1>,
    h2: ({ children }) => <h2 className="text-3xl font-bold text-navy-900 mt-10 mb-4">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl font-semibold text-navy-900 mt-8 mb-3">{children}</h3>,
    h4: ({ children }) => <h4 className="text-xl font-semibold text-navy-900 mt-6 mb-2">{children}</h4>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-orange-500 pl-6 italic text-navy-600 my-4 py-2">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc list-inside my-4 space-y-2">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal list-inside my-4 space-y-2">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => <u className="underline">{children}</u>,
    'strike-through': ({ children }) => <del className="line-through">{children}</del>,
    link: ({ children, value }) => {
      const v = value as { href?: string; blank?: boolean } | undefined;
      return (
        <a
          href={v?.href || '#'}
          className="text-orange-600 hover:text-orange-700 underline"
          target={v?.blank ? '_blank' : undefined}
          rel={v?.blank ? 'noopener noreferrer' : undefined}
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => {
      const v = value as InlineImage;
      const asset = v.asset;
      if (!asset?._ref && !asset?.url) return null;
      const src =
        asset.url ||
        (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== 'your_project_id_here'
          ? `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/production/${asset._ref?.replace('image-', '').replace('-', '/')}.webp`
          : '');
      return (
        <figure className="my-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={v.alt || ''} className="w-full h-auto rounded-xl shadow-lg my-8" loading="lazy" />
          {v.caption && (
            <figcaption className="text-center text-sm text-navy-500 px-4 py-3 bg-navy-50 rounded-lg">
              {v.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    code: ({ value }) => {
      const v = value as { code: string; language?: string; filename?: string };
      return (
        <div className="my-6 rounded-xl overflow-hidden bg-navy-950 border border-navy-700">
          {v.filename && (
            <div className="px-4 py-2 bg-navy-800 text-xs text-navy-300 font-mono border-b border-navy-700 flex items-center justify-between">
              <span>{v.filename}</span>
              <span className="text-xs text-navy-300 uppercase">{v.language || 'plaintext'}</span>
            </div>
          )}
          <pre className="p-4 overflow-x-auto text-sm leading-relaxed">
            <code className="text-gray-100 font-mono">{v.code}</code>
          </pre>
        </div>
      );
    },
  },
};

export function PortableTextRenderer({ value, locale, className }: PortableTextRendererProps) {
  if (!Array.isArray(value) || value.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        'prose prose-navy max-w-none',
        locale === 'ar' ? 'rtl text-right' : 'ltr text-left',
        className
      )}
    >
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <PT value={value as any} components={components} />
    </div>
  );
}