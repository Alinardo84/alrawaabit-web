# AlRawaabit - Deployment Status

## ✅ Completed

### 1. Vercel Connection
- **Project:** `alis-projects-1c6a2d61/alrawaabit-web`
- **GitHub repo:** https://github.com/Alinardo84/alrawaabit-web
- **Production URL:** https://alrawaabit-web.vercel.app
- **Direct URL:** https://alrawaabit-1vjaie4ep-alis-projects-1c6a2d61.vercel.app
- **Status:** ✅ Live, all 30 pages deployed (3 locales × 10 page types)

### 2. Environment Variables
| Variable | Value | Status |
|----------|-------|--------|
| `NEXT_PUBLIC_SITE_URL` | `https://alrawaabit.com` | ✅ Set (Production) |
| `RESEND_API_KEY` | `re_PLACEHOLDER_REPLACE_WITH_ACTUAL_KEY` | ⚠️ Placeholder — replace with real key |

To update the Resend key:
```bash
cd alrawaabit-web
vercel env rm RESEND_API_KEY production
vercel env add RESEND_API_KEY production
# Enter your real Resend API key when prompted
```

Or update via Vercel Dashboard: https://vercel.com/alis-projects-1c6a2d61/alrawaabit-web/settings/environment-variables

### 3. Domain Registration
- **alrawaabit.com** — Added to Vercel (pending DNS verification)
- **www.alrawaabit.com** — Added to Vercel (pending DNS verification)

---

## ⏳ Manual Steps (You)

### Step 1: Higgsfield Media Generation

The Higgsfield CLI requires an interactive browser-based OAuth login that cannot be completed in this environment. Run these commands in your terminal:

```bash
cd "C:\Users\alicc\OneDrive\Documents\AlRawaabit Website rebuild\alrawaabit-web"

# 1. Login (opens browser for OAuth)
higgsfield auth login

# 2. Verify auth
higgsfield account status

# 3. Generate all media assets
npm run media:generate
```

This will create:
- 2 hero banners (16:9)
- 3 OG cards (1:1) — one per locale
- 4 service illustrations
- About + Case studies + Contact hero images
- 6 case study thumbnails

All assets saved to `public/media/`. They will be served automatically by Vercel on next deploy.

**After generation, re-deploy:**
```bash
git add public/media/
git commit -m "Add generated media assets"
git push origin master
# Vercel auto-deploys from GitHub
```

### Step 2: DNS Cutover for alrawaabit.com

Your domain currently uses **Cloudflare nameservers**:
- `alberto.ns.cloudflare.com`
- `jessica.ns.cloudflare.com`

**You have two options:**

#### Option A (Recommended): Add A record in Cloudflare (keep Cloudflare DNS)
1. Go to https://dash.cloudflare.com → your `alrawaabit.com` zone
2. Go to **DNS** → **Records**
3. Add/Edit these records:

| Type | Name | Value | Proxy status |
|------|------|-------|--------------|
| A | `@` | `76.76.21.21` | DNS only (grey cloud) |
| CNAME | `www` | `cname.vercel-dns.com` | DNS only (grey cloud) |

4. **Important:** Disable Cloudflare proxy (grey cloud icon) for these records — Vercel needs direct access for SSL.
5. Wait 5–30 min for propagation
6. Vercel will auto-detect and issue SSL (you'll get an email)

#### Option B: Change nameservers to Vercel
1. In Cloudflare, remove the domain or set Cloudflare to "DNS only" mode
2. At your registrar, change nameservers to:
   - `ns1.vercel-dns.com`
   - `ns2.vercel-dns.com`
3. Wait 24-48h for full propagation
4. Vercel will issue SSL automatically

**Verify after DNS change:**
```bash
nslookup alrawaabit.com
# Should show 76.76.21.21

curl -I https://alrawaabit.com
# Should show 200 OK with Vercel SSL
```

### Step 2.5: Sanity Studio Deployment

The Studio lives in `studio/` (deliberately separated to avoid React 19 conflicts with Next.js). Two ways to deploy:

**Option A — Sanity hosted (free, recommended for solo use):**
```bash
cd studio
npm install
npx sanity init --reconfigure   # paste your project ID
npm run deploy                  # gives you alrawaabit.sanity.studio
```

**Option B — Self-host on Vercel (separate project):**
1. In Vercel → **Add New Project** → import `Alinardo84/alrawaabit-web`
2. Set **Root Directory** to `studio`
3. Vercel auto-detects Sanity, runs `sanity build`
4. Add env var `NEXT_PUBLIC_SANITY_PROJECT_ID` (same as the main app)
5. Note the deployed URL (e.g. `https://alrawaabit-cms.vercel.app`)

Then in the **main app**'s Vercel project, add env var:
```
NEXT_PUBLIC_STUDIO_URL=https://alrawaabit-cms.vercel.app
```
Now `/studio` on `alrawaabit.com` redirects to the deployed CMS.

---

### Step 3: Resend Email Setup (Recommended)

The contact form is wired up but needs a real Resend API key. To activate:

1. Sign up at https://resend.com (free tier: 100 emails/day)
2. Verify your domain `alrawaabit.com` in Resend dashboard
3. Create an API key
4. Update the env var in Vercel:
   ```bash
   vercel env rm RESEND_API_KEY production
   vercel env add RESEND_API_KEY production
   # paste the real key
   ```
5. Re-deploy or trigger a redeploy:
   ```bash
   vercel deploy --prod
   ```

---

## 📋 Final Verification Checklist

After completing the manual steps:

- [ ] https://alrawaabit.com loads with Arabic (default) content
- [ ] https://alrawaabit.com/en/ loads with English content
- [ ] https://alrawaabit.com/fr/ loads with French content
- [ ] All 4 service pages accessible in all 3 locales
- [ ] Case studies page lists 6 cases in all 3 locales
- [ ] Contact form submits successfully (test with real Resend key)
- [ ] `view-source:https://alrawaabit.com` shows hreflang tags
- [ ] `https://alrawaabit.com/sitemap.xml` shows 30 URLs with locale alternates
- [ ] `https://alrawaabit.com/robots.txt` references sitemap
- [ ] `https://alrawaabit.com/llms.txt` is accessible (GEO)
- [ ] Lighthouse score ≥ 90 on mobile for all 3 locale roots
- [ ] WhatsApp button opens `https://api.whatsapp.com/send?phone=201111306090`

---

## 🆘 Troubleshooting

**Domain not resolving after DNS change?**
- Use https://dnschecker.org to check global propagation
- Cloudflare proxy must be OFF (grey cloud) for Vercel

**Contact form returns 503?**
- `RESEND_API_KEY` is still the placeholder — replace it in Vercel env

**Build error in Vercel?**
- Check the build log: https://vercel.com/alis-projects-1c6a2d61/alrawaabit-web
- Most recent commit should show in Deployments tab

**Higgsfield auth fails?**
- Try `higgsfield auth logout` then `higgsfield auth login` again
- Make sure you have a free Higgsfield account at https://higgsfield.ai

---

**Live now:** https://alrawaabit-web.vercel.app
**Custom domain:** https://alrawaabit.com (pending DNS cutover)
