import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { breadcrumbJsonLd } from '@/lib/jsonld';
import { locales, localeDirs, type Locale } from '@/lib/i18n';

interface LegalPageProps {
  params: Promise<{ locale: Locale; page: string }>;
}

const privacyContent = {
  ar: {
    title: 'سياسة الخصوصية',
    lastUpdated: 'آخر تحديث: يناير 2026',
    sections: [
      { title: '1. البيانات التي نجمعها', content: 'نجمع المعلومات التي تقدمها طواعية عبر نماذج التواصل: الاسم، البريد الإلكتروني، الهاتف، الشركة، وتفاصيل المشروع. نجمع أيضاً بيانات تحليلية مجهولة (الصفحات المزارة، الوقت، الجهاز) عبر Vercel Analytics.' },
      { title: '2. كيف نستخدم بياناتك', content: 'بيانات التواصل تستخدم للرد على الاستفسارات، إرسال عروض الأسعار، والتواصل بشأن المشاريع. البيانات التحليلية تُستخدم فقط لتحسين أداء الموقع وتجربة المستخدم.' },
      { title: '3. مشاركة البيانات', content: 'نحن لا نبيع أو نُؤجر بياناتك أبداً. قد نشارك البيانات مع معالجين متعاقدين (مثل: Vercel، Resend) بموجب اتفاقيات معالجة بيانات (DPA) متوافقة مع GDPR وقانون مصر 151 لسنة 2020.' },
      { title: '4. حقوقك', content: 'يحق لك الوصول لبياناتك، تصحيحها، حذفها، تقييد معالجتها، الاعتراض عليها، ونقلها. للتواصل: privacy@alrawaabit.com' },
      { title: '5. الاحتفاظ بالبيانات', content: 'بيانات التواصل تُحتفظ لمدة 3 سنوات من آخر تواصل. البيانات التحليلية مجهولة المصدر تُحتفظ لمدة 13 شهراً.' },
      { title: '6. ملفات تعريف الارتباط', content: 'نستخدم ملفات تعريف ارتباط ضرورية فقط (لا تتبع إعلاني). Vercel Analytics لا يضع ملفات تعريف ارتباط.' },
      { title: '7. نقل البيانات دولياً', content: 'قد تُعالج البيانات على خوادم Vercel (الولايات المتحدة/أوروبا) و Resend (الولايات المتحدة) مع الضمانات التعاقدية المناسبة.' },
    ],
  },
  en: {
    title: 'Privacy Policy',
    lastUpdated: 'Last updated: January 2026',
    sections: [
      { title: '1. Data We Collect', content: 'We collect information you voluntarily provide via contact forms: name, email, phone, company, and project details. We also collect anonymous analytical data (pages visited, time, device) via Vercel Analytics.' },
      { title: '2. How We Use Your Data', content: 'Contact data is used to respond to inquiries, send quotes, and communicate about projects. Analytical data is used solely to improve site performance and user experience.' },
      { title: '3. Data Sharing', content: 'We never sell or rent your data. We may share data with contracted processors (e.g., Vercel, Resend) under Data Processing Agreements (DPA) compliant with GDPR and Egypt Law 151/2020.' },
      { title: '4. Your Rights', content: 'You have the right to access, rectify, erase, restrict, object to, and port your data. Contact: privacy@alrawaabit.com' },
      { title: '5. Data Retention', content: 'Contact data retained for 3 years from last contact. Anonymous analytics retained for 13 months.' },
      { title: '6. Cookies', content: 'We use essential cookies only (no advertising tracking). Vercel Analytics sets no cookies.' },
      { title: '7. International Transfers', content: 'Data may be processed on Vercel servers (US/EU) and Resend (US) with appropriate contractual safeguards.' },
    ],
  },
  fr: {
    title: 'Politique de Confidentialité',
    lastUpdated: 'Dernière mise à jour : Janvier 2026',
    sections: [
      { title: '1. Données Collectées', content: 'Nous collectons les informations que vous fournissez volontairement via les formulaires de contact : nom, email, téléphone, entreprise, et détails du projet. Nous collectons aussi des données analytiques anonymes (pages visitées, temps, appareil) via Vercel Analytics.' },
      { title: '2. Utilisation de Vos Données', content: 'Les données de contact servent à répondre aux demandes, envoyer des devis, et communiquer sur les projets. Les données analytiques servent uniquement à améliorer la performance du site et l\'expérience utilisateur.' },
      { title: '3. Partage des Données', content: 'Nous ne vendons ni ne louons jamais vos données. Nous pouvons partager avec des sous-traitants contractuels (ex: Vercel, Resend) sous Accords de Traitement de Données (DPA) conformes au RGPD et Loi Égypte 151/2020.' },
      { title: '4. Vos Droits', content: 'Vous avez droit d\'accès, rectification, effacement, limitation, opposition, et portabilité. Contact : privacy@alrawaabit.com' },
      { title: '5. Conservation', content: 'Données contact conservées 3 ans après dernier contact. Analytiques anonymes 13 mois.' },
      { title: '6. Cookies', content: 'Cookies essentiels uniquement (pas de suivi publicitaire). Vercel Analytics ne pose pas de cookies.' },
      { title: '7. Transferts Internationaux', content: 'Données peuvent être traitées sur serveurs Vercel (US/UE) et Resend (US) avec garanties contractuelles appropriées.' },
    ],
  },
};

