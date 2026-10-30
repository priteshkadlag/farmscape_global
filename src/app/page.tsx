import type { Metadata } from "next";
import { company } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { Hero } from "@/components/home/Hero";
import { HomeIntro } from "@/components/home/HomeIntro";
import { XRay } from "@/components/home/XRay";
import { LoadPath } from "@/components/home/LoadPath";
import { Finale } from "@/components/home/Finale";
import { Capabilities, SelectedWork, TrustedBy } from "@/components/home/HomeSections";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Structural Engineering Consultants in Goa, India",
    description: company.description,
    path: "/",
  }),
  title: { absolute: `${company.name} | Structural Engineering Consultants in Goa, India` },
};

/**
 * "The Invisible Intelligence" — the home page as a short film. Each scene's
 * effect carries its idea: the frame erecting (hero), seeing through the
 * building (X-ray), the load path (principles), proof (reel), the index,
 * momentum, and the Cantilever F built as a structure (finale).
 */
export default function HomePage() {
  return (
    <>
      <HomeIntro />
      <Hero />
      <XRay />
      <LoadPath />
      <SelectedWork />
      <Capabilities />
      <TrustedBy />
      <Finale />
    </>
  );
}
