// The site's view of src/data: the "academic" slice, with app-only
// placeholders filling the fields that are still empty (see content/placeholders.ts).

import * as content from "../data/index.ts";
import { Publication, type Education, type Project } from "../data/index.ts";
import { placeholders as PH } from "../content/placeholders.ts";

const SITE = "academic" as const;

/** A value plus the placeholder key it came from (`null` when it is real data). */
export type Filled<T> = { value: T; ph: string | null };

/** Real when present: not undefined, not an empty string or list, not a "TODO …" string. */
export function isReal(v: unknown): boolean {
  if (v == null) return false;
  if (typeof v === "string") return v.trim() !== "" && !/^TODO\b/i.test(v.trim());
  if (Array.isArray(v)) return v.length > 0;
  return true;
}

export function fill<T>(real: T | undefined, key: string, fallback: T): Filled<T> {
  return isReal(real) ? { value: real as T, ph: null } : { value: fallback, ph: key };
}

/** Plain text with blank lines → paragraphs. */
export const paragraphs = (s: string) => s.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);

// ─── Profile ────────────────────────────────────────────────────────────────

const p = content.profile();

export const profile = {
  name: p.name,
  email: p.email,
  location: p.location,
  timezone: p.timezone,
  social: p.social,
  sites: p.sites,
  avatar: p.avatar,
  cv: p.cv.academic,
  headline: fill(p.headline.academic, "profile.headline.academic", PH.headline),
  summary: fill(p.summary.academic, "profile.summary.academic", PH.summary),
  bio: fill(p.bio.academic, "profile.bio.academic", PH.bio),
  /** Role line under the name: profile.role.academic, else the latest job title from experience.yaml. */
  role: p.role.academic ?? content.experience("academic")[0]?.title,
  /** Hero titles: profile.titles.academic, else the role line split at "·". */
  titles: p.titles.academic ?? (p.role.academic ? p.role.academic.split(/\s*·\s*/) : []),
  interests: fill(p.researchInterests, "profile.researchInterests", PH.researchInterests),
  statement: fill(p.researchStatement, "profile.researchStatement", PH.researchStatement),
  openTo: fill(p.openTo, "profile.openTo", PH.openTo),
  currentlyFocus: fill(p.currently?.focus, "profile.currently.focus", PH.currently.focus),
  currentlyReading: fill(p.currently?.reading, "profile.currently.reading", PH.currently.reading),
  about: fill(p.about, "profile.about", PH.about),
  principles: fill(p.principles, "profile.principles", PH.principles),
  languages: fill(p.languages, "profile.languages", PH.languages),
  contactIntro: fill(p.contact.intro, "profile.contact.intro", PH.contact.intro),
  contactResponse: fill(p.contact.responseTime, "profile.contact.responseTime", PH.contact.responseTime),
  contactTopics: fill(p.contact.topics, "profile.contact.topics", PH.contact.topics),
};

// ─── Collections ────────────────────────────────────────────────────────────

export type AcademicProject = Project & {
  summaryForResearch: Filled<string | undefined>;
  openQuestions: Filled<string[]>;
};

export const projects: AcademicProject[] = content.projects(SITE).map((proj) => {
  const ph = PH.projects[proj.id];
  return {
    ...proj,
    summaryForResearch: fill(proj.researchSummary, `projects.${proj.id}.researchSummary`, ph?.researchSummary),
    openQuestions: fill(proj.questions, `projects.${proj.id}.questions`, ph?.questions ?? []),
  };
});

/** Featured first, then the rest, to `n` items. */
export const selectedProjects = (n = 3) => projects.slice(0, n);

type EduPH = { grade?: Education["grade"]; thesis?: Education["thesis"]; coursework?: string[] };

export type AcademicEducation = Education & {
  gradeF: Filled<Education["grade"]>;
  thesisF: Filled<Education["thesis"]>;
  courseworkF: Filled<string[]>;
};

export const education: AcademicEducation[] = content.education(SITE).map((e) => {
  const ph = (PH.education[e.id] ?? {}) as EduPH;
  return {
    ...e,
    gradeF: fill(e.grade, `education.${e.id}.grade`, ph.grade),
    thesisF: fill(e.thesis, `education.${e.id}.thesis`, ph.thesis),
    courseworkF: fill(e.coursework, `education.${e.id}.coursework`, ph.coursework ?? []),
  };
});

export const experience = content.experience(SITE);
export const teaching = content.teaching(SITE);
export const talks = content.talks(SITE);
export const awards = content.awards(SITE);
export const certifications = content.certifications(SITE);
export const testScores = content.testScores(SITE);
export const skills = content.skills(SITE);

const realPubs = content.publications(SITE);
export const publications: Filled<Publication[]> = fill(
  realPubs,
  "publications",
  PH.publications.map((x) => Publication.parse(x)),
);

// ─── Placeholder report ─────────────────────────────────────────────────────

/** Every placeholder key currently in use, for the build report and the dev banner. */
export function placeholderReport(): string[] {
  const keys: (string | null)[] = [
    ...Object.values(profile).map((v) => (v && typeof v === "object" && "ph" in v ? (v as Filled<unknown>).ph : null)),
    ...projects.flatMap((x) => [
      x.summaryForResearch.value ? x.summaryForResearch.ph : null,
      x.openQuestions.value.length ? x.openQuestions.ph : null,
    ]),
    ...education.flatMap((e) => [e.gradeF.ph, e.thesisF.ph, e.courseworkF.ph]),
    publications.ph,
  ];
  return keys.filter((k): k is string => k !== null);
}
