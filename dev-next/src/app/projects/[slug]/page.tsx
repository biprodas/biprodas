import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon, ArrowRightIcon, ArrowUpRightIcon } from "@phosphor-icons/react/ssr";
import { Eyebrow, Section, Tag } from "@/components/page";
import { ArchitectureDiagram } from "@/components/projects/architecture-diagram";
import { getProject, projects } from "@/content/projects";
import { pad2 } from "@/lib/format";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return {
    title: project.shortTitle ?? project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
  };
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[6rem_minmax(0,1fr)] gap-3 border-b py-2.5 last:border-0">
      <dt className="text-meta">{label}</dt>
      <dd className="text-[0.9rem]">{children}</dd>
    </div>
  );
}

export default async function CaseStudyPage({ params }: PageProps<"/projects/[slug]">) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  const i = projects.indexOf(project);
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];

  return (
    <article>
      <Link href="/projects" className="inline-flex items-center gap-1 text-meta hover:text-primary">
        <ArrowLeftIcon className="size-3" /> All projects
      </Link>

      <header className="mt-8 mb-10">
        <Eyebrow>Case study {pad2(i + 1)}</Eyebrow>
        <h1 className="mt-4 text-[2.1rem] font-semibold sm:text-[2.5rem]">{project.title}</h1>
        <p className="mt-4 text-[1.05rem] leading-relaxed text-ink-2">{project.summary}</p>
      </header>

      <dl className="border-y">
        <Row label="Domain">{project.topics.join(" · ")}</Row>
        {project.kind === "product" && <Row label="Type">Own product</Row>}
        <Row label="Stack">
          <ul className="flex flex-wrap gap-1">
            {project.tech.map((t) => (
              <li key={t}>
                <Tag>{t}</Tag>
              </li>
            ))}
          </ul>
        </Row>
        <Row label="Links">
          {project.links.length > 0 ? (
            <ul>
              {project.links.map((l) => (
                <li key={l.url}>
                  <a href={l.url} className="inline-flex items-center gap-1 prose-link">
                    {l.label} <ArrowUpRightIcon className="size-3" />
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <span className="text-muted-foreground">No public link</span>
          )}
        </Row>
      </dl>

      <figure className="mt-10 border bg-card p-4">
        <div className="-mx-4 overflow-x-auto px-4">
          <div className="min-w-[30rem]">
            <ArchitectureDiagram diagram={project.diagram} />
          </div>
        </div>
        <figcaption className="mt-3 flex flex-wrap justify-between gap-x-4 gap-y-1 border-t pt-2.5 text-meta">
          <span>
            <span className="text-primary">Fig. {pad2(i + 1)}</span> {project.diagram.title}
          </span>
          <span>Solid: request · dashed: async · dashed box: external</span>
        </figcaption>
      </figure>

      <Section title="The problem" id="problem">
        <p className="text-[1.02rem] leading-[1.75]">{project.story.problem}</p>
      </Section>
      <Section title="Approach" id="approach">
        <p className="leading-[1.75] text-ink-2">{project.story.approach}</p>
      </Section>
      <Section title="Key decisions" id="decisions">
        <ol className="space-y-5">
          {project.story.decisions.map((d, n) => (
            <li key={d.title} className="grid grid-cols-[2.2rem_minmax(0,1fr)] gap-x-2">
              <span className="pt-0.5 font-mono text-[0.68rem] text-primary">D{n + 1}</span>
              <div>
                <h3 className="font-semibold">{d.title}</h3>
                <p className="mt-1 text-[0.95rem] leading-relaxed text-ink-2">{d.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>
      <Section title="Outcomes" id="outcomes">
        <ul className="dashes">
          {project.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      </Section>

      <nav aria-label="More projects" className="mt-16 grid grid-cols-2 border-y">
        <Link href={`/projects/${prev.slug}`} className="group py-4 pr-4">
          <span className="flex items-center gap-1 text-meta">
            <ArrowLeftIcon className="size-3" /> Previous
          </span>
          <span className="mt-0.5 block font-semibold group-hover:text-primary">{prev.shortTitle ?? prev.title}</span>
        </Link>
        <Link href={`/projects/${next.slug}`} className="group border-l py-4 pl-4 text-right">
          <span className="flex items-center justify-end gap-1 text-meta">
            Next <ArrowRightIcon className="size-3" />
          </span>
          <span className="mt-0.5 block font-semibold group-hover:text-primary">{next.shortTitle ?? next.title}</span>
        </Link>
      </nav>
    </article>
  );
}
