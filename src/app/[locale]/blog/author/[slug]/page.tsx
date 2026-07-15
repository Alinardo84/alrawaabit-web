import { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { type Locale, locales, localeDirs } from '@/lib/i18n';
import { breadcrumbJsonLd } from '@/lib/jsonld';
import { sanityFetch, blogPostsByAuthorQuery, authorBySlugQuery, hasSanityConfig, slugOf, type BlogPostCard, type Author } from '@/sanity/lib/queries';

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const currentLocale = (locales.includes(locale as Locale) ? locale : 'ar') as Locale;
  const siteUrl = currentLocale === 'ar' ? 'https://alrawaabit.com' : `https://alrawaabit.com/${currentLocale}`;

  const pretty = slug.replace(/-/g, ' ');
  const titles = {
    ar: `المؤلف: ${pretty} | الروابط`,
    en: `Author: ${pretty} | AlRawaabit`,
    fr: `Auteur: ${pretty} | AlRawaabit`,
  } as const;
  const descriptions = {
    ar: `مقالات بقلم ${pretty} في التسويق الرقمي، SEO، AEO، GEO.`,
    en: `Articles by ${pretty} on digital marketing, SEO, AEO, GEO.`,
    fr: `Articles par ${pretty} sur le marketing digital, SEO, AEO, GEO.`,
  } as const;

  return {
    title: titles[currentLocale],
    description: descriptions[currentLocale],
    alternates: {
      canonical: `${siteUrl}/blog/author/${slug}`,
      languages: {
        ar: `https://alrawaabit.com/blog/author/${slug}`,
        en: `https://alrawaabit.com/en/blog/author/${slug}`,
        fr: `https://alrawaabit.com/fr/blog/author/${slug}`,
      },
    },
  };
}

