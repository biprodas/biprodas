import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageHeader } from "@/components/page";
import { ProjectList } from "@/components/projects/project-list";
import { isEnabled } from "@/config/site";

export const metadata: Metadata = {
  title: "Projects",
  description: "SaaS, FinTech, AI, EdTech and GovTech systems by Biprodas Roy, each with a case study.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  if (!isEnabled("projects")) notFound();
  return (
    <>
      <PageHeader
        className="wide"
        eyebrow="Projects"
        title="Things I've built"
        lede="A collection of products and platforms I've designed and developed across FinTech, accounting, ERP, education, government services, and AI. Each project highlights the problems I set out to solve, the engineering decisions I made, and the technologies that brought them to life."
      />
      <ProjectList />
    </>
  );
}
