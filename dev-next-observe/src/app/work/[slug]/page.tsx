import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { StatusBadge } from "@/components/StatusBadge";
import { getProject, projects } from "@/content/projects";
import type { LinkKind } from "@/content/types";
import { skyCoordinates } from "@/lib/hash";
import { buttonGhost, chip, cn, container, eyebrow, panel } from "@/lib/ui";

const LINK_LABEL: Record<LinkKind, string> = {
  live: "Visit live site",
  repo: "View source",
  "case-study": "Case study",
  credential: "Credential",
  info: "More info",
};

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
  };
}

const SECTIONS = [
  { id: "problem", label: "Problem" },
  { id: "constraints", label: "Constraints" },
  { id: "architecture", label: "Architecture" },
  { id: "decisions", label: "Decisions" },
  { id: "outcome", label: "Outcome" },
];

function Section({
  id,
  index,
  title,
  children,
}: {
  id: string;
  index: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24">
      <h2 id={`${id}-title`} className={eyebrow}>
        <span className="text-signal">{String(index).padStart(2, "0")}</span> · {title}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export default async function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];
  const cs = project.caseStudy;

  return (
    <article className={cn(container, "pt-12 sm:pt-20")}>
      <Link href="/work" className="font-mono text-xs text-dim transition-colors hover:text-ink">
        ← All work
      </Link>

      <header className="mt-8 max-w-4xl">
        <p className={cn(eyebrow, "flex flex-wrap items-center gap-3")}>
          <span>{skyCoordinates(project.slug)}</span>
          {project.status ? (
            <StatusBadge status={project.status} />
          ) : (
            <span className="text-signal">{project.kind === "product" ? "Product" : "Client work"}</span>
          )}
        </p>
        <h1 className="mt-5 font-display text-title text-ink">{project.title}</h1>
        <p className="mt-6 text-xl leading-9 text-muted">{project.summary}</p>
      </header>

      <dl className="mt-12 grid gap-px overflow-hidden rounded-panel border border-line bg-line sm:grid-cols-3">
        <div className="bg-void/90 p-5">
          <dt className={eyebrow}>Role</dt>
          <dd className="mt-2 text-ink">{project.role}</dd>
        </div>
        <div className="bg-void/90 p-5">
          <dt className={eyebrow}>Domain</dt>
          <dd className="mt-2 text-ink">{project.topics.join(" · ")}</dd>
        </div>
        <div className="bg-void/90 p-5">
          <dt className={eyebrow}>Links</dt>
          <dd className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
            {project.links.length ? (
              project.links.map((l) => (
                <a
                  key={l.url}
                  href={l.url}
                  className="text-ink underline decoration-line-strong underline-offset-4 hover:decoration-signal"
                >
                  {l.label ?? LINK_LABEL[l.kind]} ↗
                </a>
              ))
            ) : (
              <span className="text-muted">Private deployment</span>
            )}
          </dd>
        </div>
      </dl>

      <div className="mt-16 grid gap-12 lg:grid-cols-[12rem_1fr]">
        <aside className="max-lg:hidden">
          {cs && (
            <nav aria-label="Case study sections" className="sticky top-24">
              <ol className="space-y-2 border-l border-line">
                {SECTIONS.map((s, i) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="-ml-px block border-l border-transparent pl-4 text-sm text-dim transition-colors hover:border-signal hover:text-ink"
                    >
                      <span className="mr-2 font-mono text-[0.65rem]">{String(i + 1).padStart(2, "0")}</span>
                      {s.label}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}
        </aside>

        <div className="max-w-3xl space-y-16">
          {cs ? (
            <>
              <Section id="problem" index={1} title="Problem">
                <p className="font-display text-2xl leading-snug text-ink sm:text-3xl">{cs.problem}</p>
              </Section>
              <Section id="constraints" index={2} title="Constraints">
                <ul className="grid gap-3 sm:grid-cols-2">
                  {cs.constraints.map((c) => (
                    <li key={c} className={cn(panel, "p-4 leading-7 text-muted")}>
                      {c}
                    </li>
                  ))}
                </ul>
              </Section>
              <Section id="architecture" index={3} title="Architecture">
                <p className="mb-6 leading-8 text-muted">{cs.architecture.summary}</p>
                <ArchitectureDiagram layers={cs.architecture.layers} />
              </Section>
              <Section id="decisions" index={4} title="Decisions">
                <ol className="space-y-8">
                  {cs.decisions.map((d, i) => (
                    <li key={d.title} className="grid gap-2 sm:grid-cols-[2.5rem_1fr]">
                      <span className="font-mono text-sm text-signal">D{i + 1}</span>
                      <div>
                        <h3 className="text-lg font-medium text-ink">{d.title}</h3>
                        <p className="mt-2 leading-8 text-muted">{d.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </Section>
              <Section id="outcome" index={5} title="Outcome">
                <ul className="space-y-3">
                  {cs.outcome.map((o) => (
                    <li key={o} className="flex gap-3 leading-7 text-ink">
                      <span aria-hidden className="text-aurora">
                        ✦
                      </span>
                      {o}
                    </li>
                  ))}
                </ul>
              </Section>
            </>
          ) : (
            <section aria-labelledby="highlights-title">
              <h2 id="highlights-title" className={eyebrow}>
                Highlights
              </h2>
              <ul className="mt-5 space-y-4">
                {project.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-lg leading-8 text-muted">
                    <span aria-hidden className="text-signal">
                      ✦
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {cs && (
            <section aria-labelledby="highlights-title">
              <h2 id="highlights-title" className={eyebrow}>
                Also shipped
              </h2>
              <ul className="mt-5 space-y-3">
                {project.highlights.map((h) => (
                  <li key={h} className="flex gap-3 leading-7 text-muted">
                    <span aria-hidden className="text-dim">
                      —
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section aria-labelledby="stack-title">
            <h2 id="stack-title" className={eyebrow}>
              Stack
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <li key={t} className={chip}>
                  {t}
                </li>
              ))}
            </ul>
          </section>

          <nav aria-label="Next project" className="border-t border-line pt-8">
            <Link href={`/work/${next.slug}`} className={buttonGhost}>
              Next: {next.shortTitle ?? next.title} →
            </Link>
          </nav>
        </div>
      </div>
    </article>
  );
}
