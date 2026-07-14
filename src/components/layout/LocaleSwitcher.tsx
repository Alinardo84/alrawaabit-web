'use client';

import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { locales, defaultLocale, type Locale, localeNames, localeFlags } from '@/lib/i18n';
import { Globe } from 'lucide-react';

interface LocaleSwitcherProps {
  currentLocale: Locale;
}

export function LocaleSwitcher({ currentLocale }: LocaleSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();

  const locale = locales.includes(currentLocale) ? currentLocale : defaultLocale;

  const switchLocale = (newLocale: Locale) => {
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length > 0 && locales.includes(segments[0] as Locale)) {
      segments[0] = newLocale;
    } else {
      segments.unshift(newLocale);
    }
    const newPath = '/' + segments.join('/');
    router.push(newPath);
    router.refresh();
  };

  return (
    <div className="relative" role="group" aria-label={localeNames[locale]}>
      <button
        type="button"
        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 transition-colors"
        aria-haspopup="listbox"
        aria-expanded="false"
      >
        <Globe className="w-4 h-4 text-white/70" aria-hidden="true" />
        <span className="font-medium text-sm">{localeNames[locale]}</span>
      </button>

      <ul className="absolute right-0 mt-2 w-36 bg-white rounded-xl border border-navy-200 shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50" role="listbox">
        {locales.map((loc) => (
          <li key={loc} role="option" aria-selected={loc === locale}>
            <button
              type="button"
              onClick={() => switchLocale(loc)}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors',
                loc === locale
                  ? 'bg-orange-50 text-orange-700 font-medium'
                  : 'text-navy-700 hover:bg-navy-50'
              )}
            >
              <span className="text-lg" aria-hidden="true">{localeFlags[loc]}</span>
              <span>{localeNames[loc]}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}