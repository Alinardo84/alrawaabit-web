# AlRawaabit Website

Modern, trilingual (Arabic, English, French) digital marketing agency website built with Next.js 15, React 19, TypeScript, and Tailwind CSS v4. Optimized for SEO, AEO, and GEO.

## Features

- **Trilingual Support**: Arabic (RTL, default), English, French with proper hreflang
- **SEO/AEO/GEO Optimized**: Schema.org JSON-LD, sitemaps, robots.txt, llms.txt
- **Modern Stack**: Next.js 15 App Router, React 19, TypeScript, Tailwind CSS v4
- **Performance**: Edge-ready, Lighthouse 90+, Core Web Vitals optimized
- **Accessible**: WCAG 2.2 AA compliant, RTL/LTR aware
- **Forms**: Server Actions with Resend email integration
- **Analytics**: Vercel Analytics + Web Vitals

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5.6 |
| Styling | Tailwind CSS v4 |
| Fonts | Inter (Latin), Noto Sans Arabic |
| Email | Resend |
| Hosting | Vercel |
| CI/CD | GitHub Actions |
| Media Gen | Higgsfield AI (CLI) |

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+
- Vercel account (for deployment)
- Resend account (for contact forms)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/alrawaabit-web.git
cd alrawaabit-web

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
# Edit .env.local with your values

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (redirects to /ar)

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `RESEND_API_KEY` | Resend API key for contact forms | Yes |
| `NEXT_PUBLIC_SITE_URL` | Production site URL | Yes |
| `HIGGSFIELD_API_KEY` | Higgsfield API key (optional) | No |

### Higgsfield Media Generation

```bash
# Install Higgsfield CLI
npm install -g @higgsfield/cli
higgsfield auth login

# Generate media assets (free tier models)
npm run media:generate
```

Assets are saved to `public/media/`. Copy/download from URLs and place as needed.

## Project Structure

```
src/
├── app/
│   ├── [locale]/           # Internationalized routes
│   │   ├── about/          # About page
│   │   ├── services/       # Service pages (4)
│   │   ├── case-studies/   # Portfolio
│   │   ├── contact/        # Contact form
│   │   └── legal/          # Privacy & Terms
│   ├── api/                # Server Actions & APIs
│   │   ├── contact/        # Contact form handler
│   │   └── og/             # Dynamic OG images
│   ├── layout.tsx          # Root layout with providers
│   ├── globals.css         # Global styles + Tailwind
│   └── not-found.tsx       # 404 page
├── components/
│   ├── ui/                 # Base UI components
│   ├── layout/             # Header, Footer, LocaleSwitcher
│   ├── sections/           # Page sections
│   └── forms/              # Form components
├── lib/
│   ├── i18n.ts             # Locale configuration
│   ├── dictionary.ts       # Translation loader
│   ├── utils.ts            # Utility functions
│   └── jsonld.ts           # Schema.org generators
├── messages/
│   ├── ar.json             # Arabic translations
│   ├── en.json             # English translations
│   └── fr.json             # French translations
└── middleware.ts           # Locale detection & redirect
```

## SEO/AEO/GEO Features

### Technical SEO
- Per-locale sitemaps (`/sitemap-ar.xml`, `/sitemap-en.xml`, `/sitemap-fr.xml`)
- hreflang tags with x-default
- Canonical URLs
- robots.txt with sitemap references
- Core Web Vitals optimized (LCP < 2.5s, CLS < 0.1)

### Structured Data (JSON-LD)
- Organization & LocalBusiness
- Service schema for each offering
- FAQPage on homepage & service pages
- BreadcrumbList
- WebSite with SearchAction

### AEO (Answer Engine Optimization)
- Concise 40-60 word definitions
- FAQPage schema with real user questions
- HowTo steps for processes
- Comparison tables

### GEO (Generative Engine Optimization)
- llms.txt at root for LLM consumption
- Entity-rich content (Organization, Service, Person, Place)
- llms-full.txt per page (optional)
- Author/sameAs linking to social profiles
- Continuous content freshness

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

The `vercel.json` is not needed - Next.js 15 is auto-detected.

### Custom Domain

1. Add `alrawaabit.com` in Vercel project settings
2. Configure DNS:
   - A record: `@` → `76.76.21.21`
   - CNAME: `www` → `cname.vercel-dns.com`
3. SSL auto-provisioned

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with Turbopack |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | TypeScript check |
| `npm run media:generate` | Generate Higgsfield media assets |

## Locale URLs

| Locale | URL |
|--------|-----|
| Arabic (default) | `https://alrawaabit.com/` |
| English | `https://alrawaabit.com/en/` |
| French | `https://alrawaabit.com/fr/` |

## Content Management

All user-facing text is in `src/messages/{locale}.json`. To add/modify content:

1. Edit the JSON files
2. Use `t()` helper in components: `t({ ar: '...', en: '...', fr: '...' })`
3. For HTML content, use `dangerouslySetInnerHTML={{ __html: t(...) }}`

## Contributing

1. Create feature branch from `main`
2. Make changes with proper types
3. Run `npm run lint && npm run typecheck && npm run build`
4. Open PR with description

## License

MIT License - see LICENSE file for details.

---

Built with ❤️ by AlRawaabit Team