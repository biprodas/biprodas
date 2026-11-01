import Link from "next/link";
import type { Project } from "@/content/types";
import { skyCoordinates } from "@/lib/hash";
import { chip, cn, panel, panelHover } from "@/lib/ui";
import { StatusBadge } from "./StatusBadge";

export function ProjectCard({ project, headingLevel = "h3" }: { project: Project; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <article className={cn(panel, panelHover, "group relative flex h-full flex-col p-6")}>
      <div className="flex items-center justify-between gap-3 font-mono text-[0.65rem] text-dim">
        <span>{skyCoordinates(project.slug)}</span>
        {project.status ? (
          <StatusBadge status={project.status} />
        ) : (
          <span className="tracking-[0.15em] uppercase">{project.kind === "product" ? "Product" : "Client work"}</span>
        )}
      </div>
      <Heading className="mt-5 text-xl font-medium text-ink">
        <Link href={`/work/${project.slug}`} className="after:absolute after:inset-0 after:rounded-panel">
          {project.title}
        </Link>
      </Heading>
      <p className="mt-3 flex-1 leading-7 text-muted">{project.summary}</p>
      <ul className="mt-5 flex flex-wrap gap-2">
        {project.tech.slice(0, 5).map((t) => (
          <li key={t} className={chip}>
            {t}
          </li>
        ))}
      </ul>
      <p className="mt-5 text-sm text-dim transition-colors group-hover:text-signal">
        {project.caseStudy ? "Read the case study →" : "View details →"}
      </p>
    </article>
  );
}
