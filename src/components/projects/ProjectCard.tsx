import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import type { Project } from "@/content/types";
import { categoryLabel, statusLabel } from "@/content/projects";
import { cn } from "@/lib/cn";

export function StatusBadge({ status, className }: { status: NonNullable<Project["status"]>; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-1 font-mono text-[0.65rem] uppercase tracking-[0.14em]",
        status === "ongoing" ? "bg-brand text-white" : "bg-paper text-ink",
        className,
      )}
    >
      <span className={cn("size-1.5 rounded-full", status === "ongoing" ? "bg-brand-300" : "bg-brand")} aria-hidden="true" />
      {statusLabel[status]}
    </span>
  );
}

export function ProjectCard({
  project,
  index,
  aspect = "aspect-[4/3]",
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  headingLevel: H = "h3",
}: {
  project: Project;
  index?: number;
  aspect?: string;
  sizes?: string;
  headingLevel?: "h2" | "h3";
}) {
  const img = project.images[0];
  const credit = project.client ? `Client: ${project.client}` : project.architect ? `Architect: ${project.architect}` : null;
  return (
    <article className="group relative">
      <div className={cn("relative overflow-hidden bg-steel-800", aspect)}>
        <Image
          src={img.src}
          alt={img.alt}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-precise)] group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-80" aria-hidden="true" />
        {project.status && <StatusBadge status={project.status} className="absolute left-3 top-3" />}
        {typeof index === "number" && (
          <span className="absolute right-3 top-3 font-mono text-xs text-white/80" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
        <span
          className="absolute bottom-3 right-3 inline-flex size-10 items-center justify-center bg-paper text-ink opacity-0 transition-all duration-300 group-hover:opacity-100 group-focus-within:opacity-100"
          aria-hidden="true"
        >
          <ArrowUpRight className="size-4" />
        </span>
      </div>
      <div className="mt-4">
        {project.categories.length > 0 && (
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-steel-500">
            {project.categories.slice(0, 2).map((c) => categoryLabel[c]).join(" · ")}
          </p>
        )}
        <H className="mt-1 font-display text-xl font-semibold leading-snug tracking-tight">
          <Link href={`/projects/${project.slug}`} className="after:absolute after:inset-0 group-hover:text-brand">
            {project.name}
          </Link>
        </H>
        <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-steel-600">
          {project.location && (
            <span className="inline-flex items-center gap-1">
              <MapPin className="size-3.5" aria-hidden="true" />
              {project.location}
            </span>
          )}
          {credit && <span>{credit}</span>}
        </div>
      </div>
    </article>
  );
}
