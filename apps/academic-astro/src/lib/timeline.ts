import type { Experience, Education } from "@biprodas/content";
import { yearRange } from "./dates.ts";

export type TimelineNode = {
  kind: "education" | "work" | "milestone";
  when: string;
  title: string;
  sub?: string;
  start: string;
  current?: boolean;
};

/** Education + experience (+ founding milestones) as chronological nodes, oldest first. */
export function buildTimeline(education: Education[], experience: Experience[]): TimelineNode[] {
  const nodes: TimelineNode[] = [];
  for (const ed of education) {
    nodes.push({
      kind: "education",
      when: yearRange(ed.start, ed.end),
      title: ed.degree.name.replace("Computer Science & Engineering", "CSE"),
      sub: ed.institution.name,
      start: ed.start,
      current: ed.end === "present",
    });
  }
  for (const ex of experience) {
    const { start, end } = ex;
    const founder = ex.positions.some((p) => p.employmentType === "founder");
    nodes.push({
      kind: founder ? "milestone" : "work",
      when: yearRange(start, end),
      title: founder ? `Co-founded ${ex.org.name}` : ex.org.name,
      sub: ex.title,
      start,
      current: end === "present",
    });
  }
  return nodes.sort((a, b) => a.start.localeCompare(b.start));
}