const termsContent = {
  ar: {
    title: 'شروط الخدمة',
    lastUpdated: 'آخر تحديث: يناير 2026',
    sections: [
      { title: '1. القبول', content: 'باستخدام هذا الموقع أو خدمات الروابط، أنت توافق على هذه الشروط. إذا كنت لا توافق، يرجى عدم استخدام الموقع.' },
      { title: '2. الخدمات', content: 'نقدم تطوير الويب، SEO، AEO، و GEO. نطاق كل مشروع، الجدول الزمني، والتسليمات تُحدد في عرض سعر مكتوب وموقع من الطرفين.' },
      { title: '3. الملكية الفكرية', content: 'الكود المخصص، التصاميم، والمحتوى المنتج لمشروعك يصبح ملكك عند السداد الكامل. نحن نحتفظ بالحقوق في أدواتنا الداخلية، مكتبات المكونات، والمنهجيات.' },
      { title: '4. السرية', content: 'نلتزم بسرية معلوماتك التجارية، بيانات العملاء، والاستراتيجيات. نوقع اتفاقية عدم إفشاء (NDA) عند الطلب.' },
      { title: '5. حدود المسؤولية', content: 'مسؤوليتنا الإجمالية لا تتجاوز قيمة العقد. غير مسؤولين عن أضرار غير مباشرة، خسارة أرباح، أو انقطاع أعمال ناجم عن خدماتنا.' },
      { title: '6. الإنهاء', content: 'يحق لأي طرف الإنهاء بإخطار كتابي 30 يوم. العمل المنجز حتى تاريخ الإنهاء مستحق الدفع.' },
      { title: '7. القانون الحاكم', content: 'تخضع هذه الشروط لقوانين جمهورية مصر العربية. المحاكم المصرية هي جهة الاختصاص الحصرية.' },
    ],
  },
  en: {
    title: 'Terms of Service',
    lastUpdated: 'Last updated: January 2026',
    sections: [
      { title: '1. Acceptance', content: 'By using this website or AlRawaabit\'s services, you agree to these terms. If you disagree, please do not use the site.' },
      { title: '2. Services', content: 'We provide web development, SEO, AEO, and GEO services. Scope, timeline, and deliverables for each project are defined in a written, signed proposal.' },
      { title: '3. Intellectual Property', content: 'Custom code, designs, and content produced for your project become yours upon full payment. We retain rights to our internal tools, component libraries, and methodologies.' },
      { title: '4. Confidentiality', content: 'We commit to the confidentiality of your business information, client data, and strategies. NDA available upon request.' },
      { title: '5. Limitation of Liability', content: 'Our total liability shall not exceed the contract value. We are not liable for indirect damages, lost profits, or business interruption arising from our services.' },
      { title: '6. Termination', content: 'Either party may terminate with 30 days written notice. Work completed to termination date remains due for payment.' },
      { title: '7. Governing Law', content: 'These terms are governed by the laws of the Arab Republic of Egypt. Egyptian courts have exclusive jurisdiction.' },
    ],
  },
  fr: {
    title: 'Conditions de Service',
    lastUpdated: 'Dernière mise à jour : Janvier 2026',
    sections: [
      { title: '1. Acceptation', content: 'En utilisant ce site ou les services AlRawaabit, vous acceptez ces conditions. Si vous n\'êtes pas d\'accord, merci de ne pas utiliser le site.' },
      { title: '2. Services', content: 'Nous fournissons développement web, SEO, AEO, et GEO. Périmètre, délais, et livrables de chaque projet sont définis dans une proposition écrite signée.' },
      { title: '3. Propriété Intellectuelle', content: 'Code personnalisé, designs, et contenu produit pour votre projet deviennent vôtres après paiement complet. Nous gardons droits sur nos outils internes, bibliothèques composants, et méthodologies.' },
      { title: '4. Confidentialité', content: 'Nous nous engageons sur la confidentialité de vos informations business, données clients, et stratégies. NDA disponible sur demande.' },
      { title: '5. Limitation de Responsabilité', content: 'Notre responsabilité totale ne dépasse pas la valeur du contrat. Non responsables des dommages indirects, pertes profits, ou interruption d\'activité découlant de nos services.' },
      { title: '6. Résiliation', content: 'Chaque partie peut résilier avec préavis écrit 30 jours. Travail accompli à la date de résiliation reste dû.' },
      { title: '7. Loi Applicable', content: 'Ces conditions sont régies par les lois de la République Arabe d\'Égypte. Tribunaux égyptiens ont compétence exclusive.' },
    ],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale; page: string }> }): Promise<Metadata> {
  const { locale, page } = await params;
  const currentLocale = locales.includes(locale) ? locale : 'ar';
  const isPrivacy = page === 'privacy';
  
  const titles = {
    ar: isPrivacy ? 'سياسة الخصوصية | الروابط' : 'شروط الخدمة | الروابط',
    en: isPrivacy ? 'Privacy Policy | AlRawaabit' : 'Terms of Service | AlRawaabit',
    fr: isPrivacy ? 'Politique de Confidentialité | AlRawaabit' : 'Conditions de Service | AlRawaabit',
  };

  const descriptions = {
    ar: isPrivacy ? 'سياسة خصوصية الروابط: كيف نجمع ونستخدم ونحمي بياناتك الشخصية وفق GDPR وقانون مصر 151/2020.' : 'شروط خدمة الروابط: الاتفاقية القانونية لاستخدام خدمات تطوير الويب، SEO، AEO، و GEO.',
    en: isPrivacy ? 'AlRawaabit Privacy Policy: How we collect, use, and protect your personal data per GDPR and Egypt Law 151/2020.' : 'AlRawaabit Terms of Service: Legal agreement for using web development, SEO, AEO, and GEO services.',
    fr: isPrivacy ? 'Politique de Confidentialité AlRawaabit: Comment nous collectons, utilisons et protégeons vos données selon RGPD et Loi Égypte 151/2020.' : 'Conditions de Service AlRawaabit: Accord légal pour utiliser développement web, SEO, AEO, et GEO.',
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

export async function generateStaticParams() {
  const params = [];
  for (const locale of locales) {
    params.push({ locale, page: 'privacy' });
    params.push({ locale, page: 'terms' });
  }
  return params;
}

export default async function LegalPage({ params }: LegalPageProps) {
  const { locale, page } = await params;
  const currentLocale = locales.includes(locale) ? locale : 'ar';
  const dir = localeDirs[currentLocale];
  const isPrivacy = page === 'privacy';
  const content = isPrivacy ? privacyContent[currentLocale] : termsContent[currentLocale];
  const t = (obj: Record<string, string>) => obj[currentLocale];

  const breadcrumbs = [
    { name: t({ ar: 'الرئيسية', en: 'Home', fr: 'Accueil' }), url: `/${currentLocale}` },
    { name: t({ ar: 'القانونية', en: 'Legal', fr: 'Légal' }), url: `/${currentLocale}/legal` },
    { name: content.title, url: `/${currentLocale}/legal/${page}` },
  ];

  const jsonLd = [breadcrumbJsonLd(breadcrumbs, currentLocale)];

  return (
    <div className="min-h-screen bg-white" dir={dir}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="bg-navy-50 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-navy-500" role="list">
              <li><Link href={`/${currentLocale}`} className="hover:text-orange-600 transition-colors">{t({ ar: 'الرئيسية', en: 'Home', fr: 'Accueil' })}</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href={`/${currentLocale}/legal`} className="hover:text-orange-600 transition-colors">{t({ ar: 'القانونية', en: 'Legal', fr: 'Légal' })}</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-navy-900 font-medium">{content.title}</li>
            </ol>
          </nav>

          <div className="max-w-4xl mx-auto">
            <header className="mb-12">
              <h1 className="text-3xl lg:text-4xl font-bold text-navy-900 mb-4">{content.title}</h1>
              <p className="text-navy-500">{content.lastUpdated}</p>
            </header>

            <div className="space-y-8 prose prose-navy max-w-none">
              {content.sections.map((section, i) => (
                <Card key={i} className="border-navy-100">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-navy-900">{section.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-navy-600 leading-relaxed whitespace-pre-wrap">{section.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link href={`/${currentLocale}`}>
                <Button variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
                  {t({ ar: 'العودة للرئيسية', en: 'Back to Home', fr: 'Retour à l\'Accueil' })}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}