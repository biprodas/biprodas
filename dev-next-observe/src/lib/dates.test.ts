import { describe, expect, it } from "vitest";
import { formatDate, formatDuration, formatRange, isPartialDate, monthsBetween, sortKey } from "./dates";

describe("dates", () => {
  it("validates YYYY and YYYY-MM", () => {
    expect(isPartialDate("2024")).toBe(true);
    expect(isPartialDate("2024-05")).toBe(true);
    expect(isPartialDate("2024-13")).toBe(false);
    expect(isPartialDate("24-05")).toBe(false);
  });

  it("formats dates and ranges", () => {
    expect(formatDate("2024-05")).toBe("May 2024");
    expect(formatDate("2022")).toBe("2022");
    expect(formatDate("present")).toBe("Present");
    expect(formatRange("2019-08", "2023-12")).toBe("Aug 2019 — Dec 2023");
  });

  it("counts months inclusively", () => {
    expect(monthsBetween("2024-05", "2026-06")).toBe(26);
    expect(monthsBetween("2018-01", "2019-03")).toBe(15);
    expect(monthsBetween("2024-01", "present", new Date(2024, 2, 15))).toBe(3);
  });

  it("refuses to guess today", () => {
    expect(() => monthsBetween("2024-01", "present")).toThrow();
  });

  it("formats durations", () => {
    expect(formatDuration(26)).toBe("2 yrs 2 mos");
    expect(formatDuration(12)).toBe("1 yr");
    expect(formatDuration(1)).toBe("1 mo");
  });

  it("sorts present last, then months after bare years", () => {
    expect(sortKey("present")).toBeGreaterThan(sortKey("2026-06"));
    expect(sortKey("2024-05")).toBeGreaterThan(sortKey("2024"));
    expect(sortKey("2024")).toBeGreaterThan(sortKey("2023-12"));
  });
});
