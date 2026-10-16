# Redirect map

Permanent (308) redirects from the old WordPress URLs, defined in [`src/content/redirects.json`](../src/content/redirects.json) and applied in `next.config.ts`. Old URLs with a trailing slash (`/our-projects/`) first normalise to the slashless form, then redirect.

## URLs kept unchanged

- `/`
- `/about-us`
- `/structural-design-methodology`
- `/bespoke-services`
- `/sample-drawing`
- `/contact-us`
- `/projects/villa-at-siolim`

## Redirected

| Old URL | New URL |
| --- | --- |
| `/our-projects` | `/projects` |
| `/completed-projects` | `/projects/completed` |
| `/ongoing-projects` | `/projects/ongoing` |
| `/projects/14-villa-g2-verla-canca` | `/projects/villas-verla-canca` |
| `/projects/7-row-villas-serraulim-margao` | `/projects/serraulim-villa` |
| `/projects/car-port-at-molbio-diagnostic-verna-goa` | `/projects/kia-showroom-verna` |
| `/projects/design-of-dry-mix-plant-at-banda` | `/projects/dry-mix-plant-banda` |
| `/projects/design-of-g1-villas-parra` | `/projects/villas-at-parra` |
| `/projects/exhaust-stack-tower-at-mopa-height-30m` | `/projects/exhaust-stack-tower-mopa` |
| `/projects/exhaust-stack-tower-at-visakhapatnam-port-height-30m` | `/projects/exhaust-stack-tower-visakhapatnam` |
| `/projects/industrial-building-for-goa-sincters-verna-idc-goa` | `/projects/goa-sintered-products-verna` |
| `/projects/latambarcem-breweries-pvt-ltd-bicholim` | `/projects/latambarcem-breweries-bicholim` |
| `/projects/proposed-renovation-of-sarjyotishis-house-kavlem-pondagoa` | `/projects/sarjyotishis-house-renovation` |
| `/projects/refurbishment-of-existing-swimming-pool-roof-at-campal` | `/projects/swimming-pool-roof-campal` |
| `/projects/shed-at-banda-for-pai-kane-and-group` | `/projects/shed-banda-pai-kane` |
| `/projects/sherwyns-house-at-bastora` | `/projects/sherwyns-house-bastora` |
| `/projects/structural-roof-for-radiology-department-at-gmc-goa` | `/projects/radiology-roof-gmc` |
| `/projects/structural-roof-of-bungalow-for-arch-roheet-hede` | `/projects/bungalow-roof-ribandar` |
| `/projects/design-of-swimming-pool` | `/projects/swimming-pool-design` |
| `/wp-content/uploads/2024/09/Formscape-Global-Company-Profile.pdf` | `/downloads/formscape-global-company-profile.pdf` |
| `/home1` | `/` |
| `/home-new` | `/` |
| `/our-team` | `/about-us#team` |
| `/get-in-touch` | `/contact-us` |
| `/sample-drawings` | `/sample-drawing` |
| `/single-service` | `/bespoke-services` |
| `/single-service-2` | `/bespoke-services` |
| `/single-project-b` | `/projects` |
| `/careers` | `/contact-us` |
| `/faq` | `/contact-us` |
| `/blog` | `/` |
| `/slider` | `/` |
| `/test` | `/` |
| `/cart` | `/` |
| `/sample-page` | `/` |
| `/coming-soon-page` | `/` |

## New URLs

- `/projects/[slug]` — one page per project (33)
- `/request-a-quote`
- `/privacy-policy`, `/terms`
- `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`

After launch, submit the new sitemap in Google Search Console and monitor the Coverage report for 404s from old URLs not listed here (for example image URLs under `/wp-content/uploads/` that were hot-linked elsewhere).
