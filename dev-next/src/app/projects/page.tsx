import type { Metadata } from "next";
import { PageHeader } from "@/components/page";
import { ProjectList } from "@/components/projects/project-list";

export const metadata: Metadata = {
  title: "Projects",
  description: "SaaS, FinTech, AI, EdTech and GovTech systems by Biprodas Roy, each with a case study.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title="Things I've built"
        lede="Platforms for lending, accounting, billing, schools, land records and AI content. Each case study covers the problem, the architecture and the decisions behind it."
      />
      <ProjectList />
    </>
  );
}
