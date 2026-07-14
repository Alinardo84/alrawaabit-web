import { Metadata } from 'next';
import Link from 'next/link';
import { Home, Search, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { locales, localeDirs, type Locale } from '@/lib/i18n';

interface NotFoundPageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const currentLocale = locales.includes(locale) ? locale : 'ar';

  const titles = {
    ar: 'الصفحة غير موجودة | الروابط',
    en: 'Page Not Found | AlRawaabit',
    fr: 'Page Introuvable | AlRawaabit',
  };

  return {
    title: titles[currentLocale],
    robots: {
      index: false,
      follow: false,
    },
  } as Metadata;
}

export default async function NotFoundPage({ params }: NotFoundPageProps) {
  const { locale } = await params;
  const currentLocale = locales.includes(locale) ? locale : 'ar';
  const dir = localeDirs[currentLocale];
  const t = (obj: Record<string, string>) => obj[currentLocale];

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4" dir={dir}>
      <div className="text-center max-w-md">
        <div className="w-24 h-24 mx-auto mb-8 rounded-2xl bg-orange-100 flex items-center justify-center">
          <Search className="w-12 h-12 text-orange-600" aria-hidden="true" />
        </div>
        
        <h1 className="text-4xl font-bold text-navy-900 mb-4">
          {t({ ar: '404', en: '404', fr: '404' })}
        </h1>
        
        <h2 className="text-2xl font-semibold text-navy-700 mb-4">
          {t({ ar: 'الصفحة غير موجودة', en: 'Page Not Found', fr: 'Page Introuvable' })}
        </h2>
        
        <p className="text-navy-500 mb-8 leading-relaxed">
          {t({ 
            ar: 'عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.',
            en: 'Sorry, the page you\'re looking for doesn\'t exist or has been moved.',
            fr: 'Désolé, la page que vous cherchez n\'existe pas ou a été déplacée.'
          })}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={`/${currentLocale}`}>
            <Button size="lg" className="w-full sm:w-auto">
              <Home className="w-5 h-5 mr-2" aria-hidden="true" />
              {t({ ar: 'العودة للرئيسية', en: 'Back to Home', fr: 'Retour à l\'Accueil' })}
            </Button>
          </Link>
          <Link href={`/${currentLocale}/contact`}>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              {t({ ar: 'تواصل معنا', en: 'Contact Us', fr: 'Nous Contacter' })}
            </Button>
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-navy-100">
          <p className="text-navy-400 text-sm">
            {t({ 
              ar: 'هل تعتقد أن هذا خطأ؟ ',
              en: 'Think this is a mistake? ',
              fr: 'Pensez-vous qu\'il s\'agit d\'une erreur ? '
            })}
            <a href={`mailto:info@alrawaabit.com`} className="text-orange-600 hover:underline">
              {t({ ar: 'أبلغنا', en: 'Let us know', fr: 'Dites-le-nous' })}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}