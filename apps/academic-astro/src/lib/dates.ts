const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2019-08" → "Aug 2019", "2019" → "2019", "present" → "now". */
export function fmtDate(d: string | undefined): string {
  if (!d) return "";
  if (d === "present") return "now";
  const [y, m] = d.split("-");
  return m ? `${MONTHS[Number(m) - 1]} ${y}` : (y ?? d);
}

/** "Aug 2019 – Dec 2023"; a single date when start and end are equal or end is missing. */
export function fmtRange(start?: string, end?: string): string {
  if (!start) return fmtDate(end);
  if (!end || end === start) return fmtDate(start);
  return `${fmtDate(start)} – ${fmtDate(end)}`;
}

/** Year only: "2019" or "2019–23" style compact ranges for the gutter. */
export function yearRange(start?: string, end?: string): string {
  const y = (d?: string) => (d === "present" ? "now" : d?.slice(0, 4) ?? "");
  const a = y(start);
  const b = y(end);
  if (!b || a === b) return a;
  return `${a}–${b === "now" ? "now" : b}`;
}

/** Rough duration, e.g. "4 yrs 5 mos". */
export function duration(start?: string, end?: string): string {
  if (!start) return "";
  const toMonths = (d: string) => {
    if (d === "present") {
      const n = new Date();
      return n.getFullYear() * 12 + n.getMonth();
    }
    const [y, m] = d.split("-");
    return Number(y) * 12 + (m ? Number(m) - 1 : 0);
  };
  const months = toMonths(end ?? start) - toMonths(start) + 1;
  const yrs = Math.floor(months / 12);
  const mos = months % 12;
  return [yrs ? `${yrs} yr${yrs > 1 ? "s" : ""}` : "", mos ? `${mos} mo${mos > 1 ? "s" : ""}` : ""]
    .filter(Boolean)
    .join(" ");
}

/** Sortable key for partial dates, "present" last. */
export const dateKey = (d?: string) => (d === "present" ? "9999" : (d ?? ""));
