// Loads and validates this site's curated data (the YAML files next to this one).
// The master copy lives in the repo-root `data/` folder; this folder holds the academic
// wording of it. Nothing here reads `data/` directly.

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { parse } from "yaml";
import { z } from "zod";
import { Content, type Audience } from "./schema.ts";

export * from "./schema.ts";

// Read relative to the project root, not import.meta.url: Astro bundles this module into
// dist/, so the file's own URL doesn't point here during a build. Astro always runs from
// the project root (locally and on Vercel).
const dataDir = join(process.cwd(), "src", "data");

function readYaml(file: string): unknown {
  return parse(readFileSync(join(dataDir, file), "utf8")) ?? [];
}

/** Duplicate ids and references to ids that don't exist. */
function referenceProblems(c: Content): string[] {
  const problems: string[] = [];
  const collections = {
    experience: c.experience,
    education: c.education,
    projects: c.projects,
    publications: c.publications,
    talks: c.talks,
    teaching: c.teaching,
    awards: c.awards,
    certifications: c.certifications,
    testScores: c.testScores,
  };
  for (const [name, items] of Object.entries(collections)) {
    const ids = items.map((i) => i.id);
    const dupes = [...new Set(ids.filter((id, i) => ids.indexOf(id) !== i))];
    if (dupes.length) problems.push(`${name}: duplicate ids ${dupes.join(", ")}`);
  }
  const experienceIds = new Set(c.experience.map((e) => e.id));
  const projectIds = new Set(c.projects.map((p) => p.id));
  const ref = (from: string, kind: string, id: string | undefined, known: Set<string>) => {
    if (id && !known.has(id)) problems.push(`${from}: unknown ${kind} id "${id}"`);
  };
  for (const e of c.experience) for (const p of e.projects) ref(`experience.${e.id}`, "project", p, projectIds);
  for (const p of c.projects) ref(`projects.${p.id}`, "experience", p.experience, experienceIds);
  for (const t of c.teaching) ref(`teaching.${t.id}`, "experience", t.experience, experienceIds);
  return problems;
}

let cache: Content | undefined;

/** Loads and validates all data. Throws with a readable report on invalid data. */
export function loadContent(): Content {
  if (cache) return cache;
  const result = Content.safeParse({
    profile: readYaml("profile.yaml"),
    experience: readYaml("experience.yaml"),
    education: readYaml("education.yaml"),
    projects: readYaml("projects.yaml"),
    publications: readYaml("publications.yaml"),
    talks: readYaml("talks.yaml"),
    teaching: readYaml("teaching.yaml"),
    awards: readYaml("awards.yaml"),
    certifications: readYaml("certifications.yaml"),
    testScores: readYaml("test-scores.yaml"),
    skills: readYaml("skills.yaml"),
  });
  if (!result.success) {
    throw new Error(`Invalid data in academic-astro/src/data:\n${z.prettifyError(result.error)}`);
  }
  const problems = referenceProblems(result.data);
  if (problems.length) {
    throw new Error(`Invalid data in academic-astro/src/data:\n${problems.map((p) => `✖ ${p}`).join("\n")}`);
  }
  cache = result.data;
  return cache;
}

/** Site audience. Items tagged "both" appear everywhere. */
export type Site = Exclude<Audience, "both">;

/** Items visible on a site: matching audience and not a draft. */
export function forSite<T extends { audience: Audience; draft: boolean }>(items: T[], site: Site): T[] {
  return items.filter((item) => !item.draft && (item.audience === "both" || item.audience === site));
}

const endKey = (d: string | undefined) => (d === "present" ? "9999" : (d ?? ""));
const byEndDesc = (a: { end?: string }, b: { end?: string }) => endKey(b.end).localeCompare(endKey(a.end));
const byDateDesc = (a: { date?: string }, b: { date?: string }) => (b.date ?? "").localeCompare(a.date ?? "");

export const profile = () => loadContent().profile;
export const experience = (site: Site) => forSite(loadContent().experience, site).sort(byEndDesc);
export const education = (site: Site) => forSite(loadContent().education, site).sort(byEndDesc);
export const projects = (site: Site) =>
  forSite(loadContent().projects, site).sort(
    (a, b) => Number(b.featured) - Number(a.featured) || byEndDesc(a.period ?? {}, b.period ?? {}),
  );
export const publications = (site: Site) => forSite(loadContent().publications, site).sort(byDateDesc);
export const talks = (site: Site) => forSite(loadContent().talks, site).sort(byDateDesc);
export const teaching = (site: Site) => forSite(loadContent().teaching, site).sort(byEndDesc);
export const awards = (site: Site) => forSite(loadContent().awards, site).sort(byDateDesc);
export const certifications = (site: Site) =>
  forSite(loadContent().certifications, site).sort((a, b) => b.issued.localeCompare(a.issued));
/** Only scores marked `public: true`. */
export const testScores = (site: Site) =>
  forSite(loadContent().testScores, site).filter((t) => t.public).sort(byDateDesc);
export const skills = (site: Site) => forSite(loadContent().skills, site);
