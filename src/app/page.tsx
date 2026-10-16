import type { Metadata } from "next";
import { companyVideo } from "@/content/company";
import { company } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { Hero } from "@/components/home/Hero";
import { HomeIntro } from "@/components/home/HomeIntro";
import { AboutPreview, ContactCTA, FeaturedProjects, LogoRail, ServicesOverview, ValuePillars } from "@/components/home/HomeSections";
import { MethodologyDiagram } from "@/components/home/MethodologyDiagram";
import { CompanyVideo } from "@/components/home/CompanyVideo";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/Section";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Structural Engineering Consultants in Goa, India",
    description: company.description,
    path: "/",
  }),
  title: { absolute: `${company.name} | Structural Engineering Consultants in Goa, India` },
};

export default function HomePage() {
  return (
    <>
      <HomeIntro />
      <Hero />
      <ValuePillars />
      <AboutPreview />
      <ServicesOverview />
      <FeaturedProjects />

      <section className="on-dark relative overflow-hidden bg-ink py-20 text-paper sm:py-28" aria-labelledby="method-title">
        <div className="bg-blueprint-dark absolute inset-0" aria-hidden="true" />
        <div className="container-site relative">
          <SectionHeading
            index="05"
            eyebrow="Methodology"
            id="method-title"
            dark
            align="split"
            title="Science, applied with an artistic eye."
            intro="Every structure follows the same disciplined path — from the architect’s brief to construction support — with results cross-checked before a single drawing is issued."
          />
          <div className="mt-16 lg:mt-20">
            <MethodologyDiagram />
          </div>
          <Reveal className="mt-14">
            <ButtonLink href="/structural-design-methodology" variant="outline-light">
              Explore our methodology
            </ButtonLink>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper py-20 sm:py-28" aria-labelledby="video-title">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-4">
            <SectionHeading index="06" eyebrow="Company film" id="video-title" title="Everything about us in two minutes." />
          </div>
          <Reveal className="lg:col-span-8">
            <CompanyVideo {...companyVideo} />
          </Reveal>
        </div>
      </section>

      <section className="overflow-hidden border-t border-ink/10 bg-paper py-20 sm:py-28" aria-labelledby="testimonials-title">
        <div className="container-site">
          <SectionHeading index="07" eyebrow="Testimonials" id="testimonials-title" title="What our clients say." />
          <div className="mt-14">
            <TestimonialsSection />
          </div>
        </div>
      </section>

      <LogoRail />
      <ContactCTA />
    </>
  );
}
