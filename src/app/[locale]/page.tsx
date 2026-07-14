import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Users, Globe, Zap, Target, Brain, Network } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { type Locale, locales, localeDirs } from '@/lib/i18n';

interface HomePageProps {
  params: Promise<{ locale: Locale }>;
}

const services = [
  {
    key: 'web-development',
    title: { ar: 'تطوير المواقع', en: 'Web Development', fr: 'Développement Web' },
    description: {
      ar: 'مواقع لا تُبنى للجمال فقط — تُبنى لتبيع. نصمم كل صفحة بناءً على سيكولوجية المشتري وهندسة تجربة المستخدم، مع بناء تقني سليم يضمن سرعة التحميل وسهولة الفهرسة من اللحظة الأولى.',
      en: 'Sites not built just for beauty — built to sell. We design every page based on buyer psychology and UX engineering, with solid technical architecture ensuring load speed and easy indexing from day one.',
      fr: 'Des sites non construits juste pour la beauté — construits pour vendre. Nous concevons chaque page selon la psychologie de l\'acheteur et l\'ingénierie UX, avec une architecture technique solide assurant vitesse de chargement et indexation facile dès le premier jour.',
    },
    icon: Zap,
    badge: { ar: 'الخدمة الأكثر طلباً', en: 'Most Requested Service', fr: 'Service Le Plus Demandé' },
    href: { ar: '/services/web-development', en: '/services/web-development', fr: '/services/web-development' },
    features: [
      { ar: 'Next.js 15 + React 19 — أداء حافة (Edge) فائق', en: 'Next.js 15 + React 19 — Superb Edge Performance', fr: 'Next.js 15 + React 19 — Performance Edge Superbe' },
      { ar: 'TypeScript الكامل — صفر أخطاء وقت التشغيل', en: 'Full TypeScript — Zero Runtime Errors', fr: 'TypeScript Complet — Zéro Erreur Runtime' },
      { ar: 'Tailwind CSS v4 — تصميم نظامي، صيانة سهلة', en: 'Tailwind CSS v4 — Systematic Design, Easy Maintenance', fr: 'Tailwind CSS v4 — Design Systématique, Maintenance Facile' },
      { ar: 'i18n أصلي (ar/en/fr) — RTL/LTR مدعوم بالكامل', en: 'Native i18n (ar/en/fr) — Full RTL/LTR Support', fr: 'i18n Natif (ar/en/fr) — Support RTL/LTR Complet' },
      { ar: 'SEO تقني مدمج: Schema، Sitemap، Robots، hreflang', en: 'Built-in Technical SEO: Schema, Sitemap, Robots, hreflang', fr: 'SEO Technique Intégré: Schema, Sitemap, Robots, hreflang' },
      { ar: 'Core Web Vitals محسّنة — LCP < 2.5s، CLS < 0.1', en: 'Core Web Vitals Optimized — LCP < 2.5s, CLS < 0.1', fr: 'Core Web Vitals Optimisés — LCP < 2.5s, CLS < 0.1' },
    ],
  },
  {
    key: 'seo',
    title: { ar: 'تحسين محركات البحث (SEO)', en: 'Search Engine Optimization (SEO)', fr: 'Optimisation pour les Moteurs de Recherche (SEO)' },
    description: {
      ar: 'ترتيب مستدام في Google يجلب عملاء مؤهلين — لا إعلانات مدفوعة، لا حظ. نبني استراتيجية SEO مخصصة للسوق المصري والخليجي، تستهدف الكلمات التي يبحث عنها عميلك الفعلي لحظة قرار الشراء.',
      en: 'Sustainable ranking on Google that brings qualified customers — no paid ads, no luck. We build a custom SEO strategy for the Egyptian and Gulf markets, targeting the keywords your actual customer searches at the moment of purchase decision.',
      fr: 'Classement durable sur Google qui apporte des clients qualifiés — pas de pubs payantes, pas de chance. Nous construisons une stratégie SEO sur mesure pour les marchés égyptien et du Golfe, ciblant les mots-clés que votre client réel recherche au moment de la décision d\'achat.',
    },
    icon: Target,
    href: { ar: '/services/seo', en: '/services/seo', fr: '/services/seo' },
    features: [
      { ar: 'SEO تقني: زحف، فهرسة، سرعة، بيانات مهيكلة، Core Web Vitals', en: 'Technical SEO: Crawlability, Indexing, Speed, Structured Data, Core Web Vitals', fr: 'SEO Technique: Exploration, Indexation, Vitesse, Données Structurées, Core Web Vitals' },
      { ar: 'استراتيجية محتوى: مجموعات مواضيع، نية بحث، E-E-A-T، تحديثات ربع سنوية', en: 'Content Strategy: Topic Clusters, Search Intent, E-E-A-T, Quarterly Refreshes', fr: 'Stratégie Contenu: Clusters Thématiques, Intention de Recherche, E-E-A-T, Rafraîchissements Trimestriels' },
      { ar: 'سلطة وروابط: PR رقمي، شراكات، أصول قابلة للربط، تواصل مستهدف', en: 'Authority & Links: Digital PR, Partnerships, Linkable Assets, Targeted Outreach', fr: 'Autorité & Liens: RP Digitaux, Partenariats, Actifs Linkables, Outreach Ciblé' },
      { ar: 'SEO محلي ودولي: GBP، hreflang، محتوى عربي/إنجليزي/فرنسي', en: 'Local & International SEO: GBP, hreflang, Arabic/English/French Content', fr: 'SEO Local & International: GBP, hreflang, Contenu Arabe/Anglais/Français' },
    ],
  },
  {
    key: 'aeo',
    title: { ar: 'الظهور في محركات الإجابة (AEO)', en: 'Answer Engine Optimization (AEO)', fr: 'Optimisation pour les Moteurs de Réponse (AEO)' },
    description: {
      ar: 'عندما يسأل عميلك Google عن خدمتك، يظهر اسمك في المربع الأول — قبل أن ينقر على أي رابط. نُهيئ محتوى موقعك ليُجيب بدقة على الأسئلة الحقيقية لعملائك، ويفوز بـ Featured Snippets و People Also Ask.',
      en: 'When your customer asks Google about your service, your name appears in the first box — before they click any link. We prepare your site content to precisely answer your customers\' real questions, winning Featured Snippets and People Also Ask.',
      fr: 'Quand votre client demande à Google votre service, votre nom apparaît dans la première case — avant qu\'il ne clique sur un lien. Nous préparons votre contenu pour répondre précisément aux vraies questions de vos clients, remportant Featured Snippets et People Also Ask.',
    },
    icon: Brain,
    href: { ar: '/services/aeo', en: '/services/aeo', fr: '/services/aeo' },
    features: [
      { ar: 'أسئلة وأجوبة منظمة (FAQPage Schema)', en: 'Structured Q&A (FAQPage Schema)', fr: 'Q&R Structurées (Schema FAQPage)' },
      { ar: 'تعريفات مختصرة (40-60 كلمة) للكلمات المفتاحية المستهدفة', en: 'Concise Definitions (40-60 words) for Target Keywords', fr: 'Définitions Conciases (40-60 mots) pour Mots-clés Cibles' },
      { ar: 'جداول مقارنة، قوائم مرقمة، خطوات HowTo', en: 'Comparison Tables, Numbered Lists, HowTo Steps', fr: 'Tableaux Comparatifs, Listes Numérotées, Étapes HowTo' },
      { ar: 'بيانات مهيكلة: QAPage، HowTo، Article، Product', en: 'Structured Data: QAPage, HowTo, Article, Product', fr: 'Données Structurées: QAPage, HowTo, Article, Product' },
      { ar: 'تحسين لـ People Also Ask و Featured Snippets', en: 'Optimization for People Also Ask & Featured Snippets', fr: 'Optimisation pour People Also Ask & Featured Snippets' },
      { ar: 'محتوى صوتي محسّن للمساعدين الصوتيين', en: 'Voice-Optimized Content for Voice Assistants', fr: 'Contenu Optimisé Vocal pour Assistants Vocaux' },
    ],
  },
  {
    key: 'geo',
    title: { ar: 'ميزة حصرية: الظهور في الذكاء الاصطناعي (GEO)', en: 'Exclusive Advantage: Generative Engine Optimization (GEO)', fr: 'Avantage Exclusif: Optimisation pour Moteurs Génératifs (GEO)' },
    description: {
      ar: 'هذا هو الفرق الذي يميزنا: نضمن أن ChatGPT و Gemini و Perplexity يوصون بـ الروابط عملائنا عند السؤال عن أفضل شركات التسويق الرقمي. هذا ليس مستقبلاً — هذا يحدث الآن. أول وكالة في مصر تقدم GEO كخدمة منفصلة قبل أن يصبح معياراً.',
      en: 'This is the difference that sets us apart: we ensure ChatGPT, Gemini, and Perplexity recommend AlRawaabit\'s clients when asked about the best digital marketing agencies. This isn\'t the future — this is happening now. First agency in Egypt to offer GEO as a standalone service before it became a standard.',
      fr: 'C\'est la différence qui nous distingue : nous garantissons que ChatGPT, Gemini et Perplexity recommandent les clients d\'AlRawaabit quand on demande les meilleures agences de marketing digital. Ce n\'est pas le futur — c\'est maintenant. Première agence en Égypte à offrir le GEO comme service autonome avant qu\'il ne devienne un standard.',
    },
    icon: Network,
    badge: { ar: 'أول وكالة في مصر تقدم GEO', en: 'First Agency in Egypt to Offer GEO', fr: 'Première Agence en Égypte à Offrir le GEO' },
    href: { ar: '/services/geo', en: '/services/geo', fr: '/services/geo' },
    features: [
      { ar: 'بنية كيان واضحة: Organization، Service، Person، Place', en: 'Clear Entity Structure: Organization, Service, Person, Place', fr: 'Structure d\'Entité Claire: Organization, Service, Person, Place' },
      { ar: 'محتوى موثوق، مستشهد، غني بالبيانات (E-E-A-T مضاعف)', en: 'Authoritative, Cited, Data-Rich Content (Amplified E-E-A-T)', fr: 'Contenu Autoritaire, Cité, Riche en Données (E-E-A-T Amplifié)' },
      { ar: 'llms.txt و llms-full.txt للأصول القابلة للاستهلاك الآلي', en: 'llms.txt and llms-full.txt for Machine-Consumable Assets', fr: 'llms.txt et llms-full.txt pour Actifs Consommables par Machines' },
      { ar: 'إشارات سمعة: مراجعات، ذكر في مصادر موثوقة، مؤلفون معروفون', en: 'Reputation Signals: Reviews, Mentions in Trusted Sources, Known Authors', fr: 'Signaux de Réputation: Avis, Mentions dans Sources Fiables, Auteurs Connus' },
      { ar: 'تحديث مستمر: نماذج LLM تُحدّث دورياً — محتواك يجب أن يواكب', en: 'Continuous Updates: LLMs Refresh Periodically — Your Content Must Keep Pace', fr: 'Mises à Jour Continues: LLMs Se Rafraîchissent Périodiquement — Votre Contenu Doit Suivre le Rythme' },
    ],
  },
];

