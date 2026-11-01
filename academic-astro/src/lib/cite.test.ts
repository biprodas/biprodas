import { describe, expect, it } from "vitest";
import { Publication } from "../data/index.ts";
import { bibtex, personBibtex, statusLabel } from "./cite.ts";

// Test fixtures only; not site content.
const pub = (fields: Record<string, unknown>) =>
  Publication.parse({ id: "test", title: "Measuring Things", authors: ["Jane Doe", "John Smith"], ...fields });

describe("bibtex", () => {
  it("generates an entry for a journal article", () => {
    const out = bibtex(pub({ type: "journal", venue: "Journal of Tests", date: "2024-03", doi: "10.1/x" }));
    expect(out).toMatch(/^@article\{doe2024measuring,/);
    expect(out).toContain("title     = {{Measuring Things}}");
    expect(out).toContain("author    = {Jane Doe and John Smith}");
    expect(out).toContain("journal   = {Journal of Tests}");
    expect(out).toContain("doi       = {10.1/x}");
    expect(out).not.toContain("note");
  });

  it("uses booktitle for conferences and notes an unpublished status", () => {
    const out = bibtex(pub({ type: "conference", venue: "TestConf", status: "under-review" }));
    expect(out).toMatch(/^@inproceedings\{/);
    expect(out).toContain("booktitle = {TestConf}");
    expect(out).toContain("note      = {Under review}");
  });

  it("prefers hand-written BibTeX", () => {
    expect(bibtex(pub({ type: "preprint", bibtex: "  @misc{x}\n" }))).toBe("@misc{x}");
  });
});

describe("statusLabel", () => {
  it("labels every status", () => {
    expect(statusLabel("in-preparation")).toBe("In preparation");
    expect(statusLabel("published")).toBe("Published");
  });
});

describe("personBibtex", () => {
  it("puts the surname first", () => {
    const out = personBibtex("Jane Q Doe", "https://example.com", 2026);
    expect(out).toMatch(/^@misc\{doe2026,/);
    expect(out).toContain("author    = {Doe, Jane Q}");
  });
});
