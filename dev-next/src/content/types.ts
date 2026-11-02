/** "YYYY" or "YYYY-MM", same convention as data/. */
export type PartialDate = string;

export type Link = { kind: "live" | "repo"; url: string; label: string };

export type EmploymentType = "Full-time" | "Part-time" | "Contract" | "Freelance" | "Internship" | "Founder";

export type Position = {
  id: string;
  title: string;
  employmentType?: EmploymentType;
  employmentLevel?: string;
  startDate: PartialDate;
  endDate?: PartialDate;
  description?: string;
  bullets: string[];
  technologies?: string[];
  relatedProjects?: string[];
};

export type Company = {
  name: string;
  website?: string;
  logo?: string;
  location?: string;
  industry?: string;
};

export type ExperienceEntry = {
  id: string;
  company: Company;
  workMode?: "Remote" | "Hybrid" | "On-site";
  positions: Position[];
  order: number;
};

export type Experience = ExperienceEntry & {
  startDate: PartialDate;
  endDate?: PartialDate;
  current: boolean;
};

export type Institution = {
  name: string;
  website?: string;
  logo?: string;
  location?: string;
};

export type Education = {
  id: string;
  institution: Institution;
  degree: string;
  degreeShort?: string;
  fieldOfStudy: string;
  startDate?: PartialDate;
  endDate?: PartialDate;
  grade?: string;
  description?: string;
  activities?: string[];
  relevantCourses?: string[];
  order: number;
};

export type Domain = "FinTech" | "SaaS" | "AI" | "EdTech" | "GovTech";

export type DiagramNodeKind = "client" | "service" | "data" | "queue" | "external" | "worker";

export type DiagramNode = {
  id: string;
  label: string;
  /** Second line, usually the technology. */
  sub?: string;
  kind: DiagramNodeKind;
  /** Grid cell; the renderer turns it into coordinates. */
  col: number;
  row: number;
};

export type DiagramEdge = {
  from: string;
  to: string;
  label?: string;
  /** Asynchronous hop (queue, webhook, event): drawn dashed. */
  async?: boolean;
};

export type Diagram = { title: string; cols: number; rows: number; nodes: DiagramNode[]; edges: DiagramEdge[] };

export type Project = {
  slug: string;
  title: string;
  /** Short name for tight spaces. */
  shortTitle?: string;
  summary: string;
  domains: Domain[];
  topics: string[];
  tech: string[];
  links: Link[];
  /** Facts from data/projects.yaml. */
  highlights: string[];
  featured: boolean;
  kind?: "product";
  /** Case-study narrative (invented copy). */
  story: { problem: string; approach: string; decisions: { title: string; body: string }[] };
  diagram: Diagram;
};

export type SkillLevel = "Beginner" | "Intermediate" | "Advanced" | "Expert";

export type Skill = {
  name: string;
  category: string;
  level?: SkillLevel;
  yearsOfExperience?: number;
  icon?: string;
  website?: string;
  featured: boolean;
  order: number;
};

export type SkillCategory = {
  slug: string;
  title: string;
  description?: string;
  skills: string[];
  order: number;
};

export type Certification = {
  id: string;
  name: string;
  issuer: string;
  issueDate?: PartialDate;
  expiryDate?: PartialDate;
  credentialId?: string;
  credentialUrl?: string;
  infoUrl?: string;
  image?: string;
  file?: string;
  description?: string;
  skills?: string[];
  visible: boolean;
  featured: boolean;
  order: number;
};

export type Award = { id: string; title: string; issuer?: string; date?: PartialDate; description?: string };

export type Teaching = {
  id: string;
  title: string;
  role: "trainer" | "mentor" | "organizer";
  org: string;
  start?: PartialDate;
  end?: PartialDate;
  audience?: string;
  summary?: string;
};

export type Platform =
  "github" | "linkedin" | "upwork" | "x" | "website" | "email" | "codeforces" | "leetcode" | "scholar" | "orcid";

export type SocialLink = {
  platform: Platform;
  label: string;
  url: string;
  handle?: string;
  description?: string;
  visible: boolean;
  order: number;
};
