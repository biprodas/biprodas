import { z } from "zod";

/** Which site(s) an item appears on. */
export const Audience = z.enum(["academic", "engineering", "both"]);
export type Audience = z.infer<typeof Audience>;

/** YYYY or YYYY-MM. */
const PartialDate = z.string().regex(/^\d{4}(-\d{2})?$/, "expected YYYY or YYYY-MM");

const Link = z.object({ label: z.string(), url: z.url() });

export const Profile = z.object({
  name: z.string(),
  headline: z.object({ academic: z.string(), engineering: z.string() }),
  tagline: z.string().optional(),
  email: z.email(),
  location: z.string().optional(),
  sites: z.object({ academic: z.url(), engineering: z.url() }),
  social: z.record(z.string(), z.url()),
  researchInterests: z.array(z.string()).default([]),
});
export type Profile = z.infer<typeof Profile>;

export const Experience = z.object({
  id: z.string(),
  role: z.string(),
  org: z.string(),
  orgUrl: z.url().optional(),
  location: z.string().optional(),
  start: PartialDate,
  end: PartialDate.or(z.literal("present")),
  audience: Audience.default("both"),
  highlights: z.array(z.string()).default([]),
});
export type Experience = z.infer<typeof Experience>;

export const Education = z.object({
  id: z.string(),
  degree: z.string(),
  institution: z.string(),
  location: z.string().optional(),
  start: PartialDate,
  end: PartialDate.or(z.literal("present")),
  gpa: z.string().optional(),
  thesis: z.string().optional(),
  advisor: z.string().optional(),
  highlights: z.array(z.string()).default([]),
});
export type Education = z.infer<typeof Education>;

export const Project = z.object({
  id: z.string(),
  title: z.string(),
  summary: z.string(),
  audience: Audience.default("both"),
  year: z.number().int(),
  tags: z.array(z.string()).default([]),
  links: z.array(Link).default([]),
  featured: z.boolean().default(false),
  /** Shown on biprodas.com: problem, method, findings. */
  researchSummary: z.string().optional(),
  /** Shown on biprodas.dev: path to an MDX case study, relative to data/. */
  caseStudy: z.string().optional(),
});
export type Project = z.infer<typeof Project>;

export const Award = z.object({
  id: z.string(),
  title: z.string(),
  issuer: z.string(),
  date: PartialDate,
  audience: Audience.default("both"),
  description: z.string().optional(),
});
export type Award = z.infer<typeof Award>;

export const SkillGroup = z.object({
  group: z.string(),
  audience: Audience.default("engineering"),
  items: z.array(z.string()).min(1),
});
export type SkillGroup = z.infer<typeof SkillGroup>;

export const Content = z.object({
  profile: Profile,
  experience: z.array(Experience),
  education: z.array(Education),
  projects: z.array(Project),
  awards: z.array(Award),
  skills: z.array(SkillGroup),
});
export type Content = z.infer<typeof Content>;
