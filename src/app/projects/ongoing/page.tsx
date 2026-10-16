import type { Metadata } from "next";
import { projectsByStatus } from "@/content/projects";
import { media } from "@/content/media";
import { pageMetadata } from "@/lib/seo";
import { ProjectsListing } from "@/components/projects/ProjectsListing";

export const metadata: Metadata = pageMetadata({
  title: "Ongoing Projects",
  description: "Structural engineering projects Formscape Global is currently working on — villas, residences and industrial buildings across Goa.",
  path: "/projects/ongoing",
});

export default function OngoingProjectsPage() {
  return (
    <ProjectsListing
      eyebrow="Ongoing projects"
      title="On the drawing board and on site."
      intro="Projects currently in design or under construction."
      crumbs={[
        { name: "Our Projects", path: "/projects" },
        { name: "Ongoing", path: "/projects/ongoing" },
      ]}
      projects={projectsByStatus("ongoing")}
      currentHref="/projects/ongoing"
      image={media("/media/projects/villa-at-siolim-2.jpg", "")}
    />
  );
}
