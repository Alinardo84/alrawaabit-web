import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Target, Lightbulb, Shield, Users, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { breadcrumbJsonLd, faqPageJsonLd } from '@/lib/jsonld';
import { type Locale, locales, localeDirs, localeNames } from '@/lib/i18n';

interface AboutPageProps {
  params: Promise<{ locale: Locale }>;
}

const faqs = [
  {
    q: { ar: 'ما هي مهمة الروابط؟', en: 'What is AlRawaabit\'s Mission?', fr: 'Quelle est la Mission d\'AlRawaabit?' },
    a: { ar: 'تمكين الشركات العربية من امتلاك أصول رقمية تبيع وتكبر وتتحول — لا مجرد مواقع تُرى.', en: 'To equip ambitious Arab companies with digital assets that convert, scale, and transform — not just websites to be seen.', fr: 'Équiper les entreprises arabes ambitieuses d\'actifs digitaux qui convertissent, se développent et transforment — pas juste des sites à voir.' },
  },
  {
    q: { ar: 'لماذا تختارون الروابط على الوكالات الأخرى؟', en: 'Why Choose AlRawaabit Over Other Agencies?', fr: 'Pourquoi Choisir AlRawaabit Plutôt que d\'Autres Agences ?' },
    a: { ar: 'لأننا لا نختار بين التصميم الجميل والنتائج التجارية — ندمج الاثنين. هندسة تقنية + استراتيجية بيانات = ميزة تنافسية مستدامة.', en: 'Because we don\'t choose between beautiful design and business results — we combine both. Technical Engineering + Data Strategy = Sustainable Competitive Advantage.', fr: 'Parce que nous ne choisissons pas entre beau design et résultats business — nous combinons les deux. Ingénierie Technique + Stratégie Données = Avantage Concurrentiel Durable.' },
  },
  {
    q: { ar: 'ما هي أسواقكم الرئيسية؟', en: 'What Are Your Main Markets?', fr: 'Quels Sont Vos Marchés Principaux ?' },
    a: { ar: 'مقرنا في القاهرة، مصر — ونخدم عملاء في السعودية والإمارات والكويت وقطر والبحرين وعُمان. خبرتنا في السوق المصري تمتد لأكثر من سنتين، وحضورنا الخليجي يتنامى.', en: 'Headquartered in Cairo, Egypt — serving clients in Saudi Arabia, UAE, Kuwait, Qatar, Bahrain, and Oman. Egyptian market expertise spans 2+ years, Gulf presence growing steadily.', fr: 'Basés au Caire, Égypte — servant des clients en Arabie Saoudite, Émirats, Koweït, Qatar, Bahreïn et Oman. Expertise du marché égyptien de 2+ ans, présence dans le Golfe en croissance constante.' },
  },
];