const problems = [
  {
    icon: Users,
    title: { ar: 'زوار بدون تحويــــــــــــلات', en: 'Visitors Without Conversions', fr: 'Visiteurs Sans Conversions' },
    desc: { ar: 'موقعك يحصل على زوار لكنهم لا يتحولون إلى عملاء', en: 'Your site gets visitors but they don\'t convert to customers', fr: 'Votre site reçoit des visiteurs mais ils ne se convertissent pas en clients' },
  },
  {
    icon: Globe,
    title: { ar: 'غياب عن الصفحة الأولى', en: 'Absent from Page One', fr: 'Absent de la Première Page' },
    desc: { ar: 'لا تظهر في الصفحة الأولى على Google عند البحث عن خدماتك', en: 'You don\'t appear on Google\'s first page when searching for your services', fr: 'Vous n\'apparaissez pas en première page Google pour vos services' },
  },
  {
    icon: Brain,
    title: { ar: 'غائب عن الذكاء الاصطناعي', en: 'Invisible to AI', fr: 'Invisible à l\'IA' },
    desc: { ar: 'منافسوك يُذكرون في إجابات ChatGPT وGoogle SGE وأنت غائب', en: 'Your competitors are mentioned in ChatGPT and Google SGE answers — you\'re absent', fr: 'Vos concurrents sont mentionnés dans les réponses ChatGPT et Google SGE — vous êtes absent' },
  },
];

