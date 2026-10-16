import type { Metadata } from "next";
import { drawings } from "@/content/company";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { DrawingViewer } from "@/components/media/DrawingViewer";
import { ContactCTA } from "@/components/home/HomeSections";
import { Reveal } from "@/components/ui/Reveal";
import Link from "next/link";

export const metadata: Metadata = pageMetadata({
  title: "Sample Drawings",
  description:
    "Sample RCC and structural detail drawings prepared by Formscape Global — reinforcement details, sections and schedules prepared to execution standard.",
  path: "/sample-drawing",
  image: { url: "/media/drawings/rcc-detail-sheet-01.jpg", width: 1086, height: 768, alt: "Sample RCC detail drawing by Formscape Global" },
});

export default function SampleDrawingsPage() {
  return (
    <>
      <PageHero
        eyebrow="Sample drawings"
        title="Detailing, ready for site."
        intro="A selection of RCC and structural detail sheets from our detailing unit. Open any sheet to zoom, pan and inspect the details."
        crumbs={[{ name: "Sample Drawings", path: "/sample-drawing" }]}
      />
      <section className="bg-paper py-16 sm:py-24" aria-label="Drawing gallery">
        <div className="container-site">
          <DrawingViewer drawings={drawings} />
          <Reveal className="mt-14 grid gap-4 border-t border-ink/15 pt-8 text-steel-600 md:grid-cols-2">
            <p>
              Drawings are prepared to the client’s own standards and templates, or to templates developed by Formscape Global for each structure type.{" "}
              <Link href="/structural-design-methodology#technical-drawings" className="font-medium text-brand underline-offset-4 hover:underline">
                Read about our technical drawing preparation
              </Link>
              .
            </p>
            <p>
              Sample sheets are shared for reference only and may not be reproduced. For fabrication drawings, see{" "}
              <Link href="/bespoke-services#fabrication-drawings" className="font-medium text-brand underline-offset-4 hover:underline">
                Fabrication Drawings
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>
      <ContactCTA title="Need drawings like these?" />
    </>
  );
}
