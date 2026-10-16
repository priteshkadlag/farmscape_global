import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import type { Service } from "@/content/types";
import { ContentIcon } from "@/components/ui/icons";
import { Annotation } from "@/components/ui/Section";
import { ClipReveal, Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

function List({ title, items, columns }: { title: string; items: string[]; columns?: boolean }) {
  return (
    <div>
      <h4 className="eyebrow text-steel-500">{title}</h4>
      <ul className={cn("mt-4 grid gap-x-8 border-t border-ink/10", columns && "sm:grid-cols-2")}>
        {items.map((it) => (
          <li key={it} className="flex gap-3 border-b border-ink/10 py-3 text-[0.95rem]">
            <Check className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Long-form service block. `mode` picks the copy set (bespoke vs. methodology). */
export function ServiceDetail({
  service,
  index,
  mode,
  related,
  headingLevel: H = "h3",
}: {
  service: Service;
  index: number;
  mode: "bespoke" | "methodology";
  related?: { label: string; href: string };
  headingLevel?: "h2" | "h3";
}) {
  const m = service.methodology;
  const paragraphs = mode === "bespoke" ? service.fullDescription ?? [] : m?.intro ?? [];
  const showImage = service.image && (index % 2 === 0 || mode === "bespoke");
  const flip = index % 2 === 1;

  // On the methodology page, list headings follow the source page’s wording.
  const appsTitle = service.id === "machine-foundations" ? "Scope" : service.id === "liquid-retaining-structures" ? "Expertise & experience" : "Applications";
  const sysTitle =
    service.id === "value-engineering" ? "Achieved through" : service.id === "technical-drawings" ? "Drawings prepared" : "Structural systems";

  return (
    <article id={service.slug} className="scroll-mt-28 border-t border-ink/15 py-16 sm:py-20" aria-labelledby={`${service.slug}-title`}>
      <div className="grid gap-10 lg:grid-cols-12">
        <div className={cn("lg:col-span-7", flip && showImage && "lg:order-2 lg:col-start-6")}>
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="font-mono text-sm text-brand">{String(index + 1).padStart(2, "0")}</span>
              <ContentIcon name={service.icon} className="size-6 text-steel-500" />
            </div>
            <H id={`${service.slug}-title`} className="display-md mt-5">
              {service.title}
            </H>
          </Reveal>
          <Reveal delay={0.05} className="prose-site mt-6 max-w-2xl text-lg leading-relaxed text-steel-600">
            {paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>

          {mode === "methodology" && (
            <Reveal delay={0.1} className="mt-10 grid gap-10">
              {m?.subItems && m.items ? (
                <>
                  <List title="Includes" items={[m.items[0]]} />
                  <List title={m.subItems.label.replace(/:$/, "")} items={m.subItems.items} />
                  <List title="Optional" items={m.items.slice(1)} />
                </>
              ) : null}
              {service.applications && <List title={appsTitle} items={service.applications} columns />}
              {service.systems && <List title={sysTitle} items={service.systems} columns />}
            </Reveal>
          )}

          {(service.standards?.length || related) && (
            <Reveal delay={0.15} className="mt-8 flex flex-wrap items-center gap-3">
              {mode === "methodology" &&
                service.standards?.map((s) => (
                  <Annotation key={s}>
                    Design to <strong className="font-medium text-ink">{s}</strong>
                  </Annotation>
                ))}
              {related && (
                <Link href={related.href} className="inline-flex min-h-11 items-center text-sm font-medium text-brand underline-offset-4 hover:underline">
                  {related.label} →
                </Link>
              )}
            </Reveal>
          )}
        </div>

        {showImage && service.image && (
          <div className={cn("lg:col-span-5", flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-8")}>
            <ClipReveal className="relative aspect-[4/3] bg-concrete-200 lg:sticky lg:top-28">
              <Image src={service.image.src} alt={service.image.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
            </ClipReveal>
          </div>
        )}
      </div>
    </article>
  );
}

/** Anchored index of services on the page. */
export function ServiceIndex({ items }: { items: Service[] }) {
  return (
    <nav aria-label="Services on this page" className="border-y border-ink/15">
      <ol className="flex snap-x gap-0 overflow-x-auto [scrollbar-width:none] lg:flex-wrap">
        {items.map((s, i) => (
          <li key={s.id} className="shrink-0 snap-start">
            <a
              href={`#${s.slug}`}
              className="flex min-h-14 items-center gap-3 border-r border-ink/10 px-5 text-sm font-medium transition-colors hover:bg-concrete-100 hover:text-brand"
            >
              <span className="font-mono text-xs text-steel-500">{String(i + 1).padStart(2, "0")}</span>
              {s.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
