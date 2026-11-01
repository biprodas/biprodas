export const nav = [
  { href: "/", label: "About" },
  { href: "/skills", label: "Skills" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/contact", label: "Contact" },
] as const;

/** Pages outside the menu, and the menu entry they belong under. */
const parents: Record<string, string> = { "/certifications": "/skills" };

/** The nav entry a path belongs to: "/projects/akaunty" → Projects, "/certifications" → Skills. */
export function sectionFor(pathname: string) {
  const path = parents[pathname] ?? pathname;
  return nav.find((n) => (n.href === "/" ? path === "/" : path === n.href || path.startsWith(`${n.href}/`)));
}

/** Pages that aren't in the menu but should be in the sitemap. */
export const extraPages = Object.keys(parents);
