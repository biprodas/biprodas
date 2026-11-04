import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon } from "@phosphor-icons/react/ssr";
import { Eyebrow, Section } from "@/components/page";
import { Timeline } from "@/components/timeline";
import { education, experience, teaching } from "@/content/experience";
import { certifications, featuredCertifications } from "@/content/certifications";
import { getProject } from "@/content/projects";
import { awards } from "@/content/skills";
import { duration, formatDate, formatRange, initials, yearRange } from "@/lib/format";
import { publicFileExists } from "@/lib/public-file";
import { cn } from "@/lib/utils";
import { isEnabled } from "@/config/site";
import { profile } from "@/content/profile";

export const metadata: Metadata = {
  title: "Experience",
  description: "Biprodas Roy's roles, education, mentoring and awards, in order.",
  alternates: { canonical: "/experience" },
};

const roleLabel = { trainer: "Trainer", mentor: "Mentor", organizer: "Organiser" } as const;

/** Courses picked to show next to the featured certifications; the full list lives on /certifications. */
const trainingIds = [
  "coursera-neural-networks-and-deep-learning",
  "coursera-architecting-solutions-on-aws",
  "bcc-top-up-it-java",
];
const trainingAndCerts = [
  ...featuredCertifications,
  ...trainingIds.flatMap((id) => certifications.filter((c) => c.id === id)),
];
const otherIssuers = [...new Set(certifications.filter((c) => !trainingAndCerts.includes(c)).map((c) => c.issuer))];

/** 40px tile for a company or school logo, on white so every logo reads in both themes; initials when there is none. */
function OrgLogo({ name, src, focus }: { name: string; src?: string; focus?: "left" }) {
  const box = "mt-0.5 grid size-10 shrink-0 place-items-center overflow-hidden rounded-[0.4rem] border bg-white p-1";
  if (src && publicFileExists(src)) {
    return (
      <span className={box}>
        <Image
          src={src}
          alt=""
          width={80}
          height={80}
          className={cn("size-full", focus === "left" ? "object-cover object-left" : "object-contain")}
        />
      </span>
    );
  }
  return (
    <span aria-hidden className={cn(box, "bg-card font-mono text-sm font-semibold text-primary")}>
      {initials(name) || name[0]}
    </span>
  );
}

const entryTitle = "text-lg font-semibold";
const meta = "text-sm text-muted-foreground";

