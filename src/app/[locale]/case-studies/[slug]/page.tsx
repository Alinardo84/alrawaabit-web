import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { type Locale, locales, localeDirs } from '@/lib/i18n';
import { breadcrumbJsonLd } from '@/lib/jsonld';
import { sanityFetch, caseStudyBySlugQuery, caseStudySlugsQuery, hasSanityConfig, type CaseStudyFull } from '@/sanity/lib/queries';

interface PageProps {
  params: Promise<{ locale: Locale; slug: string }>;
}

export async function generateStaticParams() {
  if (!hasSanityConfig()) return [];
  const slugs = await sanityFetch<{ slug: string }[]>(caseStudySlugsQuery, {}, { revalidate: 60 });
  return locales.flatMap((locale) =>
    slugs
      .filter((s): s is { slug: string } => Boolean(s.slug))
      .map((s) => ({ locale, slug: s.slug }))
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const currentLocale = (locales.includes(locale) ? locale : 'ar') as Locale;
  const siteUrl = currentLocale === 'ar' ? 'https://alrawaabit.com' : `https://alrawaabit.com/${currentLocale}`;

  const fallbackTitles = {
    ar: `دراسة حالة: ${slug} | الروابط`,
    en: `Case Study: ${slug.replace(/-/g, ' ')} | AlRawaabit`,
    fr: `Étude de cas: ${slug.replace(/-/g, ' ')} | AlRawaabit`,
  };

  let title = fallbackTitles[currentLocale];
  let description = fallbackTitles[currentLocale];

  if (hasSanityConfig()) {
    const study = await sanityFetch<CaseStudyFull | null>(
      caseStudyBySlugQuery,
      { slug, locale: currentLocale },
      { revalidate: 60 }
    );
    if (study) {
      const seoTitle = currentLocale === 'en' ? study.seoTitle?.en : currentLocale === 'fr' ? study.seoTitle?.fr : study.seoTitle?.ar || study.seoTitle?.en;
      const seoDesc = currentLocale === 'en' ? study.seoDescription?.en : currentLocale === 'fr' ? study.seoDescription?.fr : study.seoDescription?.ar || study.seoDescription?.en;
      if (seoTitle) title = seoTitle;
      if (seoDesc) description = seoDesc;
    }
  }

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}/case-studies/${slug}`,
      languages: {
        ar: `${siteUrl.replace(/\/en|\/fr/, '')}/ar/case-studies/${slug}`,
        en: `https://alrawaabit.com/en/case-studies/${slug}`,
        fr: `https://alrawaabit.com/fr/case-studies/${slug}`,
      },
    },
    openGraph: {
      type: 'article',
      title,
      description,
      url: `${siteUrl}/case-studies/${slug}`,
      siteName: currentLocale === 'ar' ? 'الروابط' : 'AlRawaabit',
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const currentLocale = (locales.includes(locale) ? locale : 'ar') as Locale;
  const dir = localeDirs[currentLocale];

  let study: CaseStudyFull | null = null;
  if (hasSanityConfig()) {
    study = await sanityFetch<CaseStudyFull | null>(
      caseStudyBySlugQuery,
      { slug, locale: currentLocale },
      { revalidate: 60 }
    );
  }

  const t = (obj: Record<string, string>) => obj[currentLocale];

  const breadcrumbs = [
    { name: t({ ar: 'الرئيسية', en: 'Home', fr: 'Accueil' }), url: `/${currentLocale}` },
    { name: t({ ar: 'معرض الأعمال', en: 'Case Studies', fr: 'Réalisations' }), url: `/${currentLocale}/case-studies` },
    { name: study?.title?.[currentLocale] || slug, url: `/${currentLocale}/case-studies/${slug}` },
  ];

  const jsonLd = [breadcrumbJsonLd(breadcrumbs, currentLocale)];

  return (
    <div className="min-h-screen bg-white" dir={dir}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="relative bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 text-white pt-28 lg:pt-36 pb-20 lg:pb-28">
        <div className="container mx-auto px-4">
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-navy-300" role="list">
              <li><Link href={`/${currentLocale}`} className="hover:text-orange-400">{t({ ar: 'الرئيسية', en: 'Home', fr: 'Accueil' })}</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href={`/${currentLocale}/case-studies`} className="hover:text-orange-400">{t({ ar: 'معرض الأعمال', en: 'Case Studies', fr: 'Réalisations' })}</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-white truncate">{study?.title?.[currentLocale] || slug}</li>
            </ol>
          </nav>

          <ScrollReveal variant="up">
            <div className="max-w-4xl">
              {study?.client && (
                <span className="inline-block px-4 py-2 rounded-full bg-orange-600/20 border border-orange-600/30 text-orange-300 text-sm font-medium mb-6">
                  {study.client}
                </span>
              )}
              <h1 className="text-4xl lg:text-6xl font-bold leading-[1.1] mb-6">
                {study?.title?.[currentLocale] || (() => {
                  const obj: Record<string, string> = { ar: `دراسة حالة: ${slug}`, en: `Case Study: ${slug.replace(/-/g, ' ')}`, fr: `Étude de cas: ${slug.replace(/-/g, ' ')}` };
                  return obj[currentLocale] || obj.en;
                })()}
              </h1>
              {study?.excerpt?.[currentLocale] && (
                <p className="text-lg lg:text-xl text-navy-300 max-w-3xl leading-relaxed">
                  {study.excerpt[currentLocale]}
                </p>
              )}
            </div>
          </ScrollReveal>

          {study && study.services && study.services.length > 0 && (
            <ScrollReveal variant="up" delay={150}>
              <div className="mt-10 flex flex-wrap gap-3">
                {study.services.map((service) => (
                  <span key={service} className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium">
                    {service}
                  </span>
                ))}
              </div>
            </ScrollReveal>
          )}

          {slug === 'coming-soon' && (
            <ScrollReveal variant="up" delay={200}>
              <div className="mt-12 p-8 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm">
                <h3 className="text-2xl font-bold mb-3">{t({ ar: 'قريباً — محتوى جديد', en: 'Coming Soon — New Content', fr: 'Bientôt — Nouveau Contenu' })}</h3>
                <p className="text-navy-300">
                  {t({ ar: 'سيتم نشر محتوى هذه الحالة قريباً من خلال إدارة المحتوى.', en: 'This case study content will be published soon via the CMS.', fr: 'Le contenu de cette étude de cas sera bientôt publié via le CMS.' })}
                </p>
              </div>
            </ScrollReveal>
          )}
        </div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-600/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-navy-700/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          {study && study.results && study.results.length > 0 && (
            <ScrollReveal variant="up">
              <div className="mb-16">
                <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">
                  {t({ ar: 'النتائج', en: 'Results', fr: 'Résultats' })}
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {study.results.map((r, i) => (
                    <ScrollReveal key={i} variant="up" delay={i * 100}>
                      <Card padding="lg" className="border-navy-200 hover:shadow-lg transition-all">
                        <CardContent className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0">
                            <CheckCircle className="w-6 h-6 text-orange-600" aria-hidden="true" />
                          </div>
                          <div className="flex-1">
                            <p className="text-2xl font-bold text-navy-900">{r.value}</p>
                            <p className="text-navy-500 text-sm">{r.metric?.[currentLocale] || (currentLocale === 'en' ? r.metric?.en : currentLocale === 'fr' ? r.metric?.fr : r.metric?.ar)}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          )}

          <ScrollReveal variant="up">
            <div className="prose prose-navy max-w-none">
              <h2 className="text-3xl font-bold text-navy-900 mb-6">
                {t({ ar: 'تفاصيل المشروع', en: 'Project Details', fr: 'Détails du Projet' })}
              </h2>
              <p className="text-navy-600 text-lg leading-relaxed mb-8">
                {study?.excerpt?.[currentLocale] ||
                  t({ ar: 'سيتم نشر تفاصيل هذه الحالة قريباً. تحقق مرة أخرى لمشاهدة التحديثات!', en: 'This case study will be published soon. Check back to see the updates!', fr: 'Cette étude de cas sera bientôt publiée. Revenez voir les mises à jour !' })}
              </p>
            </div>
          </ScrollReveal>

          {study && study.tags && study.tags.length > 0 && (
            <ScrollReveal variant="up" delay={100}>
              <div className="mt-12 pt-12 border-t border-navy-200">
                <h3 className="text-xl font-bold text-navy-900 mb-4">
                  {t({ ar: 'التقنيات المستخدمة', en: 'Technologies Used', fr: 'Technologies Utilisées' })}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {study.tags.map((tag: string) => (
                    <span key={tag} className="px-4 py-2 rounded-full bg-navy-100 text-navy-700 text-sm font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 text-white relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <ScrollReveal variant="up">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              {t({ ar: 'هل لديك مشروع مشابه؟', en: 'Have a Similar Project?', fr: 'Avez-vous un Projet Similaire ?' })}
            </h2>
            <p className="text-navy-300 text-lg max-w-2xl mx-auto mb-10">
              {t({ ar: 'دعنا نمنحك تحليلاً شاملاً لوضعك الرقمي الحالي مجاناً.', en: 'Let us give you a comprehensive analysis of your current digital state for free.', fr: 'Laissez-nous vous donner une analyse complète de votre état digital actuel gratuitement.' })}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${currentLocale}/contact`}>
                <Button size="xl" className="px-10 py-4">
                  {t({ ar: 'احجز مكالمة استراتيجية', en: 'Book a Strategy Call', fr: 'Réserver un Appel Stratégique' })}
                  <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
                </Button>
              </Link>
              <Link href={`/${currentLocale}/case-studies`}>
                <Button variant="outline" size="xl" className="px-10 py-4 border-white/30 hover:bg-white/10">
                  {t({ ar: 'عرض جميع الحالات', en: 'View All Cases', fr: 'Toutes les Études' })}
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}