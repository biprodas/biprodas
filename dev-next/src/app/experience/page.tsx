import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Eyebrow, Section } from "@/components/page";
import { Timeline } from "@/components/timeline";
import { education, experience, teaching } from "@/content/experience";
import { certifications, latestCertification } from "@/content/certifications";
import { getProject } from "@/content/projects";
import { awards } from "@/content/skills";
import { duration, formatRange, yearRange } from "@/lib/format";
import { publicFileExists } from "@/lib/public-file";
import { isEnabled } from "@/config/site";

export const metadata: Metadata = {
  title: "Experience",
  description: "Biprodas Roy's roles, education, mentoring and awards, in order.",
  alternates: { canonical: "/experience" },
};

const roleLabel = { trainer: "Trainer", mentor: "Mentor", organizer: "Organiser" } as const;

const entryTitle = "text-lg font-semibold";
const meta = "text-sm text-muted-foreground";

export default function ExperiencePage() {
  if (!isEnabled("experience")) notFound();
  const issuers = [...new Set(certifications.map((c) => c.issuer))];

  return (
    <>
      <header>
        <Eyebrow>Experience</Eyebrow>
        <h1 className="mt-4 text-3xl leading-tight font-semibold text-balance sm:text-4xl">
          Work and education, in order
        </h1>
        <p className="mt-2 text-muted-foreground">
          The long version of my resume, newest role first.{" "}
          <Link href="/resume" className="prose-link">
            View it as a PDF
          </Link>
          .
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
                <h3 className={`${entryTitle} transition-colors group-hover:text-primary`}>
                  {e.company.website ? (
                    <a href={e.company.website} className="hover:underline">
                      {e.company.name}
                    </a>
                  ) : (
                    e.company.name
                  )}
                </h3>
                <p className={meta}>{details.join(", ")}</p>
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
                {e.institution.logo && publicFileExists(e.institution.logo) && (
                  <Image
                    src={e.institution.logo}
                    alt=""
                    width={40}
                    height={40}
                    className="mt-1 size-10 shrink-0 object-contain"
                  />
                )}
                <div>
                  <h3 className={entryTitle}>
                    {e.degree} in {e.fieldOfStudy}
                  </h3>
                  <p className="text-ink-2">
                    {e.institution.website ? (
                      <a href={e.institution.website} className="prose-link">
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

      <Section title="Certifications" id="certifications">
        <p className="leading-relaxed">
          {certifications.length} certifications from {new Intl.ListFormat("en-GB").format(issuers)}, most recently{" "}
          <i>{latestCertification.name}</i>.{" "}
          <Link href="/certifications" className="prose-link">
            See all, with verification links
          </Link>
          .
        </p>
      </Section>
    </>
  );
}
