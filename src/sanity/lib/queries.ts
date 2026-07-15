/**
 * GROQ query builders for AlRawaabit content.
 * All localized fields use the `coalesce` fallback pattern:
 *   coalesce(field[_key=="<locale>"][0].value, field[_key=="en"][0].value, field[_key=="ar"][0].value)
 */
import type { PortableTextBlock } from '@portabletext/react';

export type LocalizedString = { ar?: string; en?: string; fr?: string };
export type LocalizedText = LocalizedString;
export type LocalizedBody = { ar?: PortableTextBlock[]; en?: PortableTextBlock[]; fr?: PortableTextBlock[] };

export interface SanityImageRef {
  _id?: string;
  _ref?: string;
  url?: string;
  metadata?: { lqip?: string; dimensions?: { width: number; height: number } };
}

export interface BlogPostCard {
  _id: string;
  slug: { current: string };
  title?: LocalizedString;
  excerpt?: LocalizedString;
  tags?: string[];
  publishedAt?: string;
  readingTime?: number;
  featuredImage?: { asset?: SanityImageRef; alt?: string };
  author?: { name?: string; slug?: { current?: string }; role?: string; photo?: { asset?: SanityImageRef; alt?: string } };
  categories?: Array<{ _id?: string; slug?: { current?: string } | string; title?: LocalizedString; description?: LocalizedString; color?: string }>;
}

export interface BlogPostFull extends BlogPostCard {
  body?: LocalizedBody;
  gallery?: Array<{ _key?: string; asset?: SanityImageRef; alt?: string }>;
  seoTitle?: LocalizedString;
  seoDescription?: LocalizedString;
  seoKeywords?: string[];
}

export interface CaseStudyCard {
  _id: string;
  slug: { current: string };
  client?: string;
  tags?: string[];
  services?: string[];
  title?: LocalizedString;
  excerpt?: LocalizedString;
  featuredImage?: { asset?: SanityImageRef; alt?: string };
  results?: Array<{ value?: string; metric?: LocalizedString }>;
  category?: { slug?: { current?: string } | string; title?: LocalizedString };
  featured?: boolean;
  order?: number;
  publishedAt?: string;
}

export interface CaseStudyFull extends CaseStudyCard {
  challenge?: PortableTextBlock[];
  solution?: PortableTextBlock[];
  gallery?: Array<{ asset?: SanityImageRef; alt?: string }>;
  testimonialQuote?: LocalizedString;
  testimonialAuthor?: string;
  testimonialRole?: string;
  testimonialImage?: { asset?: SanityImageRef; alt?: string };
  seoTitle?: LocalizedString;
  seoDescription?: LocalizedString;
}

/** Resolve a Sanity slug field to its current string. */
export function slugOf(s: { current?: string } | string | undefined): string | undefined {
  if (!s) return undefined;
  return typeof s === 'string' ? s : s.current;
}

export interface Author {
  _id: string;
  name: string;
  slug: { current: string };
  role?: string;
  photo?: { asset?: SanityImageRef; alt?: string };
  bio?: LocalizedString | string;
  socialLinks?: Array<{ platform?: string; url?: string }>;
}

export interface Category {
  _id: string;
  slug: { current: string };
  color?: string;
  title?: LocalizedString;
  description?: LocalizedString;
}

// Re-export the lightweight fetch client for callers that just want to run a query.
export { sanityFetch, groq } from './client';

/**
 * True when a real Sanity project ID is configured.
 * `your_project_id_here` and empty values are treated as "not configured"
 * so the app boots cleanly without env vars.
 */
export function hasSanityConfig(): boolean {
  const id = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  return Boolean(id) && id !== 'your_project_id_here' && id !== 'placeholder-project-id';
}

// Helper: extract localized value
const loc = (field: string, locale: string) =>
  `coalesce(${field}[_key == "${locale}"][0].value, ${field}[_key == "en"][0].value, ${field}[_key == "ar"][0].value, "")`;

