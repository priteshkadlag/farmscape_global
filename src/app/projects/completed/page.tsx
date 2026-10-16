import type { Metadata } from "next";
import { projectsByStatus } from "@/content/projects";
import { media } from "@/content/media";
import { pageMetadata } from "@/lib/seo";
import { ProjectsListing } from "@/components/projects/ProjectsListing";

export const metadata: Metadata = pageMetadata({
  title: "Completed Projects",
  description:
    "Completed structural engineering projects by Formscape Global — exhaust stack towers at Mopa and Visakhapatnam, steel portal-frame sheds, breweries, showrooms and structural roofs.",
  path: "/projects/completed",
});

export default function CompletedProjectsPage() {
  return (
    <ProjectsListing
      eyebrow="Completed projects"
      title="Designed, detailed, delivered."
      intro="A selection of completed structures — towers, industrial buildings, roofs and pools."
      crumbs={[
        { name: "Our Projects", path: "/projects" },
        { name: "Completed", path: "/projects/completed" },
      ]}
      projects={projectsByStatus("completed")}
      currentHref="/projects/completed"
      image={media("/media/projects/exhaust-stack-tower-visakhapatnam-1.jpg", "")}
    />
  );
}