const pillars = [
  {
    number: '1',
    title: { ar: 'التشخيص والتحليل', en: 'Diagnosis & Analysis', fr: 'Diagnostic & Analyse' },
    desc: { ar: 'نبدأ بتحليل شامل لوضعك الرقمي الحالي: أداء الموقع، الكلمات المفتاحية، المنافسين، وفجوات المحتوى. لا نبدأ في التنفيذ قبل أن نفهم سوقك تماماً.', en: 'We start with a comprehensive analysis of your current digital state: site performance, keywords, competitors, and content gaps. We don\'t start execution before we fully understand your market.', fr: 'Nous commençons par une analyse complète de votre état digital actuel : performance du site, mots-clés, concurrents, et lacunes de contenu. Nous ne commençons pas l\'exécution avant de comprendre parfaitement votre marché.' },
  },
  {
    number: '2',
    title: { ar: 'البناء والهيكلة', en: 'Build & Structure', fr: 'Construction & Structure' },
    desc: { ar: 'نبني النظام الرقمي بناءً على استراتيجية مخصصة: تصميم الموقع، هيكل المحتوى، Schema Markup، وبنية تقنية تجعل Google تثق في موقعك منذ اليوم الأول.', en: 'We build the digital system based on a custom strategy: site design, content structure, Schema Markup, and technical architecture that makes Google trust your site from day one.', fr: 'Nous construisons le système digital basé sur une stratégie sur mesure : design du site, structure de contenu, Schema Markup, et architecture technique qui fait que Google fait confiance à votre site dès le premier jour.' },
  },
  {
    number: '3',
    title: { ar: 'الإطلاق والتحسين المستمر', en: 'Launch & Continuous Optimization', fr: 'Lancement & Optimisation Continue' },
    desc: { ar: 'نُطلق المنصة ونراقب الأداء بتقارير شهرية شفافة. التحسين لا يتوقف — نتكيف مع تحديثات Google وتطورات الذكاء الاصطناعي لنضمن تصدرك المستمر.', en: 'We launch the platform and monitor performance with transparent monthly reports. Optimization never stops — we adapt to Google updates and AI evolutions to ensure your continued dominance.', fr: 'Nous lançons la plateforme et surveillons la performance avec des rapports mensuels transparents. L\'optimisation ne s\'arrête jamais — nous nous adaptons aux mises à jour Google et aux évolutions de l\'IA pour assurer votre domination continue.' },
  },
];

