import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Download, Mail, Phone } from "lucide-react";
import { aboutCopy, affiliations, clients, valuePillars } from "@/content/company";
import { contact } from "@/content/site";
import { services } from "@/content/services";
import { featuredProjects } from "@/content/projects";
import { media } from "@/content/media";
import { ButtonLink } from "@/components/ui/Button";
import { ContentIcon, WhatsAppIcon } from "@/components/ui/icons";
import { ClipReveal, Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/Section";
import { ProjectCard } from "@/components/projects/ProjectCard";
import type { Logo } from "@/content/types";
import { cn } from "@/lib/cn";

export function ValuePillars() {
  return (
    <section className="relative border-b border-ink/10 bg-paper py-20 sm:py-28" aria-labelledby="pillars-title">
      <div className="container-site">
        <SectionHeading
          index="01"
          eyebrow="What we do"
          id="pillars-title"
          title="From concept to structure."
          intro="Comprehensive structural engineering services — from conceptualisation to structuralisation."
          align="split"
        />
        <RevealGroup as="ol" className="mt-16 grid border-t border-ink/15 md:grid-cols-3">
          {valuePillars.map((p, i) => (
            <RevealItem
              as="li"
              key={p.title}
              className={cn("relative py-10 md:px-8 md:py-12", i > 0 && "border-t border-ink/15 md:border-l md:border-t-0", i === 0 && "md:pl-0")}
            >
              <span className="font-mono text-sm text-brand">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="display-md mt-6">{p.title}</h3>
              <p className="mt-4 max-w-sm leading-relaxed text-steel-600">{p.text}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

export function AboutPreview() {
  const img = media("/media/about/directors-at-office.jpg", "Formscape Global directors Nayan and Lahira Fatania at their office");
  const team = media("/media/team/formscape-global-site-team.jpg", "Formscape Global engineers reviewing drawings on site");
  return (
    <section className="bg-paper py-20 sm:py-28" aria-labelledby="about-title">
      <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="relative lg:col-span-5">
          <ClipReveal className="relative aspect-[4/5] w-4/5 bg-concrete-200">
            <Image src={img.src} alt={img.alt} fill sizes="(min-width: 1024px) 33vw, 80vw" className="object-cover object-top" />
          </ClipReveal>
          <ClipReveal direction="left" className="absolute -bottom-10 right-0 aspect-[3/2] w-3/5 border-8 border-paper bg-concrete-200">
            <Image src={team.src} alt={team.alt} fill sizes="(min-width: 1024px) 22vw, 60vw" className="object-cover" />
          </ClipReveal>
        </div>
        <div className="lg:col-span-6 lg:col-start-7 lg:pt-10">
          <SectionHeading index="02" eyebrow="About us" id="about-title" title="We bring life to your designs." />
          <Reveal delay={0.1} className="prose-site mt-8 max-w-xl text-lg leading-relaxed text-steel-600">
            {aboutCopy.history.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>
          <Reveal delay={0.2} className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/about-us">About Formscape Global</ButtonLink>
            <ButtonLink href={contact.companyProfilePdf} variant="outline" download icon={<Download className="size-4" />}>
              Company profile (PDF)
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function ServicesOverview() {
  return (
    <section className="on-dark relative overflow-hidden bg-ink py-20 text-paper sm:py-28" aria-labelledby="services-title">
      <div className="bg-blueprint-dark absolute inset-0" aria-hidden="true" />
      <div className="container-site relative">
        <SectionHeading
          index="03"
          eyebrow="Services"
          id="services-title"
          dark
          align="split"
          title="Structural solutions for every material and scale."
          intro="We turn your projects into reality with structural design, detailing and review — for concrete, steel and composite structures."
        />
        <RevealGroup as="ul" className="mt-16 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-5">
          {services.map((s, i) => (
            <RevealItem as="li" key={s.id} className="group relative bg-ink">
              <Link href={s.href} className="flex h-full min-h-64 flex-col p-6 transition-colors duration-300 hover:bg-graphite">
                <div className="flex items-start justify-between">
                  <ContentIcon name={s.icon} className="size-7 text-brand-300" />
                  <span className="font-mono text-xs text-steel-500">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-10 font-display text-lg font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-steel-400">{s.summary}</p>
                <span className="mt-auto inline-flex items-center gap-1 pt-6 text-sm text-brand-300">
                  Learn more
                  <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  <span className="sr-only">about {s.title}</span>
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

export function FeaturedProjects() {
  const list = featuredProjects();
  // Editorial rhythm: wide / narrow pairs.
  const layout = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-4", "lg:col-span-4", "lg:col-span-4", "lg:col-span-5", "lg:col-span-7", "lg:col-span-4", "lg:col-span-4", "lg:col-span-4"];
  const aspect = (i: number) => (i < 2 || i === 5 || i === 6 ? "aspect-[16/11]" : "aspect-[4/5]");
  return (
    <section className="bg-paper py-20 sm:py-28" aria-labelledby="projects-title">
      <div className="container-site">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading index="04" eyebrow="Featured projects" id="projects-title" title="Built on precision." />
          <Reveal className="flex flex-wrap gap-3">
            <ButtonLink href="/projects/ongoing" variant="outline">
              Ongoing
            </ButtonLink>
            <ButtonLink href="/projects/completed" variant="outline">
              Completed
            </ButtonLink>
          </Reveal>
        </div>
        <div className="mt-14 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-12">
          {list.map((p, i) => (
            <Reveal key={p.slug} className={cn(layout[i] ?? "lg:col-span-4", i === 1 && "lg:mt-24")}>
              <ClipReveal>
                <ProjectCard project={p} index={i} aspect={aspect(i)} sizes="(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw" />
              </ClipReveal>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-16 flex justify-center">
          <ButtonLink href="/projects">View all projects</ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}

function LogoCell({ logo }: { logo: Logo }) {
  return (
    <li className="flex h-24 items-center justify-center bg-white px-6">
      <Image
        src={logo.image.src}
        alt={logo.image.alt}
        width={logo.image.width}
        height={logo.image.height}
        sizes="160px"
        className="max-h-14 w-auto object-contain opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
      />
    </li>
  );
}

export function LogoRail() {
  return (
    <section className="bg-concrete-100 py-20 sm:py-24" aria-labelledby="clients-title">
      <div className="container-site">
        <SectionHeading index="08" eyebrow="Clients & associations" id="clients-title" title="Trusted by clients across Goa and India." />
        <h3 className="eyebrow mt-14 text-steel-600">Affiliations</h3>
        <ul className="mt-4 grid grid-cols-1 gap-px border border-ink/10 bg-ink/10 sm:grid-cols-3">
          {affiliations.map((l) => (
            <LogoCell key={l.name} logo={l} />
          ))}
        </ul>
        <h3 className="eyebrow mt-12 text-steel-600">Our clients</h3>
        <ul className="mt-4 grid grid-cols-2 gap-px border border-ink/10 bg-ink/10 sm:grid-cols-3 lg:grid-cols-5">
          {clients.map((l) => (
            <LogoCell key={l.name} logo={l} />
          ))}
        </ul>
      </div>
    </section>
  );
}

export function ContactCTA({ title = "Have a structure to design?" }: { title?: string }) {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-brand-800 py-20 text-paper sm:py-28" aria-labelledby="cta-title">
      <div className="bg-blueprint-dark absolute inset-0 -z-10" aria-hidden="true" />
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:items-end">
        <Reveal className="lg:col-span-7">
          <p className="eyebrow mb-6 text-brand-300">Get in touch</p>
          <h2 id="cta-title" className="display-xl text-balance">
            {title}
          </h2>
          <p className="mt-6 max-w-xl text-lg text-brand-100/80">
            Start building your vision with Formscape Global. Tell us about your project and we’ll get back to you.
          </p>
        </Reveal>
        <Reveal delay={0.1} className="grid gap-3 sm:grid-cols-2 lg:col-span-5">
          <ButtonLink href="/request-a-quote" variant="light" className="sm:col-span-2">
            Request a Quote
          </ButtonLink>
          <ButtonLink href={contact.phoneHref} variant="outline-light" icon={<Phone className="size-4" />}>
            Call {contact.phoneDisplay}
          </ButtonLink>
          <ButtonLink href={`mailto:${contact.email}`} variant="outline-light" icon={<Mail className="size-4" />}>
            Email us
          </ButtonLink>
          <ButtonLink
            href={contact.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            variant="outline-light"
            className="sm:col-span-2"
            icon={<WhatsAppIcon className="size-4" />}
          >
            Enquire on WhatsApp
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
