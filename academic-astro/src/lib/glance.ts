// "At a glance" facts for the home page, computed from src/data so they stay true.
import { awards, certifications, education, experience, projects, teaching } from "./data.ts";

export type Fact = { label: string; value: string; detail?: string };

/** "20+ junior engineers" → { value: "20+", rest: "junior engineers" } */
function leadingFigure(text: string) {
  const m = text.match(/^([\d][\d,.]*\+?)\s+(.*)$/);
  return m ? { value: m[1]!, rest: m[2]! } : undefined;
}

export function glanceFacts(): Fact[] {
  const facts: Fact[] = [];

  const firstJob = experience.map((e) => e.start).sort()[0];
  if (firstJob) {
    const years = new Date().getFullYear() - Number(firstJob.slice(0, 4));
    facts.push({ label: "Industry", value: `${years}+ years`, detail: `${experience.length} organisations` });
  }

  const degree = education[0];
  if (degree) {
    const short = degree.degree.name.replace(" in ", " ").replace("Computer Science & Engineering", "CSE");
    const school = degree.institution.name
      .split(/\s+/)
      .filter((w) => /^[A-Z]/.test(w))
      .map((w) => w[0])
      .join("");
    const year = degree.end === "present" ? "ongoing" : degree.end.slice(0, 4);
    facts.push({ label: "Education", value: short, detail: `${school}, ${year}` });
  }

  if (certifications.length) {
    const issuers = [...new Set(certifications.map((c) => c.issuer))].join(", ");
    facts.push({ label: "Certifications", value: String(certifications.length), detail: issuers });
  }

  const mentoring = teaching.map((t) => t.audienceDescription && leadingFigure(t.audienceDescription)).find(Boolean);
  if (mentoring) facts.push({ label: "Mentoring", value: mentoring.value, detail: mentoring.rest });

  const solved = awards.filter((a) => a.kind === "achievement").map((a) => leadingFigure(a.title)).find(Boolean);
  if (solved) facts.push({ label: "Problem solving", value: solved.value, detail: solved.rest });

  if (projects.length) facts.push({ label: "Systems built", value: String(projects.length), detail: "described on this site" });

  return facts;
}