const industries = [
  {
    title: { ar: 'القطاع الصناعي والتصدير', en: 'Industrial & Export', fr: 'Secteur Industriel & Export' },
    desc: { ar: 'المصانع المصرية التي تبحث عن مستوردين دوليين — نبنى حضورهم الرقمي بالإنجليزية والعربية معاً.', en: 'Egyptian factories seeking international importers — we build their digital presence in English and Arabic together.', fr: 'Usines égyptiennes cherchant des importateurs internationaux — nous construisons leur présence digitale en anglais et arabe ensemble.' },
  },
  {
    title: { ar: 'التطوير العقاري', en: 'Real Estate Development', fr: 'Développement Immobilier' },
    desc: { ar: 'شركات التطوير العقاري التي تستهدف المشترين ذوي الملاءة المالية العالية في مصر والخليج.', en: 'Real estate developers targeting high-net-worth buyers in Egypt and the Gulf.', fr: 'Promoteurs immobiliers ciblant des acheteurs à forte capacité financière en Égypte et dans le Golfe.' },
  },
  {
    title: { ar: 'الخدمات المهنية والشركات', en: 'Professional Services & Corporates', fr: 'Services Professionnels & Entreprises' },
    desc: { ar: 'مكاتب المحاماة، الاستشارات، العيادات والمراكز الطبية — قطاعات تعتمد على الثقة والمصداقية الرقمية.', en: 'Law firms, consultancies, clinics and medical centers — sectors relying on digital trust and credibility.', fr: 'Cabinets d\'avocats, conseils, cliniques et centres médicaux — secteurs reposant sur la confiance et la crédibilité digitale.' },
  },
  {
    title: { ar: 'الشركات الناشئة (SMEs)', en: 'SMEs & Startups', fr: 'PME & Startups' },
    desc: { ar: 'SMEs و Startups تحتاج بنية رقمية قوية من اليوم الأول لتختصر سنوات من النمو.', en: 'SMEs and Startups need strong digital infrastructure from day one to shortcut years of growth.', fr: 'PME et Startups ont besoin d\'une infrastructure digitale forte dès le premier jour pour raccourcir des années de croissance.' },
  },
];

const partners = [
  { name: { ar: 'ابو طالب لتشكيل المعادن', en: 'Abo Taleb Metal Forming', fr: 'Abo Taleb Formage Métallique' }, tags: ['Web', 'Web Design'], category: { ar: 'تطوير المواقع', en: 'Web Development', fr: 'Développement Web' } },
  { name: { ar: 'الرحمة للإستثمار العقاري', en: 'Al Rahma Real Estate Investment', fr: 'Al Rahma Investissement Immobilier' }, tags: ['SEO', 'Web', 'Web Design'], category: { ar: 'SEO + تطوير', en: 'SEO + Web', fr: 'SEO + Web' } },
  { name: { ar: 'مجموعة إنجيچ', en: 'The Engage Group', fr: 'Groupe Engage' }, tags: ['Web', 'Web Design'], category: { ar: 'تطوير المواقع', en: 'Web Development', fr: 'Développement Web' } },
  { name: { ar: 'سهيل', en: 'Suhail', fr: 'Suhail' }, tags: ['Web', 'Web Design'], category: { ar: 'تطوير المواقع', en: 'Web Development', fr: 'Développement Web' } },
  { name: { ar: 'بتروأب', en: 'PetroApp', fr: 'PetroApp' }, tags: ['Web'], category: { ar: 'تطوير المواقع', en: 'Web Development', fr: 'Développement Web' } },
  { name: { ar: 'الموندو اكسبو', en: 'Il Mondo Expo', fr: 'Il Mondo Expo' }, tags: ['Marketing', 'Web'], category: { ar: 'تسويق + تطوير', en: 'Marketing + Web', fr: 'Marketing + Web' } },
];

