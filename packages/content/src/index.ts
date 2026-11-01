import { existsSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";
import { parse } from "yaml";
import { z } from "zod";
import { Content, type Audience } from "./schema/index.ts";

export * from "./schema/index.ts";

// The YAML sits next to this file in the repo. When an app bundles this module (Vite, Next.js),
// import.meta.url points into the app's build output instead, so fall back to resolving the
// package by name, which lands on the real packages/content/src/index.ts.
const dataDir = (() => {
  const local = fileURLToPath(new URL("../data/", import.meta.url));
  if (existsSync(local + "profile.yaml")) return local;
  const entry = createRequire(import.meta.url).resolve("@biprodas/content");
  return fileURLToPath(new URL("../data/", pathToFileURL(entry)));
})();

function readYaml(file: string): unknown {
  return parse(readFileSync(dataDir + file, "utf8")) ?? [];
}

let cache: Content | undefined;

/** Loads and validates all content. Throws with a readable report on invalid data. */
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
    throw new Error(`Invalid content in packages/content/data:\n${z.prettifyError(result.error)}`);
  }
  cache = result.data;
  return cache;
}

/** Site audience: what a given app renders. Items tagged "both" appear everywhere. */
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
