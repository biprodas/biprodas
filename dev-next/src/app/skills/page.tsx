import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRightIcon } from "@phosphor-icons/react/ssr";
import { Eyebrow, MoreLink, Section } from "@/components/page";
import { experience } from "@/content/experience";
import { projects } from "@/content/projects";
import { awards, certifications, skills } from "@/content/skills";

export const metadata: Metadata = {
  title: "Skills",
  description: "Biprodas Roy's languages, frameworks, infrastructure, practices and certifications.",
  alternates: { canonical: "/skills" },
};

// Where each technology was used, from the experience and project stacks (case-insensitive).
const usedIn = new Map<string, Set<string>>();
const note = (tech: string, where: string) => {
  const key = tech.toLowerCase();
  if (!usedIn.has(key)) usedIn.set(key, new Set());
  usedIn.get(key)!.add(where);
};
for (const e of experience) for (const t of e.tech) note(t, e.org);
for (const p of projects) for (const t of p.tech) note(t, p.shortTitle ?? p.title);
const whereUsed = (name: string) => [...(usedIn.get(name.toLowerCase()) ?? [])];

const skillCount = skills.reduce((n, g) => n + g.items.length, 0);
const certs = [...certifications].sort((a, b) => b.issued.localeCompare(a.issued) || a.title.localeCompare(b.title));

export default function SkillsPage() {
  return (
    <>
      <header>
        <Eyebrow>Skills</Eyebrow>
        <h1 className="mt-4 text-[2.1rem] font-semibold sm:text-[2.5rem]">What I work with</h1>
        <p className="mt-4 text-[1.05rem] leading-relaxed text-ink-2">
          The languages, frameworks and practices I use, grouped by area. Hover a skill to see where I&apos;ve used it;
          the{" "}
          <Link href="/projects" className="prose-link">
            projects
          </Link>{" "}
          and{" "}
          <Link href="/experience" className="prose-link">
            experience
          </Link>{" "}
          pages have the details. Verified credentials are under{" "}
          <a href="#certifications" className="prose-link">
            certifications
          </a>
          .
        </p>
        <p className="mt-4 text-[0.82rem] text-muted-foreground">
          {skillCount} skills · {skills.length} areas · {certifications.length} certifications
        </p>
      </header>

      <Section title="By area" id="areas" className="wide">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {skills.map((g) => (
            <section
              key={g.group}
              aria-labelledby={`g-${g.group}`}
              className="group border bg-card px-5 pt-4 pb-5 transition-colors duration-200 hover:border-primary/40 hover:bg-[color-mix(in_oklab,var(--primary)_4%,var(--card))]"
            >
              <h3
                id={`g-${g.group}`}
                className="text-[1.02rem] font-semibold transition-colors duration-200 group-hover:text-primary"
              >
                {g.group}
              </h3>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {g.items.map((s) => {
                  const where = whereUsed(s);
                  return (
                    <li
                      key={s}
                      title={where.length ? `Used in ${where.join(", ")}` : undefined}
                      className="group/pill inline-flex cursor-default items-center gap-1.5 rounded-sm border bg-background px-2 py-0.5 text-[0.82rem] leading-snug text-ink-2 transition-colors duration-150 hover:border-primary/60 hover:bg-wash hover:text-primary"
                    >
                      {s}
                      {where.length > 0 && (
                        <span className="text-[0.68rem] text-muted-foreground tabular-nums transition-colors group-hover/pill:text-primary">
                          {where.length}
                          <span className="sr-only">
                            {" "}
                            {where.length === 1 ? "project or role" : "projects or roles"}
                          </span>
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
        <p className="mt-3 text-[0.8rem] text-muted-foreground">
          The small number is how many projects and roles list that skill in their stack.
        </p>
      </Section>

      <Section title="Certifications" id="certifications" className="wide">
        <p className="mb-6 max-w-(--spacing-main) text-muted-foreground">
          The most recent, with verification links. The full list, grouped by issuer, has its own page.
        </p>
        <ul className="border-t border-foreground/70">
          {certs.slice(0, 4).map((c) => (
            <li
              key={c.id}
              className="group grid grid-cols-[4rem_1fr] items-baseline gap-x-4 gap-y-1 border-b py-3 sm:grid-cols-[4.5rem_1fr_auto]"
            >
              <span className="text-[0.82rem] text-muted-foreground tabular-nums transition-colors group-hover:text-primary">
                {c.issued.slice(0, 4)}
              </span>
              <div>
                <p className="leading-snug font-semibold transition-colors group-hover:text-primary">{c.title}</p>
                <p className="mt-0.5 text-[0.8rem] text-muted-foreground">{c.issuer}</p>
              </div>
              {c.url && (
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Verify ${c.title} (opens in a new tab)`}
                  className="col-start-2 inline-flex items-center gap-1 justify-self-start text-[0.82rem] font-semibold text-ink-2 hover:text-primary sm:col-start-3 sm:justify-self-end"
                >
                  Verify <ArrowUpRightIcon className="size-3.5" />
                </a>
              )}
            </li>
          ))}
        </ul>
        <MoreLink href="/certifications">All {certifications.length} certifications</MoreLink>
      </Section>

      <Section title="Competitive programming" id="contests">
        <ul className="border-t border-foreground/70">
          {awards.map((a) => (
            <li key={a.id} className="grid grid-cols-[4rem_1fr] items-baseline gap-x-4 border-b py-3">
              <span className="text-[0.82rem] text-muted-foreground tabular-nums">{a.date ?? ""}</span>
              <div>
                <p className="leading-snug font-semibold">{a.title}</p>
                <p className="mt-0.5 text-[0.8rem] text-muted-foreground">{a.description ?? a.issuer}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
