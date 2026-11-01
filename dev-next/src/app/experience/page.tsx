import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow, Section } from "@/components/page";
import { Timeline } from "@/components/timeline";
import { profile } from "@/content/profile";
import { education, experience, teaching } from "@/content/experience";
import { awards, certifications } from "@/content/skills";
import { duration, formatRange, positionsSpan, yearRange } from "@/lib/format";

export const metadata: Metadata = {
  title: "Experience",
  description: "Biprodas Roy's roles, education, mentoring and awards, in order.",
  alternates: { canonical: "/experience" },
};

const employment = { contract: "contract", founder: "co-founder" } as const;
const roleLabel = { trainer: "Trainer", mentor: "Mentor", organizer: "Organiser" } as const;

const entryTitle = "text-[1.12rem] font-semibold";
const meta = "text-[0.82rem] text-muted-foreground";

export default function ExperiencePage() {
  const latestCert = [...certifications].sort((a, b) => b.issued.localeCompare(a.issued))[0];
  const issuers = [...new Set(certifications.map((c) => c.issuer))];

  return (
    <>
      <header>
        <Eyebrow>Experience</Eyebrow>
        <h1 className="mt-4 text-[2.1rem] font-semibold sm:text-[2.5rem]">Work and education, in order</h1>
        <p className="mt-4 text-[1.05rem] leading-relaxed text-ink-2">
          The long version of my resume, newest role first.{" "}
          <a href={profile.resume} download="Biprodas-Roy-Resume.pdf" className="prose-link">
            Download the PDF
          </a>
          .
        </p>
      </header>

      <div className="wide mt-12">
        <Timeline />
      </div>

      <Section title="Experience" id="experience">
        <ol className="timeline">
          {experience.map((e) => {
            const span = positionsSpan(e.positions);
            const details = [
              e.location,
              e.workMode,
              e.employmentType && employment[e.employmentType],
              duration(span.start, span.end),
            ].filter(Boolean);
            return (
              <li key={e.id} className="group" data-kind={e.employmentType === "founder" ? "milestone" : undefined}>
                <span className="mb-0.5 block text-meta">{yearRange(span.start, span.end)}</span>
                <h3 className={`${entryTitle} transition-colors group-hover:text-primary`}>{e.org}</h3>
                <p className={meta}>{details.join(", ")}</p>
                <ul className="mt-2 text-[0.95rem]">
                  {e.positions.map((p) => (
                    <li key={p.title} className="flex justify-between gap-4 border-b py-1">
                      <span className="font-medium">{p.title}</span>
                      <span className="text-meta whitespace-nowrap">{formatRange(p.start, p.end)}</span>
                    </li>
                  ))}
                </ul>
                <ul className="dashes mt-3 text-[0.95rem] leading-relaxed text-ink-2">
                  {e.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
                {e.tech.length > 0 && (
                  <ul
                    className="mt-3 flex flex-wrap gap-x-3.5 gap-y-0.5 text-[0.85rem] text-muted-foreground"
                    aria-label="Stack"
                  >
                    {e.tech.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ol>
      </Section>

      <Section title="Education" id="education">
        <ol className="timeline">
          {education.map((e) => (
            <li key={e.id} data-kind="education">
              <span className="mb-0.5 block text-meta">{yearRange(e.start, e.end)}</span>
              <h3 className={entryTitle}>{e.degree}</h3>
              <p className="text-ink-2">{e.institution}</p>
              <p className={meta}>
                {e.location}, {formatRange(e.start, e.end)}
              </p>
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
              {t.summary && <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-2">{t.summary}</p>}
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
                <p className="text-[0.88rem] text-muted-foreground">
                  {[a.issuer, a.description].filter(Boolean).join(", ")}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Certifications" id="certifications">
        <p className="leading-relaxed">
          {certifications.length} certifications from {issuers.join(" and ")}, most recently <i>{latestCert.title}</i>.{" "}
          <Link href="/certifications" className="prose-link">
            See all, with verification links
          </Link>
          .
        </p>
      </Section>
    </>
  );
}
