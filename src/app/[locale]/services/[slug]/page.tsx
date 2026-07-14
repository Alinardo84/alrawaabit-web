import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Zap, Shield, Globe, Code, Layers, BarChart, Server, Rocket, Target, Lightbulb, Brain, Network, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { locales, localeDirs, type Locale } from '@/lib/i18n';
import { serviceJsonLd, breadcrumbJsonLd, faqPageJsonLd } from '@/lib/jsonld';

interface ServicePageProps {
  params: Promise<{ locale: Locale; slug: string }>;
}

type LocalizedString = { ar: string; en: string; fr: string };

type ServiceContent = {
  hero: {
    title: LocalizedString;
    subtitle?: LocalizedString;
    desc: LocalizedString;
  };
  pillars?: Array<{
    icon: React.ComponentType<{ className?: string }>;
    title: LocalizedString;
    desc: LocalizedString;
  }>;
  process?: Array<{
    title: LocalizedString;
    desc: LocalizedString;
  }>;
  deliverables?: Array<LocalizedString>;
  whatIs?: {
    title: LocalizedString;
    desc: LocalizedString;
  };
  tactics?: Array<LocalizedString>;
  approach?: Array<LocalizedString>;
  cta: LocalizedString;
};

const serviceContent: Record<string, ServiceContent> = {
  'web-development': {
    hero: {
      title: { ar: 'تطوير المواقع', en: 'Web Development', fr: 'Développement Web' },
      subtitle: { ar: 'مواقع لا تُبنى للجمال فقط — تُبنى لتبيع', en: 'Sites Not Built Just for Beauty — Built to Sell', fr: 'Des Sites Non Construits Juste pour la Beauté — Construits pour Vendre' },
      desc: { 
        ar: 'نصمم كل صفحة بناءً على سيكولوجية المشتري وهندسة تجربة المستخدم، مع بناء تقني سليم يضمن سرعة التحميل وسهولة الفهرسة من اللحظة الأولى. <strong>الخدمة الأكثر طلباً</strong> — ندمج التصميم والبرمجة والـ SEO في مشروع واحد متكامل.',
        en: 'We design every page based on buyer psychology and UX engineering, with solid technical architecture ensuring load speed and easy indexing from day one. <strong>Most Requested Service</strong> — we integrate design, development, and SEO in one cohesive project.',
        fr: 'Nous concevons chaque page selon la psychologie de l\'acheteur et l\'ingénierie UX, avec une architecture technique solide assurant vitesse de chargement et indexation facile dès le premier jour. <strong>Service Le Plus Demandé</strong> — nous intégrons design, développement et SEO en un projet cohérent.'
      },
    },
    pillars: [
      { icon: Code, title: { ar: 'تصميم استراتيجي', en: 'Strategic Design', fr: 'Design Stratégique' }, desc: { ar: 'UX مركز على التحويل، Mobile-first، إمكانية وصول (WCAG 2.2 AA)', en: 'Conversion-centered UX, Mobile-first, Accessibility (WCAG 2.2 AA)', fr: 'UX Centré Conversion, Mobile-first, Accessibilité (WCAG 2.2 AA)' } },
      { icon: Zap, title: { ar: 'Stack حديث', en: 'Modern Stack', fr: 'Stack Moderne' }, desc: { ar: 'Next.js 15، React 19، TypeScript، Tailwind v4، جاهز للـ Edge', en: 'Next.js 15, React 19, TypeScript, Tailwind v4, Edge-ready', fr: 'Next.js 15, React 19, TypeScript, Tailwind v4, Edge-ready' } },
      { icon: Globe, title: { ar: 'SEO مدمج', en: 'Built-in SEO', fr: 'SEO Intégré' }, desc: { ar: 'SEO تقني، Schema، Core Web Vitals، hreflang من اليوم صفر', en: 'Technical SEO, Schema, Core Web Vitals, hreflang from Day Zero', fr: 'SEO Technique, Schema, Core Web Vitals, hreflang Dès le Jour Zéro' } },
      { icon: Rocket, title: { ar: 'أداء', en: 'Performance', fr: 'Performance' }, desc: { ar: 'Lighthouse 90+، تخزين Edge، تحسين صور، ISR', en: 'Lighthouse 90+, Edge Caching, Image Optimization, ISR', fr: 'Lighthouse 90+, Cache Edge, Optimisation Images, ISR' } },
    ],
    process: [
      { title: { ar: 'اكتشاف واستراتيجية', en: 'Discovery & Strategy', fr: 'Découverte & Stratégie' }, desc: { ar: 'جمهور، أهداف، رحلة مشتري', en: 'Audience, Goals, Buyer Journey', fr: 'Audience, Objectifs, Parcours Acheteur' } },
      { title: { ar: 'هندسة معلومات', en: 'IA & Wireframes', fr: 'IA & Wireframes' }, desc: { ar: 'خريطة موقع، مسارات تحويل', en: 'Sitemap, Conversion Paths', fr: 'Plan de Site, Parcours de Conversion' } },
      { title: { ar: 'نظام تصميم', en: 'Design System & UI', fr: 'Design System & UI' }, desc: { ar: 'مكونات، توكنز، إمكانية وصول', en: 'Components, Tokens, Accessibility', fr: 'Composants, Tokens, Accessibilité' } },
      { title: { ar: 'تطوير', en: 'Development & QA', fr: 'Développement & QA' }, desc: { ar: 'RSC، Server Actions، صور محسّنة', en: 'RSC, Server Actions, Optimized Images', fr: 'RSC, Server Actions, Images Optimisées' } },
      { title: { ar: 'إطلاق', en: 'Launch & Monitoring', fr: 'Lancement & Monitoring' }, desc: { ar: 'نطاق، تحليلات، مراقبة', en: 'Domain, Analytics, Monitoring', fr: 'Domaine, Analytics, Monitoring' } },
      { title: { ar: 'تحسين مستمر', en: 'Continuous Optimization', fr: 'Optimisation Continue' }, desc: { ar: 'A/B، سرعة، محتوى', en: 'A/B, Speed, Content', fr: 'A/B, Vitesse, Contenu' } },
    ],
    deliverables: [
      { ar: 'كود مصدر كامل مع ملكية كاملة', en: 'Full Source Code with Complete Ownership', fr: 'Code Source Complet avec Propriété Totale' },
      { ar: 'نظام تصميم قابل للتوسع (Design System)', en: 'Scalable Design System', fr: 'Design System Évolutif' },
      { ar: 'إعداد تحليلات (Vercel Analytics + GA4)', en: 'Analytics Setup (Vercel Analytics + GA4)', fr: 'Configuration Analytics (Vercel Analytics + GA4)' },
      { ar: 'تدريب فريقك على إدارة المحتوى', en: 'Team Training on Content Management', fr: 'Formation Équipe sur Gestion Contenu' },
      { ar: 'دعم تقني 30 يوم بعد الإطلاق', en: '30 Days Post-Launch Technical Support', fr: 'Support Technique 30 Jours Post-Lancement' },
    ],
    cta: { ar: 'ابدأ مشروع موقعك', en: 'Start Your Web Project', fr: 'Lancer Votre Projet Web' },
  },
  'seo': {
    hero: {
      title: { ar: 'خدمات SEO', en: 'SEO Services', fr: 'Services SEO' },
      subtitle: { ar: 'ترتيب مستدام يجلب عملاء مؤهلين', en: 'Sustainable Rankings That Bring Qualified Buyers', fr: 'Classements Durables Apportant des Acheteurs Qualifiés' },
      desc: { 
        ar: 'لا إعلانات مدفوعة، لا حظ. نبني استراتيجية SEO مخصصة للسوق المصري والخليجي، تستهدف الكلمات التي يبحث عنها عميلك الفعلي لحظة قرار الشراء.',
        en: 'No paid ads, no luck. We build a custom SEO strategy for the Egyptian and Gulf markets, targeting the keywords your actual customer searches at the moment of purchase decision.',
        fr: 'Pas de pubs payantes, pas de chance. Nous construisons une stratégie SEO sur mesure pour les marchés égyptien et du Golfe, ciblant les mots-clés que votre client réel recherche au moment de la décision d\'achat.'
      },
    },
    pillars: [
      { icon: Shield, title: { ar: 'SEO تقني', en: 'Technical SEO', fr: 'SEO Technique' }, desc: { ar: 'زحف، فهرسة، سرعة، بيانات مهيكلة، Core Web Vitals', en: 'Crawlability, Indexing, Speed, Structured Data, Core Web Vitals', fr: 'Exploration, Indexation, Vitesse, Données Structurées, Core Web Vitals' } },
      { icon: Lightbulb, title: { ar: 'استراتيجية محتوى', en: 'Content Strategy', fr: 'Stratégie Contenu' }, desc: { ar: 'مجموعات مواضيع، نية بحث، E-E-A-T، تحديثات ربع سنوية', en: 'Topic Clusters, Search Intent, E-E-A-T, Quarterly Refreshes', fr: 'Clusters Thématiques, Intention de Recherche, E-E-A-T, Rafraîchissements Trimestriels' } },
      { icon: Target, title: { ar: 'سلطة وروابط', en: 'Authority & Links', fr: 'Autorité & Liens' }, desc: { ar: 'PR رقمي، شراكات، أصول قابلة للربط، تواصل مستهدف', en: 'Digital PR, Partnerships, Linkable Assets, Targeted Outreach', fr: 'RP Digitaux, Partenariats, Actifs Linkables, Outreach Ciblé' } },
      { icon: Globe, title: { ar: 'محلي ودولي', en: 'Local & International', fr: 'Local & International' }, desc: { ar: 'GBP، hreflang، محتوى عربي/إنجليزي/فرنسي', en: 'GBP, hreflang, Arabic/English/French Content', fr: 'GBP, hreflang, Contenu Arabe/Anglais/Français' } },
    ],
    process: [
      { title: { ar: 'تدقيق تقني شامل', en: 'Comprehensive Technical Audit', fr: 'Audit Technique Complet' }, desc: { ar: '200+ نقطة تفتيش', en: '200+ Checkpoints', fr: '200+ Points de Contrôle' } },
      { title: { ar: 'خريطة كلمات مفتاحية', en: 'Keyword Map', fr: 'Carte Mots-clés' }, desc: { ar: 'مجمعة حسب النية', en: 'Clustered by Intent', fr: 'Groupées par Intention' } },
      { title: { ar: 'تقويم محتوى ربع سنوي', en: 'Quarterly Content Calendar', fr: 'Calendrier Contenu Trimestriel' }, desc: { ar: 'أولويات مبنية على البيانات', en: 'Data-Driven Priorities', fr: 'Priorités Basées sur Données' } },
      { title: { ar: 'تقرير ترتيب شهري', en: 'Monthly Ranking Report', fr: 'Rapport Mensuel Classement' }, desc: { ar: '+ تحليل منافسين', en: '+ Competitor Analysis', fr: '+ Analyse Concurrents' } },
      { title: { ar: 'تحسين مستمر', en: 'Continuous Optimization', fr: 'Optimisation Continue' }, desc: { ar: 'قرارات مبنية على البيانات', en: 'Data-Driven Decisions', fr: 'Décisions Basées sur Données' } },
    ],
    deliverables: [
      { ar: 'تدقيق تقني شامل (200+ نقطة)', en: 'Comprehensive Technical Audit (200+ Points)', fr: 'Audit Technique Complet (200+ Points)' },
      { ar: 'خريطة كلمات مفتاحية مصنفة بالنية', en: 'Keyword Map Clustered by Intent', fr: 'Carte Mots-clés catégorisée par Intention' },
      { ar: 'تقويم محتوى ربع سنوي', en: 'Quarterly Content Calendar', fr: 'Calendrier Contenu Trimestriel' },
      { ar: 'تقرير ترتيب شهري + تحليل منافسين', en: 'Monthly Ranking Report + Competitor Analysis', fr: 'Rapport Mensuel Classement + Analyse Concurrents' },
      { ar: 'تحسين مستمر مبني على البيانات', en: 'Continuous Data-Driven Optimization', fr: 'Optimisation Continue Basée sur Données' },
    ],
    cta: { ar: 'اطلب تدقيق SEO مجاني', en: 'Request Free SEO Audit', fr: 'Demander Audit SEO Gratuit' },
  },
  'aeo': {
    hero: {
      title: { ar: 'خدمات AEO', en: 'AEO Services', fr: 'Services AEO' },
      subtitle: { ar: 'كن الإجابة الأولى — قبل أي رابط', en: 'Be the First Answer — Before Any Link', fr: 'Soyez la Première Réponse — Avant Tout Lien' },
      desc: { 
        ar: 'عندما يسأل عميلك Google عن خدمتك، يظهر اسمك في المربع الأول — قبل أن ينقر على أي رابط. نُهيئ محتوى موقعك ليُجيب بدقة على الأسئلة الحقيقية لعملائك، ويفوز بـ Featured Snippets و People Also Ask.',
        en: 'When your customer asks Google about your service, your name appears in the first box — before they click any link. We prepare your site content to precisely answer your customers\' real questions, winning Featured Snippets and People Also Ask.',
        fr: 'Quand votre client demande à Google votre service, votre nom apparaît dans la première case — avant qu\'il ne clique sur un lien. Nous préparons votre contenu pour répondre précisément aux vraies questions de vos clients, remportant Featured Snippets et People Also Ask.'
      },
    },
    whatIs: {
      title: { ar: 'ما هو AEO؟', en: 'What is AEO?', fr: 'Qu\'est-ce que l\'AEO ?' },
      desc: { 
        ar: 'Answer Engine Optimization هو فن هيكلة المحتوى والبيانات لتكون "الإجابة المفضلة" لمحركات الإجابة: Google SGE، Bing Copilot، Perplexity، والمساعدين الصوتيين. ليس مجرد ترتيب — بل امتلاك الإجابة.',
        en: 'Answer Engine Optimization is the art of structuring content and data to be the "preferred answer" for answer engines: Google SGE, Bing Copilot, Perplexity, and voice assistants. Not just ranking — owning the answer.',
        fr: 'L\'Answer Engine Optimization est l\'art de structurer contenu et données pour être la "réponse préférée" des moteurs de réponse : Google SGE, Bing Copilot, Perplexity, et assistants vocaux. Pas juste le classement — posséder la réponse.'
      }
    },
    tactics: [
      { ar: 'أسئلة وأجوبة منظمة (FAQPage Schema)', en: 'Structured Q&A (FAQPage Schema)', fr: 'Q&R Structurées (Schema FAQPage)' },
      { ar: 'تعريفات مختصرة (40-60 كلمة) للكلمات المفتاحية المستهدفة', en: 'Concise Definitions (40-60 words) for Target Keywords', fr: 'Définitions Conciases (40-60 mots) pour Mots-clés Cibles' },
      { ar: 'جداول مقارنة، قوائم مرقمة، خطوات HowTo', en: 'Comparison Tables, Numbered Lists, HowTo Steps', fr: 'Tableaux Comparatifs, Listes Numérotées, Étapes HowTo' },
      { ar: 'بيانات مهيكلة: QAPage، HowTo، Article، Product', en: 'Structured Data: QAPage, HowTo, Article, Product', fr: 'Données Structurées: QAPage, HowTo, Article, Product' },
      { ar: 'تحسين لـ People Also Ask و Featured Snippets', en: 'Optimization for People Also Ask & Featured Snippets', fr: 'Optimisation pour People Also Ask & Featured Snippets' },
      { ar: 'محتوى صوتي محسّن للمساعدين الصوتيين', en: 'Voice-Optimized Content for Voice Assistants', fr: 'Contenu Optimisé Vocal pour Assistants Vocaux' },
    ],
    cta: { ar: 'سيطِر على إجابات مجالك', en: 'Dominate Your Niche\'s Answers', fr: 'Dominez les Réponses de Votre Niche' },
  },
  'geo': {
    hero: {
      title: { ar: 'خدمات GEO', en: 'GEO Services', fr: 'Services GEO' },
      subtitle: { ar: 'الميزة الحصرية: كن التوصية في ChatGPT، Gemini، Perplexity', en: 'Exclusive Advantage: Be Recommended by ChatGPT, Gemini, Perplexity', fr: 'Avantage Exclusif : Soyez Recommandé par ChatGPT, Gemini, Perplexity' },
      desc: { 
        ar: 'هذا هو الفرق الذي يميزنا: نضمن أن ChatGPT و Gemini و Perplexity يوصون بـ الروابط عملائنا عند السؤال عن أفضل شركات التسويق الرقمي. هذا ليس مستقبلاً — هذا يحدث الآن. <strong>أول وكالة في مصر تقدم GEO كخدمة منفصلة قبل أن يصبح معياراً.</strong>',
        en: 'This is the difference that sets us apart: we ensure ChatGPT, Gemini, and Perplexity recommend AlRawaabit\'s clients when asked about the best digital marketing agencies. This isn\'t the future — this is happening now. <strong>First agency in Egypt to offer GEO as a standalone service before it became a standard.</strong>',
        fr: 'C\'est la différence qui nous distingue : nous garantissons que ChatGPT, Gemini et Perplexity recommandent les clients d\'AlRawaabit quand on demande les meilleures agences de marketing digital. Ce n\'est pas le futur — ça arrive maintenant. <strong>Première agence en Égypte à offrir le GEO comme service autonome avant qu\'il ne devienne un standard.</strong>'
      },
    },
    whatIs: {
      title: { ar: 'ما هو GEO؟', en: 'What is GEO?', fr: 'Qu\'est-ce que le GEO ?' },
      desc: { 
        ar: 'Generative Engine Optimization هو تحسين وجودك الرقمي لكي تذكره وتوصي به نماذج اللغة الكبيرة (LLMs) عند توليد الإجابات. على عكس SEO التقليدي الذي يستهدف الزحف والفهرسة، GEO يستهدف الاسترجاع والاستشهاد في إجابات الذكاء الاصطناعي.',
        en: 'Generative Engine Optimization is optimizing your digital presence to be cited and recommended by Large Language Models (LLMs) when generating answers. Unlike traditional SEO targeting crawl and index, GEO targets retrieval and citation in AI-generated answers.',
        fr: 'La Generative Engine Optimization consiste à optimiser votre présence digitale pour être cité et recommandé par les Large Language Models (LLMs) lors de la génération de réponses. Contrairement au SEO traditionnel qui vise l\'exploration et l\'indexation, le GEO vise la récupération et la citation dans les réponses générées par l\'IA.'
      }
    },
    approach: [
      { ar: 'بنية كيان واضحة: Organization، Service، Person، Place', en: 'Clear Entity Structure: Organization, Service, Person, Place', fr: 'Structure d\'Entité Claire: Organization, Service, Person, Place' },
      { ar: 'محتوى موثوق، مستشهد، غني بالبيانات (E-E-A-T مضاعف)', en: 'Authoritative, Cited, Data-Rich Content (Amplified E-E-A-T)', fr: 'Contenu Autoritaire, Cité, Riche en Données (E-E-A-T Amplifié)' },
      { ar: 'llms.txt و llms-full.txt للأصول القابلة للاستهلاك الآلي', en: 'llms.txt and llms-full.txt for Machine-Consumable Assets', fr: 'llms.txt et llms-full.txt pour Actifs Consommables par Machines' },
      { ar: 'إشارات سمعة: مراجعات، ذكر في مصادر موثوقة، مؤلفون معروفون', en: 'Reputation Signals: Reviews, Mentions in Trusted Sources, Known Authors', fr: 'Signaux de Réputation: Avis, Mentions dans Sources Fiables, Auteurs Connus' },
      { ar: 'تحديث مستمر: نماذج LLM تُحدّث دورياً — محتواك يجب أن يواكب', en: 'Continuous Updates: LLMs Refresh Periodically — Your Content Must Keep Pace', fr: 'Mises à Jour Continues: LLMs Se Rafraîchissent Périodiquement — Votre Contenu Doit Suivre le Rythme' },
    ],
    cta: { ar: 'اجعل الذكاء الاصطناعي يوصي بك', en: 'Make AI Recommend You', fr: 'Faites Recommander par l\'IA' },
  },
};

const serviceIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Code, Zap, Globe, Rocket, Shield, Lightbulb, Target, Brain, Network, TrendingUp, CheckCircle, ArrowRight
};

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  const params = [];
  for (const locale of locales) {
    for (const slug of Object.keys(serviceContent)) {
      params.push({ locale, slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const currentLocale = locales.includes(locale) ? locale : 'ar';
  const content = serviceContent[slug];
  
  if (!content) {
    return { title: 'Service Not Found' };
  }

  const titles = {
    ar: `${content.hero.title.ar} | الروابط`,
    en: `${content.hero.title.en} | AlRawaabit`,
    fr: `${content.hero.title.fr} | AlRawaabit`,
  };

  const descriptions = {
    ar: content.hero.desc.ar.replace(/<[^>]*>/g, '').slice(0, 160),
    en: content.hero.desc.en.replace(/<[^>]*>/g, '').slice(0, 160),
    fr: content.hero.desc.fr.replace(/<[^>]*>/g, '').slice(0, 160),
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

export default async function ServicePage({ params }: ServicePageProps) {
  const { locale, slug } = await params;
  const currentLocale = locales.includes(locale) ? locale : 'ar';
  const dir = localeDirs[currentLocale];
  const content = serviceContent[slug];
  const t = (obj: Record<string, string>) => obj[currentLocale];

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-navy-50" dir={dir}>
        <div className="text-center px-4">
          <h1 className="text-3xl font-bold text-navy-900 mb-4">Service Not Found</h1>
          <Link href={`/${currentLocale}/services`} className="text-orange-600 hover:underline">
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  const breadcrumbs = [
    { name: t({ ar: 'الرئيسية', en: 'Home', fr: 'Accueil' }), url: `/${currentLocale}` },
    { name: t({ ar: 'خدماتنا', en: 'Our Services', fr: 'Nos Services' }), url: `/${currentLocale}/services` },
    { name: t(content.hero.title), url: `/${currentLocale}/services/${slug}` },
  ];

  const jsonLd = [
    serviceJsonLd({
      name: t(content.hero.title),
      description: t(content.hero.desc).replace(/<[^>]*>/g, ''),
      url: `/services/${slug}`,
      locale: currentLocale,
      serviceType: 'Digital Marketing Service',
      areaServed: ['EG', 'SA', 'AE', 'KW', 'QA', 'BH', 'OM'],
      provider: {
        name: currentLocale === 'ar' ? 'الروابط' : 'AlRawaabit',
        url: `https://alrawaabit.com/${currentLocale === 'ar' ? '' : currentLocale}/`,
      },
    }),
    breadcrumbJsonLd(breadcrumbs, currentLocale),
  ];

  return (
    <div className="min-h-screen" dir={dir}>
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
              <li><Link href={`/${currentLocale}/services`} className="hover:text-orange-400 transition-colors">{t({ ar: 'خدماتنا', en: 'Our Services', fr: 'Nos Services' })}</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-white font-medium">{t(content.hero.title)}</li>
            </ol>
          </nav>

          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-600/20 border border-orange-600/30 text-orange-300 text-sm font-medium mb-6">
              {slug === 'geo' && (
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                </span>
              )}
              {slug === 'web-development' && t({ ar: 'الخدمة الأكثر طلباً', en: 'Most Requested Service', fr: 'Service Le Plus Demandé' })}
              {slug === 'geo' && t({ ar: 'ميزة حصرية', en: 'Exclusive Advantage', fr: 'Avantage Exclusif' })}
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold leading-[1.1] mb-6">{t(content.hero.title)}</h1>
            {content.hero.subtitle && <h2 className="text-xl lg:text-2xl text-navy-300 mb-6 font-medium">{t(content.hero.subtitle)}</h2>}
            <p className="text-lg lg:text-xl text-navy-300 leading-relaxed">{t(content.hero.desc)}</p>
          </div>
        </div>
      </section>

      {/* Pillars */}
      {content.pillars && (
        <section className="py-20 lg:py-28 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {content.pillars.map((pillar, i) => (
                <Card key={i} hover padding="lg" className="h-full border-navy-100">
                  <CardHeader>
                    <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600 mb-4">
                      {pillar.icon && <pillar.icon className="w-7 h-7" aria-hidden="true" />}
                    </div>
                    <CardTitle className="text-xl">{t(pillar.title)}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-navy-600">{t(pillar.desc)}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process */}
      {content.process && (
        <section className="py-20 lg:py-28 bg-navy-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-navy-900 mb-4">
                {t({ ar: 'عملية عملنا', en: 'Our Process', fr: 'Notre Processus' })}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
              <div className="hidden md:block absolute top-12 left-1/2 -translate-x-1/2 w-px h-[calc(100%-6rem)] bg-gradient-to-b from-orange-300 to-transparent" aria-hidden="true" />
              {content.process.map((step, i) => (
                <div key={i} className="relative z-10 text-center">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                    {i + 1}
                  </div>
                  <h3 className="text-xl font-semibold text-navy-900 mb-3">{t(step.title)}</h3>
                  <p className="text-navy-600">{t(step.desc)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Deliverables */}
      {content.deliverables && (
        <section className="py-20 lg:py-28 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-navy-900 mb-4">
                {t({ ar: 'المخرجات', en: 'Deliverables', fr: 'Livrables' })}
              </h2>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {content.deliverables.map((deliverable, i) => (
                <div key={i} className="flex items-start gap-4 p-6 bg-navy-50 rounded-2xl border border-navy-100">
                  <CheckCircle className="w-6 h-6 text-orange-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="text-navy-700">{t(deliverable)}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* What Is / Tactics / Approach */}
      {(content.whatIs || content.tactics || content.approach) && (
        <section className="py-20 lg:py-28 bg-navy-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              {content.whatIs && (
                <div className="mb-12 p-8 bg-white rounded-2xl border border-navy-100">
                  <h2 className="text-2xl font-bold text-navy-900 mb-4">{t(content.whatIs.title)}</h2>
                  <p className="text-navy-600 leading-relaxed">{t(content.whatIs.desc)}</p>
                </div>
              )}

              {(content.tactics || content.approach) && (
                <div className="space-y-4">
                  {(content.tactics || content.approach || []).map((item, i) => (
                    <Card key={i} hover padding="lg" className="border-navy-100">
                      <CardContent className="flex gap-4">
                        <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 flex-shrink-0">
                          <CheckCircle className="w-5 h-5" aria-hidden="true" />
                        </div>
                        <p className="text-navy-700 leading-relaxed">{t(item)}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 text-white relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">{t({ ar: 'مستعد للبدء؟', en: 'Ready to Start?', fr: 'Prêt à Commencer ?' })}</h2>
          <p className="text-navy-300 text-lg max-w-2xl mx-auto mb-10">
            {t({ 
              ar: 'لا تترك مكانتك السوقية للصدفة. منافسوك بدأوا بالفعل في استخدام التقنيات الحديثة. هل أنت مستعد لسباقهم؟',
              en: 'Don\'t leave your market position to chance. Your competitors have already started using modern technologies. Are you ready to race them?',
              fr: 'Ne laissez pas votre position de marché au hasard. Vos concurrents ont déjà commencé à utiliser les technologies modernes. Êtes-vous prêt à les courir ?'
            })}
          </p>
          <Link href={`/${currentLocale}/contact`}>
            <Button size="xl" className="px-10 py-4">
              {t(content.cta)}
              <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}