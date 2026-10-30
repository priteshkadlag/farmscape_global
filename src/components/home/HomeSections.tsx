import { Mail, Phone } from "lucide-react";
import { clients } from "@/content/company";
import { contact } from "@/content/site";
import { services } from "@/content/services";
import { categoryLabel, getProject } from "@/content/projects";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import { CapabilityIndex } from "./CapabilityIndex";
import { Momentum } from "./Momentum";
import { WorkReel } from "./WorkReel";

// Server-side adapters: the home scenes are client components, so they get
// only the plain data they render rather than the whole content modules.

// Verified projects with photographs large enough to fill the screen,
// spanning residential, industrial steel and plant work.
const reelSlugs = ["sarjyotishis-wada", "industrial-shed-corlim-idc", "hvac-plant-binani", "villas-at-parra"];

export function SelectedWork() {
  const items = reelSlugs.map((slug) => {
    const p = getProject(slug);
    if (!p) throw new Error(`Unknown reel project ${slug}`);
    const meta = [...p.categories.slice(0, 2).map((c) => categoryLabel[c]), p.location].filter(Boolean).join(" · ");
    const credit = p.client ? `Client: ${p.client}` : p.architect ? `Architect: ${p.architect}` : undefined;
    return { slug: p.slug, name: p.name, image: { src: p.images[0].src, alt: p.images[0].alt }, meta, credit };
  });
  return <WorkReel items={items} />;
}

export function Capabilities() {
  const items = services.flatMap((s) => (s.image ? [{ id: s.id, title: s.title, href: s.href, summary: s.summary, image: { src: s.image.src, alt: s.image.alt } }] : []));
  return <CapabilityIndex items={items} />;
}

export function TrustedBy() {
  return (
    <Momentum logos={clients.map((l) => ({ name: l.name, src: l.image.src, alt: l.image.alt, width: l.image.width, height: l.image.height }))} />
  );
}

export function ContactCTA({
  title = "Have a structure to design?",
  intro = "Tell us what you’re building. We’ll show you what makes it possible.",
}: {
  title?: string;
  intro?: string;
}) {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-ink py-20 text-paper sm:py-28" aria-labelledby="cta-title">
      <div className="bg-blueprint-dark absolute inset-0 -z-10" aria-hidden="true" />
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:items-end">
        <Reveal className="lg:col-span-7">
          <p className="eyebrow mb-6 text-brand-300">Start a project</p>
          <h2 id="cta-title" className="display-xl text-balance">
            {title}
          </h2>
          <p className="mt-6 max-w-xl text-lg text-steel-300">{intro}</p>
        </Reveal>
        <Reveal delay={0.1} className="grid gap-3 sm:grid-cols-2 lg:col-span-5">
          <ButtonLink href="/request-a-quote" variant="accent" className="sm:col-span-2">
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
