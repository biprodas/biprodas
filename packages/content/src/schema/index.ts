import { z } from "zod";

// ─── Shared primitives ───────────────────────────────────────────────────────

/** Which site(s) an item appears on. */
export const Audience = z.enum(["academic", "engineering", "both"]);
export type Audience = z.infer<typeof Audience>;

/** YYYY, YYYY-MM or YYYY-MM-DD. Quote it in YAML ("2024-05") so it stays a string. */
export const PartialDate = z
  .string()
  .regex(/^\d{4}(-\d{2}(-\d{2})?)?$/, "expected YYYY, YYYY-MM or YYYY-MM-DD");
export const EndDate = PartialDate.or(z.literal("present"));

export const Location = z.object({
  city: z.string().optional(),
  region: z.string().optional(),
  country: z.string(),
});
export type Location = z.infer<typeof Location>;

export const LinkKind = z.enum([
  "website", "live", "repo", "demo", "docs", "case-study", "paper", "pdf",
  "slides", "video", "credential", "store", "article", "other",
]);
export const Link = z.object({
  kind: LinkKind.default("website"),
  url: z.url(),
  label: z.string().optional(),
});
export type Link = z.infer<typeof Link>;

/** Path under the app's public/ dir, or an absolute URL. */
export const Image = z.object({ src: z.string(), alt: z.string() });
export type Image = z.infer<typeof Image>;

export const Organization = z.object({
  name: z.string(),
  url: z.url().optional(),
  logo: z.string().optional(),
  industry: z.string().optional(),
  location: Location.optional(),
});
export type Organization = z.infer<typeof Organization>;

/** Fields every collection item has. `draft: true` keeps an item out of every site. */
const Item = z.object({
  id: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "ids are kebab-case"),
  audience: Audience.default("both"),
  draft: z.boolean().default(false),
});

// ─── Profile ─────────────────────────────────────────────────────────────────

export const LanguageProficiency = z.enum([
  "native", "full-professional", "professional", "limited-working", "elementary",
]);

export const Profile = z.object({
  name: z.string(),
  pronouns: z.string().optional(),
  avatar: Image.optional(),
  headline: z.object({ academic: z.string(), engineering: z.string() }),
  tagline: z.string().optional(),
  summary: z.object({ academic: z.string().optional(), engineering: z.string() }),
  email: z.email(),
  location: Location.optional(),
  timezone: z.string().optional(),
  sites: z.object({ academic: z.url(), engineering: z.url() }),
  /** Keyed by platform: github, linkedin, scholar, orcid, researchgate, codeforces, leetcode, x … */
  social: z.record(z.string(), z.url()),
  researchInterests: z.array(z.string()).default([]),
  /** e.g. "PhD positions (Fall 2027)", "Senior backend roles", "Consulting". */
  openTo: z.array(z.string()).default([]),
  languages: z
    .array(z.object({ name: z.string(), proficiency: LanguageProficiency }))
    .default([]),
  cv: z
    .object({ academic: z.string().optional(), engineering: z.string().optional() })
    .default({}),
});
export type Profile = z.infer<typeof Profile>;

// ─── Experience ──────────────────────────────────────────────────────────────

export const EmploymentType = z.enum([
  "full-time", "part-time", "contract", "freelance", "internship",
  "self-employed", "founder", "apprenticeship", "volunteer",
]);
export type EmploymentType = z.infer<typeof EmploymentType>;

export const WorkMode = z.enum(["on-site", "remote", "hybrid"]);
export type WorkMode = z.infer<typeof WorkMode>;

/** One title held at an organization. Promotions are multiple positions in one experience. */
export const Position = z.object({
  title: z.string(),
  start: PartialDate,
  end: EndDate,
  employmentType: EmploymentType.optional(),
  workMode: WorkMode.optional(),
  summary: z.string().optional(),
});
export type Position = z.infer<typeof Position>;

const endKey = (d: string) => (d === "present" ? "9999" : d);

