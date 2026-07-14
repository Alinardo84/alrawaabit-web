import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

const locales = ['ar', 'en', 'fr'] as const;
type Locale = typeof locales[number];

const siteName = {
  ar: 'الروابط',
  en: 'AlRawaabit',
  fr: 'AlRawaabit',
};

const descriptions = {
  ar: 'شركة تسويق رقمي مصرية متخصصة في تطوير المواقع، SEO، AEO، و GEO',
  en: 'Egyptian Digital Marketing Agency specialized in Web Development, SEO, AEO & GEO',
  fr: 'Agence Marketing Digital Égyptienne spécialisée en Développement Web, SEO, AEO et GEO',
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const locale = (searchParams.get('locale') as Locale) || 'ar';
  const title = searchParams.get('title') || siteName[locale];
  const description = searchParams.get('description') || descriptions[locale];
  const type = searchParams.get('type') || 'default';

  const isRTL = locale === 'ar';

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)',
          padding: '80px',
          fontFamily: isRTL ? 'Noto Sans Arabic' : 'Inter',
          direction: isRTL ? 'rtl' : 'ltr',
          color: 'white',
        }}
      >
        {/* Decorative elements */}
        <div style={{
          position: 'absolute',
          top: '40px',
          right: '40px',
          width: '120px',
          height: '120px',
          background: 'linear-gradient(135deg, #F97316, #FB923C)',
          borderRadius: '50%',
          opacity: '0.15',
          transform: 'translate(30px, -30px)',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '40px',
          left: '40px',
          width: '80px',
          height: '80px',
          background: 'linear-gradient(135deg, #F97316, #FB923C)',
          borderRadius: '50%',
          opacity: '0.15',
          transform: 'translate(-30px, 30px)',
        }} />

        {/* Logo */}
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '20px',
          background: 'linear-gradient(135deg, #F97316, #FB923C)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '32px',
          boxShadow: '0 10px 40px rgba(249, 115, 22, 0.4)',
        }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="white">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
          </svg>
        </div>

        {/* Title */}
        <h1 style={{
          fontSize: '56px',
          fontWeight: '800',
          lineHeight: '1.2',
          textAlign: 'center',
          maxWidth: '900px',
          marginBottom: '24px',
          textShadow: '0 4px 20px rgba(0,0,0,0.3)',
        }}>
          {title}
        </h1>

        {/* Description */}
        <p style={{
          fontSize: '24px',
          fontWeight: '400',
          lineHeight: '1.5',
          textAlign: 'center',
          maxWidth: '800px',
          opacity: '0.9',
          color: '#E2E8F0',
        }}>
          {description}
        </p>

        {/* Bottom tag */}
        <div style={{
          marginTop: '48px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          padding: '16px 32px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '50px',
          border: '1px solid rgba(255,255,255,0.2)',
          backdropFilter: 'blur(10px)',
        }}>
          <span style={{ fontSize: '18px', fontWeight: '600' }}>🌐</span>
          <span style={{ fontSize: '18px', fontWeight: '500' }}>
            Egypt • Saudi Arabia • UAE • Kuwait • Qatar • Bahrain • Oman
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}