const values = [
  { icon: Target, title: { ar: 'الهندسة أولاً', en: 'Engineering First', fr: 'Ingénierie d\'Abord' }, desc: { ar: 'كود نظيف، معمارية صلبة، أداء مقيس — قبل الجماليات.', en: 'Clean code, solid architecture, measured performance — before aesthetics.', fr: 'Code propre, architecture solide, performance mesurée — avant l\'esthétique.' } },
  { icon: Lightbulb, title: { ar: 'التفكير IA-الأصلي', en: 'AI-Native Thinking', fr: 'Pensée IA-Native' }, desc: { ar: 'كل أصل نبنيه مُهيكل لاسترجاع LLM، ليس للتصفح البشري فقط.', en: 'Every asset we build is structured for LLM retrieval, not just human browsing.', fr: 'Chaque actif que nous construisons est structuré pour la récupération LLM, pas seulement la navigation humaine.' } },
  { icon: Shield, title: { ar: 'ذكاء السوق', en: 'Market Intelligence', fr: 'Intelligence de Marché' }, desc: { ar: 'استراتيجيات مبنية على سلوك البحث المصري/الخليجي، ليس قوالب عالمية منسوخة.', en: 'Strategies rooted in Egyptian/Gulf search behavior, not copied global templates.', fr: 'Stratégies ancrées dans le comportement de recherche égyptien/golfe, pas des templates globaux copiés.' } },
  { icon: Users, title: { ar: 'الشراكة الشفافة', en: 'Transparent Partnership', fr: 'Partenariat Transparent' }, desc: { ar: 'تقارير شهرية، لوحات تحكم مشتركة، لا صناديق سوداء. أنت تملك البيانات.', en: 'Monthly reports, shared dashboards, no black boxes. You own the data.', fr: 'Rapports mensuels, tableaux de bord partagés, pas de boîtes noires. Vous possédez les données.' } },
];

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const currentLocale = locales.includes(locale) ? locale : 'ar';
  const dir = localeDirs[currentLocale];

  const titles = {
    ar: 'من نحن | الروابط — شريكك الاستراتيجي في هندسة الأصول الرقمية',
    en: 'About Us | AlRawaabit — Your Strategic Partner in Digital Asset Engineering',
    fr: 'À Propos | AlRawaabit — Votre Partenaire Stratégique en Ingénierie d\'Actifs Digitaux',
  };

  const descriptions = {
    ar: 'الروابط ليست مجرد وكالة تطوير ويب؛ نحن مؤسسة متخصصة في بناء البنية التحتية الرقمية للشركات الطموحة. ندمج قوة البرمجة وذكاء البيانات لنمنحك ميزة تنافسية مستدامة.',
    en: 'AlRawaabit is not just a web development agency; we are an institution specialized in building digital infrastructure for ambitious companies. We combine programming power with data intelligence to give you a sustainable competitive advantage.',
    fr: 'AlRawaabit n\'est pas qu\'une agence de développement web ; nous sommes une institution spécialisée dans la construction d\'infrastructure digitale pour entreprises ambitieuses. Nous combinons puissance de programmation et intelligence des données pour vous donner un avantage concurrentiel durable.',
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

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  const currentLocale = locales.includes(locale) ? locale : 'ar';
  const dir = localeDirs[currentLocale];
  const t = (obj: Record<string, string>) => obj[currentLocale];

  const breadcrumbs = [
    { name: t({ ar: 'الرئيسية', en: 'Home', fr: 'Accueil' }), url: `/${currentLocale}` },
    { name: t({ ar: 'من نحن', en: 'About Us', fr: 'À Propos' }), url: `/${currentLocale}/about` },
  ];

  const jsonLd = [
    breadcrumbJsonLd(breadcrumbs, currentLocale),
    faqPageJsonLd(faqs.map(f => ({ question: t(f.q), answer: t(f.a) })), currentLocale),
  ];

  return (
    <div className="min-h-screen" dir={dir}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 text-white pt-28 lg:pt-36 pb-20 lg:pb-28">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-600/20 border border-orange-600/30 text-orange-300 text-sm font-medium mb-6">
              {t({ ar: 'منذ 2021', en: 'Since 2021', fr: 'Depuis 2021' })}
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold leading-[1.1] mb-6">
              {t({ 
                ar: 'شريكك الاستراتيجي في هندسة الأصول الرقمية',
                en: 'Your Strategic Partner in Digital Asset Engineering',
                fr: 'Votre Partenaire Stratégique en Ingénierie d\'Actifs Digitaux'
              })}
            </h1>
            <p className="text-lg lg:text-xl text-navy-300 max-w-3xl mx-auto leading-relaxed">
              {t({ 
                ar: '"الروابط" ليست مجرد وكالة <strong>تطوير ويب</strong>؛ نحن مؤسسة متخصصة في بناء <strong>البنية التحتية الرقمية</strong> للشركات الطموحة. ندرك أن السوق المصري والخليجي لا يحتاج إلى المزيد من "المواقع الجميلة فحسب"، بل يحتاج إلى أدوات تكنولوجية تخدم أهداف الربحية. نحن ندمج بين <strong>قوة البرمجة (Web Development)</strong> و <strong>ذكاء البيانات (GEO/SEO)</strong> لنمنحك <strong>ميزة تنافسية مستدامة</strong>، بعيداً عن ضجيج الإعلانات المؤقتة.',
                en: '"AlRawaabit" is not just a <strong>web development agency</strong>; we are an institution specialized in building <strong>digital infrastructure</strong> for ambitious companies. We understand that the Egyptian and Gulf markets don\'t need more "beautiful websites only" — they need technological tools that serve profitability goals. We combine <strong>programming power (Web Development)</strong> with <strong>data intelligence (GEO/SEO)</strong> to give you a <strong>sustainable competitive advantage</strong>, away from the noise of temporary ads.',
                fr: '"AlRawaabit" n\'est pas qu\'une <strong>agence de développement web</strong> ; nous sommes une institution spécialisée dans la construction d\'<strong>infrastructure digitale</strong> pour entreprises ambitieuses. Nous comprenons que les marchés égyptien et du Golfe n\'ont pas besoin de plus de "beaux sites seulement" — ils ont besoin d\'outils technologiques servant les objectifs de rentabilité. Nous combinons <strong>la puissance de la programmation (Web Development)</strong> et <strong>l\'intelligence des données (GEO/SEO)</strong> pour vous donner un <strong>avantage concurrentiel durable</strong>, loin du bruit des pubs temporaires.'
              })}
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-navy-900 mb-6">{t({ ar: 'مهمتنا', en: 'Our Mission', fr: 'Notre Mission' })}</h2>
              <p className="text-navy-600 text-lg leading-relaxed mb-8">
                {t({ 
                  ar: 'تمكين الشركات العربية من امتلاك أصول رقمية تبيع وتكبر وتتحول — لا مجرد مواقع تُرى.',
                  en: 'To equip ambitious Arab companies with digital assets that convert, scale, and transform — not just websites to be seen.',
                  fr: 'Équiper les entreprises arabes ambitieuses d\'actifs digitaux qui convertissent, se développent et transforment — pas juste des sites à voir.'
                })}
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold text-navy-900 mb-6">{t({ ar: 'رؤيتنا', en: 'Our Vision', fr: 'Notre Vision' })}</h2>
              <p className="text-navy-600 text-lg leading-relaxed">
                {t({ 
                  ar: 'أن نكون المرجع الأول في المنطقة لهندسة الحضور الرقمي الذكي: حيث الكود يلتقي بالاستراتيجية، والبيانات تقود الإبداع.',
                  en: 'To be the region\'s go-to reference for intelligent digital presence engineering: where code meets strategy, and data drives creativity.',
                  fr: 'Devenir la référence de la région pour l\'ingénierie de présence digitale intelligente : où le code rencontre la stratégie, et les données pilotent la créativité.'
                })}
              </p>
            </div>

            <div className="grid gap-6">
              {values.map((value, i) => (
                <Card key={i} hover padding="lg" className="border-navy-100">
                  <CardContent className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 flex-shrink-0">
                      <value.icon className="w-6 h-6" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-navy-900 mb-1">{t(value.title)}</h3>
                      <p className="text-navy-600">{t(value.desc)}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 lg:py-28 bg-navy-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-navy-900 mb-4">{t({ ar: 'القيادة', en: 'Leadership', fr: 'Direction' })}</h2>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card padding="lg" className="border-navy-100">
              <CardContent className="flex gap-6">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-3xl font-bold text-white">MT</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-navy-900 mb-1">{t({ ar: 'محمد الطيب', en: 'Mohamed Tayeb', fr: 'Mohamed Tayeb' })}</h3>
                  <p className="text-orange-600 font-medium mb-3">{t({ ar: 'المؤسس والرئيس التنفيذي', en: 'Founder & CEO', fr: 'Fondateur & CEO' })}</p>
                  <p className="text-navy-600 leading-relaxed">
                    {t({ 
                      ar: '15+ سنة في التحول الرقمي لشركات MENA. رائد منهجيات AEO/GEO في مصر.',
                      en: '15+ years in digital transformation for MENA enterprises. Pioneer of AEO/GEO methodologies in Egypt.',
                      fr: '15+ ans en transformation digitale pour entreprises MENA. Pionnier des méthodologies AEO/GEO en Égypte.'
                    })}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-navy-900 mb-4">{t({ ar: 'أسئلة شائعة', en: 'Frequently Asked Questions', fr: 'Questions Fréquentes' })}</h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="group border border-navy-200 rounded-xl bg-white">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <h3 className="text-lg font-semibold text-navy-900 pr-4">{t(faq.q)}</h3>
                  <span className="text-orange-600 transition-transform group-open:rotate-180" aria-hidden="true">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </span>
                </summary>
                <div className="px-6 pb-6 border-t border-navy-100 animate-slide-down">
                  <p className="text-navy-600 leading-relaxed">{t(faq.a)}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 text-white relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            {t({ ar: 'مستعد لبناء أصولك الرقمية القادمة؟', en: 'Ready to Build Your Next Digital Asset?', fr: 'Prêt à Construire Votre Prochain Actif Digital ?' })}
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