// Content model. Every business fact on the site lives in /src/content and is
// typed here, so the data layer can be swapped for a headless CMS later
// without touching components.

export type ImageAsset = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export type ProjectStatus = "ongoing" | "completed";

export type ProjectCategory =
  | "residential"
  | "industrial"
  | "commercial"
  | "steel"
  | "concrete"
  | "roof"
  | "tower"
  | "liquid-retaining";

export type Project = {
  slug: string;
  name: string;
  /** Other titles the old site used for the same project. */
  alsoListedAs?: string[];
  /** Omitted when the source site does not state it. */
  status?: ProjectStatus;
  categories: ProjectCategory[];
  client?: string;
  architect?: string;
  location?: string;
  area?: string;
  span?: string;
  height?: string;
  structuralSystem?: string;
  columns?: string;
  lattice?: string;
  connections?: string;
  /** Scope of work, e.g. "Fabrication drawings". */
  scope?: string;
  description?: string;
  images: ImageAsset[];
  featured?: boolean;
  /** Fields flagged for client verification (see docs/content-verification.md). */
  verify?: string[];
};

export type Service = {
  id: string;
  slug: string;
  title: string;
  /** One-line factual summary for cards. */
  summary: string;
  /** Long-form copy for the Bespoke Services page (if the service appears there). */
  fullDescription?: string[];
  /** Methodology-page copy. */
  methodology?: {
    intro: string[];
    listLabel?: string;
    items?: string[];
    subItems?: { label: string; items: string[] };
    closing?: string[];
  };
  applications?: string[];
  systems?: string[];
  standards?: string[];
  image?: ImageAsset;
  icon: string;
  /** Primary detail location. */
  href: string;
};

export type TeamMember = {
  name: string;
  role: string;
  shortRole: string;
  biography: string[];
  photo?: ImageAsset;
  socialLinks?: { label: string; href: string }[];
};

export type Testimonial = {
  quote: string;
  person?: string;
  company?: string;
  role?: string;
};

export type Logo = {
  name: string;
  image: ImageAsset;
  href?: string;
};

export type Drawing = {
  id: string;
  set: "rcc" | "structural";
  title: string;
  image: ImageAsset;
};