const faqs = [
  {
    q: { ar: 'ما الفرق بين SEO و AEO و GEO؟', en: 'What\'s the difference between SEO, AEO, and GEO?', fr: 'Quelle est la différence entre SEO, AEO et GEO ?' },
    a: { ar: 'SEO يضمن ظهورك في نتائج Google التقليدية. AEO يضمن ظهورك في المربعات المميزة (Featured Snippets) وإجابات Google المباشرة. GEO يضمن أن أنظمة الذكاء الاصطناعي كـ ChatGPT و Gemini تُوصي بك عند السؤال عن خدماتك. الثلاثة معاً يمنحونك هيمنة رقمية شاملة.', en: 'SEO ensures you appear in traditional Google results. AEO ensures you appear in Featured Snippets and Google\'s direct answers. GEO ensures AI systems like ChatGPT and Gemini recommend you when asked about your services. All three together give you comprehensive digital dominance.', fr: 'Le SEO assure votre apparition dans les résultats Google traditionnels. L\'AEO assure votre apparition dans les Featured Snippets et réponses directes de Google. Le GEO assure que les systèmes d\'IA comme ChatGPT et Gemini vous recommandent quand on demande vos services. Les trois ensemble vous donnent une dominance digitale complète.' },
  },
  {
    q: { ar: 'كم يستغرق الوصول للصفحة الأولى في Google؟', en: 'How long does it take to reach page one on Google?', fr: 'Combien de temps pour atteindre la première page sur Google ?' },
    a: { ar: 'في المجالات التنافسية المتوسطة في السوق المصري، نبدأ في رؤية نتائج ملموسة بين 60-90 يوماً، والتصدر الحقيقي يتحقق بين 4-6 أشهر بثبات واستدامة — على عكس الإعلانات التي تتوقف بمجرد انتهاء الميزانية.', en: 'In medium-competition fields in the Egyptian market, we start seeing tangible results between 60-90 days, and true dominance is achieved between 4-6 months with consistency and sustainability — unlike ads that stop the moment the budget ends.', fr: 'Dans les domaines à concurrence moyenne sur le marché égyptien, nous commençons à voir des résultats tangibles entre 60-90 jours, et la domination réelle s\'atteint entre 4-6 mois avec constance et durabilité — contrairement aux pubs qui s\'arrêtent dès la fin du budget.' },
  },
  {
    q: { ar: 'هل تعملون مع الشركات الصغيرة أم الكبيرة فقط؟', en: 'Do you work with small or large companies only?', fr: 'Travaillez-vous avec les petites ou grandes entreprises uniquement ?' },
    a: { ar: 'نعمل مع الطرفين، لكن تخصصنا الحقيقي هو الشركات الناشئة والمتوسطة التي تريد بناء نظام رقمي قوي من البداية، والشركات الكبيرة التي تريد تطوير حضورها الحالي والدخول لعصر الذكاء الاصطناعي.', en: 'We work with both, but our true specialization is startups and SMEs that want to build a strong digital system from the beginning, and large companies that want to develop their current presence and enter the AI era.', fr: 'Nous travaillons avec les deux, mais notre vraie spécialisation est les startups et PME qui veulent construire un système digital fort dès le début, et les grandes entreprises qui veulent développer leur présence actuelle et entrer dans l\'ère de l\'IA.' },
  },
  {
    q: { ar: 'هل يمكنني تطوير موقعي فقط بدون خدمات SEO؟', en: 'Can I develop my website only without SEO services?', fr: 'Puis-je développer mon site seulement sans services SEO ?' },
    a: { ar: 'نعم، لكننا لن ننصحك بذلك. موقع بدون SEO مدمج من البداية يشبه بناء متجر في شارع مغلق. ندمج الاثنين دائماً لأن التكلفة الإجمالية أقل والنتيجة أكثر استدامة.', en: 'Yes, but we wouldn\'t recommend it. A website without integrated SEO from the start is like building a shop on a closed street. We always integrate both because the total cost is lower and the result more sustainable.', fr: 'Oui, mais nous ne le recommanderions pas. Un site sans SEO intégré dès le début équivaut à construire une boutique dans une rue fermée. Nous intégrons toujours les deux car le coût total est moindre et le résultat plus durable.' },
  },
  {
    q: { ar: 'ما الأسواق التي تخدمونها؟', en: 'What markets do you serve?', fr: 'Quels marchés servez-vous ?' },
    a: { ar: 'مقرنا في القاهرة، مصر — ونخدم عملاء في السعودية والإمارات والكويت وقطر والبحرين وعُمان. خبرتنا في السوق المصري تمتد لأكثر من سنتين، وحضورنا الخليجي يتنامى بشكل مستمر.', en: 'We\'re headquartered in Cairo, Egypt — and serve clients in Saudi Arabia, UAE, Kuwait, Qatar, Bahrain, and Oman. Our expertise in the Egyptian market spans over 2 years, and our Gulf presence is growing steadily.', fr: 'Notre siège est au Caire, Égypte — et nous servons des clients en Arabie Saoudite, Émirats, Koweït, Qatar, Bahreïn et Oman. Notre expertise du marché égyptien s\'étend sur plus de 2 ans, et notre présence dans le Golfe grandit constamment.' },
  },
];

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const currentLocale = locales.includes(locale) ? locale : 'ar';

  const titles = {
    ar: 'الروابط | شركة تسويق رقمي بمصر والخليج - تطوير مواقع SEO GEO',
    en: 'AlRawaabit | Digital Marketing Agency in Egypt & Gulf - Web Development SEO GEO',
    fr: 'AlRawaabit | Agence Marketing Digital Égypte & Golfe - Développement Web SEO GEO',
  };

  const descriptions = {
    ar: 'أول شركة تسويق رقمي في مصر متخصصة في AEO و GEO. نبني البنية التحتية الرقمية للشركات الطموحة في مصر والخليج — تطوير مواقع، SEO، ظهور في إجابات الذكاء الاصطناعي. حول زوارك لشركاء نجاح.',
    en: 'First digital marketing agency in Egypt specialized in AEO & GEO. We build digital infrastructure for ambitious companies in Egypt and the Gulf — web development, SEO, AI answer visibility. Turn visitors into success partners.',
    fr: 'Première agence de marketing digital en Égypte spécialisée en AEO et GEO. Nous construisons l\'infrastructure digitale pour entreprises ambitieuses en Égypte et Golfe — développement web, SEO, visibilité dans réponses IA. Transformez visiteurs en partenaires de succès.',
  };

  return {
    title: titles[currentLocale],
    description: descriptions[currentLocale],
    openGraph: {
      title: titles[currentLocale],
      description: descriptions[currentLocale],
      type: 'website',
      images: [`/media/og-${currentLocale}.png`],
    },
  };
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const currentLocale = locales.includes(locale) ? locale : 'ar';
  const t = (obj: Record<string, string>) => obj[currentLocale];
  const dir = localeDirs[currentLocale];

  return (
    <div className="min-h-screen" dir={dir}>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-navy-950 text-white pt-16 lg:pt-20 pb-20 lg:pb-28">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/media/hero-banner.png"
            alt=""
            className="w-full h-full object-cover opacity-30"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-950/80 via-navy-950/70 to-navy-950" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-600/20 border border-orange-600/30 text-orange-300 text-sm font-medium mb-8 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            {t({ ar: 'أول شركة تسويق رقمي في مصر متخصصة في AEO و GEO', en: 'First Digital Marketing Agency in Egypt Specialized in AEO & GEO', fr: 'Première Agence Marketing Digital en Égypte Spécialisée en AEO & GEO' })}
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] mb-6 animate-slide-up">
            {t({ ar: 'موقعك لا يبيع؟', en: 'Your Website Doesn\'t Sell?', fr: 'Votre Site Ne Vend Pas ?' })}
          </h1>

          <p className="text-lg lg:text-xl text-navy-300 max-w-3xl mb-10 animate-slide-up" style={{ animationDelay: '100ms' }}>
            {t({ 
              ar: 'في الروابط، نبني <strong>البنية التحتية الرقمية</strong> للشركات الطموحة في <strong>مصر والخليج</strong> — من تطوير المواقع وتحسين محركات البحث (SEO)، إلى الظهور في إجابات الذكاء الاصطناعي (AEO/GEO)، <strong>لنحول زوارك إلى شركاء نجاح حقيقيين.</strong>',
              en: 'At AlRawaabit, we build <strong>digital infrastructure</strong> for ambitious companies in <strong>Egypt and the Gulf</strong> — from web development and SEO, to appearing in AI answers (AEO/GEO), <strong>to turn your visitors into true success partners.</strong>',
              fr: 'Chez AlRawaabit, nous construisons <strong>l\'infrastructure digitale</strong> pour entreprises ambitieuses en <strong>Égypte et Golfe</strong> — du développement web et SEO, à l\'apparition dans les réponses IA (AEO/GEO), <strong>pour transformer vos visiteurs en véritables partenaires de succès.</strong>'
            })}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-16 animate-slide-up" style={{ animationDelay: '200ms' }}>
            <Link href="/contact">
              <Button size="lg" className="w-full sm:w-auto px-8 py-4 text-lg" fullWidth={false}>
                {t({ ar: 'حلل موقعي مجاناً', en: 'Analyze My Site Free', fr: 'Analyser Mon Site Gratuitement' })}
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 py-4 text-lg border-white/30 text-white hover:bg-white/10" fullWidth={false}>
                {t({ ar: 'احجز مكالمة استراتيجية', en: 'Book Strategy Call', fr: 'Réserver Appel Stratégique' })}
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              { label: { ar: 'دول في المنطقة', en: 'Countries in Region', fr: 'Pays dans la Région' }, value: '6+' },
              { label: { ar: 'موقع تم تطويره', en: 'Projects Developed', fr: 'Projets Développés' }, value: '50+' },
              { label: { ar: 'سنوات خبرة فعلية', en: 'Years Real Experience', fr: 'Années Expérience Réelle' }, value: '3+' },
              { label: { ar: 'عميل موثوق', en: 'Trusted Clients', fr: 'Clients de Confiance' }, value: '30+' },
            ].map((stat, i) => (
              <div key={i} className="text-center p-4 lg:p-6 bg-white/5 rounded-2xl border border-white/10 animate-slide-up" style={{ animationDelay: `${300 + i * 100}ms` }}>
                <div className="text-3xl lg:text-4xl font-bold text-orange-400 mb-2">{stat.value}</div>
                <div className="text-navy-400 text-sm">{t(stat.label)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-600/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-navy-700/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
      </section>

      {/* Problems Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-navy-900 mb-4">
              {t({ ar: 'هل يعاني موقعك من هذه المشاكل؟', en: 'Does Your Website Suffer From These Problems?', fr: 'Votre Site Souffre-t-il de Ces Problèmes ?' })}
            </h2>
            <p className="text-navy-500 text-lg max-w-2xl mx-auto">
              {t({ 
                ar: '94% من مستخدمي الإنترنت لا يتجاوزون الصفحة الأولى. والآن، الذكاء الاصطناعي يصبح الوسيط الأول بين العميل وخدمتك — قبل Google نفسها.',
                en: '94% of internet users never go past page one. And now, AI is becoming the first intermediary between the customer and your service — before Google itself.',
                fr: '94% des internautes ne dépassent jamais la première page. Et maintenant, l\'IA devient le premier intermédiaire entre le client et votre service — avant Google lui-même.'
              })}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {problems.map((problem, i) => (
              <ScrollReveal key={i} variant="up" delay={i * 150}>
                <Card hover padding="lg" className="text-center h-full border-navy-200 group hover:-translate-y-2 transition-all duration-300">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <problem.icon className="w-8 h-8" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-semibold text-navy-900 mb-2">{t(problem.title)}</h3>
                  <p className="text-navy-500">{t(problem.desc)}</p>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services/Pillars Section */}
      <section className="py-20 lg:py-28 bg-navy-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-navy-900 mb-4">
              {t({ ar: 'نظام متكامل من 4 ركائز لهيمنة رقمية حقيقية', en: 'An Integrated System of 4 Pillars for True Digital Dominance', fr: 'Un Système Intégré de 4 Piliers pour une Vraie Dominance Digitale' })}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <ScrollReveal key={service.key} variant="up" delay={i * 120}>
                <Link href={t(service.href)} className="block">
                  <Card hover padding="lg" className="h-full transition-all duration-300 group border-navy-100 overflow-hidden hover:-translate-y-2 hover:shadow-xl">
                    <div className="aspect-video bg-navy-100 rounded-xl mb-4 overflow-hidden">
                      <img
                        src={`/media/service-${service.key === 'web-development' ? 'web-dev' : service.key === 'seo' ? 'seo' : service.key === 'aeo' ? 'aeo' : 'geo'}.png`}
                        alt={t(service.title)}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600 mb-4 group-hover:scale-110 transition-transform">
                    <service.icon className="w-7 h-7" aria-hidden="true" />
                  </div>
                  {service.badge && (
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-orange-100 text-orange-700 rounded-full mb-3">
                      {t(service.badge)}
                    </span>
                  )}
                  <h3 className="text-xl font-semibold text-navy-900 mb-3">{t(service.title)}</h3>
                  <p className="text-navy-500 text-sm leading-relaxed mb-4">{t(service.description)}</p>
                  <div className="flex items-center gap-1 text-orange-600 font-medium group-hover:gap-2 transition-all">
                        <span>{t({ ar: 'اعرف المزيد', en: 'Learn More', fr: 'En Savoir Plus' })}</span>
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </div>
                </Card>
              </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3lg:text-4xl font-bold text-navy-900 mb-4">
              {t({ ar: 'كيف نحول موقعك إلى آلة مبيعات في 3 مراحل', en: 'How We Turn Your Website Into a Sales Machine in 3 Stages', fr: 'Comment Nous Transformons Votre Site en Machine de Vente en 3 Étapes' })}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-10 left-1/2 -translate-x-1/2 w-px h-[calc(100%-5rem)] bg-gradient-to-b from-orange-300 to-transparent" aria-hidden="true" />

            {pillars.map((step, i) => (
              <div key={i} className="relative z-10 text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-navy-900 mb-3">{t(step.title)}</h3>
                <p className="text-navy-500 leading-relaxed">{t(step.desc)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 lg:py-28 bg-navy-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-navy-900 mb-4">
              {t({ ar: 'نصمم أنظمتنا لخدمة القطاعات التي تبحث عن الجودة', en: 'We Design Our Systems to Serve Sectors That Seek Quality', fr: 'Nous Concevons Nos Systèmes pour Servir les Secteurs Qui Recherchent la Qualité' })}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((industry, i) => (
              <Card key={i} hover padding="lg" className="h-full">
                <h3 className="text-lg font-semibold text-navy-900 mb-2">{t(industry.title)}</h3>
                <p className="text-navy-500 text-sm">{t(industry.desc)}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partners/Case Studies Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-navy-900 mb-4">
              {t({ ar: 'نفخر بكوننا الشريك التقني والاستراتيجي لنخبة من العلامات التجارية الطموحة', en: 'Proud to Be the Technical & Strategic Partner for Elite Ambitious Brands', fr: 'Fiers d\'Être le Partenaire Technique & Stratégique de Marques Ambitionnées d\'Élite' })}
            </h2>
            <p className="text-navy-500 text-lg">
              {t({ ar: 'شركاء نجاح وثقوا في رؤيتنا', en: 'Success Partners Who Trusted Our Vision', fr: 'Partenaires de Succès Qui Ont Cru en Notre Vision' })}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partners.map((partner, i) => (
              <Link key={i} href="/case-studies" className="block">
                <Card hover padding="lg" className="h-full border-navy-200">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {partner.tags.map((tag, ti) => (
                      <span key={ti} className="px-2 py-1 text-xs font-medium bg-navy-100 text-navy-700 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-lg font-semibold text-navy-900 mb-1">{t(partner.name)}</h3>
                  <p className="text-navy-500 text-sm mb-4">{t(partner.category)}</p>
                  <div className="flex items-center gap-1 text-orange-600 font-medium">
                    <span>{t({ ar: 'عرض الدراسة', en: 'View Case Study', fr: 'Voir l\'Étude' })}</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/case-studies">
              <Button variant="outline" size="lg">
                {t({ ar: 'عرض جميع دراسات الحالة', en: 'View All Case Studies', fr: 'Voir Toutes les Études de Cas' })}
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/media/pattern.svg')] bg-center bg-cover opacity-5" aria-hidden="true" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            {t({ ar: 'احجز مكالمة استراتيجية', en: 'Book a Strategy Call', fr: 'Réserver un Appel Stratégique' })}
          </h2>
          <p className="text-navy-300 text-lg max-w-2xl mx-auto mb-10">
            {t({ 
              ar: 'لا تترك مكانتك السوقية للصدفة. منافسوك بدأوا بالفعل في استخدام التقنيات الحديثة. هل أنت مستعد لسباقهم؟ دعنا نمنحك تحليلاً شاملاً لوضعك الرقمي الحالي مجاناً.',
              en: 'Don\'t leave your market position to chance. Your competitors have already started using modern technologies. Are you ready to race them? Let us give you a comprehensive analysis of your current digital state for free.',
              fr: 'Ne laissez pas votre position de marché au hasard. Vos concurrents ont déjà commencé à utiliser les technologies modernes. Êtes-vous prêt à les courir ? Laissez-nous vous donner une analyse complète de votre état digital actuel gratuitement.'
            })}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="xl" className="px-10 py-4">
                {t({ ar: 'احصل على تحليل GEO/SEO لموقعك الآن', en: 'Get GEO/SEO Analysis Now', fr: 'Obtenir l\'Analyse GEO/SEO Maintenant' })}
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </Button>
            </Link>
            <a href="https://api.whatsapp.com/send?phone=201111306090" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
              <Button variant="outline" size="xl" className="px-10 py-4 border-white/30 hover:bg-white/10">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.194 1.871.18.606-.017 1.699-.864 2.31-2.348.347-.854.502-1.82.488-2.059-.014-.239-.347-.474-.65-.52zM12 4.5C7 4.5 2.73 7.61 1 12.384v2.559c0 .486.528.875 1.175.778l5.588-2.236c.76-.305 1.243-.097 1.486.47l1.333 3.02c.156.354.523.524.876.372.354-.15.523-.524.372-.876l-1.333-3.02c-.243-.547-.023-1.03.497-1.24l5.678-2.143c.505-.19.818-.548.674-1.092-.237-.864-1.17-1.377-2.075-1.191l-4.878.887C19.666 12.356 20 12.928 20 13.5V20c0 1.105-.895 2-2 2H4c-1.105 0-2-.895-2-2V6c0-1.105.895-2 2-2h8.5c.572 0 1.144.377 1.354.902l1.43 3.575c.13.324.42.525.75.416.33-.11.52-.42.416-.75l-1.43-3.575c-.11-.283-.38-.49-.676-.427C13.857 4.5 12.943 4.5 12 4.5z"/></svg>
                {t({ ar: 'تواصل عبر WhatsApp', en: 'Chat on WhatsApp', fr: 'Discuter sur WhatsApp' })}
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 lg:py-28 bg-navy-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-navy-900 mb-4">
              {t({ ar: 'ما الفرق بين SEO و AEO و GEO؟', en: 'What\'s the Difference Between SEO, AEO, and GEO?', fr: 'Quelle est la Différence entre SEO, AEO et GEO ?' })}
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="group bg-white rounded-xl border border-navy-200 overflow-hidden">
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                  <h3 className="font-semibold text-navy-900 pr-4 text-right">{t(faq.q)}</h3>
                  <ArrowRight className="w-5 h-5 text-orange-600 flex-shrink-0 transition-transform duration-200 group-open:rotate-90" aria-hidden="true" />
                </summary>
                <div className="px-5 pb-5 text-navy-600 leading-relaxed border-t border-navy-100 animate-slide-down">
                  {t(faq.a)}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 lg:py-28 bg-white border-t border-navy-200">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-navy-900 mb-4">
            {t({ ar: 'لا تترك مكانتك السوقية للصدفة.', en: 'Don\'t Leave Your Market Position to Chance.', fr: 'Ne Laissez Pas Votre Position de Marché au Hasard.' })}
          </h2>
          <p className="text-navy-500 text-lg max-w-2xl mx-auto mb-8">
            {t({ 
              ar: 'منافسوك بدأوا بالفعل في استخدام التقنيات الحديثة. هل أنت مستعد لسباقهم؟ دعنا نمنحك تحليلاً شاملاً لوضعك الرقمي الحالي مجاناً.',
              en: 'Your competitors have already started using modern technologies. Are you ready to race them? Let us give you a comprehensive analysis of your current digital state for free.',
              fr: 'Vos concurrents ont déjà commencé à utiliser les technologies modernes. Êtes-vous prêt à les courir ? Laissez-nous vous donner une analyse complète de votre état digital actuel gratuitement.'
            })}
          </p>
          <Link href="/contact">
            <Button size="xl" className="px-10 py-4">
              {t({ ar: 'احصل على تحليل GEO/SEO لموقعك الآن', en: 'Get GEO/SEO Analysis Now', fr: 'Obtenir l\'Analyse GEO/SEO Maintenant' })}
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}