export const Experience = Item.extend({
  org: Organization,
  /** Defaults applied to every position that doesn't set its own. */
  employmentType: EmploymentType.optional(),
  workMode: WorkMode.optional(),
  /** Where the work happened if different from the org's location (e.g. remote from Jashore). */
  location: Location.optional(),
  positions: z.array(Position).min(1),
  summary: z.string().optional(),
  highlights: z.array(z.string()).default([]),
  tech: z.array(z.string()).default([]),
  /** Ids from projects.yaml built during this role. */
  projects: z.array(z.string()).default([]),
  links: z.array(Link).default([]),
  featured: z.boolean().default(false),
}).transform((e) => {
  const positions = e.positions
    .map((p) => ({
      ...p,
      employmentType: p.employmentType ?? e.employmentType,
      workMode: p.workMode ?? e.workMode,
    }))
    .sort((a, b) => endKey(b.end).localeCompare(endKey(a.end)));
  return {
    ...e,
    positions,
    /** Current/latest title. */
    title: positions[0]!.title,
    start: positions.map((p) => p.start).sort()[0]!,
    end: positions[0]!.end,
  };
});
export type Experience = z.output<typeof Experience>;

// ─── Education ───────────────────────────────────────────────────────────────

export const DegreeLevel = z.enum([
  "secondary", "higher-secondary", "diploma", "associate",
  "bachelor", "master", "doctorate", "postdoc", "certificate", "other",
]);

export const Education = Item.extend({
  institution: Organization,
  degree: z.object({
    level: DegreeLevel,
    /** As printed on the certificate, e.g. "B.Sc. in Computer Science & Engineering". */
    name: z.string(),
    field: z.string().optional(),
    minor: z.string().optional(),
  }),
  start: PartialDate,
  end: EndDate,
  status: z.enum(["completed", "ongoing", "expected", "withdrawn"]).default("completed"),
  grade: z
    .object({
      value: z.string(),
      scale: z.string().optional(),
      kind: z.enum(["cgpa", "gpa", "percentage", "class", "other"]).default("cgpa"),
      /** e.g. "Top 10%", "3rd of 60". */
      rank: z.string().optional(),
    })
    .optional(),
  thesis: z
    .object({
      title: z.string(),
      kind: z.enum(["thesis", "project", "dissertation"]).default("thesis"),
      supervisors: z.array(z.string()).default([]),
      abstract: z.string().optional(),
      links: z.array(Link).default([]),
    })
    .optional(),
  coursework: z.array(z.string()).default([]),
  honors: z.array(z.string()).default([]),
  activities: z.array(z.string()).default([]),
  highlights: z.array(z.string()).default([]),
});
export type Education = z.output<typeof Education>;

// ─── Projects ────────────────────────────────────────────────────────────────

export const ProjectType = z.enum([
  "product", "client", "research", "open-source", "personal", "academic", "hackathon",
]);
export const ProjectStatus = z.enum([
  "planning", "in-progress", "active", "maintained", "completed", "archived",
]);

export const Project = Item.extend({
  title: z.string(),
  /** One line, used on cards. */
  summary: z.string(),
  /** A paragraph, used on detail pages. */
  description: z.string().optional(),
  type: ProjectType.optional(),
  status: ProjectStatus.optional(),
  role: z.string().optional(),
  period: z.object({ start: PartialDate, end: EndDate.optional() }).optional(),
  /** Experience id this was built under. */
  experience: z.string().optional(),
  client: z.string().optional(),
  teamSize: z.number().int().positive().optional(),
  /** Tech stack. */
  tech: z.array(z.string()).default([]),
  /** Domains / topics, e.g. FinTech, GIS, LLMs. */
  topics: z.array(z.string()).default([]),
  highlights: z.array(z.string()).default([]),
  links: z.array(Link).default([]),
  /** Client or NDA work: no public links or code expected. */
  confidential: z.boolean().default(false),
  featured: z.boolean().default(false),
  cover: Image.optional(),
  gallery: z.array(Image).default([]),
  /** Shown on biprodas.com: problem, method, findings. */
  researchSummary: z.string().optional(),
  /** Shown on biprodas.dev: path to an MDX case study, relative to data/. */
  caseStudy: z.string().optional(),
});
export type Project = z.output<typeof Project>;

// ─── Publications ────────────────────────────────────────────────────────────

export const Publication = Item.extend({
  title: z.string(),
  /** In order, as published. Your own name is highlighted by the apps. */
  authors: z.array(z.string()).min(1),
  type: z.enum([
    "journal", "conference", "workshop", "preprint", "thesis",
    "book", "book-chapter", "technical-report", "patent", "poster",
  ]),
  status: z
    .enum(["published", "accepted", "under-review", "submitted", "in-preparation"])
    .default("published"),
  venue: z.string().optional(),
  venueShort: z.string().optional(),
  date: PartialDate.optional(),
  volume: z.string().optional(),
  issue: z.string().optional(),
  pages: z.string().optional(),
  publisher: z.string().optional(),
  doi: z.string().optional(),
  arxiv: z.string().optional(),
  abstract: z.string().optional(),
  keywords: z.array(z.string()).default([]),
  links: z.array(Link).default([]),
  /** Optional hand-written BibTeX; otherwise the apps generate it. */
  bibtex: z.string().optional(),
  featured: z.boolean().default(false),
}).extend({ audience: Audience.default("academic") });
export type Publication = z.output<typeof Publication>;

