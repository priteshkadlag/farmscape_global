import type { Metadata } from "next";
import { projects } from "@/content/projects";
import { media } from "@/content/media";
import { pageMetadata } from "@/lib/seo";
import { ProjectsListing } from "@/components/projects/ProjectsListing";

export const metadata: Metadata = pageMetadata({
  title: "Our Projects",
  description:
    "Structural engineering projects by Formscape Global across Goa and India — exhaust stack towers, steel portal-frame industrial sheds, structural roofs, villas and liquid-retaining structures.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <ProjectsListing
      eyebrow="Our projects"
      title="Structures we’ve engineered."
      intro="From 30 m exhaust stack towers to villas and industrial sheds — browse our portfolio by status or structure type."
      crumbs={[{ name: "Our Projects", path: "/projects" }]}
      projects={projects}
      currentHref="/projects"
      image={media("/media/projects/shed-banda-pai-kane-1.jpg", "")}
    />
  );
}
