import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, ArrowUpRightIcon } from "@phosphor-icons/react/ssr";
import { buttonVariants } from "@/components/ui/button";
import { MarginNote, MoreLink, Section, Tag } from "@/components/page";
import { ProjectCard } from "@/components/projects/project-card";
import { Timeline } from "@/components/timeline";
import { now, principles, profile } from "@/content/profile";
import { experience } from "@/content/experience";
import { featuredProjects, getProject, projects } from "@/content/projects";
import { awards, certifications, skills } from "@/content/skills";
import { glanceFacts } from "@/lib/glance";
import { formatDate, formatRange, pad2 } from "@/lib/format";
import { cn } from "@/lib/utils";
import portrait from "@/assets/biprodas-roy.png";

const label = "font-mono text-[0.62rem] font-semibold tracking-[0.16em] text-muted-foreground uppercase";

// Home shows the most relevant groups; /skills has everything.
const skillPreview = ["Languages", "Backend & Architecture", "Data & Messaging", "Cloud & DevOps", "AI & LLMs"]
  .map((g) => skills.find((s) => s.group === g))
  .filter((g) => g !== undefined);
const skillCount = skills.reduce((n, g) => n + g.items.length, 0);

export default function HomePage() {
  const facts = glanceFacts();
  const latest = experience[0];
  const icpc = awards.find((a) => a.id === "icpc-dhaka-2015");
  const solved = awards.find((a) => a.id === "problem-solving-2000");

  return (
    <>
      <header>
        <Image
          src={portrait}
          alt={`Portrait of ${profile.name}`}
          sizes="8rem"
          priority
          className="size-28 rounded-full bg-muted object-cover object-[50%_30%] sm:size-32 dark:brightness-[.88]"
        />
        <p className="mt-8 font-mono text-[0.68rem] leading-relaxed font-semibold tracking-[0.16em] text-ink-2 uppercase">
          {profile.titles.map((t, i) => (
            <span key={t}>
              {i > 0 && " · "}
              <span className="whitespace-nowrap">{t}</span>
            </span>
          ))}
        </p>
        <h1 className="mt-3 text-[clamp(2.2rem,1.6rem+2.6vw,3.1rem)] leading-[1.12] font-semibold">
          Hi, I&apos;m {profile.firstName}.
          <span className="block font-medium text-primary">{profile.headlineLine}</span>
        </h1>
        <p className="mt-6 text-[1.05rem] leading-[1.75] text-ink-2">{profile.summary}</p>
        <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
          <Link href="/projects" className={cn(buttonVariants({ size: "lg" }), "h-10 px-4 text-[0.8rem]")}>
            See my projects <ArrowRightIcon data-icon="inline-end" />
          </Link>
          <a href={`mailto:${profile.email}`} className="text-[0.95rem] font-semibold prose-link">
            Say hello: {profile.email}
          </a>
        </div>
      </header>
      <Section title="At a glance" id="glance">
        <dl className="grid grid-cols-2 sm:grid-cols-3">
          {facts.map((f, i) => (
            <div
              key={f.label}
              className={cn(
                "group px-5 pt-4 pb-5",
                i % 2 === 1 && "border-l",
                i >= 2 && "border-t",
                "sm:border-0",
                i % 3 !== 0 && "sm:border-l",
                i >= 3 && "sm:border-t",
              )}
            >
              <dt className={label}>{f.label}</dt>
              <dd className="mt-2 text-[1.45rem] leading-tight font-semibold transition-colors group-hover:text-primary">
                {f.value}
              </dd>
              <dd className="mt-1 text-[0.8rem] leading-snug text-muted-foreground">{f.detail}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section title="Who I am" id="about">
        <MarginNote label="Competitive programming">
          {icpc && (
            <p>
              {icpc.title}, {icpc.date}.
            </p>
          )}
          {solved && (
            <p className="mt-1">
              {solved.title}. {solved.description}
            </p>
          )}
        </MarginNote>
        <div className="space-y-5 leading-[1.75]">
          {profile.about.map((p, i) => (
            <p key={i} className={i === 0 ? undefined : "text-ink-2"}>
              {p}
            </p>
          ))}
        </div>
      </Section>

      <Section title="Skills" id="skills">
        <MarginNote label="Certified">
          <ul className="space-y-1">
            {certifications
              .filter((c) => c.url)
              .map((c) => (
                <li key={c.id}>
                  <a href={c.url} className="prose-link">
                    {c.title.replace("AWS Certified ", "AWS ")}
                  </a>
                  <span className="text-meta"> {c.issued}</span>
                </li>
              ))}
          </ul>
        </MarginNote>
        <ul className="border bg-card px-5">
          {skillPreview.map((g) => (
            <li
              key={g.group}
              className="grid grid-cols-1 gap-x-5 gap-y-2 border-b py-3.5 last:border-b-0 sm:grid-cols-[9.5rem_1fr]"
            >
              <span className="pt-0.5 text-[0.95rem] leading-snug font-semibold">{g.group}</span>
              <ul className="flex flex-wrap gap-1">
                {g.items.slice(0, 6).map((s) => (
                  <li key={s}>
                    <Tag>{s}</Tag>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <MoreLink href="/skills">All {skillCount} skills, by area</MoreLink>
      </Section>

      <Section title="Featured projects" id="projects" className="wide">
        <p className="mb-6 max-w-(--spacing-main) text-muted-foreground">
          Systems I designed and shipped, each written up as a case study: the problem, the architecture, and the
          decisions that mattered.
        </p>
        <div className="grid grid-cols-1 gap-px overflow-hidden border bg-border sm:grid-cols-2">
          {featuredProjects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
        <MoreLink href="/projects">All {projects.length} projects</MoreLink>
      </Section>

      <Section title="Journey" id="journey" className="wide">
        <Timeline />
        <MoreLink href="/experience">Roles and highlights in full</MoreLink>
      </Section>

      <Section title="How I work" id="principles">
        <ol className="grid gap-7">
          {principles.map((p, i) => (
            <li key={p.title} className="group grid grid-cols-[3.25rem_1fr] items-start gap-x-3">
              {/* Top-aligned with the title rather than baseline-aligned, so it doesn't rise above it. */}
              <span
                aria-hidden
                className="pt-0.5 text-[2.1rem] leading-none font-semibold text-[color-mix(in_oklab,var(--primary)_55%,var(--background))] tabular-nums transition-colors duration-300 group-hover:text-primary"
              >
                {pad2(i + 1)}
              </span>
              <div>
                <h3 className="text-[1rem] leading-snug font-semibold transition-colors duration-300 group-hover:text-primary">
                  {p.title}
                </h3>
                <p className="mt-1 text-[0.92rem] leading-[1.7] text-ink-2">{p.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="What I'm up to" id="now">
        <dl className="border-t *:grid *:grid-cols-1 *:gap-x-6 *:gap-y-1 *:border-b *:py-4 sm:*:grid-cols-[7.5rem_1fr]">
          <div>
            <dt className={cn(label, "pt-1")}>Focus</dt>
            <dd className="leading-relaxed">{now.focus}</dd>
          </div>
          <div>
            <dt className={cn(label, "pt-1")}>Building</dt>
            <dd>
              <ul className="space-y-1 text-[0.95rem] text-ink-2">
                {now.building.map((b) => {
                  const p = getProject(b.slug)!;
                  return (
                    <li key={b.slug}>
                      <Link href={`/projects/${p.slug}`} className="font-semibold prose-link text-foreground">
                        {p.title}
                      </Link>
                      , {b.note}
                    </li>
                  );
                })}
              </ul>
            </dd>
          </div>
          <div>
            <dt className={cn(label, "pt-1")}>Recently</dt>
            <dd className="text-[0.95rem] text-ink-2">
              <span className="font-semibold text-foreground">{latest.positions[0].title}</span> at {latest.org}
              <span className="block text-meta sm:ml-1.5 sm:inline">
                {formatRange(latest.positions[0].start, latest.positions[0].end)}
              </span>
            </dd>
          </div>
          <div>
            <dt className={cn(label, "pt-1")}>Certified</dt>
            <dd className="text-[0.95rem] text-ink-2">
              <a href={certifications[0].url} className="prose-link">
                {certifications[0].title}
              </a>
              <span className="ml-1.5 text-meta">{formatDate(certifications[0].issued)}</span>
            </dd>
          </div>
        </dl>
      </Section>

      <Section title="Get in touch" id="contact">
        <MarginNote label="Based in">
          <p>
            {profile.location.city}, {profile.location.country}
            <span className="text-meta"> · {profile.utcOffset}</span>
          </p>
        </MarginNote>
        <p className="leading-[1.75]">
          I&apos;m glad to hear from hiring teams, founders and fellow engineers, whether it&apos;s about a role, a
          project or a system design question. Email is the best way to reach me.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
          <Link href="/contact" className={cn(buttonVariants({ size: "lg" }), "h-10 px-4 text-[0.8rem]")}>
            Write to me <ArrowRightIcon data-icon="inline-end" />
          </Link>
          <a href={profile.social.github} className="inline-flex items-center gap-1 font-semibold prose-link">
            GitHub <ArrowUpRightIcon className="size-3.5" />
          </a>
        </div>
        <p className="mt-4 text-[0.92rem] text-muted-foreground">
          Have a project?{" "}
          <Link href="/services" className="prose-link text-ink-2">
            See how I work with clients
          </Link>
          .
        </p>
      </Section>
    </>
  );
}
