// Site sections, in sidebar order. The index gives each page its number ("06 — Contact").
export const nav = [
  { href: "/", label: "About" },
  { href: "/research/", label: "Research" },
  { href: "/work/", label: "Work" },
  { href: "/journey/", label: "Journey" },
  { href: "/skills/", label: "Skills" },
  { href: "/contact/", label: "Contact" },
] as const;

/** The section a path belongs to, with its two-digit number. */
export function sectionFor(path: string) {
  const clean = path.replace(/\/$/, "") || "/";
  const i = nav.findIndex((n) => (n.href === "/" ? clean === "/" : clean.startsWith(n.href.replace(/\/$/, ""))));
  return i < 0 ? undefined : { ...nav[i]!, num: String(i + 1).padStart(2, "0") };
}
