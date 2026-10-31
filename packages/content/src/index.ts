import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { parse } from "yaml";
import { z } from "zod";
import { Content, type Audience } from "./schema/index.ts";

export * from "./schema/index.ts";

const dataDir = fileURLToPath(new URL("../data/", import.meta.url));

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
    awards: readYaml("awards.yaml"),
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

export function forSite<T extends { audience: Audience }>(items: T[], site: Site): T[] {
  return items.filter((item) => item.audience === "both" || item.audience === site);
}

const byEndDesc = (a: { end: string }, b: { end: string }) =>
  (b.end === "present" ? "9999" : b.end).localeCompare(a.end === "present" ? "9999" : a.end);

export const profile = () => loadContent().profile;
export const experience = (site: Site) => forSite(loadContent().experience, site).sort(byEndDesc);
export const education = () => [...loadContent().education].sort(byEndDesc);
export const projects = (site: Site) =>
  forSite(loadContent().projects, site).sort((a, b) => Number(b.featured) - Number(a.featured) || b.year - a.year);
export const awards = (site: Site) => forSite(loadContent().awards, site).sort((a, b) => b.date.localeCompare(a.date));
export const skills = (site: Site) => forSite(loadContent().skills, site);
