# Formscape Global — website

Rebuild of [formscapeglobal.com](https://formscapeglobal.com) as a statically
prerendered Next.js site. All content and media were migrated from the old
WordPress site; nothing was invented. Open questions for the business are in
[`docs/content-verification.md`](docs/content-verification.md).

## Stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, Cache Components, Turbopack), React 19, TypeScript |
| Styling | Tailwind CSS v4 — design tokens in `src/app/globals.css` (`@theme`) |
| UI animation | Motion (`motion/react`, the Framer Motion library) via `LazyMotion` — features load after hydration |
| Scroll storytelling | GSAP + ScrollTrigger, lazy-loaded, hero linework and methodology diagram only |
| Smooth scroll | Lenis (desktop pointer only; off for touch and reduced motion) |
| Carousel | Swiper (testimonials, client-only with a prerendered fallback) |
| Lightbox | yet-another-react-lightbox (zoom, pan, swipe, thumbnails, download) |
| Forms | React Hook Form + Zod (same schema on client and API) |
| Icons | Lucide; brand icons are inline SVG (`components/ui/icons.tsx`) |

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in values
npm run dev                  # http://localhost:3000
```

Requires Node.js 20.9+ (developed on Node 24).

| Script | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` / `npm start` | Production build / serve |
| `npm run lint`, `npm run typecheck` | ESLint, TypeScript |
| `npm run check` | Typecheck + lint + build |
| `npm run media` | Re-run the media migration (see below) |

## Environment

See [`.env.example`](.env.example).

- `NEXT_PUBLIC_SITE_URL` — canonical origin used for metadata, sitemap and JSON-LD.
- **Enquiry delivery** — the contact and quote forms POST to `/api/enquiry`. Configure **one** of:
  - `ENQUIRY_WEBHOOK_URL` — forwards multipart data (all fields + attachment) to any webhook, or
  - `RESEND_API_KEY` + `ENQUIRY_TO_EMAIL` + `ENQUIRY_FROM_EMAIL` — sends an email with the attachment through Resend.

  Without either, submissions are logged to the console in development and rejected with a helpful message in production (so enquiries are never silently lost).

The API validates with the shared Zod schema, rate-limits per IP (5 per 10 minutes, in memory — use a shared store such as Upstash if you run several instances), and silently discards bots via a honeypot field and a minimum fill time. Attachments: PDF, DWG, DXF, JPG, PNG, ZIP up to 10 MB. Serverless hosts cap request bodies (Vercel: 4.5 MB), so larger drawings should be emailed.

## Editing content

All business content lives in `src/content/` as typed data — no component changes needed:

| File | Contents |
| --- | --- |
| `site.ts` | Company facts, contact details, socials, navigation, optional stats, office hours |
| `services.ts` | Services (summary, Bespoke copy, Methodology copy, applications, systems, IS codes), workflow stages |
| `projects.ts` | All 33 projects, categories, featured order |
| `company.ts` | Directors, About copy, Why Choose Us, testimonials, logos, sample drawings, company video |
| `redirects.json` | Permanent redirects from old URLs |
| `types.ts` | The content model (CMS-ready shape) |

Fields such as `status`, `client` or `architect` are optional — leave them out when unknown and the UI hides them.

### Adding a project

1. Put images in `public/media/projects/` (or add them to `scripts/media-map.mjs` and run `npm run media`), then make sure their dimensions are in `src/content/generated/media-dimensions.json` (the migration script writes this; for hand-added files, add `{ "width": …, "height": … }`).
2. Add an entry to `projects` in `src/content/projects.ts`. `media()` throws at build time if an image path is wrong.
3. The detail page, listing filters, sitemap and JSON-LD update automatically.

### Moving to a CMS

Components consume only the types in `src/content/types.ts`. To move to Sanity, Payload, Contentful or similar, model those types in the CMS and replace the arrays in `src/content/*.ts` with fetches wrapped in `"use cache"` (see `node_modules/next/dist/docs/01-app/03-api-reference/01-directives/use-cache.md`).

## Media

`scripts/migrate-media.mjs` downloads every approved file from the old site (or reads a local mirror with `--cache <dir>`), strips EXIF/GPS, downsizes oversized originals, generates the white logo, favicons and the default Open Graph image, and writes:

- `docs/media-manifest.md` / `.json` — old URL → new file, dimensions, size, and the list of assets deliberately **not** migrated (with reasons);
- `src/content/generated/media-dimensions.json` — intrinsic sizes used by `next/image`.

Images are served as AVIF/WebP by `next/image`. Confirm usage rights for every asset before launch.

## SEO

Per-page titles, descriptions, canonical URLs and Open Graph/Twitter cards (`src/lib/seo.ts`), JSON-LD for Organization/ProfessionalService (site-wide), BreadcrumbList (inner pages), Service (services and methodology) and CreativeWork (projects), `sitemap.xml` with image entries, `robots.txt` and a web manifest. Old URLs are preserved or permanently redirected — see [`docs/redirect-map.md`](docs/redirect-map.md).

## Accessibility & motion

Targets WCAG 2.2 AA: skip link, landmarks, one `h1` per page, visible focus styles, 44 px touch targets, keyboard-operable menus, tabs, filters, carousel and lightbox, accessible form errors (inline messages, `aria-invalid`, an announced summary), and alt text on all content images. Every animation respects `prefers-reduced-motion`; above-the-fold reveals are pure CSS so content never waits for JavaScript.

## Deployment

Any Node host works (`npm run build && npm start`). On **Vercel**: import the repo, set the environment variables, deploy. For a self-hosted server, run behind a reverse proxy and keep `.next/cache/images` on persistent storage so optimised images are not re-generated.

Before going live: set `NEXT_PUBLIC_SITE_URL`, configure enquiry delivery and send a test, work through `docs/content-verification.md`, then submit `/sitemap.xml` in Google Search Console.

## Testing performed

- `tsc`, ESLint and `next build` pass; all 54 routes prerender statically (the API route is dynamic).
- Every page screenshotted at 1440 px and 390 px in Chrome, and scanned for horizontal overflow at 360, 390, 768 and 1024 px.
- Mobile menu, dropdown, filters, drawing tabs, lightbox and form tested in headless Chrome; form submission verified end-to-end against a test webhook (fields + attachment), plus validation, honeypot, time-trap, attachment-type and rate-limit responses from the API.
- Lighthouse 12, mobile, real DevTools throttling (Slow 4G, 4× CPU) against `next start` on a local Windows machine:

  | Page | Perf | A11y | Best practices | SEO | LCP | CLS |
  | --- | --- | --- | --- | --- | --- | --- |
  | Home | 86–88 | 100 | 100 | 100 | 3.3 s | 0.02 |
  | About | 91 | 100 | 100 | 100 | 2.5 s | 0 |
  | Methodology | 91–92 | 100 | 100 | 100 | 2.5 s | 0.06 |
  | Bespoke Services | 94 | 100 | 100 | 100 | 2.2 s | 0.02 |
  | Sample Drawings | 90 | 100 | 100 | 100 | 3.0 s | 0 |
  | Projects | 95 | 100 | 100 | 100 | 2.4 s | 0 |
  | Project detail | 89 | 100 | 100 | 100 | 3.2 s | 0.03 |
  | Contact / Quote | 89–93 | 100 | 100 | 100 | 2.2–3.0 s | 0 |

  Home is the heaviest page (hero photo, GSAP, carousel). With the loading intro (below) it measures Perf 75–78, LCP 1.7 s, TBT 800–980 ms: the intro paints sooner, so React hydration now falls after first paint and counts toward TBT.

### Home loading intro

`components/home/HomeIntro.tsx` + the `.intro` rules in `globals.css`. It plays for about 2.5 s on the first home-page visit in a browser session; reloads, client-side navigation, other pages and reduced-motion users skip it. A tiny inline script decides before first paint, and the timing is pure CSS (transforms only), so it always finishes even if JavaScript fails. The hero's entrance animations are offset by `--intro-delay`. To remove it, delete `<HomeIntro />` from `src/app/page.tsx`. Expect better numbers behind a CDN with HTTP/2 and warm image caches; re-run PageSpeed Insights after deployment.
