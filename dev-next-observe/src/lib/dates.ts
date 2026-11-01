/** Dates are "YYYY" or "YYYY-MM". An end date may also be "present". */
export type PartialDate = string;
export type EndDate = PartialDate | "present";

const DATE = /^\d{4}(-(0[1-9]|1[0-2]))?$/;
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function isPartialDate(value: string): boolean {
  return DATE.test(value);
}

export function formatDate(value: EndDate): string {
  if (value === "present") return "Present";
  const [year, month] = value.split("-");
  return month ? `${MONTHS[Number(month) - 1]} ${year}` : year;
}

export function formatRange(start: PartialDate, end: EndDate): string {
  return `${formatDate(start)} — ${formatDate(end)}`;
}

/**
 * Whole months between two dates, inclusive of the start month. "present" needs `now`. It is passed
 * in rather than read here, because Cache Components forbids `new Date()` while prerendering.
 */
export function monthsBetween(start: PartialDate, end: EndDate, now?: Date): number {
  const toIndex = (value: EndDate) => {
    if (value === "present") {
      if (!now) throw new Error('monthsBetween: pass `now` when the end date is "present"');
      return now.getFullYear() * 12 + now.getMonth();
    }
    const [year, month] = value.split("-");
    return Number(year) * 12 + (month ? Number(month) - 1 : 0);
  };
  return Math.max(1, toIndex(end) - toIndex(start) + 1);
}

/** "2 yrs 3 mos", "8 mos", "1 yr". */
export function formatDuration(months: number): string {
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const parts = [];
  if (years) parts.push(`${years} ${years === 1 ? "yr" : "yrs"}`);
  if (rest) parts.push(`${rest} ${rest === 1 ? "mo" : "mos"}`);
  return parts.join(" ") || "1 mo";
}

/** Sort key so "2024-05" > "2024" > "2023-12", and "present" sorts last of all. */
export function sortKey(value: EndDate): number {
  if (value === "present") return Number.MAX_SAFE_INTEGER;
  const [year, month] = value.split("-");
  return Number(year) * 100 + (month ? Number(month) : 0);
}
