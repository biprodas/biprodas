import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon, ArrowRightIcon, ArrowUpRightIcon, GithubLogoIcon } from "@phosphor-icons/react/ssr";
import { Eyebrow, Section, Tag } from "@/components/page";
import { ArchitectureDiagram } from "@/components/projects/architecture-diagram";
import { JsonLd } from "@/components/json-ld";
import { HireActions } from "@/components/services/actions";
import { buttonVariants } from "@/components/ui/button";
import { getProject, projects, urlLabel } from "@/content/projects";
import { services } from "@/content/services";
import type { Project, ProjectStatus } from "@/content/types";
import { formatRange, pad2 } from "@/lib/format";
import { projectSchema } from "@/lib/project-schema";
import { cn } from "@/lib/utils";
import { isEnabled, siteConfig } from "@/config/site";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  const title = `${project.shortTitle ?? project.title} case study`;
  const url = `/projects/${project.slug}`;
  return {
    title,
    description: project.summary,
    keywords: [...project.domains, ...project.topics, ...project.technologies],
    alternates: { canonical: url },
    openGraph: { type: "article", siteName: siteConfig.name, url, title, description: project.summary },
    twitter: { card: "summary_large_image", title, description: project.summary },
  };
}

const typeLabel = (p: Project) => (p.type === "Product" ? "Own product" : p.type);

const statusDot: Record<ProjectStatus, string> = {
  "In Progress": "bg-primary",
  Maintained: "bg-primary",
  Completed: "bg-muted-foreground",
  Experimental: "border border-primary",
};