export default function ExperiencePage() {
  if (!isEnabled("experience")) notFound();

  return (
    <>
      <header className="wide">
        <Eyebrow>Experience</Eyebrow>
        <h1 className="mt-4 text-3xl leading-tight font-semibold text-balance sm:text-4xl">
          Experience &amp; education
        </h1>
        <p className="mt-2 text-muted-foreground">
          From solving programming contest problems at university to co-founding Semicolon IT Solutions and building
          software with teams across South Korea and Australia — a journey spanning {profile.yearsOfExperience}+ years
          of engineering, learning, and growth. Alongside my professional experience, you&apos;ll find my education,
          mentoring, awards, and certifications.
        </p>
      </header>

      <div className="wide mt-12">
        <Timeline />
      </div>

      <Section title="Experience" id="experience">
        <ol className="timeline">
          {experience.map((e) => {
            const end = e.endDate ?? "present";
            const details = [
              e.company.industry,
              e.company.location,
              e.workMode?.toLowerCase(),
              duration(e.startDate, end),
            ].filter(Boolean);
            const founder = e.positions.some((p) => p.employmentType === "Founder");
            return (
              <li key={e.id} className="group" data-kind={founder ? "milestone" : undefined}>
                <span className="mb-0.5 block text-meta">{yearRange(e.startDate, end)}</span>
                <div className="flex items-start gap-3">
                  <OrgLogo name={e.company.name} src={e.company.logo} focus={e.company.logoFocus} />
                  <div className="min-w-0">
                    <h3 className={`${entryTitle} transition-colors group-hover:text-primary`}>
                      {e.company.website ? (
                        <a
                          href={e.company.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          {e.company.name}
                        </a>
                      ) : (
                        e.company.name
                      )}
                    </h3>
                    <p className={meta}>{details.join(", ")}</p>
                  </div>
                </div>
                <ol className="mt-2">
                  {e.positions.map((p) => {
                    const related = (p.relatedProjects ?? []).map((slug) => getProject(slug)!);
                    return (
                      <li key={p.id} id={p.id} className="scroll-mt-6 border-t py-3 first:border-t-0 first:pt-1">
                        <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                          <h4 className="font-semibold">{p.title}</h4>
                          <span className="text-meta whitespace-nowrap">
                            {formatRange(p.startDate, p.endDate ?? "present")}
                          </span>
                        </div>
                        {(p.employmentType || p.employmentLevel) && (
                          <p className={meta}>{[p.employmentType, p.employmentLevel].filter(Boolean).join(", ")}</p>
                        )}
                        {p.description && <p className="mt-1.5 text-sm leading-relaxed text-ink-2">{p.description}</p>}
                        {p.bullets.length > 0 && (
                          <ul className="dashes mt-2 text-sm leading-relaxed text-ink-2">
                            {p.bullets.map((b) => (
                              <li key={b}>{b}</li>
                            ))}
                          </ul>
                        )}
                        {related.length > 0 && (
                          <p className="mt-2 text-sm text-muted-foreground">
                            Projects:{" "}
                            {related.map((r, i) => (
                              <span key={r.slug}>
                                {i > 0 && ", "}
                                <Link href={`/projects/${r.slug}`} className="prose-link text-ink-2">
                                  {r.shortTitle ?? r.title}
                                </Link>
                              </span>
                            ))}
                          </p>
                        )}
                        {p.technologies && p.technologies.length > 0 && (
                          <ul
                            className="mt-2 flex flex-wrap gap-x-3.5 gap-y-0.5 text-sm text-muted-foreground"
                            aria-label="Stack"
                          >
                            {p.technologies.map((t) => (
                              <li key={t}>{t}</li>
                            ))}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ol>
              </li>
            );
          })}
        </ol>
        <p className="mt-2 text-sm text-muted-foreground">
          Experience letters and references are available{" "}
          <Link href="/contact" className="prose-link">
            on request
          </Link>
          .
        </p>
      </Section>

      <Section title="Education" id="education">
        <ol className="timeline">
          {education.map((e) => (
            <li key={e.id} data-kind="education">
              {e.startDate ? (
                <span className="mb-0.5 block text-meta">{yearRange(e.startDate, e.endDate ?? "present")}</span>
              ) : (
                e.endDate && <span className="mb-0.5 block text-meta">{e.endDate.slice(0, 4)}</span>
              )}
              <div className="flex items-start gap-3">
                <OrgLogo name={e.institution.name} src={e.institution.logo} />
                <div>
                  <h3 className={entryTitle}>
                    {e.degree} in {e.fieldOfStudy}
                  </h3>
                  <p className="text-ink-2">
                    {e.institution.website ? (
                      <a href={e.institution.website} target="_blank" rel="noopener noreferrer" className="prose-link">
                        {e.institution.name}
                      </a>
                    ) : (
                      e.institution.name
                    )}
                  </p>
                </div>
              </div>
              <p className={meta}>
                {[
                  e.institution.location,
                  e.startDate && formatRange(e.startDate, e.endDate ?? "present"),
                  e.grade && `Grade ${e.grade}`,
                ]
                  .filter(Boolean)
                  .join(", ")}
              </p>
              {e.description && <p className="mt-2 text-sm leading-relaxed text-ink-2">{e.description}</p>}
              {e.activities && e.activities.length > 0 && (
                <ul className="dashes mt-2 text-sm leading-relaxed text-ink-2">
                  {e.activities.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              )}
              {e.relevantCourses && e.relevantCourses.length > 0 && (
                <p className="mt-2 text-sm text-muted-foreground">Relevant courses: {e.relevantCourses.join(", ")}</p>
              )}
            </li>
          ))}
        </ol>
      </Section>

      <Section title="Training & certifications" id="certifications">
        <ul>
          {trainingAndCerts.map((c) => (
            <li key={c.id} className="grid grid-cols-[4.5rem_1fr] gap-3 border-b py-2.5 first:border-t">
              <span className="text-meta">{c.issueDate ? formatDate(c.issueDate) : ""}</span>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <div>
                  {c.name}
                  <p className="text-sm text-muted-foreground">{c.issuer}</p>
                </div>
                {c.credentialUrl && (
                  <a
                    href={c.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-0.5 font-mono text-xs text-muted-foreground transition-colors hover:text-primary"
                  >
                    Verify
                    <ArrowUpRightIcon aria-hidden className="size-3" />
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-muted-foreground">
          Plus {certifications.length - trainingAndCerts.length} more from{" "}
          {new Intl.ListFormat("en-GB").format(otherIssuers)}.{" "}
          <Link href="/certifications" className="prose-link">
            See all {certifications.length}, with verification links
          </Link>
          .
        </p>
      </Section>

      <Section title="Teaching & mentoring" id="teaching">
        <ol className="timeline">
          {teaching.map((t) => (
            <li key={t.id}>
              {t.start && t.end && <span className="mb-0.5 block text-meta">{yearRange(t.start, t.end)}</span>}
              <h3 className={entryTitle}>{t.title}</h3>
              <p className={meta}>{[roleLabel[t.role], t.org, t.audience].filter(Boolean).join(", ")}</p>
              {t.summary && <p className="mt-2 text-sm leading-relaxed text-ink-2">{t.summary}</p>}
            </li>
          ))}
        </ol>
      </Section>

      <Section title="Awards & achievements" id="awards">
        <ul>
          {awards.map((a) => (
            <li key={a.id} className="grid grid-cols-[4.5rem_1fr] gap-3 border-b py-2.5 first:border-t">
              <span className="text-meta">{a.date ?? ""}</span>
              <div>
                {a.title}
                <p className="text-sm text-muted-foreground">{[a.issuer, a.description].filter(Boolean).join(", ")}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
