import Link from "next/link";
import type { Project } from "@/content/types";
import { categoryLabel, statusLabel } from "@/content/projects";
import { PageHero } from "@/components/ui/PageHero";
import { ContactCTA } from "@/components/home/HomeSections";
import type { Crumb } from "@/components/ui/Breadcrumbs";
import type { ImageAsset } from "@/content/types";
import { ProjectExplorer } from "./ProjectExplorer";
import { cn } from "@/lib/cn";

const views = [
  { label: "All Projects", href: "/projects" },
  { label: "Ongoing", href: "/projects/ongoing" },
  { label: "Completed", href: "/projects/completed" },
];

/** Shared layout for /projects, /projects/ongoing and /projects/completed. */
export function ProjectsListing({
  eyebrow,
  title,
  intro,
  crumbs,
  projects,
  currentHref,
  image,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  crumbs: Crumb[];
  projects: Project[];
  currentHref: string;
  image?: ImageAsset;
}) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} intro={intro} crumbs={crumbs} image={image}>
        <nav aria-label="Project views" className="mt-12">
          <ul className="flex flex-wrap gap-2">
            {views.map((v) => (
              <li key={v.href}>
                <Link
                  href={v.href}
                  aria-current={v.href === currentHref ? "page" : undefined}
                  className={cn(
                    "inline-flex min-h-11 items-center border px-4 text-sm transition-colors",
                    v.href === currentHref ? "border-paper bg-paper text-ink" : "border-white/25 text-paper hover:border-white",
                  )}
                >
                  {v.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>
      <section className="bg-paper py-12 sm:py-16" aria-label="Projects">
        <div className="container-site">
          <ProjectExplorer
            projects={projects}
            categoryLabels={categoryLabel}
            statusLabels={statusLabel}
            showStatusFilters={currentHref === "/projects"}
          />
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
