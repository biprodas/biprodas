// "At a glance" facts for the home page, derived from src/content so they stay true.
import { education, experience } from "@/content/experience";
import { projects } from "@/content/projects";
import { awards, certifications } from "@/content/skills";

export type Fact = { label: string; value: string; detail: string };

export function glanceFacts(): Fact[] {
  const degree = education[0];
  const solved = awards.find((a) => a.id === "problem-solving-2000");
  const issuers = [...new Set(certifications.map((c) => c.issuer.replace("Amazon Web Services", "AWS")))];
  return [
    { label: "Industry", value: "8+ years", detail: `${experience.length} organisations, remote since 2023` },
    { label: "Leadership", value: "10–15", detail: "engineers led as co-founder & CTO" },
    { label: "Systems built", value: String(projects.length), detail: "with case studies on this site" },
    { label: "Certifications", value: String(certifications.length), detail: issuers.join(", ") },
    { label: "Problem solving", value: solved?.title.split(" ")[0] ?? "", detail: "algorithmic problems solved" },
    {
      label: "Education",
      value: "B.Sc. CSE",
      detail: `JUST, ${degree.end.slice(0, 4)}`,
    },
  ];
}
