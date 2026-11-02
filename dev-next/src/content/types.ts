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

export type ResearchInterest = {
  topic: string;
  note: string;
  origin?: { label: string; href: string };
};

export type PublicationType =
  "journal" | "conference" | "workshop" | "preprint" | "thesis" | "book-chapter" | "technical-report" | "poster";

export type PublicationStatus = "published" | "accepted" | "under-review" | "submitted" | "in-preparation";

export type PublicationLink = { kind: "pdf" | "doi" | "arxiv" | "code" | "slides" | "video"; url: string };

export type Publication = {
  id: string;
  title: string;
  authors: string[];
  type: PublicationType;
  status: PublicationStatus;
  venue: string;
  venueShort?: string;
  date: PartialDate;
  abstract?: string;
  keywords?: string[];
  links: PublicationLink[];
  featured: boolean;
  order: number;
};

export type Talk = {
  id: string;
  title: string;
  kind: "talk" | "keynote" | "workshop" | "seminar" | "panel" | "poster" | "webinar" | "podcast";
  event: string;
  date: PartialDate;
  location?: string;
  online?: boolean;
  links: { kind: "slides" | "video" | "article"; url: string }[];
};

export type Research = {
  statement: string[];
  interests: ResearchInterest[];
  publications: Publication[];
  talks: Talk[];
};

export type TestimonialRelationship = "client" | "manager" | "colleague" | "mentee";

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  position: string;
  company?: string;
  linkedinUrl?: string;
  relationship: TestimonialRelationship;
  workedOn?: { label: string; href: string };
  source?: { label: string; url: string };
  date?: PartialDate;
  avatar?: string;
  featured: boolean;
  visible: boolean;
  order: number;
};

export type ArticlePlatform = "medium" | "dev.to" | "hashnode" | "linkedin" | "substack" | "company-blog" | "other";

type ArticleBase = {
  slug: string;
  title: string;
  /** One or two sentences for the list and link previews. */
  summary: string;
  /** The one main grouping, e.g. "Backend", "FinTech", "Career". `tags` hold the finer topics. */
  category: string;
  publishedAt: PartialDate;
  updatedAt?: PartialDate;
  tags: string[];
  /** Minutes. */
  readingTime?: number;
  /** Path under public/ ("/articles/…") or an https URL. */
  coverImage?: string;
  relatedProjects?: string[];
  relatedServices?: string[];
  featured: boolean;
  visible: boolean;
};

/** Published elsewhere; the site lists it and links out. */
export type ExternalArticle = ArticleBase & {
  source: "external";
  externalUrl: string;
  platform: ArticlePlatform;
  /** Blog or publication name when it isn't obvious from the platform, e.g. a company engineering blog. */
  publication?: string;
};

/** Written on the site, with its own page. */
export type LocalArticle = ArticleBase & {
  source: "local";
  /** The body, relative to src/content, e.g. "articles/<slug>.mdx". */
  contentPath: string;
  /** Where else it is published, if it was cross-posted. The page uses it as the canonical URL. */
  externalUrl?: string;
};

export type Article = ExternalArticle | LocalArticle;
