import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/ssr";
import type { Project } from "@/content/types";
import { Tag } from "@/components/page";

/** One project in a list: text-first, like an entry in a catalogue. */
export function ProjectEntry({ project, number }: { project: Project; number: string }) {
  return (
    <article className="group relative grid grid-cols-[2.2rem_minmax(0,1fr)] gap-x-2 border-b py-6 first:pt-0">
      <span className="pt-1 font-mono text-[0.68rem] text-muted-foreground group-hover:text-primary">{number}</span>
      <div>
        <p className="text-meta">
          {project.domains.join(" · ")}
          {project.kind === "product" && " · own product"}
        </p>
        <h3 className="mt-1 text-[1.15rem] font-semibold">
          <Link
            href={`/projects/${project.slug}`}
            className="group-hover:text-primary after:absolute after:inset-0 after:content-['']"
          >
            {project.shortTitle ?? project.title}
          </Link>
        </h3>
        <p className="mt-1.5 text-[0.95rem] leading-relaxed text-ink-2">{project.summary}</p>
        <ul className="mt-3 flex flex-wrap gap-1" aria-label="Stack">
          {project.tech.slice(0, 6).map((t) => (
            <li key={t}>
              <Tag>{t}</Tag>
            </li>
          ))}
        </ul>
        <span className="mt-3 inline-flex items-center gap-1 font-mono text-[0.7rem] text-primary">
          Case study <ArrowRightIcon className="size-3 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </article>
  );
}
