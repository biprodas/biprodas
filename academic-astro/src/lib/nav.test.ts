import { describe, expect, it } from "vitest";
import { sectionFor } from "./nav.ts";

describe("sectionFor", () => {
  it("matches the home page exactly", () => {
    expect(sectionFor("/")).toMatchObject({ href: "/", num: "01" });
  });
  it("matches a section and its sub-pages, with or without a trailing slash", () => {
    expect(sectionFor("/projects/")).toMatchObject({ label: "Projects", num: "03" });
    expect(sectionFor("/projects/akaunty/")).toMatchObject({ label: "Projects" });
    expect(sectionFor("/contact")).toMatchObject({ label: "Contact", num: "06" });
  });
  it("returns undefined outside the nav", () => {
    expect(sectionFor("/nope/")).toBeUndefined();
  });
});
