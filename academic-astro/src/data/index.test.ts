import { describe, expect, it } from "vitest";
import { forSite, loadContent } from "./index.ts";
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
