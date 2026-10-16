import type { Metadata } from "next";
import { company, contact, siteUrl, socials } from "@/content/site";
import type { Project, Service } from "@/content/types";

export const absoluteUrl = (path = "/") => `${siteUrl}${path === "/" ? "" : path}`;

const defaultOg = { url: "/og/formscape-global.jpg", width: 1200, height: 630, alt: "Formscape Global — Structural Engineering" };

/** Per-page metadata with canonical URL and Open Graph/Twitter defaults. */
export function pageMetadata({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description: string;
  path: string;
  image?: { url: string; width: number; height: number; alt: string };
}): Metadata {
  const og = image ?? defaultOg;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      title: `${title} | ${company.name}`,
      description,
      siteName: company.name,
      locale: "en_IN",
      images: [og],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${company.name}`,
      description,
      images: [og.url],
    },
  };
}

const orgId = `${siteUrl}/#organization`;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": orgId,
    name: company.name,
    alternateName: company.formerName,
    description: company.description,
    url: siteUrl,
    logo: absoluteUrl("/media/brand/formscape-global-logo.png"),
    image: absoluteUrl("/og/formscape-global.jpg"),
    telephone: "+91-99219-99974",
    email: contact.email,
    founder: { "@type": "Person", name: "Nayan Jivan Fatania" },
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.address.streetAddress,
      addressLocality: contact.address.locality,
      addressRegion: contact.address.region,
      postalCode: contact.address.postalCode,
      addressCountry: contact.address.country,
    },
    areaServed: { "@type": "Country", name: "India" },
    knowsAbout: ["Structural engineering", "Structural design", "Proof checking", "Fabrication drawings", "Steel structures", "Concrete structures"],
    sameAs: socials.map((s) => s.href),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}

export function servicesSchema(list: Service[], pagePath: string) {
  return {
    "@context": "https://schema.org",
    "@graph": list.map((s) => ({
      "@type": "Service",
      "@id": `${absoluteUrl(pagePath)}#${s.slug}`,
      name: s.title,
      serviceType: s.title,
      description: s.summary,
      provider: { "@id": orgId },
      areaServed: { "@type": "Country", name: "India" },
      url: `${absoluteUrl(pagePath)}#${s.slug}`,
    })),
  };
}

export function projectSchema(p: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: p.name,
    url: absoluteUrl(`/projects/${p.slug}`),
    description: p.description ?? `${p.name} — structural engineering project by ${company.name}.`,
    image: p.images.map((i) => absoluteUrl(i.src)),
    creator: { "@id": orgId },
    ...(p.location ? { locationCreated: { "@type": "Place", name: p.location } } : {}),
    ...(p.status ? { creativeWorkStatus: p.status === "completed" ? "Completed" : "In progress" } : {}),
  };
}
