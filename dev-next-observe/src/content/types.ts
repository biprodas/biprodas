import type { EndDate, PartialDate } from "@/lib/dates";

export type LinkKind = "live" | "repo" | "case-study" | "credential" | "info";

export interface Link {
  kind: LinkKind;
  url: string;
  label?: string;
}

export interface Position {
  title: string;
  start: PartialDate;
  end: EndDate;
}

export interface Experience {
  slug: string;
  org: string;
  location: string;
  mode?: "remote" | "onsite" | "hybrid";
  employment?: "full-time" | "contract" | "founder";
  positions: Position[];
  /** One line on what the work was about. */
  summary: string;
  highlights: string[];
  tech: string[];
}

export type ProjectKind = "product" | "client";
export type ProductStatus = "live" | "building" | "sunset";

export interface ArchitectureLayer {
  label: string;
  items: string[];
}

export interface CaseStudy {
  problem: string;
  constraints: string[];
  architecture: { summary: string; layers: ArchitectureLayer[] };
  decisions: { title: string; body: string }[];
  outcome: string[];
}

export interface Project {
  slug: string;
  title: string;
  /** Short label for tight spaces such as the constellation map. */
  shortTitle?: string;
  summary: string;
  /** "product": built and run independently. "client": built for an employer or client. */
  kind: ProjectKind;
  status?: ProductStatus;
  role: string;
  tech: string[];
  topics: string[];
  highlights: string[];
  links: Link[];
  featured?: boolean;
  caseStudy?: CaseStudy;
}

export interface ResearchArea {
  slug: string;
  title: string;
  status: "active" | "exploring" | "reading";
  summary: string;
  why: string;
  questions: string[];
  experiments: { title: string; note: string }[];
  /** Real, published papers only. */
  reading: { title: string; authors: string; year: number; url: string }[];
}

export interface SkillGroup {
  group: string;
  items: string[];
}

export interface Education {
  institution: string;
  location: string;
  degree: string;
  start: PartialDate;
  end: EndDate;
}

export interface Certification {
  slug: string;
  title: string;
  issuer: string;
  issued: PartialDate;
  url?: string;
}

export interface Post {
  slug: string;
  title: string;
  summary: string;
  date: PartialDate;
  topics: string[];
}
