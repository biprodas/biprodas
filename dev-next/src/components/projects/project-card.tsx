import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRightIcon, ArrowUpRightIcon, GithubLogoIcon } from "@phosphor-icons/react/ssr";
import type { Project } from "@/content/types";
import { Tag } from "@/components/page";

const MAX_TAGS = 5;

/** Icon link in the card corner; dimmed and inert when there's no public URL. */
function CornerLink({
  href,
  label,
  missing,
  children,
}: {
  href?: string;
  label: string;
  missing: string;
  children: ReactNode;
}) {
  const base = "grid size-7 place-items-center transition-colors [&_svg]:size-[1.05rem]";
  return href ? (
    <a href={href} aria-label={label} title={label} className={`${base} text-ink-2 hover:bg-wash hover:text-primary`}>
      {children}
    </a>
  ) : (
    <span title={missing} className={`${base} cursor-not-allowed text-muted-foreground/40`}>
      {children}
      <span className="sr-only">{missing}</span>
    </span>
  );
}

/** Grid card: topics and links, title, a short summary, and the stack. */
export function ProjectCard({ project }: { project: Project }) {
  const repo = project.links.find((l) => l.kind === "repo");
  const live = project.links.find((l) => l.kind === "live");
  const name = project.shortTitle ?? project.title;
  const extra = project.tech.length - MAX_TAGS;

  return (
    <article className="group relative flex flex-col bg-card p-6 transition-colors duration-300 focus-within:bg-[color-mix(in_oklab,var(--primary)_5%,var(--card))] hover:bg-[color-mix(in_oklab,var(--primary)_5%,var(--card))]">
      {/* Accent rule that draws across the top on hover/focus. */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-primary transition-transform duration-300 ease-out group-focus-within:scale-x-100 group-hover:scale-x-100 motion-reduce:transition-none"
      />
      <div className="flex items-start justify-between gap-3">
        <p className="pt-1 text-[0.78rem] text-muted-foreground">{project.topics.join(" · ")}</p>
        <div className="-mt-0.5 -mr-1.5 flex shrink-0">
          <CornerLink href={repo?.url} label={`${name} on GitHub`} missing="Private repository">
            <GithubLogoIcon />
          </CornerLink>
          <CornerLink href={live?.url} label={`Visit ${live?.label ?? name}`} missing="No public site">
            <ArrowUpRightIcon />
          </CornerLink>
        </div>
      </div>
      <h3 className="mt-1.5 text-[1.2rem] font-semibold">
        <Link
          href={`/projects/${project.slug}`}
          className="group/title inline-flex items-center gap-1.5 transition-colors hover:text-primary focus-visible:text-primary"
        >
          {name}
          <ArrowRightIcon
            aria-hidden
            className="size-4 -translate-x-1 opacity-0 transition-all duration-300 group-hover/title:translate-x-0 group-hover/title:opacity-100 group-focus-visible/title:translate-x-0 group-focus-visible/title:opacity-100 motion-reduce:transition-none"
          />
        </Link>
      </h3>
      <p className="mt-2 line-clamp-3 text-[0.92rem] leading-relaxed text-ink-2 transition-colors group-hover:text-foreground">
        {project.summary}
      </p>
      <ul className="mt-auto flex flex-wrap items-center gap-1.5 pt-5" aria-label="Stack">
        {project.tech.slice(0, MAX_TAGS).map((t) => (
          <li key={t}>
            <Tag className="bg-background transition-colors group-hover:border-primary/30">{t}</Tag>
          </li>
        ))}
        {extra > 0 && <li className="text-meta">+{extra} more</li>}
      </ul>
    </article>
  );
}
