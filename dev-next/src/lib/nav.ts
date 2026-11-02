import { isEnabled, type Feature } from "@/config/site";
import { showResearch } from "@/content/research";

const pages: { href: string; label: string; feature?: Feature }[] = [
  { href: "/", label: "About" },
  { href: "/skills", label: "Skills", feature: "skills" },
  { href: "/projects", label: "Projects", feature: "projects" },
  { href: "/services", label: "Services", feature: "services" },
  { href: "/experience", label: "Experience", feature: "experience" },
  ...(showResearch ? [{ href: "/research", label: "Research", feature: "research" as const }] : []),
  { href: "/contact", label: "Contact", feature: "contact" },
];

export const nav: { href: string; label: string }[] = pages
  .filter((p) => !p.feature || isEnabled(p.feature))
  .map(({ href, label }) => ({ href, label }));

/** Pages outside the menu, and the menu entry they belong under. */
const parents: Record<string, string> = { "/certifications": "/skills" };

/** The nav entry a path belongs to: "/projects/akaunty" → Projects, "/certifications" → Skills. */
export function sectionFor(pathname: string) {
  const path = parents[pathname] ?? pathname;
  return nav.find((n) => (n.href === "/" ? path === "/" : path === n.href || path.startsWith(`${n.href}/`)));
}

/** Pages that aren't in the menu but should be in the sitemap. */
export const extraPages = Object.keys(parents).filter((p) => p !== "/certifications" || isEnabled("certifications"));
