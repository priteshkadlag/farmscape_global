import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
    { path: "/", priority: 1, changeFrequency: "monthly" },
    { path: "/about-us", priority: 0.8, changeFrequency: "yearly" },
    { path: "/structural-design-methodology", priority: 0.8, changeFrequency: "yearly" },
    { path: "/bespoke-services", priority: 0.9, changeFrequency: "yearly" },
    { path: "/sample-drawing", priority: 0.7, changeFrequency: "yearly" },
    { path: "/projects", priority: 0.9, changeFrequency: "monthly" },
    { path: "/projects/ongoing", priority: 0.7, changeFrequency: "monthly" },
    { path: "/projects/completed", priority: 0.7, changeFrequency: "monthly" },
    { path: "/contact-us", priority: 0.8, changeFrequency: "yearly" },
    { path: "/request-a-quote", priority: 0.8, changeFrequency: "yearly" },
    { path: "/privacy-policy", priority: 0.2, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
  ];
  return [
    ...pages.map((p) => ({ url: absoluteUrl(p.path), priority: p.priority, changeFrequency: p.changeFrequency })),
    ...projects.map((p) => ({
      url: absoluteUrl(`/projects/${p.slug}`),
      priority: 0.6,
      changeFrequency: "yearly" as const,
      images: p.images.map((i) => absoluteUrl(i.src)),
    })),
  ];
}
