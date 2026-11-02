import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { parse } from "yaml";
import { education, experience, teaching } from "./experience";
import { projects } from "./projects";
import { allCertifications, certifications } from "./certifications";
import { skillCategories, skills } from "./skills";

// Facts must match the master copy in ../data/; wording may differ.
const master = (file: string) =>
  parse(readFileSync(fileURLToPath(new URL(`../../../data/${file}`, import.meta.url)), "utf8"));

describe("projects", () => {
  it("have unique slugs", () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("match data/projects.yaml titles, type, status, dates and URLs", () => {
    const yaml: {
      id: string;
      title: string;
      type?: string;
      status?: string;
      period?: { start: string; end: string };
      links?: { kind: string; url: string }[];
    }[] = master("projects.yaml");
    // Master vocabulary → site vocabulary. Master values without a site equivalent leave the site field unset.
    const types: Record<string, string> = {
      product: "Product",
      enterprise: "Enterprise",
      client: "Client Project",
      "open-source": "Open Source",
      research: "Research",
    };
    const statuses: Record<string, string> = {
      "in-progress": "In Progress",
      maintained: "Maintained",
      completed: "Completed",
      experimental: "Experimental",
    };
    for (const p of projects) {
      const m = yaml.find((y) => y.id === p.slug);
      expect(m, p.slug).toBeDefined();
      expect(p.title).toBe(m!.title);
      expect(p.type, p.slug).toBe(m!.type && types[m!.type]);
      expect(p.status, p.slug).toBe(m!.status && statuses[m!.status]);
      expect(p.startDate, p.slug).toBe(m!.period?.start);
      expect(p.endDate, p.slug).toBe(m!.period?.end === "present" ? undefined : m!.period?.end);
      const url = (kind: string) => m!.links?.find((l) => l.kind === kind)?.url;
      expect([p.liveUrl, p.demoUrl, p.sourceUrl, p.caseStudyUrl], p.slug).toEqual([
        url("live"),
        url("demo"),
        url("repo"),
        url("case-study"),
      ]);
    }
  });

  it("have unique order, valid dates, https URLs and image paths", () => {
    expect(new Set(projects.map((p) => p.order)).size).toBe(projects.length);
    for (const p of projects) {
      for (const d of [p.startDate, p.endDate]) if (d) expect(d, p.slug).toMatch(/^\d{4}(-\d{2})?$/);
      if (p.startDate && p.endDate) expect(p.startDate <= p.endDate, p.slug).toBe(true);
      for (const url of [p.liveUrl, p.demoUrl, p.sourceUrl, p.caseStudyUrl])
        if (url) expect(url, p.slug).toMatch(/^https:\/\//);
      for (const src of [p.thumbnail, ...(p.images ?? []).map((i) => i.src)]) {
        if (!src) continue;
        expect(src, p.slug).toMatch(/^(\/|https:\/\/)/);
        if (src.startsWith("/"))
          expect(existsSync(fileURLToPath(new URL(`../../public${src}`, import.meta.url))), src).toBe(true);
      }
      for (const img of p.images ?? []) expect(img.alt.trim(), img.src).not.toBe("");
      if (p.role !== undefined) expect(p.role.trim(), p.slug).not.toBe("");
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
      expect(e.company.name).toBe(m.org.name);
      expect(e.positions.map((p) => ({ title: p.title, start: p.startDate, end: p.endDate ?? "present" }))).toEqual(
        m.positions.map(({ title, start, end }) => ({ title, start, end })),
      );
    }
  });

  it("derive overall dates from positions and link to real projects", () => {
    expect(new Set(experience.map((e) => e.order)).size).toBe(experience.length);
    for (const e of experience) {
      expect(e.startDate <= (e.endDate ?? "9999"), e.id).toBe(true);
      expect(e.current, e.id).toBe(e.endDate === undefined);
      for (const p of e.positions) {
        for (const slug of p.relatedProjects ?? [])
          expect(
            projects.some((x) => x.slug === slug),
            slug,
          ).toBe(true);
      }
    }
    const ids = experience.flatMap((e) => e.positions.map((p) => p.id));
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("matches data/education.yaml institutions, fields and dates", () => {
    const yaml: {
      id: string;
      institution: { name: string };
      degree: { field: string };
      start: string;
      end: string;
    }[] = master("education.yaml");
    expect(
      education.map((e) => ({
        id: e.id,
        institution: e.institution.name,
        field: e.fieldOfStudy,
        start: e.startDate,
        end: e.endDate,
      })),
    ).toEqual(
      yaml.map((y) => ({
        id: y.id,
        institution: y.institution.name,
        field: y.degree.field,
        start: y.start,
        end: y.end,
      })),
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
    const byId = (a: { id: string }, b: { id: string }) => a.id.localeCompare(b.id);
    expect(
      allCertifications.map(({ id, name, issueDate }) => ({ id, title: name, issued: issueDate })).sort(byId),
    ).toEqual(yaml.map(({ id, title, issued }) => ({ id, title, issued })).sort(byId));
    expect(new Set(allCertifications.map((c) => c.order)).size).toBe(allCertifications.length);
    expect(certifications.every((c) => c.visible)).toBe(true);
  });
});

describe("services", () => {
  it("match data/services.yaml titles, links and engagements", async () => {
    const { services, engagements } = await import("./services");
    const { getLink } = await import("./links");
    const yaml: {
      services: { id: string; title: string; projects?: string[]; experience?: string[] }[];
      engagements: string[];
      hiring: { platforms: { upwork: string } };
    } = master("services.yaml");
    expect(
      services.map((s) => ({
        id: s.slug,
        title: s.title,
        projects: s.relatedProjects,
        experience: s.relatedExperience,
      })),
    ).toEqual(
      yaml.services.map((y) => ({
        id: y.id,
        title: y.title,
        projects: y.projects ?? [],
        experience: y.experience ?? [],
      })),
    );
    expect(engagements.map((e) => e.id)).toEqual(yaml.engagements);
    expect(getLink("upwork")?.url).toBe(yaml.hiring.platforms.upwork);
  });

  it("link to real projects and roles, with unique slugs and order", async () => {
    const { services } = await import("./services");
    expect(new Set(services.map((s) => s.slug)).size).toBe(services.length);
    expect(new Set(services.map((s) => s.order)).size).toBe(services.length);
    for (const s of services) {
      for (const slug of s.relatedProjects)
        expect(
          projects.some((p) => p.slug === slug),
          `${s.slug}: ${slug}`,
        ).toBe(true);
      for (const id of s.relatedExperience)
        expect(
          experience.some((e) => e.id === id),
          `${s.slug}: ${id}`,
        ).toBe(true);
    }
  });
});

describe("skills", () => {
  it("have unique names, real categories and unique order within each category", () => {
    expect(new Set(skills.map((s) => s.name)).size).toBe(skills.length);
    for (const s of skills)
      expect(
        skillCategories.some((c) => c.slug === s.category),
        s.name,
      ).toBe(true);
    for (const c of skillCategories) {
      const orders = skills.filter((s) => s.category === c.slug).map((s) => s.order);
      expect(orders.length, c.slug).toBeGreaterThan(0);
      expect(new Set(orders).size, c.slug).toBe(orders.length);
    }
  });

  it("only list skills from data/skills.yaml", () => {
    const yaml: { items?: (string | { name: string })[] }[] = master("skills.yaml");
    const names = new Set(yaml.flatMap((g) => g.items ?? []).map((i) => (typeof i === "string" ? i : i.name)));
    for (const s of skills) expect(names.has(s.name), s.name).toBe(true);
  });
});

describe("links", () => {
  it("match the profile URLs in data/profile.yaml", async () => {
    const { links, getLink } = await import("./links");
    const yaml: { social: { github: string; linkedin: string }; sites: { academic: string } } = master("profile.yaml");
    expect(getLink("github")?.url).toBe(yaml.social.github);
    expect(getLink("linkedin")?.url).toBe(yaml.social.linkedin);
    expect(getLink("website")?.url).toBe(yaml.sites.academic);
    expect(new Set(links.map((l) => l.order)).size).toBe(links.length);
  });
});

describe("research", () => {
  it("keeps sample content out of the real research data", async () => {
    const { realResearch } = await import("./research");
    const text = JSON.stringify(realResearch);
    expect(text).not.toMatch(/\bsample\b/i);
  });
});

describe("testimonials", () => {
  it("keeps sample content out of the real testimonials", async () => {
    const { realTestimonials } = await import("./testimonials");
    expect(JSON.stringify(realTestimonials)).not.toMatch(/\bsample\b/i);
  });
});

describe("articles", () => {
  it("match data/articles.yaml titles, dates and links", async () => {
    const { realArticles } = await import("./articles");
    const yaml: {
      id: string;
      title: string;
      date: string;
      category: string;
      source: string;
      externalUrl?: string;
    }[] = master("articles.yaml");
    const byId = (a: { id: string }, b: { id: string }) => a.id.localeCompare(b.id);
    expect(
      realArticles
        .map((a) => ({
          id: a.slug,
          title: a.title,
          date: a.publishedAt,
          category: a.category,
          source: a.source,
          externalUrl: a.externalUrl,
        }))
        .sort(byId),
    ).toEqual(
      yaml
        .map(({ id, title, date, category, source, externalUrl }) => ({
          id,
          title,
          date,
          category,
          source,
          externalUrl,
        }))
        .sort(byId),
    );
  });

  it("have unique slugs, valid dates, URLs and content files, and real related projects", async () => {
    const { realArticles } = await import("./articles");
    const slugs = realArticles.map((a) => a.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const a of realArticles) {
      expect(a.slug, a.slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
      expect(a.publishedAt, a.slug).toMatch(/^\d{4}(-\d{2}(-\d{2})?)?$/);
      if (a.updatedAt) expect(a.updatedAt >= a.publishedAt, a.slug).toBe(true);
      expect(a.category.trim(), a.slug).not.toBe("");
      if (a.externalUrl) expect(a.externalUrl, a.slug).toMatch(/^https:\/\//);
      if (a.coverImage) expect(a.coverImage, a.slug).toMatch(/^(\/|https:\/\/)/);
      if (a.source === "local") {
        expect(a.contentPath, a.slug).toMatch(/^articles\/[^/]+\.mdx?$/);
        expect(existsSync(fileURLToPath(new URL(a.contentPath, import.meta.url))), a.contentPath).toBe(true);
      }
      for (const slug of a.relatedProjects ?? [])
        expect(
          projects.some((p) => p.slug === slug),
          `${a.slug}: ${slug}`,
        ).toBe(true);
    }
  });

  it("keeps sample content out of the real articles", async () => {
    const { realArticles } = await import("./articles");
    expect(JSON.stringify(realArticles)).not.toMatch(/\bsample\b/i);
  });
});
