import { existsSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { isPartialDate } from "@/lib/dates";
import { postPath } from "@/lib/posts";
import { certifications, education } from "./education";
import { experience } from "./experience";
import { posts } from "./posts";
import { projects } from "./projects";
import { research } from "./research";

const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const validEnd = (d: string) => d === "present" || isPartialDate(d);

function expectUniqueSlugs(items: { slug: string }[]) {
  const slugs = items.map((i) => i.slug);
  expect(new Set(slugs).size).toBe(slugs.length);
  for (const s of slugs) expect(s).toMatch(SLUG);
}

describe("content integrity", () => {
  it("uses unique kebab-case slugs", () => {
    expectUniqueSlugs(projects);
    expectUniqueSlugs(experience);
    expectUniqueSlugs(posts);
    expectUniqueSlugs(research);
    expectUniqueSlugs(certifications);
  });

  it("uses valid dates", () => {
    for (const x of experience) {
      for (const p of x.positions) {
        expect(isPartialDate(p.start), `${x.slug} start`).toBe(true);
        expect(validEnd(p.end), `${x.slug} end`).toBe(true);
      }
    }
    for (const e of education) expect(isPartialDate(e.start) && validEnd(e.end)).toBe(true);
    for (const c of certifications) expect(isPartialDate(c.issued)).toBe(true);
    for (const p of posts) expect(isPartialDate(p.date)).toBe(true);
  });

  it("gives every featured project a case study", () => {
    for (const p of projects.filter((p) => p.featured)) expect(p.caseStudy, p.slug).toBeDefined();
  });

  it("gives every product a status", () => {
    for (const p of projects.filter((p) => p.kind === "product")) expect(p.status, p.slug).toBeDefined();
  });

  it("has an MDX body for every post", () => {
    for (const p of posts) expect(existsSync(postPath(p.slug)), p.slug).toBe(true);
  });
});
