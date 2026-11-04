import { profile } from "@/content/profile";

export type Feature =
  | "skills"
  | "certifications"
  | "projects"
  | "services"
  | "experience"
  | "research"
  | "articles"
  | "testimonials"
  | "contact";

export type SiteConfig = {
  name: string;
  title: string;
  description: string;
  url: string;
  language: string;
  seo: {
    defaultTitle: string;
    titleTemplate: string;
    defaultDescription: string;
    defaultImage?: string;
  };
  appearance: {
    theme: "light" | "dark" | "system";
    enableAnimations: boolean;
  };
  features: Record<Feature, boolean>;
};

export const siteConfig: SiteConfig = {
  name: profile.name,
  title: "Software Engineer",
  description: "Software engineer specializing in SaaS, ERP, FinTech, and backend systems.",
  url: profile.site,
  language: "en",
  seo: {
    defaultTitle: `${profile.name} · Software Engineer`,
    titleTemplate: `%s · ${profile.name}`,
    defaultDescription: `${profile.name}, software engineer: multi-tenant SaaS, FinTech ledgers, and real-time AI systems. Projects, experience, and skills.`,
  },
  appearance: {
    theme: "system",
    enableAnimations: true,
  },
  features: {
    skills: true,
    certifications: true,
    projects: true,
    services: true,
    experience: true,
    research: false,
    articles: false,
    testimonials: true,
    contact: true,
  },
};

export const isEnabled = (feature: Feature) => siteConfig.features[feature];
