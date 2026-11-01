import type { PartialDate, Position } from "@/content/types";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2024-05" → "May 2024", "2022" → "2022". Locale-independent so server and client agree. */
export function formatDate(date: PartialDate | "present"): string {
  if (date === "present") return "Present";
  const [year, month] = date.split("-");
  return month ? `${MONTHS[Number(month) - 1]} ${year}` : year;
}

export function formatRange(start: PartialDate, end: PartialDate | "present"): string {
  return `${formatDate(start)} – ${formatDate(end)}`;
}

/** Overall span of an organisation's positions. */
export function positionsSpan(positions: Position[]) {
  const start = positions.map((p) => p.start).sort()[0];
  const ends = positions.map((p) => p.end);
  const end = ends.includes("present") ? "present" : ends.sort().at(-1)!;
  return { start, end };
}

export const pad2 = (n: number) => String(n).padStart(2, "0");

/** "2024-05", "2026-06" → "2024–2026"; a single year when start and end match. */
export function yearRange(start: PartialDate, end: PartialDate | "present"): string {
  const a = start.slice(0, 4);
  const b = end === "present" ? "now" : end.slice(0, 4);
  return a === b ? a : `${a}–${b}`;
}

/** Length of a span in years and months, e.g. "2 yrs 2 mos". Year-only dates count from January. */
export function duration(start: PartialDate, end: PartialDate | "present"): string {
  if (end === "present") return "";
  const months = (d: PartialDate) => Number(d.slice(0, 4)) * 12 + (d.length > 4 ? Number(d.slice(5, 7)) - 1 : 0);
  const total = months(end) - months(start) + 1;
  const y = Math.floor(total / 12);
  const m = total % 12;
  return [y && `${y} yr${y > 1 ? "s" : ""}`, m && `${m} mo${m > 1 ? "s" : ""}`].filter(Boolean).join(" ");
}
