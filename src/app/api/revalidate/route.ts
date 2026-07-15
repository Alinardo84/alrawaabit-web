import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { _type, slug } = body;

  if (!process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Revalidation not configured' }, { status: 500 });
  }

  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.SANITY_REVALIDATE_SECRET}`) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  const pathsToRevalidate: string[] = [];

  if (_type === 'blogPost') {
    pathsToRevalidate.push('/');
    pathsToRevalidate.push('/en');
    pathsToRevalidate.push('/fr');
    pathsToRevalidate.push('/ar/blog');
    pathsToRevalidate.push('/en/blog');
    pathsToRevalidate.push('/fr/blog');
    if (slug) {
      pathsToRevalidate.push(`/ar/blog/${slug}`);
      pathsToRevalidate.push(`/en/blog/${slug}`);
      pathsToRevalidate.push(`/fr/blog/${slug}`);
    }
  } else if (_type === 'caseStudy') {
    pathsToRevalidate.push('/');
    pathsToRevalidate.push('/en');
    pathsToRevalidate.push('/fr');
    pathsToRevalidate.push('/ar/case-studies');
    pathsToRevalidate.push('/en/case-studies');
    pathsToRevalidate.push('/fr/case-studies');
    if (slug) {
      pathsToRevalidate.push(`/ar/case-studies/${slug}`);
      pathsToRevalidate.push(`/en/case-studies/${slug}`);
      pathsToRevalidate.push(`/fr/case-studies/${slug}`);
    }
  } else if (_type === 'page') {
    pathsToRevalidate.push('/');
    pathsToRevalidate.push('/en');
    pathsToRevalidate.push('/fr');
    if (slug && slug !== 'home') {
      pathsToRevalidate.push(`/ar/${slug}`);
      pathsToRevalidate.push(`/en/${slug}`);
      pathsToRevalidate.push(`/fr/${slug}`);
    }
  }

  pathsToRevalidate.push('/sitemap.xml');

  for (const path of pathsToRevalidate) {
    revalidatePath(path);
  }

  return NextResponse.json({
    revalidated: pathsToRevalidate,
    now: Date.now(),
  });
}