import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { locales, localeDirs, type Locale } from '@/lib/i18n';
import { breadcrumbJsonLd } from '@/lib/jsonld';

interface CaseStudiesPageProps {
  params: Promise<{ locale: Locale }>;
}

const caseStudies = [
  {
    slug: 'abo-taleb',
    name: { ar: 'ابو طالب لتشكيل المعادن', en: 'Abo Taleb Metal Forming', fr: 'Abo Taleb Formage Métallique' },
    category: { ar: 'تطوير المواقع', en: 'Web Development', fr: 'Développement Web' },
    tags: ['Web', 'Web Design'],
    description: { 
      ar: 'موقع صناعي كامل لشركة رائدة في تشكيل المعادن، مصمم للتصدير الدولي مع دعم متعدد اللغات.',
      en: 'Complete industrial website for a leading metal forming company, designed for international export with multi-language support.',
      fr: 'Site industriel complet pour une entreprise leader en formage métallique, conçu pour l\'export international avec support multilingue.'
    },
    results: [
      { ar: '+140% استفسارات تصدير', en: '+140% Export Inquiries', fr: '+140% Demandes Export' },
      { ar: 'الصفحة الأولى لـ 15+ كلمة صناعية', en: 'Page 1 for 15+ Industrial Keywords', fr: 'Page 1 pour 15+ Mots-clés Industriels' },
    ],
  },
  {
    slug: 'elrahma',
    name: { ar: 'الرحمة للإستثمار العقاري', en: 'Al Rahma Real Estate Investment', fr: 'Al Rahma Investissement Immobilier' },
    category: { ar: 'SEO + تطوير المواقع', en: 'SEO + Web Development', fr: 'SEO + Développement Web' },
    tags: ['SEO', 'Web', 'Web Design'],
    description: { 
      ar: 'منصة عقارية متكاملة تستهدف المشترين في مصر والخليج، مع استراتيجية SEO محلية ودولية.',
      en: 'Integrated real estate platform targeting buyers in Egypt and the Gulf, with local and international SEO strategy.',
      fr: 'Plateforme immobilière intégrée ciblant acheteurs en Égypte et Golfe, avec stratégie SEO locale et internationale.'
    },
    results: [
      { ar: '+300% زيارات عضوية في 6 أشهر', en: '+300% Organic Traffic in 6 Months', fr: '+300% Trafic Organique en 6 Mois' },
      { ar: 'مركز 1-3 لـ 25+ كلمة عقارية', en: 'Position 1-3 for 25+ Real Estate Keywords', fr: 'Position 1-3 pour 25+ Mots-clés Immobiliers' },
    ],
  },
  {
    slug: 'ngage',
    name: { ar: 'مجموعة إنجيچ', en: 'The Engage Group', fr: 'Groupe Engage' },
    category: { ar: 'تطوير المواقع', en: 'Web Development', fr: 'Développement Web' },
    tags: ['Web', 'Web Design'],
    description: { 
      ar: 'موقع مؤسسي لمجموعة قابضة متنوعة، يعرض المحفظة والقطاعات باحترافية.',
      en: 'Corporate website for a diversified holding group, showcasing portfolio and sectors professionally.',
      fr: 'Site institutionnel pour un groupe holding diversifié, présentant portefeuille et secteurs professionnellement.'
    },
    results: [
      { ar: 'تحسين سرعة التحميل 65%', en: '65% Load Speed Improvement', fr: 'Amélioration Vitesse Chargement 65%' },
      { ar: 'معدل تحويل تواصل +85%', en: 'Contact Conversion Rate +85%', fr: 'Taux Conversion Contact +85%' },
    ],
  },
  {
    slug: 'suhail',
    name: { ar: 'سهيل', en: 'Suhail', fr: 'Suhail' },
    category: { ar: 'تطوير المواقع', en: 'Web Development', fr: 'Développement Web' },
    tags: ['Web', 'Web Design'],
    description: { 
      ar: 'منصة خدمات مهنية بتصميم نظيف يركز على بناء الثقة والمصداقية.',
      en: 'Professional services platform with clean design focused on building trust and credibility.',
      fr: 'Plateforme services professionnels au design épuré focalisé sur la construction de confiance et crédibilité.'
    },
    results: [
      { ar: 'معدل ارتداد < 35%', en: 'Bounce Rate < 35%', fr: 'Taux Rebond < 35%' },
      { ar: 'متوسط مدة جلسة 3:45 دقيقة', en: 'Avg Session Duration 3:45 min', fr: 'Durée Session Moyenne 3:45 min' },
    ],
  },
  {
    slug: 'petroapp',
    name: { ar: 'بتروأب', en: 'PetroApp', fr: 'PetroApp' },
    category: { ar: 'تطوير المواقع', en: 'Web Development', fr: 'Développement Web' },
    tags: ['Web'],
    description: { 
      ar: 'تطبيق ويب لقطاع النفط والغاز، يربط الموردين بالمشترين بكفاءة.',
      en: 'Web application for oil & gas sector, connecting suppliers with buyers efficiently.',
      fr: 'Application web pour secteur pétrole & gaz, connectant fournisseurs et acheteurs efficacement.'
    },
    results: [
      { ar: 'إطلاق في 8 أسابيع', en: 'Launched in 8 Weeks', fr: 'Lancé en 8 Semaines' },
      { ar: 'تكامل API مع أنظمة ERP', en: 'ERP API Integration', fr: 'Intégration API ERP' },
    ],
  },
  {
    slug: 'ilmondo',
    name: { ar: 'الموندو اكسبو', en: 'Il Mondo Expo', fr: 'Il Mondo Expo' },
    category: { ar: 'تسويق + تطوير المواقع', en: 'Marketing + Web Development', fr: 'Marketing + Développement Web' },
    tags: ['Marketing', 'Web'],
    description: { 
      ar: 'منصة معارض وفعاليات مع نظام حجز وإدارة متكامل.',
      en: 'Exhibitions & events platform with integrated booking and management system.',
      fr: 'Plateforme expositions & événements avec système réservation et gestion intégré.'
    },
    results: [
      { ar: 'إدارة 50+ فعالية سنوياً', en: 'Managing 50+ Events Annually', fr: 'Gestion 50+ Événements/An' },
      { ar: '90% عملية التسجيل آلية', en: '90% Registration Process Automated', fr: '90% Processus Inscription Automatisé' },
    ],
  },
];

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const currentLocale = locales.includes(locale) ? locale : 'ar';

  const titles = {
    ar: 'معرض الأعمال | الروابط — مشاريع حقيقية، نتائج قابلة للقياس',
    en: 'Case Studies | AlRawaabit — Real Projects, Measurable Results',
    fr: 'Réalisations | AlRawaabit — Projets Réels, Résultats Mesurables',
  };

  const descriptions = {
    ar: 'مشاريع حقيقية ونتائج قابلة للقياس في تطوير المواقع، SEO، AEO، و GEO لعملاء في مصر والخليج.',
    en: 'Real projects with measurable results in web development, SEO, AEO, and GEO for clients in Egypt and the Gulf.',
    fr: 'Projets réels avec résultats mesurables en développement web, SEO, AEO et GEO pour clients en Égypte et Golfe.',
  };

  return {
    title: titles[currentLocale],
    description: descriptions[currentLocale],
    openGraph: {
      title: titles[currentLocale],
      description: descriptions[currentLocale],
      type: 'website',
    },
  };
}