// ─── Talks ───────────────────────────────────────────────────────────────────

export const Talk = Item.extend({
  title: z.string(),
  kind: z.enum(["talk", "keynote", "workshop", "seminar", "panel", "poster", "webinar", "podcast"]),
  event: z.string(),
  date: PartialDate,
  location: Location.optional(),
  online: z.boolean().default(false),
  summary: z.string().optional(),
  links: z.array(Link).default([]),
});
export type Talk = z.output<typeof Talk>;

// ─── Teaching & mentoring ────────────────────────────────────────────────────

export const Teaching = Item.extend({
  title: z.string(),
  role: z.enum(["instructor", "teaching-assistant", "trainer", "mentor", "organizer", "guest-lecturer"]),
  org: Organization,
  start: PartialDate.optional(),
  end: EndDate.optional(),
  audienceDescription: z.string().optional(),
  summary: z.string().optional(),
  highlights: z.array(z.string()).default([]),
  /** Experience id, if this happened as part of a job. */
  experience: z.string().optional(),
  links: z.array(Link).default([]),
}).extend({ audience: Audience.default("academic") });
export type Teaching = z.output<typeof Teaching>;

// ─── Awards & achievements ───────────────────────────────────────────────────

export const Award = Item.extend({
  title: z.string(),
  kind: z.enum([
    "competition", "scholarship", "fellowship", "grant", "honor", "recognition", "achievement",
  ]),
  issuer: z.string().optional(),
  date: PartialDate.optional(),
  /** e.g. "Champion", "Rank 45 of 120", "Participant". */
  result: z.string().optional(),
  amount: z.string().optional(),
  description: z.string().optional(),
  links: z.array(Link).default([]),
});
export type Award = z.output<typeof Award>;

// ─── Certifications ──────────────────────────────────────────────────────────

export const Certification = Item.extend({
  title: z.string(),
  issuer: z.string(),
  issued: PartialDate,
  expires: PartialDate.optional(),
  credentialId: z.string().optional(),
  url: z.url().optional(),
  skills: z.array(z.string()).default([]),
});
export type Certification = z.output<typeof Certification>;

// ─── Test scores ─────────────────────────────────────────────────────────────

export const TestScore = Item.extend({
  test: z.enum(["IELTS", "TOEFL", "PTE", "Duolingo", "GRE", "GMAT", "other"]),
  name: z.string().optional(),
  date: PartialDate,
  score: z.string(),
  /** Section scores, e.g. { listening: "8.5", reading: "8.0" }. */
  sections: z.record(z.string(), z.string()).default({}),
  validUntil: PartialDate.optional(),
  /** Admissions sites list these; keep false to store without publishing. */
  public: z.boolean().default(false),
}).extend({ audience: Audience.default("academic") });
export type TestScore = z.output<typeof TestScore>;

// ─── Skills ──────────────────────────────────────────────────────────────────

export const SkillLevel = z.enum(["expert", "advanced", "intermediate", "familiar"]);

/** Either a plain name or { name, level, years }. Normalized to the object form. */
export const Skill = z
  .union([
    z.string(),
    z.object({
      name: z.string(),
      level: SkillLevel.optional(),
      years: z.number().positive().optional(),
    }),
  ])
  .transform((s) => (typeof s === "string" ? { name: s } : s));
export type Skill = z.output<typeof Skill>;

export const SkillGroup = z.object({
  group: z.string(),
  audience: Audience.default("engineering"),
  draft: z.boolean().default(false),
  items: z.array(Skill).min(1),
});
export type SkillGroup = z.output<typeof SkillGroup>;

// ─── All content ─────────────────────────────────────────────────────────────

export const Content = z.object({
  profile: Profile,
  experience: z.array(Experience),
  education: z.array(Education),
  projects: z.array(Project),
  publications: z.array(Publication),
  talks: z.array(Talk),
  teaching: z.array(Teaching),
  awards: z.array(Award),
  certifications: z.array(Certification),
  testScores: z.array(TestScore),
  skills: z.array(SkillGroup),
});
export type Content = z.output<typeof Content>;