/** One row of the "At a glance" panel: label on the left, value on the right. */
function Fact({ label, wide, children }: { label: string; wide?: boolean; children: ReactNode }) {
  return (
    <div className={cn("flex items-baseline gap-3 bg-card px-4 py-3", wide && "sm:col-span-2")}>
      <dt className="w-22 shrink-0 text-meta">{label}</dt>
      <dd className="min-w-0 flex-1">{children}</dd>
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="dashes">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default async function CaseStudyPage({ params }: PageProps<"/projects/[slug]">) {
  if (!isEnabled("projects")) notFound();
  const project = getProject((await params).slug);
  if (!project) notFound();

  const i = projects.indexOf(project);
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];
  const name = project.shortTitle ?? project.title;
  const relatedServices = isEnabled("services") ? services.filter((s) => s.relatedProjects.includes(project.slug)) : [];
  const hasLinks = project.liveUrl || project.demoUrl || project.sourceUrl || project.caseStudyUrl;
  const button = "h-9 px-3.5 text-sm";
  // Topics already shown as a domain aren't repeated under Focus.
  const focus = project.topics.filter((t) => !(project.domains as string[]).includes(t));
  const facts: [string, string | undefined][] = [
    ["Role", project.role],
    ["Type", typeLabel(project)],
    ["Timeline", project.startDate && formatRange(project.startDate, project.endDate ?? "present")],
    ["Domain", project.domains.join(", ")],
    ["Focus", focus.join(", ")],
  ];
  const shown = facts.filter((f): f is [string, string] => !!f[1]);

  return (
    <>
      <JsonLd data={projectSchema(project)} />

      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1.5 text-meta">
          <li>
            <Link href="/projects" className="inline-flex items-center gap-1 hover:text-primary">
              <ArrowLeftIcon aria-hidden className="size-3" /> Projects
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li aria-current="page" className="text-ink-2">
            {name}
          </li>
        </ol>
      </nav>

      <header className="wide mt-8 mb-10">
        <Eyebrow>Case study {pad2(i + 1)}</Eyebrow>
        <h1 className="mt-4 text-3xl leading-tight font-semibold text-balance sm:text-4xl">{project.title}</h1>
        <p className="mt-2 text-muted-foreground">{project.description ?? project.summary}</p>
        {hasLinks ? (
          <div className="mt-7 flex flex-wrap items-center gap-2.5">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants(), button)}
              >
                Visit {urlLabel(project.liveUrl)}
                <ArrowUpRightIcon data-icon="inline-end" />
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: project.liveUrl ? "outline" : "default" }), button)}
              >
                Try the demo
                <ArrowUpRightIcon data-icon="inline-end" />
              </a>
            )}
            {project.sourceUrl && (
              <a
                href={project.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: "outline" }), button)}
              >
                <GithubLogoIcon data-icon="inline-start" />
                View source
              </a>
            )}
            {project.caseStudyUrl && (
              <a
                href={project.caseStudyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: "outline" }), button)}
              >
                Read the write-up
                <ArrowUpRightIcon data-icon="inline-end" />
              </a>
            )}
          </div>
        ) : (
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            No public site or source code. The architecture and the decisions behind it are described below.
          </p>
        )}
      </header>

      <section aria-labelledby="glance-h" className="wide border">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b bg-sidebar px-4 py-2.5">
          <h2 id="glance-h" className="text-base font-semibold">
            At a glance
          </h2>
          {project.status && (
            <p className="inline-flex items-center gap-2 text-meta text-ink-2">
              <span aria-hidden className={cn("size-2 rounded-full", statusDot[project.status])} />
              <span className="sr-only">Status: </span>
              {project.status}
            </p>
          )}
        </div>
        <dl className="grid gap-px bg-border sm:grid-cols-2">
          {shown.map(([label, value], n) => (
            // An odd last fact spans both columns so the grid has no empty cell.
            <Fact key={label} label={label} wide={n === shown.length - 1 && shown.length % 2 === 1}>
              {value}
            </Fact>
          ))}
          <Fact label="Stack" wide>
            <ul className="flex flex-wrap gap-1">
              {project.technologies.map((t) => (
                <li key={t}>
                  <Tag>{t}</Tag>
                </li>
              ))}
            </ul>
          </Fact>
        </dl>
      </section>

      <figure className="wide mt-10 border bg-card p-4">
        <div className="-mx-4 overflow-x-auto px-4">
          <div className="min-w-120">
            <ArchitectureDiagram diagram={project.diagram} />
          </div>
        </div>
        <figcaption className="mt-3 flex flex-wrap justify-between gap-x-4 gap-y-1 border-t pt-2.5 text-meta">
          <span>
            <span className="text-primary">Fig. {pad2(i + 1)}</span> {name} architecture: {project.diagram.title}
          </span>
          <span>Solid: request · dashed: async · dashed box: external</span>
        </figcaption>
      </figure>

      {project.features && project.features.length > 0 && (
        <Section title={`What ${name} does`} id="features" className="wide">
          <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {project.features.map((f) => (
              <li key={f} className="flex gap-3 leading-relaxed">
                <span aria-hidden className="mt-2.5 size-1.5 shrink-0 bg-primary" />
                {f}
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section title="The problem" id="problem" className="wide">
        <p className="text-base leading-7">{project.story.problem}</p>
      </Section>
      <Section title="Approach" id="approach" className="wide">
        <p className="leading-7 text-ink-2">{project.story.approach}</p>
      </Section>
      <Section title="Key decisions" id="decisions">
        <ol className="space-y-5">
          {project.story.decisions.map((d, n) => (
            <li key={d.title} className="flex gap-2">
              <span className="w-9 shrink-0 pt-0.5 font-mono text-xs text-primary">D{n + 1}</span>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold">{d.title}</h3>
                <p className="mt-1 leading-relaxed text-ink-2">{d.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {project.highlights.length > 0 && (
        <Section title="Highlights" id="highlights" className="wide">
          <BulletList items={project.highlights} />
        </Section>
      )}
      {project.contributions && project.contributions.length > 0 && (
        <Section title="My contributions" id="contributions" className="wide">
          <BulletList items={project.contributions} />
        </Section>
      )}
      {project.challenges && project.challenges.length > 0 && (
        <Section title="Challenges" id="challenges" className="wide">
          <BulletList items={project.challenges} />
        </Section>
      )}

      {relatedServices.length > 0 && (
        <Section title="Related services" id="services">
          <ul className="border-t">
            {relatedServices.map((s) => (
              <li key={s.slug} className="border-b">
                <Link href={`/services/${s.slug}`} className="group flex items-baseline justify-between gap-4 py-3">
                  <span>
                    <span className="font-semibold group-hover:text-primary">{s.title}</span>
                    <span className="mt-0.5 block text-sm leading-relaxed text-ink-2">{s.shortDescription}</span>
                  </span>
                  <ArrowRightIcon
                    aria-hidden
                    className="size-3.5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section title="Build something similar" id="contact">
        <div className="border bg-sidebar px-6 py-5">
          <p className="leading-relaxed">
            Planning a product like {name}? Tell me what you&apos;re building and when you need it. I&apos;ll reply with
            questions or a proposal.
          </p>
          <div className="mt-4">
            <HireActions subject={`Project enquiry: something like ${name}`} />
          </div>
        </div>
      </Section>

      <nav aria-label="More projects" className="wide mt-16 grid grid-cols-2 border-y">
        <Link href={`/projects/${prev.slug}`} className="group py-4 pr-4">
          <span className="flex items-center gap-1 text-meta">
            <ArrowLeftIcon aria-hidden className="size-3" /> Previous
          </span>
          <span className="mt-0.5 block font-semibold group-hover:text-primary">{prev.shortTitle ?? prev.title}</span>
        </Link>
        <Link href={`/projects/${next.slug}`} className="group border-l py-4 pl-4 text-right">
          <span className="flex items-center justify-end gap-1 text-meta">
            Next <ArrowRightIcon aria-hidden className="size-3" />
          </span>
          <span className="mt-0.5 block font-semibold group-hover:text-primary">{next.shortTitle ?? next.title}</span>
        </Link>
      </nav>
    </>
  );
}
