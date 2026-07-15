import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Calendar, Clock, ExternalLink, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { PortableTextRenderer as PortableText } from '@/components/blog/PortableText';
import { type Locale, locales, localeDirs } from '@/lib/i18n';
import { breadcrumbJsonLd, articleJsonLd } from '@/lib/jsonld';
import {
  sanityFetch,
  blogPostBySlugQuery,
  blogPostSlugsQuery,
  hasSanityConfig,
  type BlogPostFull,
} from '@/sanity/lib/queries';

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  if (!hasSanityConfig()) return [];
  const slugs = await sanityFetch<{ slug: string }[]>(blogPostSlugsQuery, {}, { revalidate: 60 });
  return locales.flatMap((locale) =>
    slugs
      .filter((s): s is { slug: string } => Boolean(s.slug))
      .map((s) => ({ locale, slug: s.slug }))
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const currentLocale = (locales.includes(locale as Locale) ? locale : 'ar') as Locale;
  const siteUrl = currentLocale === 'ar' ? 'https://alrawaabit.com' : `https://alrawaabit.com/${currentLocale}`;

  const titles = {
    ar: 'مقال | الروابط',
    en: 'Article | AlRawaabit',
    fr: 'Article | AlRawaabit',
  } as const;

  const descriptions = {
    ar: 'مقال متخصص في التسويق الرقمي، SEO، AEO، GEO، وتطوير المواقع.',
    en: 'Specialized article on digital marketing, SEO, AEO, GEO, and web development.',
    fr: 'Article spécialisé sur le marketing digital, SEO, AEO, GEO, et développement web.',
  } as const;

  return {
    title: titles[currentLocale],
    description: descriptions[currentLocale],
    alternates: {
      canonical: `${siteUrl}/blog/${slug}`,
      languages: {
        ar: `https://alrawaabit.com/blog/${slug}`,
        en: `https://alrawaabit.com/en/blog/${slug}`,
        fr: `https://alrawaabit.com/fr/blog/${slug}`,
      },
    },
    openGraph: {
      type: 'article',
      title: titles[currentLocale],
      description: descriptions[currentLocale],
      url: `${siteUrl}/blog/${slug}`,
      siteName: currentLocale === 'ar' ? 'الروابط' : 'AlRawaabit',
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const currentLocale = (locales.includes(locale as Locale) ? locale : 'ar') as Locale;
  const dir = localeDirs[currentLocale];
  const siteUrl = currentLocale === 'ar' ? 'https://alrawaabit.com' : `https://alrawaabit.com/${currentLocale}`;

  let post: BlogPostFull | null = null;
  if (hasSanityConfig()) {
    post = await sanityFetch<BlogPostFull | null>(
      blogPostBySlugQuery,
      { slug, locale: currentLocale },
      { revalidate: 60 }
    ).catch(() => null);
  }

  const t = (obj: Record<string, string>) => obj[currentLocale];

  const breadcrumbs = [
    { name: t({ ar: 'الرئيسية', en: 'Home', fr: 'Accueil' }), url: `/${currentLocale}` },
    { name: t({ ar: 'المدونة', en: 'Blog', fr: 'Blog' }), url: `/${currentLocale}/blog` },
    { name: post?.title?.[currentLocale] || slug, url: `/${currentLocale}/blog/${slug}` },
  ];

  const jsonLd = [
    breadcrumbJsonLd(breadcrumbs, currentLocale),
    articleJsonLd({
      headline: post?.title?.[currentLocale] || slug,
      description: post?.excerpt?.[currentLocale] || '',
      url: `/blog/${slug}`,
      locale: currentLocale,
      image: post?.featuredImage?.asset?.url,
      datePublished: post?.publishedAt || new Date().toISOString(),
      dateModified: post?.publishedAt || new Date().toISOString(),
      authorName: post?.author?.name || 'AlRawaabit',
      publisherName: 'AlRawaabit',
    }),
  ];

  return (
    <div className="min-h-screen bg-white" dir={dir}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="relative bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 text-white pt-28 lg:pt-36 pb-20 lg:pb-28">
        <div className="container mx-auto px-4 relative z-10">
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-navy-300" role="list">
              <li><Link href={`/${currentLocale}`} className="hover:text-orange-400">{t({ ar: 'الرئيسية', en: 'Home', fr: 'Accueil' })}</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href={`/${currentLocale}/blog`} className="hover:text-orange-400">{t({ ar: 'المدونة', en: 'Blog', fr: 'Blog' })}</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-white truncate max-w-xs">{post?.title?.[currentLocale] || slug}</li>
            </ol>
          </nav>

          <ScrollReveal variant="up">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-600/20 border border-orange-600/30 text-orange-300 text-sm font-medium mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                </span>
                {t({
                  ar: 'أول شركة تسويق رقمي في مصر متخصصة في AEO و GEO',
                  en: 'First Digital Marketing Agency in Egypt Specialized in AEO & GEO',
                  fr: 'Première Agence de Marketing Digital en Égypte Spécialisée en AEO et GEO',
                })}
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold leading-[1.1] mb-6">
                {post?.title?.[currentLocale] || slug}
              </h1>
              {post?.excerpt?.[currentLocale] && (
                <p className="text-lg lg:text-xl text-navy-300 max-w-3xl mx-auto leading-relaxed">
                  {post.excerpt[currentLocale]}
                </p>
              )}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-navy-300">
                {post?.publishedAt && (
                  <time dateTime={post.publishedAt} className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" aria-hidden="true" />
                    {new Date(post.publishedAt).toLocaleDateString(
                      currentLocale === 'ar' ? 'ar-EG' : currentLocale === 'fr' ? 'fr-FR' : 'en-US'
                    )}
                  </time>
                )}
                {post?.readingTime ? (
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4" aria-hidden="true" />
                    {post.readingTime} {t({ ar: 'دقيقة', en: 'min read', fr: 'min de lecture' })}
                  </span>
                ) : null}
                {post?.author?.name ? (
                  <span className="flex items-center gap-2">
                    {post.author.name}
                  </span>
                ) : null}
              </div>
            </div>
          </ScrollReveal>
        </div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-600/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-navy-700/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
      </section>

      {/* Article Content */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          {post?.featuredImage?.asset?.url && (
            <ScrollReveal variant="up" delay={100}>
              <div className="mb-12 rounded-2xl overflow-hidden border border-navy-200 shadow-lg">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.featuredImage.asset.url}
                  alt={post.featuredImage?.alt || post.title?.[currentLocale] || ''}
                  className="w-full h-auto"
                  loading="lazy"
                />
                {post.featuredImage?.alt && (
                  <p className="text-center text-sm text-navy-500 mt-2 px-4">
                    {post.featuredImage.alt}
                  </p>
                )}
              </div>
            </ScrollReveal>
          )}

          <ScrollReveal variant="up" delay={200}>
            <div className="prose prose-navy max-w-none" dir={localeDirs[currentLocale]}>
              <PortableText
                value={
                  post?.body?.[currentLocale] ||
                  post?.body?.en ||
                  post?.body?.ar ||
                  post?.body?.fr ||
                  []
                }
                locale={currentLocale}
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Gallery */}
      {post && post.gallery && post.gallery.length > 0 && (
        <section className="py-20 lg:py-28 bg-navy-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <ScrollReveal variant="up">
              <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">
                {t({ ar: 'معرض الصور', en: 'Image Gallery', fr: "Galerie d'Images" })}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {post.gallery.map((img, i) => (
                  <ScrollReveal key={img._key || i} variant="scale" delay={i * 100}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img.asset?.url}
                      alt={img.alt || post.title?.[currentLocale] || ''}
                      className="w-full aspect-video object-cover rounded-xl hover:scale-105 transition-transform duration-300 cursor-pointer"
                      loading="lazy"
                    />
                  </ScrollReveal>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Tags */}
      {post && post.tags && post.tags.length > 0 && (
        <section className="py-20 lg:py-28 bg-white border-t border-navy-200">
          <div className="container mx-auto px-4 max-w-4xl">
            <ScrollReveal variant="up" delay={100}>
              <h3 className="text-xl font-bold text-navy-900 mb-4">
                {t({ ar: 'الوسوم', en: 'Tags', fr: 'Mots-clés' })}
              </h3>
              <div className="flex flex-wrap gap-3">
                {post.tags.map((tag: string) => (
                  <Link
                    key={tag}
                    href={`/${currentLocale}/blog/tag/${encodeURIComponent(tag)}`}
                    className="px-4 py-2 rounded-full bg-navy-100 text-navy-700 text-sm font-medium hover:bg-orange-100 hover:text-orange-700 transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Share Section (client widget for navigator.share / clipboard) */}
      <section className="py-20 lg:py-28 bg-navy-50">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <ScrollReveal variant="up">
            <h2 className="text-3xl lg:text-4xl font-bold text-navy-900 mb-6">
              {t({ ar: 'شارك هذه المقالة', en: 'Share This Article', fr: 'Partagez cet Article' })}
            </h2>
            <p className="text-navy-500 text-lg max-w-xl mx-auto mb-8">
              {t({
                ar: 'ساعدنا في نشر المعرفة وشارك هذا المقال مع شبكة علاقاتك.',
                en: 'Help us spread knowledge by sharing this article with your network.',
                fr: 'Aidez-nous à diffuser les connaissances en partageant cet article avec votre réseau.',
              })}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post?.title?.[currentLocale] || '')}&url=${encodeURIComponent(`${siteUrl}/blog/${slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-[#1DA1F2] text-white rounded-xl font-semibold hover:bg-[#0d8bd9] transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 8.287h-3.308l-7.227-8.263-7.623 7.97-2.193-2.157 8.29-8.55-8.285-7.932h3.316l7.632 7.926-8.013 7.982h3.314l7.23-8.263-8.514-8.288h3.314l-7.132 8.252 7.767-8.037 2.194 2.172-8.325 8.718 8.58 8.244z" />
                </svg>
                {t({ ar: 'تويتر', en: 'Twitter', fr: 'Twitter' })}
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${siteUrl}/blog/${slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-[#0A66C2] text-white rounded-xl font-semibold hover:bg-[#004182] transition-colors"
              >
                <ExternalLink className="w-5 h-5" aria-hidden="true" />
                {t({ ar: 'لينكد إن', en: 'LinkedIn', fr: 'LinkedIn' })}
              </a>
              <CopyLinkButton
                url={`${siteUrl}/blog/${slug}`}
                label={t({ ar: 'مشاركة', en: 'Share', fr: 'Partager' })}
                icon={<Share2 className="w-5 h-5" aria-hidden="true" />}
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 text-white relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <ScrollReveal variant="up">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              {t({ ar: 'هل لديك مشروع مشابه؟', en: 'Have a Similar Project?', fr: 'Avez-vous un Projet Similaire ?' })}
            </h2>
            <p className="text-navy-300 text-lg max-w-2xl mx-auto mb-10">
              {t({
                ar: 'لا تترك مكانتك السوقية للصدفة. منافسوك بدأوا بالفعل في استخدام التقنيات الحديثة. هل أنت مستعد لسباقهم؟ دعنا نمنحك تحليلاً شاملاً لوضعك الرقمي الحالي مجاناً.',
                en: "Don't leave your market position to chance. Your competitors have already started using modern technologies. Are you ready to race them? Let us give you a comprehensive analysis of your current digital state for free.",
                fr: 'Ne laissez pas votre position de marché au hasard. Vos concurrents ont déjà commencé à utiliser les technologies modernes. Êtes-vous prêt à les courir ? Laissez-nous vous donner une analyse complète de votre état digital actuel gratuitement.',
              })}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${currentLocale}/contact`}>
                <Button size="xl" className="px-10 py-4">
                  {t({ ar: 'احجز مكالمة استراتيجية', en: 'Book a Strategy Call', fr: 'Réserver un Appel Stratégique' })}
                  <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
                </Button>
              </Link>
              <a
                href="https://api.whatsapp.com/send?phone=201111306090"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="xl" className="px-10 py-4 border-white/30 hover:bg-white/10">
                  <Share2 className="w-5 h-5 mr-2" aria-hidden="true" />
                  {t({ ar: 'واتساب', en: 'WhatsApp', fr: 'WhatsApp' })}
                </Button>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

// Tiny client component for the "copy link / share" button so we don't
// drag the whole page into a client component for navigator.share().
function CopyLinkButton({ url, label, icon }: { url: string; label: string; icon: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={async () => {
        if (typeof window === 'undefined') return;
        if (navigator.share) {
          try {
            await navigator.share({ title: label, url });
          } catch {
            /* user dismissed */
          }
        } else if (navigator.clipboard) {
          await navigator.clipboard.writeText(url);
          alert(label);
        }
      }}
      className="flex items-center gap-2 px-6 py-3 bg-navy-900 text-white rounded-xl font-semibold hover:bg-navy-800 transition-colors"
    >
      {icon}
      {label}
    </button>
  );
}