'use client';

import Link from 'next/link';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { LocaleSwitcher } from './LocaleSwitcher';
import { Menu, X, ChevronDown } from 'lucide-react';
import { locales, type Locale, localeNames, localeDirs } from '@/lib/i18n';

const navigation = [
  { name: 'home', href: '/', label: { ar: 'الرئيسية', en: 'Home', fr: 'Accueil' } },
  { name: 'about', href: '/about', label: { ar: 'من نحن', en: 'About Us', fr: 'À Propos' } },
  {
    name: 'services',
    label: { ar: 'خدماتنا', en: 'Our Services', fr: 'Nos Services' },
    children: [
      { name: 'web-development', href: '/services/web-development', label: { ar: 'تطوير المواقع', en: 'Web Development', fr: 'Développement Web' } },
      { name: 'seo', href: '/services/seo', label: { ar: 'خدمات SEO', en: 'SEO Services', fr: 'Services SEO' } },
      { name: 'aeo', href: '/services/aeo', label: { ar: 'خدمات AEO', en: 'AEO Services', fr: 'Services AEO' } },
      { name: 'geo', href: '/services/geo', label: { ar: 'خدمات GEO', en: 'GEO Services', fr: 'Services GEO' } },
    ],
  },
  { name: 'case-studies', href: '/case-studies', label: { ar: 'معرض الأعمال', en: 'Case Studies', fr: 'Réalisations' } },
  {
    name: 'media-center',
    label: { ar: 'المركز الإعلامي', en: 'Media Center', fr: 'Centre Média' },
    children: [
      { name: 'blog', href: '/blog', label: { ar: 'أخبار', en: 'News', fr: 'Actualités' } },
      { name: 'tech-tips', href: '/blog/tech-tips', label: { ar: 'نصائح فنية', en: 'Tech Tips', fr: 'Conseils Techniques' } },
      { name: 'business-segments', href: '/business-segments', label: { ar: 'قطاعات الأعمال', en: 'Business Segments', fr: 'Secteurs d\'Activité' } },
    ],
  },
  { name: 'contact', href: '/contact', label: { ar: 'إتصل بنا', en: 'Contact Us', fr: 'Contact' } },
];

export function Header({ locale }: { locale: Locale }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const t = (key: { ar: string; en: string; fr: string }) => key[locale];
  const dir = localeDirs[locale];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-navy-200 transition-all duration-300" dir={dir}>
      <nav className="container mx-auto px-4" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0" aria-label={t({ ar: 'الروابط - الرئيسية', en: 'AlRawaabit - Home', fr: 'AlRawaabit - Accueil' })}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-orange-400 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.59 0 2.08-.8 3.97-2.1 5.39z" />
              </svg>
            </div>
            <span className="hidden sm:block font-bold text-lg text-navy-900">AlRawaabit</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => {
              const isDropdown = 'children' in item;
              
              if (isDropdown) {
                return (
                  <div key={item.name} className="relative group">
                    <button
                      className="flex items-center gap-1 text-navy-700 hover:text-orange-600 font-medium transition-colors"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {t(item.label)}
                      <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" aria-hidden="true" />
                    </button>
                    <ul className="absolute left-0 top-full mt-2 w-56 bg-white rounded-xl border border-navy-200 shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50" role="menu">
                      {(item.children || []).map((child) => (
                        <li key={child.name} role="none">
                          <Link
                            href={`/${locale}${child.href}`}
                            className="block px-4 py-2 text-navy-700 hover:text-orange-600 hover:bg-navy-50 transition-colors"
                            role="menuitem"
                          >
                            {t(child.label)}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              }

              return (
                <Link
                  key={item.name}
                  href={`/${locale}${item.href}`}
                  className="text-navy-700 hover:text-orange-600 font-medium transition-colors"
                >
                  {t(item.label)}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA & Locale Switcher */}
          <div className="hidden lg:flex items-center gap-4">
            <LocaleSwitcher currentLocale={locale} />
            <Link href={`/${locale}/contact`} className="bg-orange-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-orange-700 transition-colors">
              {t({ ar: 'تواصل معنا', en: 'Get in Touch', fr: 'Nous Contacter' })}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg text-navy-700 hover:bg-navy-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? t({ ar: 'إغلاق القائمة', en: 'Close Menu', fr: 'Fermer le Menu' }) : t({ ar: 'فتح القائمة', en: 'Open Menu', fr: 'Ouvrir le Menu' })}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div id="mobile-menu" className={cn('lg:hidden overflow-hidden transition-all duration-300', mobileMenuOpen ? 'max-h-[500px] opacity-100 pb-6' : 'max-h-0 opacity-0')}>
          <div className="py-4 space-y-1">
            {navigation.map((item) => {
              const isDropdown = 'children' in item;
              
              if (isDropdown) {
                return (
                  <div key={item.name} className="space-y-1">
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                      className="w-full flex items-center justify-between px-4 py-3 text-navy-700 font-medium hover:bg-navy-50 rounded-lg transition-colors"
                      aria-expanded={activeDropdown === item.name}
                    >
                      {t(item.label)}
                      <ChevronDown className={cn('w-4 h-4 transition-transform', activeDropdown === item.name && 'rotate-180')} aria-hidden="true" />
                    </button>
                    {activeDropdown === item.name && (
                      <ul className="pl-4 space-y-1 mt-1" role="menu">
                        {(item.children || []).map((child) => (
                          <li key={child.name} role="none">
                            <Link
                              href={`/${locale}${child.href}`}
                              className="block px-4 py-2 text-navy-600 hover:text-orange-600 hover:bg-navy-50 rounded-lg transition-colors text-sm"
                              role="menuitem"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {t(child.label)}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.name}
                  href={`/${locale}${item.href}`}
                  className="block px-4 py-3 text-navy-700 font-medium hover:bg-navy-50 hover:text-orange-600 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t(item.label)}
                </Link>
              );
            })}

            <div className="pt-4 border-t border-navy-200 flex flex-col gap-3">
              <LocaleSwitcher currentLocale={locale} />
              <Link
                href={`/${locale}/contact`}
                className="bg-orange-600 text-white px-5 py-3 rounded-xl font-semibold text-center hover:bg-orange-700 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t({ ar: 'تواصل معنا', en: 'Get in Touch', fr: 'Nous Contacter' })}
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}