// Site settings (singleton)
export const siteSettingsQuery = `*[_type == "siteSettings"][0] {
  siteName,
  logo { asset->{url, _id, metadata{lqip}}, alt },
  phone,
  email,
  ${loc('address', '$locale')},
  whatsapp,
  ${loc('workingHours', '$locale')},
  facebook,
  instagram,
  linkedin,
  navMenu[] {
    ${loc('label', '$locale')},
    href,
    children[] {
      ${loc('label', '$locale')},
      href,
    }
  }
}`;

// All published pages
export const pagesQuery = `*[_type == "page" && status == "published"] | order(publishedAt desc) {
  _id,
  slug,
  pageType,
  ${loc('title', '$locale')},
  ${loc('heroTitle', '$locale')},
  ${loc('heroSubtitle', '$locale')},
  ${loc('heroDescription', '$locale')},
  ${loc('heroBadge', '$locale')},
  ${loc('ctaPrimaryText', '$locale')},
  ctaPrimaryLink,
  ${loc('ctaSecondaryText', '$locale')},
  ctaSecondaryLink,
  heroImage { asset->{url, _id, metadata{lqip}}, alt },
  sections[] {
    _type == 'faqSection' => {
      ${loc('title', '$locale')},
      items[] {
        ${loc('question', '$locale')},
        ${loc('answer', '$locale')},
      }
    },
    _type == 'statsSection' => {
      items[] {
        ${loc('label', '$locale')},
        value,
      }
    },
    _type == 'ctaSection' => {
      ${loc('title', '$locale')},
      ${loc('description', '$locale')},
      ${loc('buttonText', '$locale')},
      buttonLink,
    }
  },
  ${loc('seoTitle', '$locale')},
  ${loc('seoDescription', '$locale')},
  seoImage { asset->{url, _id}, alt },
  publishedAt,
}`;

// All published case studies
export const caseStudiesQuery = `*[_type == "caseStudy" && status == "published"] | order(order asc, publishedAt desc) {
  _id,
  slug,
  client,
  tags,
  services,
  ${loc('title', '$locale')},
  ${loc('excerpt', '$locale')},
  featuredImage { asset->{url, _id, metadata{lqip}}, alt },
  results[] {
    ${loc('metric', '$locale')},
    value,
  },
  "category": category->{
    slug,
    ${loc('title', '$locale')},
  },
  featured,
  order,
  publishedAt,
}`;

// Single case study by slug
export const caseStudyBySlugQuery = `*[_type == "caseStudy" && slug.current == $slug && status == "published"][0] {
  _id,
  slug,
  client,
  tags,
  services,
  ${loc('title', '$locale')},
  ${loc('excerpt', '$locale')},
  featuredImage { asset->{url, _id, metadata{lqip}}, alt },
  "challenge": coalesce(challenge[_key == "$locale"][0].value, challenge[_key == "en"][0].value, challenge[_key == "ar"][0].value, []),
  "solution": coalesce(solution[_key == "$locale"][0].value, solution[_key == "en"][0].value, solution[_key == "ar"][0].value, []),
  results[] {
    ${loc('metric', '$locale')},
    value,
  },
  gallery[] { asset->{url, _id}, alt },
  ${loc('testimonialQuote', '$locale')},
  testimonialAuthor,
  testimonialRole,
  testimonialImage { asset->{url, _id}, alt },
  ${loc('seoTitle', '$locale')},
  ${loc('seoDescription', '$locale')},
  publishedAt,
}`;

// Case study slugs for generateStaticParams
export const caseStudySlugsQuery = `*[_type == "caseStudy" && status == "published"]{ "slug": slug.current }`;

// All published blog posts
export const blogPostsQuery = `*[_type == "blogPost" && status == "published"] | order(publishedAt desc) {
  _id,
  slug,
  tags,
  featured,
  readingTime,
  publishedAt,
  ${loc('title', '$locale')},
  ${loc('excerpt', '$locale')},
  featuredImage { asset->{url, _id, metadata{lqip}}, alt },
  "author": author->{
    name,
    slug,
    role,
    photo { asset->{url, _id}, alt },
  },
  "categories": categories[]->{
    slug,
    ${loc('title', '$locale')},
    color,
  },
}`;

