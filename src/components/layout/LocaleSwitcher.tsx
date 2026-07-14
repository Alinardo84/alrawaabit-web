'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { locales, defaultLocale, type Locale, localeNames, localeFlags } from '@/lib/i18n';
import { Globe, ChevronDown, Check } from 'lucide-react';

interface LocaleSwitcherProps {
  currentLocale: Locale;
}

export function LocaleSwitcher({ currentLocale }: LocaleSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const locale = locales.includes(currentLocale) ? currentLocale : defaultLocale;

  const switchLocale = (newLocale: Locale) => {
    setIsOpen(false);
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

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-200"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={localeNames[locale]}
      >
        <Globe className="w-4 h-4 text-white/70" aria-hidden="true" />
        <span className="font-medium text-sm text-white/90">{localeNames[locale]}</span>
        <ChevronDown
          className={cn('w-4 h-4 text-white/50 transition-transform duration-300', isOpen && 'rotate-180')}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <ul
          className="absolute right-0 mt-2 w-44 bg-white rounded-xl border border-navy-200 shadow-xl py-1 z-50 origin-top-right animate-drop-down"
          role="listbox"
        >
          {locales.map((loc) => (
            <li key={loc} role="option" aria-selected={loc === locale}>
              <button
                type="button"
                onClick={() => switchLocale(loc)}
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors duration-150',
                  loc === locale
                    ? 'bg-orange-50 text-orange-700 font-medium'
                    : 'text-navy-700 hover:bg-navy-50'
                )}
              >
                <span className="text-lg" aria-hidden="true">{localeFlags[loc]}</span>
                <span className="flex-1">{localeNames[loc]}</span>
                {loc === locale && <Check className="w-4 h-4 text-orange-600" aria-hidden="true" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}