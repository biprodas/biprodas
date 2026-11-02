import Link from "next/link";
import { ArrowRightIcon, ArrowUpRightIcon, GithubLogoIcon } from "@phosphor-icons/react/ssr";
import type { Project } from "@/content/types";
import { Tag } from "@/components/page";

// Sits above the card-wide title link so it stays clickable.
const external =
  "relative z-10 inline-flex items-center gap-1 px-2 py-1 font-mono text-xs text-ink-2 transition-colors hover:bg-primary/10 hover:text-primary [&_svg]:size-3.5";

/** One project in a list: text-first, like an entry in a catalogue. */
export function ProjectEntry({ project, number }: { project: Project; number: string }) {
  return (
    <article className="group relative grid grid-cols-[2.2rem_minmax(0,1fr)] gap-x-2 border-b py-6 first:pt-0">
      <span className="pt-1 font-mono text-xs text-muted-foreground group-hover:text-primary">{number}</span>
      <div>
        <p className="text-meta">
          {project.domains.join(" · ")}
          {project.type === "Product" && " · own product"}
        </p>
        <h3 className="mt-1 text-lg font-semibold">
          <Link
            href={`/projects/${project.slug}`}
            className="group-hover:text-primary after:absolute after:inset-0 after:content-['']"
          >
            {project.shortTitle ?? project.title}
          </Link>
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-ink-2">{project.summary}</p>
        <ul className="mt-3 flex flex-wrap gap-1" aria-label="Stack">
          {project.technologies.slice(0, 6).map((t) => (
            <li key={t}>
              <Tag>{t}</Tag>
            </li>
          ))}
        </ul>
        <div className="mt-2 -ml-2 flex flex-wrap items-center gap-1">
          <span className="inline-flex items-center gap-1 px-2 py-1 font-mono text-xs text-primary transition-colors group-hover:bg-primary/10 group-has-[[data-external]:hover]:bg-transparent">
            Case study <ArrowRightIcon className="size-3 transition-transform group-hover:translate-x-0.5" />
          </span>
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" data-external className={external}>
              Live <ArrowUpRightIcon />
            </a>
          )}
          {project.demoUrl && (
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" data-external className={external}>
              Explore demo <ArrowUpRightIcon />
            </a>
          )}
          {project.sourceUrl && (
            <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer" data-external className={external}>
              <GithubLogoIcon /> Source
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
