import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRightIcon } from "@phosphor-icons/react/ssr";
import { Eyebrow, MoreLink, Section } from "@/components/page";
import { SkillAreas, SkillViewToggle, type SkillArea } from "@/components/skills/skill-areas";
import { experience } from "@/content/experience";
import { projects } from "@/content/projects";
import { certifications } from "@/content/certifications";
import { awards, skillCategories, skills } from "@/content/skills";
import { isEnabled } from "@/config/site";

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
for (const e of experience) for (const t of e.positions.flatMap((p) => p.technologies ?? [])) note(t, e.company.name);
for (const p of projects) for (const t of p.technologies) note(t, p.shortTitle ?? p.title);
const whereUsed = (name: string) => [...(usedIn.get(name.toLowerCase()) ?? [])];

const areas: SkillArea[] = skillCategories.map((c) => ({
  slug: c.slug,
  title: c.title,
  skills: c.skills.map((name) => ({ name, where: whereUsed(name) })),
}));

export default function SkillsPage() {
  if (!isEnabled("skills")) notFound();
  return (
    <>
      <header className="wide">
        <Eyebrow>Skills</Eyebrow>
        <h1 className="mt-4 text-3xl leading-tight font-semibold text-balance sm:text-4xl">
          Technologies &amp; expertise
        </h1>
        <p className="mt-2 text-muted-foreground">
          The tools, technologies, and engineering practices I use to design, build, and deliver software. Explore my
          skills by area, see them in action across my{" "}
          <Link href="/projects" className="prose-link">
            projects
          </Link>{" "}
          and{" "}
          <Link href="/experience" className="prose-link">
            professional experience
          </Link>
          , and find verified credentials under{" "}
          <a href="#certifications" className="prose-link">
            certifications
          </a>
          .
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          {skills.length} skills · {skillCategories.length} areas · {certifications.length} certifications
        </p>
      </header>

      <Section title="By area" id="areas" className="wide" action={<SkillViewToggle />}>
        <SkillAreas areas={areas} />
        <p className="mt-3 text-sm text-muted-foreground">Numbers show how many projects and roles use each skill.</p>
      </Section>

      <Section title="Certifications" id="certifications" className="wide">
        <p className="mb-6 max-w-(--spacing-main) text-muted-foreground">
          The most recent, with verification links. The full list, grouped by issuer, has its own page.
        </p>
        <ul className="border-t border-foreground/70">
          {certifications.slice(0, 4).map((c) => (
            <li
              key={c.id}
              className="group grid grid-cols-[4rem_1fr] items-baseline gap-x-4 gap-y-1 border-b py-3 sm:grid-cols-[4.5rem_1fr_auto]"
            >
              <span className="text-sm text-muted-foreground tabular-nums transition-colors group-hover:text-primary">
                {c.issueDate?.slice(0, 4)}
              </span>
              <div>
                <p className="leading-snug font-semibold transition-colors group-hover:text-primary">{c.name}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{c.issuer}</p>
              </div>
              {c.credentialUrl && (
                <a
                  href={c.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Verify ${c.name} (opens in a new tab)`}
                  className="col-start-2 inline-flex items-center gap-1 justify-self-start text-sm font-semibold text-ink-2 hover:text-primary sm:col-start-3 sm:justify-self-end"
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
              <span className="text-sm text-muted-foreground tabular-nums">{a.date ?? ""}</span>
              <div>
                <p className="leading-snug font-semibold">{a.title}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{a.description ?? a.issuer}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
