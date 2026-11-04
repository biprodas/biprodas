import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, ArrowUpRightIcon, LinkedinLogoIcon } from "@phosphor-icons/react/ssr";
import { buttonVariants } from "@/components/ui/button";
import { MarginNote, MoreLink, Section, Tag } from "@/components/page";
import { ProjectCard } from "@/components/projects/project-card";
import { Timeline } from "@/components/timeline";
import { now, principles, profile } from "@/content/profile";
import { getService } from "@/content/services";
import { experience } from "@/content/experience";
import { featuredProjects, getProject, projects, urlLabel } from "@/content/projects";
import { featuredCertifications } from "@/content/certifications";
import { awards, getSkill, skillCategories, skills } from "@/content/skills";
import { glanceFacts } from "@/lib/glance";
import { formatRange, pad2 } from "@/lib/format";
import { cn } from "@/lib/utils";
import { getLink } from "@/content/links";
import { showTestimonials } from "@/content/testimonials";

const label = "font-mono text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase";

const skillPreview = skillCategories
  .map((c) => ({ ...c, skills: c.skills.filter((name) => getSkill(name)?.featured) }))
  .filter((c) => c.skills.length > 0);

export default function HomePage() {
  const facts = glanceFacts();
  const latest = experience[0];
  const icpc = awards.find((a) => a.id === "icpc-dhaka-2015");
  const solved = awards.find((a) => a.id === "problem-solving-2000");
  const linkedin = getLink("linkedin");

  return (
    <>
      <header>
        <Image
          src={profile.avatar.src}
          alt={profile.avatar.alt}
          sizes="8rem"
          priority
          className="size-28 rounded-full bg-muted object-cover object-[50%_30%] sm:size-32 dark:brightness-90"
        />
        <p className="mt-8 font-mono text-xs leading-relaxed font-semibold tracking-[0.16em] text-ink-2 uppercase">
          {profile.titles.map((t, i) => (
            <span key={t}>
              {i > 0 && " · "}
              <span className="whitespace-nowrap">{t}</span>
            </span>
          ))}
        </p>
        <h1 className="mt-3 text-4xl leading-tight font-semibold sm:text-5xl">
          Hi, I&apos;m {profile.firstName}.
          <span className="block font-medium text-primary">{profile.headlineLine}</span>
        </h1>
        <p className="mt-6 text-base leading-7 text-ink-2">{profile.summary}</p>
        <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
          <Link href="/projects" className={cn(buttonVariants({ size: "lg" }), "h-10 px-4 text-sm")}>
            See my projects <ArrowRightIcon data-icon="inline-end" />
          </Link>
          <a href={`mailto:${profile.email}`} className="text-sm font-semibold prose-link">
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
              <dd className="mt-2 text-2xl leading-tight font-semibold transition-colors group-hover:text-primary">
                {f.value}
              </dd>
              <dd className="mt-1 text-sm leading-snug text-muted-foreground">{f.detail}</dd>
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
        <div className="space-y-5 leading-7 text-ink-2">
          {profile.about.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </Section>

      <Section title="Skills" id="skills">
        <MarginNote label="Certified">
          <ul className="space-y-1">
            {featuredCertifications.map((c) => (
              <li key={c.id}>
                <a href={c.credentialUrl} target="_blank" rel="noopener noreferrer" className="prose-link">
                  {c.name.replace("AWS Certified ", "AWS ")}
                </a>
                <span className="text-meta"> {c.issueDate?.slice(0, 4)}</span>
              </li>
            ))}
          </ul>
        </MarginNote>
        <ul className="border bg-card px-5">
          {skillPreview.map((c) => (
            <li
              key={c.slug}
              className="grid grid-cols-1 gap-x-5 gap-y-2 border-b py-3.5 last:border-b-0 sm:grid-cols-[9.5rem_1fr]"
            >
              <span className="pt-0.5 text-sm leading-snug font-semibold">{c.title}</span>
              <ul className="flex flex-wrap gap-1">
                {c.skills.map((s) => (
                  <li key={s}>
                    <Tag>{s}</Tag>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <MoreLink href="/skills">All {skills.length} skills, by area</MoreLink>
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
        <MarginNote label="Services I offer">
          <ul className="space-y-1">
            {principles.map((p) => {
              const s = getService(p.service)!;
              return (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="prose-link">
                    {s.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </MarginNote>
        <ol className="grid gap-7">
          {principles.map((p, i) => (
            <li key={p.title} className="group grid grid-cols-[3.25rem_1fr] items-start gap-x-3">
              {/* Top-aligned with the title rather than baseline-aligned, so it doesn't rise above it. */}
              <span
                aria-hidden
                className="pt-0.5 text-3xl leading-none font-semibold text-[color-mix(in_oklab,var(--primary)_70%,var(--background))] tabular-nums transition-colors duration-300 group-hover:text-primary"
              >
                {pad2(i + 1)}
              </span>
              <div>
                <h3 className="text-base leading-snug font-semibold transition-colors duration-300 group-hover:text-primary">
                  {p.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-2">{p.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="What I'm up to" id="now">
        <MarginNote label="Try them live">
          <ul className="space-y-1">
            {now.building.map((b) => {
              const url = getProject(b.slug)?.liveUrl;
              return (
                url && (
                  <li key={b.slug}>
                    <a href={url} target="_blank" rel="noopener noreferrer" className="prose-link">
                      {urlLabel(url)}
                    </a>
                  </li>
                )
              );
            })}
          </ul>
        </MarginNote>
        <dl className="border-t *:grid *:grid-cols-1 *:gap-x-6 *:gap-y-1 *:border-b *:py-4 sm:*:grid-cols-[7.5rem_1fr]">
          <div>
            <dt className={cn(label, "pt-1")}>Focus</dt>
            <dd className="leading-relaxed">{now.focus}</dd>
          </div>
          <div>
            <dt className={cn(label, "pt-1")}>Building</dt>
            <dd>
              <ul className="space-y-1 text-sm text-ink-2">
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
            <dd className="text-sm text-ink-2">
              <span className="font-semibold text-foreground">{latest.positions[0].title}</span> at{" "}
              {latest.company.name}
              <span className="block text-meta sm:ml-1.5 sm:inline">
                {formatRange(latest.positions[0].startDate, latest.positions[0].endDate ?? "present")}
              </span>
            </dd>
          </div>
          <div>
            <dt className={cn(label, "pt-1")}>Preparing</dt>
            <dd>
              <ul className="space-y-1 text-sm text-ink-2">
                {now.preparing.map((exam) => (
                  <li key={exam}>{exam}</li>
                ))}
              </ul>
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
        <p className="leading-7">
          I&apos;m glad to hear from hiring teams, founders, and fellow engineers, whether it&apos;s about a role, a
          project, or a system design question. Email is the best way to reach me.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
          <Link href="/contact" className={cn(buttonVariants({ size: "lg" }), "h-10 px-4 text-sm")}>
            Write to me <ArrowRightIcon data-icon="inline-end" />
          </Link>
          {linkedin && (
            <a
              href={linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-10 px-4 text-sm")}
            >
              <LinkedinLogoIcon data-icon="inline-start" />
              Message me on LinkedIn
            </a>
          )}
          <a
            href={getLink("github")?.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold prose-link"
          >
            GitHub <ArrowUpRightIcon className="size-3.5" />
          </a>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Have a project?{" "}
          <Link href="/services" className="prose-link text-ink-2">
            See how I work with clients
          </Link>
          .
        </p>
        {showTestimonials && (
          <p className="mt-1 text-sm text-muted-foreground">
            Want a second opinion?{" "}
            <Link href="/testimonials" className="prose-link text-ink-2">
              What people say about working with me
            </Link>
            .
          </p>
        )}
      </Section>
    </>
  );
}
