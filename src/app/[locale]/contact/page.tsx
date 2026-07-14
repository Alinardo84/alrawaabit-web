import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Input';
import { Select } from '@/components/ui/Input';
import { locales, localeDirs, type Locale } from '@/lib/i18n';
import { breadcrumbJsonLd, organizationJsonLd } from '@/lib/jsonld';

interface ContactPageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const currentLocale = locales.includes(locale) ? locale : 'ar';

  const titles = {
    ar: 'إتصل بنا | الروابط — مستعد لبناء أصولك الرقمية القادمة',
    en: 'Contact Us | AlRawaabit — Ready to Build Your Next Digital Asset',
    fr: 'Contactez-Nous | AlRawaabit — Prêts à Construire Votre Prochain Actif Digital',
  };

  const descriptions = {
    ar: 'تواصل مع فريق الروابط لبناء موقعك القادم، تحسين SEO، AEO، أو GEO. مقرنا القاهرة، نخدم مصر والخليج.',
    en: 'Contact AlRawaabit team to build your next website, improve SEO, AEO, or GEO. Based in Cairo, serving Egypt and the Gulf.',
    fr: 'Contactez l\'équipe AlRawaabit pour construire votre prochain site, améliorer SEO, AEO ou GEO. Basés au Caire, servant Égypte et Golfe.',
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
  return locales.map((locale) => ({ locale }));
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  const currentLocale = locales.includes(locale) ? locale : 'ar';
  const dir = localeDirs[currentLocale];
  const t = (obj: Record<string, string>) => obj[currentLocale];

  const breadcrumbs = [
    { name: t({ ar: 'الرئيسية', en: 'Home', fr: 'Accueil' }), url: `/${currentLocale}` },
    { name: t({ ar: 'إتصل بنا', en: 'Contact Us', fr: 'Contact' }), url: `/${currentLocale}/contact` },
  ];

  const jsonLd = [
    breadcrumbJsonLd(breadcrumbs, currentLocale),
    organizationJsonLd(currentLocale),
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
              <li><a href={`/${currentLocale}`} className="hover:text-orange-400 transition-colors">{t({ ar: 'الرئيسية', en: 'Home', fr: 'Accueil' })}</a></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-white font-medium">{t({ ar: 'إتصل بنا', en: 'Contact Us', fr: 'Contact' })}</li>
            </ol>
          </nav>

          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-600/20 border border-orange-600/30 text-orange-300 text-sm font-medium mb-6">
              {t({ ar: 'مستعد لبناء أصولك الرقمية القادمة', en: 'Ready to Build Your Next Digital Asset', fr: 'Prêt à Construire Votre Prochain Actif Digital' })}
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold leading-[1.1] mb-6">
              {t({ ar: 'إتصل بنا', en: 'Contact Us', fr: 'Contactez-Nous' })}
            </h1>
            <p className="text-lg lg:text-xl text-navy-300 max-w-3xl mx-auto leading-relaxed">
              {t({ 
                ar: 'فريقنا مستعد لمساعدتك في بناء البنية التحتية الرقمية لشركتك. سواء كنت بحاجة لتطوير موقع، تحسين محركات البحث، أو الظهور في إجابات الذكاء الاصطناعي — نحن هنا لنحول رؤيتك إلى واقع.',
                en: 'Our team is ready to help you build your company\'s digital infrastructure. Whether you need website development, search engine optimization, or AI answer visibility — we\'re here to turn your vision into reality.',
                fr: 'Notre équipe est prête à vous aider à construire l\'infrastructure digitale de votre entreprise. Que vous ayez besoin de développement web, d\'optimisation pour les moteurs de recherche, ou de visibilité dans les réponses IA — nous sommes là pour transformer votre vision en réalité.'
              })}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 lg:py-28 bg-navy-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <Card padding="lg" className="h-full border-navy-100 sticky top-24">
                <CardHeader>
                  <CardTitle className="text-2xl">{t({ ar: 'معلومات التواصل', en: 'Contact Information', fr: 'Informations de Contact' })}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-orange-600" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-semibold text-navy-900">{t({ ar: 'الهاتف', en: 'Phone', fr: 'Téléphone' })}</p>
                      <a href="tel:+201111306090" className="text-orange-600 hover:underline mt-1 block">+2 0111 1 306090</a>
                      <p className="text-navy-500 text-sm mt-2">WhatsApp متاح / WhatsApp Available</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-orange-600" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-semibold text-navy-900">{t({ ar: 'البريد الإلكتروني', en: 'Email', fr: 'Email' })}</p>
                      <a href="mailto:info@alrawaabit.com" className="text-orange-600 hover:underline mt-1 block">info@alrawaabit.com</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-orange-600" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-semibold text-navy-900">{t({ ar: 'العنوان', en: 'Address', fr: 'Adresse' })}</p>
                      <address className="not-italic text-navy-600 mt-1 leading-relaxed">
                        {t({ 
                          ar: '17 ش عبد الجليل - ميدان ابن سندر، الزيتون - القاهرة - مصر',
                          en: '17 Abdel Jalil St - Ibn Sander Square, Al-Zaytoun - Cairo - Egypt',
                          fr: '17 Rue Abdel Jalil - Place Ibn Sander, Al-Zaytoun - Le Caire - Égypte'
                        })}
                      </address>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 pt-4 border-t border-navy-100">
                    <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-orange-600" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-semibold text-navy-900">{t({ ar: 'ساعات العمل', en: 'Business Hours', fr: 'Heures d\'Ouverture' })}</p>
                      <p className="text-navy-600 mt-1">{t({ ar: 'الأحد - الخميس: 9 ص - 5 م', en: 'Sun - Thu: 9 AM - 5 PM', fr: 'Dim - Jeu : 9h - 17h' })}</p>
                    </div>
                  </div>

                  <a
                    href="https://api.whatsapp.com/send?phone=201111306090"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-green-600 text-white px-4 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors"
                  >
                    <Send className="w-5 h-5" aria-hidden="true" />
                    <span>{t({ ar: 'تواصل عبر WhatsApp', en: 'Chat on WhatsApp', fr: 'Discuter sur WhatsApp' })}</span>
                  </a>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card padding="lg" className="border-navy-100">
                <CardHeader>
                  <CardTitle className="text-2xl">{t({ ar: 'أرسل لنا رسالة', en: 'Send Us a Message', fr: 'Envoyez-Nous un Message' })}</CardTitle>
                  <p className="text-navy-500 mt-2">{t({ ar: 'املأ النموذج وسنرد عليك خلال 24 ساعة', en: 'Fill out the form and we\'ll get back to you within 24 hours', fr: 'Remplissez le formulaire et nous vous répondrons sous 24h' })}</p>
                </CardHeader>
                <CardContent>
                  <form id="contact-form" className="space-y-6" action="/api/contact" method="POST">
                    <div className="grid md:grid-cols-2 gap-6">
                      <Input
                        label={t({ ar: 'الاسم الكامل', en: 'Full Name', fr: 'Nom Complet' })}
                        name="name"
                        type="text"
                        placeholder={t({ ar: 'محمد أحمد', en: 'Mohamed Ahmed', fr: 'Mohamed Ahmed' })}
                        required
                      />
                      <Input
                        label={t({ ar: 'البريد الإلكتروني', en: 'Email Address', fr: 'Adresse Email' })}
                        name="email"
                        type="email"
                        placeholder={t({ ar: 'mohamed@example.com', en: 'mohamed@example.com', fr: 'mohamed@example.com' })}
                        required
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <Input
                        label={t({ ar: 'رقم الهاتف', en: 'Phone Number', fr: 'Numéro de Téléphone' })}
                        name="phone"
                        type="tel"
                        placeholder={t({ ar: '+20 10 1234 5678', en: '+20 10 1234 5678', fr: '+20 10 1234 5678' })}
                      />
                      <Input
                        label={t({ ar: 'اسم الشركة (اختياري)', en: 'Company Name (Optional)', fr: 'Nom de l\'Entreprise (Optionnel)' })}
                        name="company"
                        type="text"
                        placeholder={t({ ar: 'شركة المثال', en: 'Example Company', fr: 'Exemple Entreprise' })}
                      />
                    </div>

                    <Select
                      label={t({ ar: 'الخدمة المطلوبة', en: 'Service Needed', fr: 'Service Souhaité' })}
                      name="service"
                      required
                      options={[
                        { value: '', label: t({ ar: 'اختر خدمة', en: 'Select a Service', fr: 'Choisir un Service' }) },
                        { value: 'web', label: t({ ar: 'تطوير المواقع', en: 'Web Development', fr: 'Développement Web' }) },
                        { value: 'seo', label: t({ ar: 'SEO', en: 'SEO', fr: 'SEO' }) },
                        { value: 'aeo', label: t({ ar: 'AEO', en: 'AEO', fr: 'AEO' }) },
                        { value: 'geo', label: t({ ar: 'GEO', en: 'GEO', fr: 'GEO' }) },
                        { value: 'other', label: t({ ar: 'أخرى', en: 'Other', fr: 'Autre' }) },
                      ]}
                    />

                    <Textarea
                      label={t({ ar: 'تفاصيل مشروعك', en: 'Project Details', fr: 'Détails du Projet' })}
                      name="message"
                      placeholder={t({ ar: 'أخبرنا عن مشروعك، أهدافك، والميزانية التقريبية...', en: 'Tell us about your project, goals, and approximate budget...', fr: 'Parlez-nous de votre projet, objectifs et budget approximatif...' })}
                      rows={6}
                      required
                    />

                    <Button type="submit" size="xl" className="w-full" fullWidth>
                      <Send className="w-5 h-5" aria-hidden="true" />
                      {t({ ar: 'إرسال الرسالة', en: 'Send Message', fr: 'Envoyer le Message' })}
                    </Button>

                    <p className="text-center text-sm text-navy-500">
                      {t({ ar: 'بإرسال هذا النموذج، أنت توافق على سياسة الخصوصية الخاصة بنا.', en: 'By submitting this form, you agree to our Privacy Policy.', fr: 'En soumettant ce formulaire, vous acceptez notre Politique de Confidentialité.' })}
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 text-white relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            {t({ ar: 'تفضل المكالمة المباشرة؟', en: 'Prefer a Direct Call?', fr: 'Préférez-vous un Appel Direct ?' })}
          </h2>
          <p className="text-navy-300 text-lg max-w-2xl mx-auto mb-10">
            {t({ 
              ar: 'احجز مكالمة استراتيجية مجانية مدتها 30 دقيقة مع أحد خبرائنا. بدون التزامات، فقط نصائح عملية.',
              en: 'Book a free 30-minute strategy call with one of our experts. No commitments, just actionable advice.',
              fr: 'Réservez un appel stratégique gratuit de 30 minutes avec l\'un de nos experts. Sans engagement, juste des conseils pratiques.'
            })}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${currentLocale}/contact`}>
              <Button size="xl" className="px-10 py-4">
                {t({ ar: 'احجز مكالمة الآن', en: 'Book a Call Now', fr: 'Réserver un Appel Maintenant' })}
                <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
              </Button>
            </Link>
            <a
              href="https://api.whatsapp.com/send?phone=201111306090"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="xl" className="px-10 py-4 border-white/30 hover:bg-white/10">
                <Send className="w-5 h-5 mr-2" aria-hidden="true" />
                {t({ ar: 'WhatsApp', en: 'WhatsApp', fr: 'WhatsApp' })}
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}