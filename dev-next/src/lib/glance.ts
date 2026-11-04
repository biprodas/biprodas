// "At a glance" facts for the home page, derived from src/content so they stay true.
import { profile } from "@/content/profile";
import { education, experience } from "@/content/experience";
import { projects } from "@/content/projects";
import { certifications } from "@/content/certifications";
import { awards } from "@/content/skills";
import { initials } from "@/lib/format";

export type Fact = { label: string; value: string; detail: string };

export function glanceFacts(): Fact[] {
  const degree = education[0];
  const solved = awards.find((a) => a.id === "problem-solving-2000");
  const issuers = [...new Set(certifications.map((c) => c.issuer.replace("Amazon Web Services", "AWS")))];
  return [
    {
      label: "Industry",
      value: `${profile.yearsOfExperience}+ years`,
      detail: `${experience.length} organisations, remote since 2023`,
    },
    { label: "Leadership", value: "10–15", detail: "engineers led as co-founder & CTO" },
    { label: "Systems built", value: `${projects.length}+`, detail: "with case studies on this site" },
    { label: "Certifications", value: String(certifications.length), detail: issuers.join(", ") },
    { label: "Problem solving", value: solved?.title.split(" ")[0] ?? "", detail: "algorithmic problems solved" },
    {
      label: "Education",
      value: `${degree.degreeShort ?? degree.degree} ${initials(degree.fieldOfStudy)}`,
      detail: [initials(degree.institution.name), degree.endDate?.slice(0, 4)].filter(Boolean).join(", "),
    },
  ];
}
