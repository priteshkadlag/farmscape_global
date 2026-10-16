import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { categoryLabel, getProject, projects, relatedProjects } from "@/content/projects";
import { company, contact } from "@/content/site";
import type { Project } from "@/content/types";
import { pageMetadata, projectSchema } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/Section";
import { ProjectCard, StatusBadge } from "@/components/projects/ProjectCard";
import { ProjectGallery } from "@/components/projects/ProjectGallery";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return { title: "Project not found" };
  const where = p.location ? ` in ${p.location}` : "";
  const img = p.images[0];
  return pageMetadata({
    title: p.name,
    description: p.description ? `${p.description} Structural engineering by ${company.name}${where}.` : `${p.name}${where} — a structural engineering project by ${company.name}.`,
    path: `/projects/${p.slug}`,
    image: { url: img.src, width: img.width, height: img.height, alt: img.alt },
  });
}

const specFields: { key: keyof Project; label: string }[] = [
  { key: "location", label: "Location" },
  { key: "client", label: "Client" },
  { key: "architect", label: "Architect" },
  { key: "structuralSystem", label: "Structural system" },
  { key: "scope", label: "Scope" },
  { key: "area", label: "Area" },
  { key: "span", label: "Span" },
  { key: "height", label: "Height" },
  { key: "columns", label: "Columns" },
  { key: "lattice", label: "Lattice" },
  { key: "connections", label: "Connections" },
];

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const specs = specFields.filter((f) => project[f.key]).map((f) => ({ label: f.label, value: String(project[f.key]) }));
  const hero = project.images[0];
  // Most portfolio photos are ~500px; only high-resolution images go full-bleed.
  const wide = hero.width >= 1100;
  const related = relatedProjects(project);
  const listing = project.status === "ongoing" ? { name: "Ongoing", path: "/projects/ongoing" } : project.status === "completed" ? { name: "Completed", path: "/projects/completed" } : null;

  return (
    <>
      <section className="on-dark relative isolate overflow-hidden bg-ink pt-[calc(var(--header-h)+2.5rem)] text-paper">
        <div className="bg-blueprint-dark absolute inset-0 -z-10" aria-hidden="true" />
        <div className="container-site">
          <Breadcrumbs
            items={[{ name: "Our Projects", path: "/projects" }, ...(listing ? [listing] : []), { name: project.name, path: `/projects/${project.slug}` }]}
          />
          <div className="rise-in mt-10 grid gap-8 pb-12 lg:grid-cols-12 lg:items-end">
            <div className={wide ? "lg:col-span-8" : "lg:col-span-7"}>
              <div className="flex flex-wrap items-center gap-3">
                {project.status && <StatusBadge status={project.status} />}
                {project.categories.map((c) => (
                  <span key={c} className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-steel-400">
                    {categoryLabel[c]}
                  </span>
                ))}
              </div>
              <h1 className="display-lg mt-6 text-balance">{project.name}</h1>
              {project.location && <p className="mt-6 font-mono text-sm uppercase tracking-[0.12em] text-steel-300">{project.location}</p>}
            </div>
            {!wide && (
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-steel-800 lg:col-span-5">
                <Image src={hero.src} alt={hero.alt} fill preload sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
              </div>
            )}
          </div>
        </div>
        {wide && (
          <div className="container-site">
            <div className="relative aspect-[16/9] max-h-[75svh] w-full overflow-hidden bg-steel-800 sm:aspect-[21/9]">
              <Image src={hero.src} alt={hero.alt} fill preload sizes="(min-width: 1408px) 1328px, 100vw" className="object-cover" />
            </div>
          </div>
        )}
        <div className="h-12 sm:h-16" aria-hidden="true" />
      </section>

      <section className="bg-paper pb-20 pt-8 sm:pb-28" aria-labelledby="overview-title">
        <div className="container-site grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 id="overview-title" className="eyebrow text-brand">
              Project overview
            </h2>
            <Reveal className="mt-6">
              <p className="font-display text-2xl font-medium leading-snug tracking-tight sm:text-3xl">
                {project.description ?? `${project.name}${project.location ? `, ${project.location}` : ""} — structural engineering by ${company.name}.`}
              </p>
            </Reveal>
            {project.images.length > 1 && (
              <div className="mt-14">
                <h2 className="eyebrow mb-6 text-steel-500">Gallery · {project.images.length} images</h2>
                <ProjectGallery images={project.images} title={project.name} />
              </div>
            )}
            {project.images.length === 1 && (
              <div className="mt-14 max-w-md">
                <ProjectGallery images={project.images} title={project.name} />
              </div>
            )}
          </div>

          <aside className="lg:col-span-4 lg:col-start-9" aria-labelledby="specs-title">
            <div className="lg:sticky lg:top-28">
              <h2 id="specs-title" className="eyebrow text-steel-500">
                Specifications
              </h2>
              <dl className="mt-4 border-t border-ink/15">
                {project.status && (
                  <div className="flex justify-between gap-6 border-b border-ink/10 py-4">
                    <dt className="text-sm text-steel-600">Status</dt>
                    <dd className="text-right font-medium">{project.status === "ongoing" ? "Ongoing" : "Completed"}</dd>
                  </div>
                )}
                {specs.map((s) => (
                  <div key={s.label} className="flex justify-between gap-6 border-b border-ink/10 py-4">
                    <dt className="text-sm text-steel-600">{s.label}</dt>
                    <dd className="text-right font-medium">{s.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-10 border border-ink/15 bg-concrete-100 p-6">
                <h2 className="font-display text-xl font-semibold">Planning something similar?</h2>
                <p className="mt-2 text-sm text-steel-600">Tell us about your structure and we’ll get back to you.</p>
                <div className="mt-6 grid gap-3">
                  <ButtonLink href="/request-a-quote">Request a Quote</ButtonLink>
                  <ButtonLink
                    href={contact.whatsappMessageHref(`Hello Formscape Global, I saw the "${project.name}" project on your website and would like to discuss a similar project.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outline"
                    icon={<MessageCircle className="size-4" />}
                  >
                    Ask on WhatsApp
                  </ButtonLink>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-ink/10 bg-paper py-20" aria-labelledby="related-title">
          <div className="container-site">
            <SectionHeading eyebrow="Related projects" id="related-title" title="More structures like this." />
            <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <ProjectCard key={r.slug} project={r} />
              ))}
            </div>
          </div>
        </section>
      )}
      <JsonLd data={projectSchema(project)} />
    </>
  );
}
