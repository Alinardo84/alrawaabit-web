import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { locales, localeDirs } from '@/lib/i18n';
import { breadcrumbJsonLd } from '@/lib/jsonld';
import { sanityFetch, blogPostsQuery, hasSanityConfig, slugOf, type BlogPostCard } from '@/sanity/lib/queries';

interface PageProps {
  params: Promise<{ locale: string }>;
}

type LocaleKey = 'ar' | 'en' | 'fr';
const isLocale = (l: string): l is LocaleKey => (locales as readonly string[]).includes(l);
const toLocale = (l: string): LocaleKey => (isLocale(l) ? l : 'ar');

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const currentLocale = toLocale(locale);
  const siteUrl = currentLocale === 'ar' ? 'https://alrawaabit.com' : `https://alrawaabit.com/${currentLocale}`;

  const titles: Record<LocaleKey, string> = {
    ar: 'المدونة | الروابط — رؤى، نصائح، ودراسات',
    en: 'Blog | AlRawaabit — Insights, Tips & Case Studies',
    fr: 'Blog | AlRawaabit — Insights, Conseils & Études',
  };

  const descriptions: Record<LocaleKey, string> = {
    ar: 'مقالات متخصصة في التسويق الرقمي، SEO، AEO، GEO، وتطوير المواقع في مصر والخليج.',
    en: 'Insights on digital marketing, SEO, AEO, GEO, and web development in Egypt and the Gulf.',
    fr: 'Articles sur le marketing digital, SEO, AEO, GEO et développement web en Égypte et au Golfe.',
  };

  return {
    title: titles[currentLocale],
    description: descriptions[currentLocale],
    alternates: {
      canonical: `${siteUrl}/blog`,
      languages: {
        ar: 'https://alrawaabit.com/blog',
        en: 'https://alrawaabit.com/en/blog',
        fr: 'https://alrawaabit.com/fr/blog',
      },
    },
    openGraph: {
      type: 'website',
      title: titles[currentLocale],
      description: descriptions[currentLocale],
      url: `${siteUrl}/blog`,
      siteName: currentLocale === 'ar' ? 'الروابط' : 'AlRawaabit',
    },
  };
}

export default async function BlogIndexPage({ params }: PageProps) {
  const { locale } = await params;
  const currentLocale = toLocale(locale);
  const dir = localeDirs[currentLocale];

  const posts: BlogPostCard[] = hasSanityConfig()
    ? (await sanityFetch<BlogPostCard[]>(blogPostsQuery, { locale: currentLocale }, { revalidate: 60 }).catch(() => [])) ?? []
    : [];

  const t = (obj: Record<LocaleKey, string>): string => obj[currentLocale];

  const breadcrumbs = [
    { name: t({ ar: 'الرئيسية', en: 'Home', fr: 'Accueil' }), url: `/${currentLocale}` },
    { name: t({ ar: 'المدونة', en: 'Blog', fr: 'Blog' }), url: `/${currentLocale}/blog` },
  ];
  const jsonLd = [breadcrumbJsonLd(breadcrumbs, currentLocale)];

  return (
    <div className="min-h-screen bg-white" dir={dir}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 text-white pt-28 lg:pt-36 pb-20">
        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal variant="up">
            <nav className="mb-8" aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-sm text-navy-300" role="list">
                <li><Link href={`/${currentLocale}`} className="hover:text-orange-400">{t({ ar: 'الرئيسية', en: 'Home', fr: 'Accueil' })}</Link></li>
                <li aria-hidden="true">/</li>
                <li className="text-white font-medium">{t({ ar: 'المدونة', en: 'Blog', fr: 'Blog' })}</li>
              </ol>
            </nav>
            <h1 className="text-4xl lg:text-6xl font-bold leading-[1.1] mb-6">
              {t({ ar: 'المدونة', en: 'The AlRawaabit Blog', fr: 'Le Blog AlRawaabit' })}
            </h1>
            <p className="text-lg lg:text-xl text-navy-300 max-w-3xl">
              {t({
                ar: 'مقالات متخصصة في التسويق الرقمي، SEO، AEO، GEO، وتطوير المواقع.',
                en: 'Insight on digital marketing, SEO, AEO, GEO, and web development in Egypt and the Gulf.',
                fr: 'Articles sur le marketing digital, SEO, AEO, GEO et développement web en Égypte et au Golfe.',
              })}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Posts */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          {posts.length === 0 ? (
            <div className="text-center max-w-2xl mx-auto">
              <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-700 text-sm font-medium">
                {t({ ar: 'قيد الإطلاق', en: 'Coming Soon', fr: 'Bientôt Disponible' })}
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-navy-900 mb-4">
                {t({ ar: 'مقالات قيد التحضير', en: 'Posts in the Works', fr: 'Articles en Préparation' })}
              </h2>
              <p className="text-navy-500 text-lg mb-8 leading-relaxed">
                {t({
                  ar: 'سيتم نشر المقالات قريباً من خلال إدارة المحتوى. تحقق مرة أخرى لمشاهدة أحدث المقالات حول SEO و AEO و GEO.',
                  en: 'Posts will be published soon via the CMS. Check back to read the latest articles about SEO, AEO, and GEO.',
                  fr: 'Les articles seront bientôt publiés via le CMS. Revenez lire les derniers articles sur le SEO, l\'AEO et le GEO.',
                })}
              </p>
              <Link href={`/${currentLocale}/contact`}>
                <Button size="lg" className="px-8 py-3">
                  {t({ ar: 'تواصل معنا', en: 'Contact Us', fr: 'Nous Contacter' })}
                  <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {posts.map((post, i) => (
                <ScrollReveal key={post._id} variant="up" delay={i * 100}>
                  <Link href={`/${currentLocale}/blog/${slugOf(post.slug)}`} className="block group">
                    <Card hover padding="none" className="h-full transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl">
                      <div className="aspect-video bg-navy-100 overflow-hidden">
                        {post.featuredImage?.asset?.url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={post.featuredImage.asset.url}
                            alt={post.featuredImage?.alt || post.title?.[currentLocale] || ''}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-navy-100 to-navy-200 flex items-center justify-center">
                            <span className="text-6xl">📝</span>
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
                              {new Date(post.publishedAt).toLocaleDateString(currentLocale === 'ar' ? 'ar-EG' : currentLocale === 'fr' ? 'fr-FR' : 'en-US')}
                            </time>
                          )}
                          {post.readingTime ? (
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" aria-hidden="true" />
                              {post.readingTime} {t({ ar: 'دقيقة', en: 'min read', fr: 'min de lecture' })}
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