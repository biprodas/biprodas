import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { parse } from "yaml";
import { education, experience, teaching } from "./experience";
import { projects } from "./projects";
import { certifications } from "./skills";

// Facts must match the master copy in ../data/; wording may differ.
const master = (file: string) =>
  parse(readFileSync(fileURLToPath(new URL(`../../../data/${file}`, import.meta.url)), "utf8"));

describe("projects", () => {
  it("have unique slugs", () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("match data/projects.yaml titles and links", () => {
    const yaml: { id: string; title: string; links?: { url: string }[] }[] = master("projects.yaml");
    for (const p of projects) {
      const m = yaml.find((y) => y.id === p.slug);
      expect(m, p.slug).toBeDefined();
      expect(p.title).toBe(m!.title);
      expect(p.links.map((l) => l.url).sort()).toEqual((m!.links ?? []).map((l) => l.url).sort());
    }
  });

  it.each(projects.map((p) => [p.slug, p.diagram] as const))("%s diagram is well-formed", (_, d) => {
    const ids = new Set(d.nodes.map((n) => n.id));
    expect(ids.size).toBe(d.nodes.length);
    expect(new Set(d.nodes.map((n) => `${n.col},${n.row}`)).size, "two nodes share a cell").toBe(d.nodes.length);
    for (const n of d.nodes) {
      expect(n.col).toBeLessThan(d.cols);
      expect(n.row).toBeLessThan(d.rows);
    }
    for (const e of d.edges) {
      expect(ids.has(e.from), e.from).toBe(true);
      expect(ids.has(e.to), e.to).toBe(true);
    }
  });
});

describe("experience", () => {
  it("matches data/experience.yaml organisations, titles and dates", () => {
    const yaml: { id: string; org: { name: string }; positions: { title: string; start: string; end: string }[] }[] =
      master("experience.yaml");
    expect(experience.map((e) => e.id)).toEqual(yaml.map((y) => y.id));
    for (const e of experience) {
      const m = yaml.find((y) => y.id === e.id)!;
      expect(e.org).toBe(m.org.name);
      expect(e.positions).toEqual(m.positions.map(({ title, start, end }) => ({ title, start, end })));
    }
  });

  it("matches data/education.yaml dates", () => {
    const yaml: { id: string; start: string; end: string }[] = master("education.yaml");
    expect(education.map(({ id, start, end }) => ({ id, start, end }))).toEqual(
      yaml.map(({ id, start, end }) => ({ id, start, end })),
    );
  });
});

describe("teaching", () => {
  it("matches data/teaching.yaml titles and dates", () => {
    const yaml: { id: string; title: string; start?: string; end?: string }[] = master("teaching.yaml");
    expect(
      teaching.map(({ id, title, start, end }) => ({ id, title, start, end })).sort((a, b) => a.id.localeCompare(b.id)),
    ).toEqual(
      yaml.map(({ id, title, start, end }) => ({ id, title, start, end })).sort((a, b) => a.id.localeCompare(b.id)),
    );
  });
});

describe("certifications", () => {
  it("match data/certifications.yaml", () => {
    const yaml: { id: string; title: string; issued: string }[] = master("certifications.yaml");
    expect(certifications.map(({ id, title, issued }) => ({ id, title, issued }))).toEqual(
      yaml.map(({ id, title, issued }) => ({ id, title, issued })),
    );
  });
});

describe("services", () => {
  it("match data/services.yaml titles, links and engagements", async () => {
    const { services, engagements, hiring } = await import("./services");
    const yaml: {
      services: { id: string; title: string; projects?: string[]; experience?: string[] }[];
      engagements: string[];
      hiring: { platforms: { upwork: string } };
    } = master("services.yaml");
    expect(services.map(({ id, title, projects, experience }) => ({ id, title, projects, experience }))).toEqual(
      yaml.services.map(({ id, title, projects, experience }) => ({ id, title, projects, experience })),
    );
    expect(engagements.map((e) => e.id)).toEqual(yaml.engagements);
    expect(hiring.upwork).toBe(yaml.hiring.platforms.upwork);
    for (const s of services)
      for (const slug of s.projects ?? [])
        expect(
          projects.some((p) => p.slug === slug),
          slug,
        ).toBe(true);
  });
});
