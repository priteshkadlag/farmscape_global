import type { Metadata } from "next";
import Image from "next/image";
import { Download, FileText } from "lucide-react";
import { aboutCopy, commitments, directors, valuePillars, whyChooseUs } from "@/content/company";
import { company, contact } from "@/content/site";
import { media } from "@/content/media";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/Section";
import { ClipReveal, Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ContentIcon, LinkedInIcon } from "@/components/ui/icons";
import { ButtonLink } from "@/components/ui/Button";
import { ContactCTA } from "@/components/home/HomeSections";

export const metadata: Metadata = pageMetadata({
  title: "About Us",
  description:
    "Formscape Global — formerly M/S. Nayan Fatania & Associates — is a structural engineering practice in Goa led by Nayan Jivan Fatania (CEO) and Lahira Salkar Fatania (COO), serving clients across India.",
  path: "/about-us",
});

const teamPhoto = media("/media/team/formscape-global-team.jpg", "The Formscape Global team at the office");
const siteTeam = media("/media/team/formscape-global-site-team.jpg", "Formscape Global engineers reviewing drawings on a construction site");
const collage = media("/media/about/formscape-global-project-collage.jpg", "Collage of Formscape Global projects and the directors");

const timeline = [
  { label: "Founded as", title: company.formerName, text: "Founded by Mr. Nayan Jivan Fatania, the practice grew steadily serving clients in Goa, Maharashtra and Gujarat." },
  ...(company.incorporationYear
    ? [{ label: String(company.incorporationYear), title: "Incorporated", text: "Formally incorporated as a structural design firm." }]
    : []),
  { label: String(company.rebrandYear), title: "Rebranded as Formscape Global", text: "A renewed identity reflecting broader business objectives and a larger client base across the country." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="We bring life to your designs."
        intro={aboutCopy.intro}
        crumbs={[{ name: "About Us", path: "/about-us" }]}
        image={teamPhoto}
      />

      {/* Introduction & evolution */}
      <section className="bg-paper py-20 sm:py-28" aria-labelledby="evolution-title">
        <div className="container-site grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHeading index="01" eyebrow="Our story" id="evolution-title" title="An evolving structural practice." />
            <Reveal delay={0.1} className="prose-site mt-8 max-w-xl text-lg leading-relaxed text-steel-600">
              {aboutCopy.history.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </Reveal>
            <ol className="mt-12 border-l border-ink/15">
              {timeline.map((t, i) => (
                <Reveal as="li" key={t.title} delay={0.1 * i} className="relative block pb-10 pl-8 last:pb-0">
                  <span className="absolute -left-[5px] top-1.5 size-[9px] border border-brand bg-paper" aria-hidden="true" />
                  <span className="font-mono text-xs uppercase tracking-[0.14em] text-brand">{t.label}</span>
                  <span className="mt-1 block font-display text-xl font-semibold">{t.title}</span>
                  <span className="mt-2 block max-w-md text-steel-600">{t.text}</span>
                </Reveal>
              ))}
            </ol>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <ClipReveal className="relative aspect-[5/6] bg-concrete-200">
              <Image src={collage.src} alt={collage.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
            </ClipReveal>
          </div>
        </div>
      </section>

      {/* Mission & philosophy */}
      <section className="on-dark relative overflow-hidden bg-ink py-20 text-paper sm:py-28" aria-labelledby="mission-title">
        <div className="bg-blueprint-dark absolute inset-0" aria-hidden="true" />
        <div className="container-site relative">
          <SectionHeading index="02" eyebrow="Mission & philosophy" id="mission-title" dark title="Science and art, in equal measure." intro={aboutCopy.philosophy} align="split" />
          <RevealGroup as="ol" className="mt-16 grid gap-px bg-white/10 md:grid-cols-3">
            {valuePillars.map((p, i) => (
              <RevealItem as="li" key={p.title} className="bg-ink p-8">
                <span className="font-mono text-sm text-brand-300">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="display-md mt-8">{p.title}</h3>
                <p className="mt-4 text-steel-400">{p.text}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Growth */}
      <section className="bg-paper py-20 sm:py-28" aria-labelledby="growth-title">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <SectionHeading index="03" eyebrow="Growth" id="growth-title" title="From Goa to clients across India." />
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-steel-600">{aboutCopy.growth}</p>
            </Reveal>
          </div>
          <RevealGroup as="ul" className="grid grid-cols-2 border-t border-l border-ink/15 lg:col-span-5 lg:col-start-8">
            {company.regionsServed.map((r, i) => (
              <RevealItem as="li" key={r} className="border-b border-r border-ink/15 p-6">
                <span className="font-mono text-xs text-steel-500">{String(i + 1).padStart(2, "0")}</span>
                <span className="mt-6 block font-display text-2xl font-semibold">{r === "India" ? "Wider India" : r}</span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Directors */}
      <section className="border-t border-ink/10 bg-concrete-100 py-20 sm:py-28" aria-labelledby="directors-title">
        <div className="container-site">
          <SectionHeading index="04" eyebrow="Leadership" id="directors-title" title="Meet our directors." />
          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {directors.map((d, i) => (
              <Reveal as="article" key={d.name} delay={0.1 * i} className="grid gap-6 border border-ink/10 bg-paper p-6 sm:grid-cols-[150px_1fr] sm:p-8">
                {d.photo && (
                  <div className="relative aspect-[143/234] w-[150px] overflow-hidden bg-concrete-200">
                    <Image src={d.photo.src} alt={d.photo.alt} fill sizes="150px" className="object-cover" />
                  </div>
                )}
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.14em] text-brand">
                    {d.shortRole} · {d.role}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight">{d.name}</h3>
                  <div className="prose-site mt-4 text-steel-600">
                    {d.biography.map((b) => (
                      <p key={b}>{b}</p>
                    ))}
                  </div>
                  {d.socialLinks?.map((s) => (
                    <a
                      key={s.href}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-brand hover:underline"
                    >
                      <LinkedInIcon className="size-4" /> {s.label}
                      <span className="sr-only">profile of {d.name} (opens in a new tab)</span>
                    </a>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="scroll-mt-24 bg-paper py-20 sm:py-28" aria-labelledby="team-title">
        <div className="container-site">
          <SectionHeading index="05" eyebrow="Our team" id="team-title" title="The people behind every drawing." />
          <div className="mt-14 grid gap-6 md:grid-cols-12">
            <ClipReveal className="relative aspect-[3/2] bg-concrete-200 md:col-span-7">
              <Image src={teamPhoto.src} alt={teamPhoto.alt} fill sizes="(min-width: 768px) 58vw, 100vw" className="object-cover" />
            </ClipReveal>
            <ClipReveal className="relative aspect-[3/2] bg-concrete-200 md:col-span-5 md:mt-24">
              <Image src={siteTeam.src} alt={siteTeam.alt} fill sizes="(min-width: 768px) 42vw, 100vw" className="object-cover" />
            </ClipReveal>
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="on-dark relative overflow-hidden bg-graphite py-20 text-paper sm:py-28" aria-labelledby="why-title">
        <div className="bg-blueprint-dark absolute inset-0" aria-hidden="true" />
        <div className="container-site relative">
          <SectionHeading index="06" eyebrow="Why choose us" id="why-title" dark title="Accuracy you can build on." intro={aboutCopy.whyIntro} align="split" />
          <RevealGroup as="ul" className="mt-16 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {whyChooseUs.map((w) => (
              <RevealItem as="li" key={w.title} className="bg-graphite p-8">
                <ContentIcon name={w.icon} className="size-8 text-brand-300" />
                <h3 className="mt-10 font-display text-xl font-semibold">{w.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-steel-400">{w.text}</p>
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/10 pt-8">
            <span className="eyebrow text-steel-400">Our commitment</span>
            {commitments.map((c) => (
              <span key={c} className="font-display text-lg font-medium">
                {c}
              </span>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Company profile */}
      <section className="bg-paper py-20" aria-labelledby="profile-title">
        <div className="container-site">
          <Reveal className="flex flex-col gap-8 border border-ink/15 p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex gap-6">
              <FileText className="size-10 shrink-0 text-brand" strokeWidth={1.25} aria-hidden="true" />
              <div>
                <h2 id="profile-title" className="display-md">
                  Company profile
                </h2>
                <p className="mt-2 max-w-xl text-steel-600">Download the Formscape Global company profile for a complete overview of our services and work.</p>
              </div>
            </div>
            <ButtonLink href={contact.companyProfilePdf} download icon={<Download className="size-4" />}>
              Download PDF (7.5 MB)
            </ButtonLink>
          </Reveal>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
