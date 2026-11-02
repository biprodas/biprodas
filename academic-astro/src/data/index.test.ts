import { describe, expect, it } from "vitest";
import { forSite, loadContent, Reference } from "./index.ts";
import { fill, isReal } from "../lib/data.ts";

describe("loadContent", () => {
  it("validates the YAML in src/data", () => {
    const c = loadContent();
    expect(c.profile.name).toBeTruthy();
    expect(c.projects.length).toBeGreaterThan(0);
  });
});

describe("forSite", () => {
  const items = [
    { id: "a", audience: "academic", draft: false },
    { id: "b", audience: "engineering", draft: false },
    { id: "c", audience: "both", draft: false },
    { id: "d", audience: "both", draft: true },
  ] as const;
  it("keeps matching and shared items, and drops drafts", () => {
    expect(forSite([...items], "academic").map((i) => i.id)).toEqual(["a", "c"]);
    expect(forSite([...items], "engineering").map((i) => i.id)).toEqual(["b", "c"]);
  });
});

describe("placeholders", () => {
  it("treats empty and TODO values as missing", () => {
    for (const v of [undefined, null, "", "  ", "TODO: write this", []]) expect(isReal(v)).toBe(false);
    for (const v of ["Real text", ["x"], 0, false, {}]) expect(isReal(v)).toBe(true);
  });
  it("fills missing values and records the key", () => {
    expect(fill("real", "k", "ph")).toEqual({ value: "real", ph: null });
    expect(fill("", "k", "ph")).toEqual({ value: "ph", ph: "k" });
  });
});

describe("Reference", () => {
  const base = {
    id: "r",
    name: "A",
    title: "Professor",
    company: { name: "U" },
    relationship: "Supervisor",
  };
  it("is private by default", () => {
    const r = Reference.parse(base);
    expect(r.public).toBe(false);
    expect(r.showEmail).toBe(false);
    expect(r.audience).toBe("academic");
  });
  it("rejects showEmail without an email", () => {
    expect(Reference.safeParse({ ...base, showEmail: true }).success).toBe(false);
    expect(Reference.safeParse({ ...base, showEmail: true, email: "a@u.edu" }).success).toBe(true);
  });
  it("rejects showPhone without a phone, and malformed phones", () => {
    expect(Reference.parse(base).showPhone).toBe(false);
    expect(Reference.safeParse({ ...base, showPhone: true }).success).toBe(false);
    expect(Reference.safeParse({ ...base, showPhone: true, phone: "+880 1712-345678" }).success).toBe(true);
    expect(Reference.safeParse({ ...base, phone: "call me" }).success).toBe(false);
  });
});
