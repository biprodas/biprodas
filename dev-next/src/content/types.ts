/** "YYYY" or "YYYY-MM", same convention as data/. */
export type PartialDate = string;

export type Link = { kind: "live" | "repo"; url: string; label: string };

export type Position = { title: string; start: PartialDate; end: PartialDate | "present" };

export type Experience = {
  id: string;
  org: string;
  location: string;
  employmentType?: "contract" | "founder";
  workMode?: "remote";
  positions: Position[];
  highlights: string[];
  tech: string[];
};

export type Education = {
  id: string;
  institution: string;
  location: string;
  degree: string;
  start: PartialDate;
  end: PartialDate;
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

export type SkillGroup = { group: string; items: string[] };

export type Certification = {
  id: string;
  title: string;
  issuer: string;
  issued: PartialDate;
  expires?: PartialDate;
  credentialId?: string;
  /** Personal verification link (e.g. Credly). */
  url?: string;
  /** Official page about the certification. */
  infoUrl?: string;
  /** One or two sentences on what it covers. */
  description?: string;
  skills?: string[];
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
