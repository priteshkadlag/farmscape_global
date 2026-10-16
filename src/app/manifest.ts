import type { MetadataRoute } from "next";
import { company } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${company.name} — ${company.tagline}`,
    short_name: company.name,
    description: company.shortDescription,
    start_url: "/",
    display: "browser",
    background_color: "#f5f3ef",
    theme_color: "#121318",
    icons: [{ src: "/icon.png", sizes: "512x512", type: "image/png" }],
  };
}
