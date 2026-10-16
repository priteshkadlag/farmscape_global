import type { Metadata } from "next";
import Image from "next/image";
import { methodologyIntro, methodologyServiceIds, serviceById } from "@/content/services";
import { media } from "@/content/media";
import { pageMetadata, servicesSchema } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/Section";
import { ClipReveal, Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { MethodologyDiagram } from "@/components/home/MethodologyDiagram";
import { ServiceDetail, ServiceIndex } from "@/components/services/ServiceDetail";
import { ContactCTA } from "@/components/home/HomeSections";

export const metadata: Metadata = pageMetadata({
  title: "Structural Design Methodology",
  description:
    "How Formscape Global designs concrete, steel, composite and liquid-retaining structures, machine foundations and technical drawings — to IS 456, IS 800, IS 3370 and IS 2974, with value engineering and proof checking.",
  path: "/structural-design-methodology",
});

const gallery = [
  media("/media/methodology/steel-frame-erection.jpg", "Steel roof frame being erected over concrete columns"),
  media("/media/methodology/industrial-building-under-construction.jpg", "Multi-storey industrial building under construction with scaffolding"),
  media("/media/methodology/residential-villa-completed.jpg", "Completed two-storey residential villa"),
  media("/media/methodology/industrial-building-facade.jpg", "Completed industrial building with vertical glazing"),
];

const standards = [
  { code: "IS 456", scope: "Plain and reinforced concrete", serviceId: "concrete-structures" },
  { code: "IS 800", scope: "General construction in steel", serviceId: "steel-structures" },
  { code: "IS 3370", scope: "Concrete structures for retaining liquids", serviceId: "liquid-retaining-structures" },
  { code: "IS 2974", scope: "Design and construction of machine foundations", serviceId: "machine-foundations" },
];

const qualityControl = [
  "Structural system finalised conceptually before analysis begins",
  "Analysis and design using modern computer hardware and software",
  "Extensive cross-checking of analysis and design results before drawings",
  "Detailing to country-specific standards, with joints detailed explicitly",
  "Independent proof checking available for critical or contractor-designed projects",
];

export default function MethodologyPage() {
  const list = methodologyServiceIds.map(serviceById);
  return (
    <>
      <PageHero
        eyebrow="Structural design methodology"
        title="A disciplined path from concept to drawing."
        intro={methodologyIntro[0]}
        crumbs={[{ name: "Structural Design Methodology", path: "/structural-design-methodology" }]}
        image={gallery[0]}
      />

      <section className="bg-paper py-20 sm:py-28" aria-labelledby="intro-title">
        <div className="container-site grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHeading index="01" eyebrow="Our approach" id="intro-title" title="Safe, sound, efficient and robust." />
            <Reveal delay={0.1} className="prose-site mt-8 max-w-xl text-lg leading-relaxed text-steel-600">
              {methodologyIntro.slice(1).map((p) => (
                <p key={p}>{p}</p>
              ))}
            </Reveal>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:col-span-6">
            {gallery.map((g, i) => (
              <ClipReveal key={g.src} className={`relative aspect-[4/3] bg-concrete-200 ${i % 2 ? "translate-y-8" : ""}`}>
                <Image src={g.src} alt={g.alt} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
              </ClipReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="on-dark relative overflow-hidden bg-ink py-20 text-paper sm:py-28" aria-labelledby="workflow-title">
        <div className="bg-blueprint-dark absolute inset-0" aria-hidden="true" />
        <div className="container-site relative">
          <SectionHeading index="02" eyebrow="Workflow" id="workflow-title" dark title="Seven stages, one standard." />
          <div className="mt-16">
            <MethodologyDiagram />
          </div>
        </div>
      </section>

      <section className="bg-paper py-20 sm:py-28" aria-labelledby="standards-title">
        <div className="container-site grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              index="03"
              eyebrow="Standards & quality control"
              id="standards-title"
              title="Designed to Indian Standards. Cross-checked before release."
              intro="Every design follows the applicable Bureau of Indian Standards code and passes through our internal cross-checks before release."
            />
          </div>
          <div className="grid gap-10 lg:col-span-6 lg:col-start-7">
            <RevealGroup as="ul" className="grid gap-px border border-ink/15 bg-ink/15 sm:grid-cols-2">
              {standards.map((s) => (
                <RevealItem as="li" key={s.code} className="bg-paper p-6">
                  <a href={`#${serviceById(s.serviceId).slug}`} className="group block">
                    <span className="font-display text-3xl font-bold tracking-tight group-hover:text-brand">{s.code}</span>
                    <span className="mt-2 block text-sm text-steel-600">{s.scope}</span>
                    <span className="mt-4 block font-mono text-xs uppercase tracking-[0.12em] text-brand">{serviceById(s.serviceId).title}</span>
                  </a>
                </RevealItem>
              ))}
            </RevealGroup>
            <Reveal>
              <h3 className="eyebrow text-steel-500">Quality-control approach</h3>
              <ol className="mt-4 border-t border-ink/10">
                {qualityControl.map((q, i) => (
                  <li key={q} className="flex gap-4 border-b border-ink/10 py-4">
                    <span className="font-mono text-sm text-brand">{String(i + 1).padStart(2, "0")}</span>
                    <span>{q}</span>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-t border-ink/10 bg-paper pb-20 pt-4 sm:pb-28" aria-labelledby="categories-title">
        <div className="container-site">
          <SectionHeading index="04" eyebrow="Service categories" id="categories-title" title="What we design, and how." className="mb-12 mt-16" />
          <ServiceIndex items={list} />
          {list.map((s, i) => (
            <ServiceDetail
              key={s.id}
              service={s}
              index={i}
              mode="methodology"
              related={
                s.id === "technical-drawings"
                  ? { label: "View sample drawings", href: "/sample-drawing" }
                  : s.fullDescription
                    ? { label: `${s.title} service overview`, href: `/bespoke-services#${s.slug}` }
                    : undefined
              }
            />
          ))}
        </div>
      </section>

      <section className="bg-concrete-100 py-20" aria-labelledby="drawings-cta-title">
        <div className="container-site flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="eyebrow text-brand">Sample drawings</p>
            <h2 id="drawings-cta-title" className="display-md mt-3 max-w-2xl">
              See the detailing for yourself — RCC and structural sample sheets.
            </h2>
          </div>
          <ButtonLink href="/sample-drawing">View sample drawings</ButtonLink>
        </div>
      </section>

      <ContactCTA title="Ready to start your design?" />
      <JsonLd data={servicesSchema(list, "/structural-design-methodology")} />
    </>
  );
}