export default async function BlogAuthorPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const currentLocale = (locales.includes(locale as Locale) ? locale : 'ar') as Locale;
  const dir = localeDirs[currentLocale];

  const [posts, author] = await Promise.all([
    hasSanityConfig()
      ? sanityFetch<BlogPostCard[]>(blogPostsByAuthorQuery, { slug, locale: currentLocale }, { revalidate: 60 }).catch(() => [] as BlogPostCard[])
      : Promise.resolve([] as BlogPostCard[]),
    hasSanityConfig()
      ? sanityFetch<Author | null>(authorBySlugQuery, { slug, locale: currentLocale }, { revalidate: 3600 }).catch(() => null)
      : Promise.resolve(null),
  ]);

  const t = (obj: Record<string, string>) => obj[currentLocale];

  const breadcrumbs = [
    { name: t({ ar: 'الرئيسية', en: 'Home', fr: 'Accueil' }), url: `/${currentLocale}` },
    { name: t({ ar: 'المدونة', en: 'Blog', fr: 'Blog' }), url: `/${currentLocale}/blog` },
    { name: `${t({ ar: 'المؤلف:', en: 'Author:', fr: 'Auteur:' })} ${author?.name || slug}`, url: `/${currentLocale}/blog/author/${slug}` },
  ];
  const jsonLd = [breadcrumbJsonLd(breadcrumbs, currentLocale)];

  return (
    <div className="min-h-screen bg-white" dir={dir}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 text-white pt-28 lg:pt-36 pb-20">
        <div className="container mx-auto px-4">
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-navy-300" role="list">
              <li><Link href={`/${currentLocale}`} className="hover:text-orange-400">{t({ ar: 'الرئيسية', en: 'Home', fr: 'Accueil' })}</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href={`/${currentLocale}/blog`} className="hover:text-orange-400">{t({ ar: 'المدونة', en: 'Blog', fr: 'Blog' })}</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-white font-medium">{t({ ar: 'المؤلف:', en: 'Author:', fr: 'Auteur:' })} {author?.name || slug}</li>
            </ol>
          </nav>

          <ScrollReveal variant="up">
            <div className="flex flex-col items-center gap-6 text-center max-w-3xl mx-auto">
              {author?.photo?.asset?.url && (
                <img
                  src={author.photo.asset.url}
                  alt={author?.name || slug}
                  className="w-28 h-28 rounded-full ring-4 ring-white/10 object-cover"
                  loading="lazy"
                />
              )}
              <h1 className="text-4xl lg:text-6xl font-bold leading-[1.1]">
                {t({ ar: 'المؤلف:', en: 'Author:', fr: 'Auteur:' })} {author?.name || slug}
              </h1>
              {author?.role && <p className="text-lg text-orange-400 font-medium">{author.role}</p>}
              {author?.bio && (
                <p className="text-navy-300 text-lg leading-relaxed">
                  {typeof author.bio === 'string' ? author.bio : author.bio[currentLocale] || author.bio.en || author.bio.ar || ''}
                </p>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <ScrollReveal variant="up">
            <h2 className="text-3xl lg:text-4xl font-bold text-navy-900 mb-10 text-center">
              {t({ ar: 'مقالات المؤلف', en: "Author's Articles", fr: "Articles de l'Auteur" })}
            </h2>
          </ScrollReveal>

          {posts.length === 0 ? (
            <div className="text-center max-w-2xl mx-auto py-16">
              <h3 className="text-3xl font-bold text-navy-900 mb-4">
                {t({ ar: 'لا توجد مقالات', en: 'No Posts Found', fr: 'Aucun Article' })}
              </h3>
              <p className="text-navy-500 mb-6">
                {t({ ar: 'لا توجد مقالات لهذا المؤلف بعد.', en: 'No posts found for this author.', fr: 'Aucun article trouvé pour cet auteur.' })}
              </p>
              <Link href={`/${currentLocale}/blog`}>
                <Button variant="outline" size="lg">
                  {t({ ar: 'العودة إلى المدونة', en: 'Back to Blog', fr: 'Retour au Blog' })}
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {posts.map((post, i) => (
                <ScrollReveal key={post._id || i} variant="up" delay={i * 80}>
                  <Link href={`/${currentLocale}/blog/${slugOf(post.slug)}`} className="block group">
                    <Card hover padding="none" className="h-full transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl">
                      <div className="aspect-video bg-navy-100 overflow-hidden">
                        {post.featuredImage?.asset?.url ? (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img src={post.featuredImage.asset.url} alt={post.featuredImage?.alt || ''} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-navy-100 to-navy-200 flex items-center justify-center">
                            <span className="text-6xl text-navy-300">📝</span>
                          </div>
                        )}
                      </div>
                      <CardContent className="p-6">
                        <div className="flex flex-wrap gap-2 mb-3">
                          {(post.tags || []).slice(0, 3).map((tag: string, ti: number) => (
                            <span key={ti} className="px-2 py-1 text-xs font-medium bg-navy-100 text-navy-700 rounded-full">{tag}</span>
                          ))}
                        </div>
                        <h3 className="text-xl font-semibold text-navy-900 mb-2 group-hover:text-orange-600 transition-colors">
                          {post.title?.[currentLocale] || post.title?.en || post.title?.ar || post.title?.fr || 'Untitled'}
                        </h3>
                        <p className="text-navy-600 text-sm leading-relaxed mb-4 line-clamp-2">
                          {post.excerpt?.[currentLocale] || post.excerpt?.en || post.excerpt?.ar || post.excerpt?.fr || ''}
                        </p>
                        <div className="flex items-center gap-3 text-sm text-navy-500">
                          {post.publishedAt && (
                            <time dateTime={post.publishedAt} className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" aria-hidden="true" />
                              {new Date(post.publishedAt).toLocaleDateString(
                                currentLocale === 'ar' ? 'ar-EG' : currentLocale === 'fr' ? 'fr-FR' : 'en-US'
                              )}
                            </time>
                          )}
                          {post.readingTime ? (
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" aria-hidden="true" />
                              {post.readingTime} {t({ ar: 'دقيقة', en: 'min', fr: 'min' })}
                            </span>
                          ) : null}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}