// Single blog post by slug
export const blogPostBySlugQuery = `*[_type == "blogPost" && slug.current == $slug && status == "published"][0] {
  _id,
  slug,
  tags,
  featured,
  readingTime,
  publishedAt,
  ${loc('title', '$locale')},
  ${loc('excerpt', '$locale')},
  "body": coalesce(body[_key == "$locale"][0].value, body[_key == "en"][0].value, body[_key == "ar"][0].value, []),
  featuredImage { asset->{url, _id, metadata{lqip}}, alt },
  gallery[] { asset->{url, _id}, alt },
  "author": author->{
    name,
    slug,
    role,
    "bio": coalesce(bio[_key == "$locale"][0].value, bio[_key == "en"][0].value, bio[_key == "ar"][0].value, ""),
    photo { asset->{url, _id}, alt },
    socialLinks[] { platform, url },
  },
  "categories": categories[]->{
    _id,
    slug,
    ${loc('title', '$locale')},
    ${loc('description', '$locale')},
    color,
  },
  ${loc('seoTitle', '$locale')},
  ${loc('seoDescription', '$locale')},
  seoKeywords,
}`;

// Blog post slugs
export const blogPostSlugsQuery = `*[_type == "blogPost" && status == "published"]{ "slug": slug.current }`;

// Posts by category
export const categoryQuery = `*[_type == "category" && slug.current == $slug][0] {
  _id,
  slug,
  color,
  ${loc('title', '$locale')},
  ${loc('description', '$locale')},
}`;

export const blogPostsByCategoryQuery = `*[_type == "blogPost" && status == "published" && references(*[_type == "category" && slug.current == $slug]._id)] | order(publishedAt desc) {
  _id,
  slug,
  tags,
  publishedAt,
  ${loc('title', '$locale')},
  ${loc('excerpt', '$locale')},
  featuredImage { asset->{url, _id}, alt },
  "author": author->{ name, slug, photo { asset->{url, _id}, alt } },
  "categories": categories[]->{ slug, ${loc('title', '$locale')}, color },
}`;

// All categories / tags / authors
export const categoriesQuery = `*[_type == "category"] | order(title asc) {
  _id,
  slug,
  color,
  ${loc('title', '$locale')},
  ${loc('description', '$locale')},
  "postCount": count(*[_type == "blogPost" && status == "published" && references(^._id)])
}`;

export const authorsQuery = `*[_type == "author"] | order(name asc) {
  _id,
  name,
  slug,
  role,
  photo { asset->{url, _id}, alt },
  "postCount": count(*[_type == "blogPost" && status == "published" && references(^._id)])
}`;

export const authorBySlugQuery = `*[_type == "author" && slug.current == $slug][0] {
  _id,
  name,
  slug,
  role,
  photo { asset->{url, _id}, alt },
  "bio": coalesce(bio[_key == "$locale"][0].value, bio[_key == "en"][0].value, bio[_key == "ar"][0].value, ""),
  socialLinks[] { platform, url },
}`;

export const blogPostsByAuthorQuery = `*[_type == "blogPost" && status == "published" && author->slug.current == $slug] | order(publishedAt desc) {
  _id,
  slug,
  publishedAt,
  ${loc('title', '$locale')},
  ${loc('excerpt', '$locale')},
  featuredImage { asset->{url, _id}, alt },
}`;

// All tags (used by tag index — useful even if no index page renders it)
export const tagsQuery = `*[_type == "blogPost" && status == "published"] {
  "tags": tags[]
}[].tags`;

// Posts filtered by a single tag
export const blogPostsByTagQuery = `*[_type == "blogPost" && status == "published" && $slug in tags] | order(publishedAt desc) {
  _id,
  slug,
  tags,
  publishedAt,
  readingTime,
  ${loc('title', '$locale')},
  ${loc('excerpt', '$locale')},
  featuredImage { asset->{url, _id}, alt },
  "author": author->{ name, slug, photo { asset->{url, _id}, alt } },
  "categories": categories[]->{ slug, ${loc('title', '$locale')}, color },
}`;