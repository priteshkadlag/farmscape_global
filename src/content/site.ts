// Company-wide facts. Values marked `null` are deliberately unpublished until
// the business confirms them (see docs/content-verification.md).

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://formscapeglobal.com").replace(/\/$/, "");

export const company = {
  name: "Formscape Global",
  legalName: "Formscape Global",
  tagline: "Structural Engineering",
  formerName: "M/S. Nayan Fatania & Associates",
  rebrandYear: 2024,
  /**
   * The old site states 2021 (home page) and 2024 (About page); the footer of
   * the old theme also mentions 2018 for "Formscape Engineers LLP". Leave null
   * until confirmed — it is only rendered when set.
   */
  incorporationYear: null as number | null,
  founder: "Mr. Nayan Jivan Fatania",
  description:
    "Formscape Global is a structural engineering practice in Goa, India. We turn architectural vision into safe, efficient and sustainable structural solutions for clients across India.",
  shortDescription:
    "Structural design, proof checking and technical drawings for concrete, steel and composite structures — from Goa, for clients across India.",
  regionsServed: ["Goa", "Maharashtra", "Gujarat", "India"],
} as const;

export const contact = {
  phoneDisplay: "+91 99219 99974",
  phoneHref: "tel:+919921999974",
  /** Primary address used across the old site (header, contact page, footer). */
  email: "nayan@formscapeglobal.com",
  /** Secondary address shown in one old footer block. */
  emailAlt: "nayan.fatania@gmail.com",
  whatsappHref: "https://api.whatsapp.com/send?phone=919921999974",
  whatsappMessageHref: (text: string) =>
    `https://api.whatsapp.com/send?phone=919921999974&text=${encodeURIComponent(text)}`,
  address: {
    lines: [
      "Nova Cidade Complex",
      "Wing S-3, Office Nos. 113–114",
      "First Floor, Alto-Porvorim",
      "Goa 403521",
    ],
    landmark: "Near Mall De Goa",
    streetAddress: "Office Nos. 113–114, First Floor, Wing S-3, Nova Cidade Complex",
    locality: "Alto-Porvorim",
    region: "Goa",
    postalCode: "403521",
    country: "IN",
  },
  /** Hidden until the business confirms its office hours. */
  officeHours: null as string | null,
  mapEmbedSrc:
    "https://www.google.com/maps?q=Nayan%20Fatania%20%26%20Associates%20%7C%20Porvorim&t=m&z=16&output=embed&iwloc=near",
  mapLink: "https://maps.google.com/?q=Nova+Cidade+Complex+Alto+Porvorim+Goa+403521",
  companyProfilePdf: "/downloads/formscape-global-company-profile.pdf",
} as const;

export const socials = [
  { label: "LinkedIn", href: "https://in.linkedin.com/in/nayan-fatania-b45277102", icon: "linkedin" },
  { label: "Instagram", href: "https://www.instagram.com/nayanfatania_associates/", icon: "instagram" },
  { label: "Facebook", href: "https://www.facebook.com/formscapeglobal", icon: "facebook" },
  { label: "X (Twitter)", href: "https://twitter.com/nayn0507", icon: "x" },
] as const;

export type NavItem = { label: string; href: string; children?: NavItem[] };

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Methodology", href: "/structural-design-methodology" },
  { label: "Bespoke Services", href: "/bespoke-services" },
  { label: "Sample Drawings", href: "/sample-drawing" },
  {
    label: "Our Projects",
    href: "/projects",
    children: [
      { label: "All Projects", href: "/projects" },
      { label: "Ongoing Projects", href: "/projects/ongoing" },
      { label: "Completed Projects", href: "/projects/completed" },
    ],
  },
  { label: "Contact Us", href: "/contact-us" },
];

/** Optional home-page figures. The old site's counters rendered "0+"; publish only confirmed numbers. */
export const stats: { value: string; label: string }[] = [];
