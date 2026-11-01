import { describe, expect, it } from "vitest";
import { duration, fmtDate, fmtRange, utcOffset, yearRange } from "./dates.ts";

describe("fmtDate", () => {
  it("formats partial dates", () => {
    expect(fmtDate("2019-08")).toBe("Aug 2019");
    expect(fmtDate("2019")).toBe("2019");
    expect(fmtDate("present")).toBe("now");
    expect(fmtDate(undefined)).toBe("");
  });
});

describe("fmtRange", () => {
  it("joins start and end", () => {
    expect(fmtRange("2019-08", "2023-12")).toBe("Aug 2019 – Dec 2023");
    expect(fmtRange("2021-01", "present")).toBe("Jan 2021 – now");
  });
  it("collapses to one date when end is missing or equal", () => {
    expect(fmtRange("2020-05")).toBe("May 2020");
    expect(fmtRange("2020-05", "2020-05")).toBe("May 2020");
    expect(fmtRange(undefined, "2020")).toBe("2020");
  });
});

describe("yearRange", () => {
  it("shows years only", () => {
    expect(yearRange("2019-08", "2023-12")).toBe("2019–2023");
    expect(yearRange("2021-01", "present")).toBe("2021–now");
    expect(yearRange("2020-01", "2020-11")).toBe("2020");
    expect(yearRange("2020")).toBe("2020");
  });
});

describe("duration", () => {
  it("counts both end months", () => {
    expect(duration("2019-08", "2023-12")).toBe("4 yrs 5 mos");
    expect(duration("2020-01", "2020-01")).toBe("1 mo");
    expect(duration("2020-01", "2020-12")).toBe("1 yr");
  });
  it("is empty without a start", () => {
    expect(duration(undefined, "2020")).toBe("");
  });
});

describe("utcOffset", () => {
  it("reads a fixed-offset zone", () => {
    expect(utcOffset("Asia/Dhaka")).toBe("UTC+6");
  });
  it("is undefined without a zone", () => {
    expect(utcOffset(undefined)).toBeUndefined();
  });
});
