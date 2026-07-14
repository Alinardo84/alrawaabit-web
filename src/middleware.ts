import { NextRequest, NextResponse } from 'next/server';

const locales = ['ar', 'en', 'fr'] as const;
export type Locale = (typeof locales)[number];
const defaultLocale: Locale = 'ar';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip all internal paths
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/media') ||
    pathname.includes('.') ||
    locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`)
  ) {
    return NextResponse.next();
  }

  // Get locale from Accept-Language header
  const acceptLanguage = request.headers.get('accept-language');
  let locale = defaultLocale;

  if (acceptLanguage) {
    const preferredLocale = acceptLanguage
      .split(',')
      .map((l) => l.split(';')[0].trim().slice(0, 2))
      .find((l) => locales.includes(l as Locale));
    
    if (preferredLocale) {
      locale = preferredLocale as Locale;
    }
  }

  // Redirect to localized path
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    '/((?!_next|api|media|.*\\..*).*)',
  ],
};