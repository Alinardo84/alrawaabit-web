import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  const locale = searchParams.get('locale') || 'ar';
  const type = searchParams.get('type') || 'page';
  const secret = searchParams.get('secret');

  if (secret !== process.env.SANITY_PREVIEW_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  if (!slug) {
    return NextResponse.json({ message: 'Missing slug' }, { status: 400 });
  }

  const url =
    type === 'blogPost'
      ? `/${locale}/blog/${slug}`
      : type === 'caseStudy'
        ? `/${locale}/case-studies/${slug}`
        : `/${locale}/${slug === 'home' ? '' : slug}`;

  return NextResponse.redirect(new URL(url, request.url), {
    headers: {
      'Set-Cookie': `sanity-preview=true; Path=/; HttpOnly; SameSite=Lax`,
    },
  });
}