export default async function CaseStudiesPage({ params }: CaseStudiesPageProps) {
  const { locale } = await params;
  const currentLocale = locales.includes(locale) ? locale : 'ar';
  const dir = localeDirs[currentLocale];
  const t = (obj: Record<string, string>) => obj[currentLocale];

  const breadcrumbs = [
    { name: t({ ar: 'الرئيسية', en: 'Home', fr: 'Accueil' }), url: `/${currentLocale}` },
    { name: t({ ar: 'معرض الأعمال', en: 'Case Studies', fr: 'Réalisations' }), url: `/${currentLocale}/case-studies` },
  ];

  const jsonLd = [
    breadcrumbJsonLd(breadcrumbs, currentLocale),
  ];

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
              <li><Link href={`/${currentLocale}`} className="hover:text-orange-400 transition-colors">{t({ ar: 'الرئيسية', en: 'Home', fr: 'Accueil' })}</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-white font-medium">{t({ ar: 'معرض الأعمال', en: 'Case Studies', fr: 'Réalisations' })}</li>
            </ol>
          </nav>

          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-600/20 border border-orange-600/30 text-orange-300 text-sm font-medium mb-6">
              {t({ ar: 'مشاريع حقيقية، نتائج قابلة للقياس', en: 'Real Projects, Measurable Results', fr: 'Projets Réels, Résultats Mesurables' })}
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold leading-[1.1] mb-6">
              {t({ ar: 'معرض الأعمال', en: 'Case Studies', fr: 'Réalisations' })}
            </h1>
            <p className="text-lg lg:text-xl text-navy-300 max-w-3xl mx-auto leading-relaxed">
              {t({ 
                ar: 'مشاريع حقيقية ونتائج قابلة للقياس في تطوير المواقع، SEO، AEO، و GEO لعملاء في مصر والخليج.',
                en: 'Real projects with measurable results in web development, SEO, AEO, and GEO for clients in Egypt and the Gulf.',
                fr: 'Projets réels avec résultats mesurables en développement web, SEO, AEO et GEO pour clients en Égypte et Golfe.'
              })}
            </p>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {caseStudies.map((study, i) => (
              <Link key={study.slug} href={`/${currentLocale}/case-studies/${study.slug}`} className="block">
                <Card hover padding="lg" className="h-full border-navy-100 transition-all duration-300 group">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {study.tags.map((tag, ti) => (
                      <span key={ti} className="px-3 py-1 text-xs font-medium bg-navy-100 text-navy-700 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <CardHeader className="mb-4">
                    <CardTitle className="text-xl group-hover:text-orange-600 transition-colors">{t(study.name)}</CardTitle>
                    <p className="text-navy-500 text-sm">{t(study.category)}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-navy-600 text-sm leading-relaxed mb-6">{t(study.description)}</p>
                    <div className="space-y-2 mb-6">
                      {study.results.map((result, ri) => (
                        <div key={ri} className="flex items-center gap-2 text-sm text-navy-600">
                          <CheckCircle className="w-4 h-4 text-orange-500 flex-shrink-0" aria-hidden="true" />
                          <span>{t(result)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-1 text-orange-600 font-medium group-hover:gap-2 transition-all">
                      <span>{t({ ar: 'عرض الدراسة', en: 'View Case Study', fr: 'Voir l\'Étude' })}</span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href={`/${currentLocale}/contact`}>
              <Button variant="outline" size="lg">
                {t({ ar: 'هل لديك مشروع مشابه؟ تواصل معنا', en: 'Have a Similar Project? Contact Us', fr: 'Avez-vous un Projet Similaire ? Contactez-Nous' })}
                <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 text-white relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            {t({ ar: 'مستعد لبناء قصتك القادمة؟', en: 'Ready to Build Your Next Success Story?', fr: 'Prêt à Construire Votre Prochaine Success Story ?' })}
          </h2>
          <p className="text-navy-300 text-lg max-w-2xl mx-auto mb-10">
            {t({ 
              ar: 'لا تترك مكانتك السوقية للصدفة. منافسوك بدأوا بالفعل في استخدام التقنيات الحديثة. هل أنت مستعد لسباقهم؟',
              en: 'Don\'t leave your market position to chance. Your competitors have already started using modern technologies. Are you ready to race them?',
              fr: 'Ne laissez pas votre position de marché au hasard. Vos concurrents ont déjà commencé à utiliser les technologies modernes. Êtes-vous prêt à les courir ?'
            })}
          </p>
          <Link href={`/${currentLocale}/contact`}>
            <Button size="xl" className="px-10 py-4">
              {t({ ar: 'احجز مكالمة استراتيجية', en: 'Book a Strategy Call', fr: 'Réserver un Appel Stratégique' })}
              <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}