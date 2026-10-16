import Link from "next/link";
import { Download, Mail, MapPin, Phone } from "lucide-react";
import { company, contact, socials } from "@/content/site";
import { services } from "@/content/services";
import { featuredProjects } from "@/content/projects";
import { WhatsAppIcon, socialIcon } from "@/components/ui/icons";
import { CopyrightYear } from "./CopyrightYear";
import { Logo } from "./Logo";
import { ScrollToTopButton } from "./ScrollToTopButton";

const primary = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Structural Design Methodology", href: "/structural-design-methodology" },
  { label: "Bespoke Services", href: "/bespoke-services" },
  { label: "Sample Drawings", href: "/sample-drawing" },
  { label: "Contact Us", href: "/contact-us" },
  { label: "Request a Quote", href: "/request-a-quote" },
];

const projectLinks = [
  { label: "All Projects", href: "/projects" },
  { label: "Ongoing Projects", href: "/projects/ongoing" },
  { label: "Completed Projects", href: "/projects/completed" },
  ...featuredProjects()
    .slice(0, 4)
    .map((p) => ({ label: p.name, href: `/projects/${p.slug}` })),
];

function Col({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="eyebrow mb-5 text-steel-400">{title}</h2>
      {children}
    </div>
  );
}

const linkCls = "inline-flex min-h-9 items-center text-sm text-steel-300 transition-colors hover:text-white";

export function Footer() {
  return (
    <footer className="on-dark relative overflow-hidden bg-ink text-paper">
      <div className="bg-blueprint-dark absolute inset-0" aria-hidden="true" />
      <div className="container-site relative pb-10 pt-20">
        <div className="mb-10 flex justify-end">
          <ScrollToTopButton />
        </div>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo light />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-steel-300">{company.shortDescription}</p>
            <a
              href={contact.companyProfilePdf}
              className="mt-6 inline-flex min-h-11 items-center gap-2 border border-white/20 px-4 text-sm transition-colors hover:border-white"
              download
            >
              <Download className="size-4" aria-hidden="true" />
              Company profile <span className="text-steel-400">(PDF, 7.5 MB)</span>
            </a>
            <ul className="mt-8 flex gap-2" aria-label="Social media">
              {socials.map((s) => {
                const Icon = socialIcon[s.icon];
                return (
                  <li key={s.href}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex size-11 items-center justify-center border border-white/15 text-steel-300 transition-colors hover:border-white hover:text-white"
                    >
                      <Icon className="size-4" />
                      <span className="sr-only">{s.label} (opens in a new tab)</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-8">
            <Col title="Company">
              <ul>
                {primary.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={linkCls}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </Col>
            <Col title="Services">
              <ul>
                {services.map((s) => (
                  <li key={s.id}>
                    <Link href={s.href} className={linkCls}>
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </Col>
            <Col title="Projects">
              <ul>
                {projectLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={linkCls}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </Col>
          </div>
        </div>

        <div className="mt-16 grid gap-6 border-t border-white/10 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          <address className="flex gap-3 text-sm not-italic leading-relaxed text-steel-300 lg:col-span-2">
            <MapPin className="mt-0.5 size-4 shrink-0 text-brand-300" aria-hidden="true" />
            <span>
              {company.name}, {contact.address.lines.join(", ")}
              <br />
              <span className="text-steel-400">Landmark: {contact.address.landmark}</span>
            </span>
          </address>
          <a href={contact.phoneHref} className="flex min-h-11 items-center gap-3 text-sm text-steel-300 hover:text-white">
            <Phone className="size-4 text-brand-300" aria-hidden="true" />
            {contact.phoneDisplay}
          </a>
          <div className="grid gap-1 text-sm">
            <a href={`mailto:${contact.email}`} className="flex min-h-9 items-center gap-3 text-steel-300 hover:text-white">
              <Mail className="size-4 text-brand-300" aria-hidden="true" />
              {contact.email}
            </a>
            <a
              href={contact.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-9 items-center gap-3 text-steel-300 hover:text-white"
            >
              <WhatsAppIcon className="size-4 text-brand-300" />
              WhatsApp us
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-steel-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CopyrightYear /> {company.name}. All rights reserved.
          </p>
          <ul className="flex gap-6">
            <li>
              <Link href="/privacy-policy" className="inline-flex min-h-9 items-center hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="inline-flex min-h-9 items-center hover:text-white">
                Terms
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
