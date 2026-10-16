import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { BlueprintLines } from "@/components/ui/BlueprintLines";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

const links = [
  { label: "Our Projects", href: "/projects" },
  { label: "Bespoke Services", href: "/bespoke-services" },
  { label: "Sample Drawings", href: "/sample-drawing" },
  { label: "Contact Us", href: "/contact-us" },
];

export default function NotFound() {
  return (
    <section className="on-dark relative isolate flex min-h-svh items-center overflow-hidden bg-ink pt-[var(--header-h)] text-paper">
      <div className="bg-blueprint-dark absolute inset-0 -z-10" aria-hidden="true" />
      <BlueprintLines className="absolute inset-0 -z-10 h-full w-full text-brand-300/30" />
      <div className="container-site py-24">
        <p className="eyebrow text-brand-300">Error 404 · Member not found</p>
        <h1 className="display-xl mt-6 max-w-4xl text-balance">This page isn’t on the drawing set.</h1>
        <p className="mt-6 max-w-xl text-lg text-steel-300">
          The page you’re looking for may have moved when our website was rebuilt. Try one of these instead:
        </p>
        <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-2">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="inline-flex min-h-11 items-center border-b border-white/20 text-paper hover:border-white">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <ButtonLink href="/" variant="light">
            Back to home
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
