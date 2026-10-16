"use client";

import { AnimatePresence, LayoutGroup, m, useReducedMotion } from "motion/react";
import { useMemo, useState } from "react";
import type { Project, ProjectCategory, ProjectStatus } from "@/content/types";
import { cn } from "@/lib/cn";
import { ProjectCard } from "./ProjectCard";

type Filter = { id: string; label: string; test: (p: Project) => boolean };

const categoryOrder: ProjectCategory[] = ["residential", "industrial", "commercial", "steel", "concrete", "roof", "tower", "liquid-retaining"];

export function ProjectExplorer({
  projects,
  categoryLabels,
  statusLabels,
  showStatusFilters = true,
}: {
  projects: Project[];
  categoryLabels: Record<ProjectCategory, string>;
  statusLabels: Record<ProjectStatus, string>;
  showStatusFilters?: boolean;
}) {
  const reduce = useReducedMotion();
  const filters = useMemo<Filter[]>(() => {
    const f: Filter[] = [{ id: "all", label: "All", test: () => true }];
    if (showStatusFilters) {
      (["ongoing", "completed"] as const).forEach((s) => f.push({ id: s, label: statusLabels[s], test: (p) => p.status === s }));
    }
    categoryOrder.forEach((c) => f.push({ id: c, label: categoryLabels[c], test: (p) => p.categories.includes(c) }));
    // Only offer filters that match at least one project.
    return f.filter((x) => x.id === "all" || projects.some(x.test));
  }, [projects, categoryLabels, statusLabels, showStatusFilters]);

  const [active, setActive] = useState("all");
  const current = filters.find((f) => f.id === active) ?? filters[0];
  const visible = projects.filter(current.test);

  return (
    <div>
      <div className="flex flex-col gap-4 border-y border-ink/15 py-4 lg:flex-row lg:items-center lg:justify-between">
        <LayoutGroup id="project-filters">
          <ul className="flex flex-wrap gap-2" aria-label="Filter projects">
            {filters.map((f) => {
              const selected = f.id === active;
              const count = projects.filter(f.test).length;
              return (
                <li key={f.id}>
                  <button
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setActive(f.id)}
                    className={cn(
                      "relative inline-flex min-h-11 items-center gap-2 border px-4 text-sm transition-colors",
                      selected ? "border-ink text-paper" : "border-ink/15 text-ink hover:border-ink/50",
                    )}
                  >
                    {selected && <m.span layoutId="filter-bg" className="absolute inset-0 -z-0 bg-ink" transition={{ duration: reduce ? 0 : 0.3 }} />}
                    <span className="relative">{f.label}</span>
                    <span className={cn("relative font-mono text-xs", selected ? "text-steel-300" : "text-steel-500")}>{count}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </LayoutGroup>
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-steel-600" aria-live="polite">
          Showing {visible.length} of {projects.length} projects
        </p>
      </div>

      {visible.length === 0 ? (
        <div className="py-24 text-center">
          <p className="display-md">No projects match this filter.</p>
          <button type="button" onClick={() => setActive("all")} className="mt-6 inline-flex min-h-11 items-center text-brand underline underline-offset-4">
            Show all projects
          </button>
        </div>
      ) : (
        <m.ul layout={!reduce} className="mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((p) => (
              <m.li
                key={p.slug}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProjectCard project={p} headingLevel="h2" />
              </m.li>
            ))}
          </AnimatePresence>
        </m.ul>
      )}
    </div>
  );
}
