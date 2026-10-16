import type { Metadata } from "next";
import { bespokeServiceIds, serviceById } from "@/content/services";
import { pageMetadata, servicesSchema } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { ServiceDetail, ServiceIndex } from "@/components/services/ServiceDetail";
import { ContactCTA } from "@/components/home/HomeSections";
import { JsonLd } from "@/components/ui/JsonLd";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = pageMetadata({
  title: "Bespoke Structural Engineering Services",
  description:
    "Structural design, fabrication drawings, proof checking, steel, composite and liquid-retaining structures, machine foundations and value engineering — tailored to each project by Formscape Global.",
  path: "/bespoke-services",
});

export default function BespokeServicesPage() {
  const list = bespokeServiceIds.map(serviceById);
  return (
    <>
      <PageHero
        eyebrow="Bespoke services"
        title="Engineering tailored to every structure."
        intro="We turn dream projects into reality with structural solutions designed around your objectives, constraints and specifications."
        crumbs={[{ name: "Bespoke Services", path: "/bespoke-services" }]}
        image={list[1].image}
      />
      <section className="bg-paper pb-20 pt-12 sm:pb-28" aria-label="Services">
        <div className="container-site">
          <ServiceIndex items={list} />
          {list.map((s, i) => (
            <ServiceDetail
              key={s.id}
              service={s}
              index={i}
              mode="bespoke"
              headingLevel="h2"
              related={s.methodology ? { label: "How we approach this", href: `/structural-design-methodology#${s.slug}` } : undefined}
            />
          ))}
          <div className="flex flex-col gap-6 border-t border-ink/15 pt-12 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-lg text-steel-600">
              Looking for concrete structures or technical drawing preparation? See the full list of categories in our methodology.
            </p>
            <ButtonLink href="/structural-design-methodology" variant="outline">
              View methodology
            </ButtonLink>
          </div>
        </div>
      </section>
      <ContactCTA />
      <JsonLd data={servicesSchema(list, "/bespoke-services")} />
    </>
  );
}
