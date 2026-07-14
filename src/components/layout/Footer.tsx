'use client';

import Link from 'next/link';
import { Globe, Mail, Phone, MapPin, MessageSquare, ArrowRight, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { type Locale, localeDirs, localeNames, localeFlags } from '@/lib/i18n';

interface FooterProps {
  locale: Locale;
}

const footerLinks = {
  services: [
    { href: '/services/web-development', label: { ar: 'تطوير المواقع', en: 'Web Development', fr: 'Développement Web' } },
    { href: '/services/seo', label: { ar: 'تحسين محركات البحث – SEO', en: 'SEO Services', fr: 'Services SEO' } },
    { href: '/services/aeo', label: { ar: 'تحسين الظهور في محركات الإجابة الذكية – AEO', en: 'AEO Services', fr: 'Services AEO' } },
    { href: '/services/geo', label: { ar: 'تحسين الظهور في الذكاء الإصطناعي – GEO', en: 'GEO Services', fr: 'Services GEO' } },
  ],
  company: [
    { href: '/about', label: { ar: 'من نحن', en: 'About Us', fr: 'À Propos' } },
    { href: '/case-studies', label: { ar: 'معرض الأعمال', en: 'Case Studies', fr: 'Réalisations' } },
    { href: '/blog', label: { ar: 'المدونة', en: 'Blog', fr: 'Blog' } },
    { href: '/contact', label: { ar: 'إتصل بنا', en: 'Contact Us', fr: 'Contact' } },
  ],
  legal: [
    { href: '/legal/privacy', label: { ar: 'سياسة الخصوصية', en: 'Privacy Policy', fr: 'Politique de Confidentialité' } },
    { href: '/legal/terms', label: { ar: 'شروط الخدمة', en: 'Terms of Service', fr: 'Conditions d\'Utilisation' } },
  ],
};

const socialLinks = [
  { href: 'https://www.facebook.com/RawaabitDigitalMarketing', label: 'Facebook' },
  { href: 'https://www.instagram.com/rawaabitdigitalmarketing/', label: 'Instagram' },
  { href: 'https://www.linkedin.com/company/rawaabit-digital-marketing/', label: 'LinkedIn' },
];

export function Footer({ locale }: FooterProps) {
  const dir = localeDirs[locale];
  const t = (obj: Record<string, string>) => obj[locale];

  return (
    <footer className="bg-navy-950 text-white" dir={dir}>
      <div className="container mx-auto px-4 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href={`/${locale}`} className="flex items-center gap-2 mb-6" aria-label={t({ ar: 'الروابط - الرئيسية', en: 'AlRawaabit - Home', fr: 'AlRawaabit - Accueil' })}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-400 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                </svg>
              </div>
              <span className="font-bold text-xl text-white">AlRawaabit</span>
            </Link>

            <p className="text-navy-300 text-base leading-relaxed mb-6 max-w-xs">
              {t({ 
                ar: 'اسمنا يعني "الروابط"، وهذا بالضبط ما نصنعه: روابط قوية بين العلامات التجارية وجمهورها، بين الأفكار والتنفيذ، وبين الاستراتيجية والنتائج.',
                en: 'Our name means "connections", and that\'s exactly what we make: strong connections between brands and their audience, between ideas and execution, between strategy and results.',
                fr: 'Notre nom signifie "connexions", et c\'est exactement ce que nous faisons : de fortes connexions entre les marques et leur public, entre les idées et l\'exécution, entre la stratégie et les résultats.'
              })}
            </p>

            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-navy-800 flex items-center justify-center text-navy-300 hover:bg-orange-600 hover:text-white transition-colors"
                  aria-label={social.label}
                >
                  <ExternalLink className="w-5 h-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t({ ar: 'خدماتنا', en: 'Our Services', fr: 'Nos Services' })}</h3>
            <nav aria-label="Services">
              <ul className="space-y-3">
                {footerLinks.services.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={`/${locale}${link.href}`}
                      className="text-navy-300 hover:text-orange-400 transition-colors flex items-center gap-2"
                    >
                      <ArrowRight className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                      {t(link.label)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t({ ar: 'الشركة', en: 'Company', fr: 'Entreprise' })}</h3>
            <nav aria-label="Company">
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={`/${locale}${link.href}`}
                      className="text-navy-300 hover:text-orange-400 transition-colors flex items-center gap-2"
                    >
                      <ArrowRight className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                      {t(link.label)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t({ ar: 'Contacts', en: 'Contacts', fr: 'Contacts' })}</h3>
            <address className="not-italic space-y-4 text-navy-300">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 flex-shrink-0 mt-0.5 text-orange-400" aria-hidden="true" />
                <div>
                  <a href="tel:+201111306090" className="hover:text-orange-400 transition-colors">+2 0111 1 306090</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 flex-shrink-0 mt-0.5 text-orange-400" aria-hidden="true" />
                <div>
                  <a href="mailto:info@alrawaabit.com" className="hover:text-orange-400 transition-colors">info@alrawaabit.com</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5 text-orange-400" aria-hidden="true" />
                <div>
                  <p>17 ش عبد الجليل - ميدان ابن سندر</p>
                  <p>الزيتون - القاهرة - مصر</p>
                </div>
              </div>
            </address>

            <div className="mt-6 pt-6 border-t border-navy-800">
              <a
                href="https://api.whatsapp.com/send?phone=201111306090"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors"
              >
                <MessageSquare className="w-5 h-5" aria-hidden="true" />
                <span>{t({ ar: 'WhatsApp', en: 'WhatsApp', fr: 'WhatsApp' })}</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-navy-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-navy-400 text-sm">
              {t({ 
                ar: '© 2026 كل الحقوق محفوظة الروابط',
                en: '© 2026 All Rights Reserved AlRawaabit',
                fr: '© 2026 Tous Droits Réservés AlRawaabit'
              })}
            </p>
            <div className="flex items-center gap-4">
              <select
                className="bg-navy-800 border border-navy-700 rounded-lg px-3 py-2 text-white text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500"
                aria-label="Language"
              >
                {['ar', 'en', 'fr'].map((l) => (
                  <option key={l} value={l} selected={l === locale}>
                    {localeFlags[l as Locale]} {localeNames[l as Locale]}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}