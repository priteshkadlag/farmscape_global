# Content verification checklist

Everything below was found while migrating content from the old WordPress site
(formscapeglobal.com, audited 16 October 2026). Nothing has been invented; where
the source was missing, contradictory or clearly a template leftover, the new
site either omits the detail or holds it in an editable field. Please confirm
each item with Formscape Global before launch.

Edit the values in `src/content/` (file names given in brackets).

## Must confirm before launch

| # | Item | What the old site says | What the new site does |
| --- | --- | --- | --- |
| 1 | **Incorporation year** | Home page: “incorporated in 2021”. About page: “incorporated in 2024”. Old footer: “Formscape Engineers LLP was incorporated in 2018… revamped as Formscape Engineers LLP in 2023”. | Says only “founded by Mr. Nayan Jivan Fatania… rebranded as Formscape Global in 2024”. Set `company.incorporationYear` to show a dated timeline entry. [`site.ts`] |
| 2 | **Legal entity name** | Footer mentions “Formscape Engineers LLP”; the rest of the site says “Formscape Global”. Methodology page refers to “templates developed by Formscape Engineers LLP”. | Uses “Formscape Global” throughout. Update `company.legalName` if the registered name differs. [`site.ts`] |
| 3 | **Primary email** | `nayan@formscapeglobal.com` (header, contact page, footer) and `nayan.fatania@gmail.com` (one footer block). Contact-page “Email us” link actually pointed to `info@formscapeglobal.com`. | Primary: `nayan@formscapeglobal.com`; secondary `nayan.fatania@gmail.com` shown on Contact. The rebuild brief specified the Gmail address — confirm which should be primary. [`site.ts`] |
| 4 | **Facebook page** | Header links `facebook.com/formscapeglobal`; footer links `facebook.com/nfaengineers`. | Uses `formscapeglobal`. [`site.ts`] |
| 5 | **LinkedIn / Instagram / X** | LinkedIn is Mr. Fatania’s personal profile; Instagram is `nayanfatania_associates` (old brand); X is `nayn0507`. | Kept as-is. Replace with company accounts if they exist. [`site.ts`] |
| 6 | **Years of experience** | About: “extensive experience of six years in a consultancy firm”. CEO bio: “industry experience of 9 years”. | Both kept in their original context. Confirm both are current. [`company.ts`] |
| 7 | **Home-page counters** | “0+ Completed Projects”, “0+ Years of Experience” (numbers never rendered). | Omitted. Add confirmed figures to `stats` to display them. [`site.ts`] |
| 8 | **Value-engineering figures** | “35% of building cost and ~80% of infrastructure cost goes to structural work.” | Omitted per brief. Re-add only with a source. [`services.ts`] |
| 9 | **Composite structures standard** | “Design services are offered as per IS.” (code number missing) | No standard shown. Add the IS code if one applies. [`services.ts`] |
| 10 | **Office hours** | Not stated. | Hidden. Set `contact.officeHours` to show. [`site.ts`] |
| 11 | **Testimonials** | Quotes attributed to Jignesh Patel, Victor Dsouza, Vinay Sharma (no company or role). | Names kept (they appear on the source). Confirm consent and, ideally, add company/role. [`company.ts`] |
| 12 | **Google Map** | Embed searches for “Nayan Fatania & Associates \| Porvorim” (old business name). | Same query kept. Replace with the official embed code from the Formscape Global Google Business Profile. [`site.ts → mapEmbedSrc`] |
| 13 | **Privacy policy & terms** | Not present. | Draft pages at `/privacy-policy` and `/terms` — need legal review (India DPDP Act 2023). |
| 14 | **Media usage rights** | Service photos (steel, composite, liquid-retaining, machine foundations, value engineering) look like stock imagery. | Migrated because they are on the live site. Confirm licences; see `docs/media-manifest.md`. |
| 15 | **Drawing download** | Sample drawings could be viewed but not downloaded. | Viewer offers “Download” of the 1086 px JPEG. Disable by removing `download` in `DrawingViewer.tsx` if not wanted; higher-resolution PDFs would improve legibility. |

## Project data to confirm (`src/content/projects.ts`)

Each project carries a `verify` array with notes; the main ones:

- **Possible duplicates merged:** “3 Villa at Parra” ↔ “Design of G+1 Villas, Parra”; “Serraulim Villa” ↔ “7 Row Villas, Serraulim, Margao”. Old detail-page URLs redirect to the merged pages.
- **Possible duplicates kept separate:** “Roof over radiology dept” vs “Structural Roof for Radiology Department (GMC, Goa)”; “Villas at Verla” vs “14 G+2 Villas at Verla Canca”.
- **Spelling:** “Goa Sincters” → shown as “Goa Sintered Products”; “Pia Kane Group” → “Pai Kane Group”; architect “Shikhar Dingra”; client “Mr. Pradeep Varshnei”.
- **Role labels:** Pai Kane Group is labelled “Architect” on the Mopa tower listing — recorded as client. Roheet Hede is “Architect / Client” for the Ribandar bungalow — recorded as architect. “Lester” is listed as architect for Lester House.
- **Missing details:** Saptkoteshwar, Thivim, Candolim, Ravindra Bhavan, Hede Roof, Karaswada Roof, Guest House (Bogmalo) and Design of Swimming Pool have no description, client or scope on the old site.
- **Status:** only projects listed on the old Ongoing/Completed pages have a status. All others show in “All” only. The ongoing list dates from 2023 — please update.
- **Old detail pages contained template filler** (e.g. Dry Mix Plant specifications and “Clients: Salim Rana / Completed January 01 2020” on every project, lorem ipsum on the Kia page). None of that was migrated.
- The Kia showroom’s old URL was `/projects/car-port-at-molbio-diagnostic-verna-goa/` — confirm whether a separate Molbio project exists.
- **Featured projects** on the home page follow the brief; change `featuredSlugs` to reorder.

## Removed from the old site

- Placeholder paragraph “Develop your leaders into a competitive advantage… Nunc a blandit urna…” (About page).
- Theme demo pages: Cart, Blog, FAQ, Careers, Our Team, Single service/project templates, Coming soon, Sample Page, Slider, Test, Home1 — all redirect (see `docs/redirect-map.md`).
- “Powered by Coderix.io” vendor credits and the theme’s demo “Quick Links”.
- Promotional banner image `QUERIES-FORMSCAPE.jpg` (contact details now rendered as text).

## Re-checked against the source

Every page of the old site was re-read after the build — Home, About us, Structural Design Methodology, Bespoke Services, Sample Drawing, Our Projects, Ongoing Projects, Completed Projects, Contact Us and all 17 old project detail pages. All 33 projects, 10 drawing sheets, 3 affiliation and 15 client logos, both directors, the team photos, three testimonials, the company profile PDF, the YouTube film, phone, both email addresses, WhatsApp, address, map and four social links are present on the new site.
