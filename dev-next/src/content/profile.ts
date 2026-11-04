// Facts mirror data/profile.yaml.
// INVENTED COPY: `headlineLine`, `now.focus` and `principles` are narrative written
// for biprodas.dev. Edit freely.

import portrait from "@/assets/biprodas-roy.png";

/** Whole years in industry; shown as "8+". */
const yearsOfExperience = 8;

export const profile = {
  name: "Biprodas Roy",
  firstName: "Biprodas",
  role: "Software Engineer · Full Stack · AI Systems",
  headline: "Software Engineer · Full Stack Developer · AI Researcher",
  titles: ["Software Engineer", "Full Stack Developer", "AI Researcher"],
  headlineLine: "I build software that holds up in production.",
  tagline: "Coding the future, one commit at a time!",
  bio: `Full-stack engineer with ${yearsOfExperience}+ years building SaaS, ERP, FinTech, and real-time systems. Focused on scalable backends and AI.`,
  summary: `For ${yearsOfExperience}+ years, I've been designing and shipping SaaS platforms and real-time systems across ERP, FinTech, and AI, mostly using TypeScript (NestJS, React/Next.js), Python (FastAPI), PostgreSQL, and AWS. I like owning the whole stack, from interfaces people find easy to use to scalable architecture, multi-tenant systems, and low-latency infrastructure. I've led small engineering teams and delivered platforms serving 100+ businesses.`,
  yearsOfExperience,
  avatar: { src: portrait, alt: "Watercolour portrait of Biprodas Roy" },
  email: "biprodas.cse@gmail.com",
  /** WhatsApp number in international format, e.g. "+8801XXXXXXXXX". The Contact page button stays hidden while empty. */
  whatsapp: "" as string,
  location: { city: "Jashore", country: "Bangladesh" },
  timezone: "Asia/Dhaka",
  utcOffset: "UTC+6",
  site: "https://biprodas.dev",
  /** Google Drive file id of the resume PDF, shown on /resume. The file must be shared as "Anyone with the link". */
  resumeDriveId: "1KuDixg8CVPAw_uM114s43_BMLC8kdWNK",
  stats: [
    { value: `${yearsOfExperience}+`, label: "years in production" },
    { value: "100+", label: "businesses served" },
    { value: "4", label: "AWS certifications" },
    { value: "2,000+", label: "problems solved" },
  ],
  about: [
    "I'm a backend-focused full-stack developer who builds and ships SaaS products end to end. In my free time I mostly work on my own products. Right now I'm working on Akaunty, a multi-tenant accounting app for freelancers, agencies, NGOs, and small businesses, with proper double-entry bookkeeping underneath. I also work on my other products from time to time: PitchPool, a prediction-pool platform live at pitchpool.io, where I cut idle database traffic by about 90% so serverless PostgreSQL can scale to zero, and Cloud Prep, an AI-powered AWS certification practice app with weak-area tracking.",
    "Most recently, at MUST Company in Seoul, I worked remotely on MustBreak, a real-time meeting platform with live transcription, translation, and AI summaries, and integrated it with Slack. Before that, as a contractor for CodePal in Sydney, I architected Drivus, a CRM/ERP for car-rental and rent-to-own operators, and built its accounting, payroll, and loan-amortization engines, cutting manual reconciliation time by 35%.",
    "Earlier I co-founded Semicolon IT Solutions, where as CTO I led a team of 10–15 engineers, served 50+ customers, and mentored 20+ developers and interns. I also led a multi-tenant core banking system for microfinance NGOs, deployed across 3 organizations and 20 branches, and brought ERP report generation from ~40s to under 5s. I hold a B.Sc. in Computer Science & Engineering from Jashore University of Science & Technology.",
  ],
} as const;

/**
 * Sidebar "Open to work" card.
 * PLACEHOLDER: data/profile.yaml `openTo` is still a TODO. Confirm or edit these before launch,
 * then copy them into data/.
 */
export const availability = {
  open: true,
  focus: "Building SaaS and real-time AI products end to end, from scalable APIs to polished interfaces.",
  roles: ["Senior full-stack, frontend & backend roles", "Contract projects"],
  where: "Remote · UTC+6",
} as const;

/** "What I'm up to". `focus` is invented; `building` lists my own products from data/projects.yaml. */
export const now = {
  focus: "Shipping my own SaaS products end to end, and starting part-time research alongside them.",
  building: [
    {
      slug: "akaunty",
      note: "double-entry accounting for freelancers and small businesses, with balanced books and reports",
    },
    { slug: "pitchpool", note: "multi-tenant prediction pools with automated scoring and live leaderboards" },
    {
      slug: "cloud-prep",
      note: "AI-powered AWS certification practice that explains every answer and tracks weak topics",
    },
  ],
  /** Certification exams and courses I'm working through. */
  preparing: [
    "AWS Machine Learning Engineer – Associate (MLA-C02)",
    "AWS Solutions Architect – Professional (SAP-C02)",
    "Hugging Face LLM Course",
  ],
} as const;

/** `service` is the slug in services.ts where the principle shows up; the home page lists them beside the principles. */
export const principles = [
  {
    title: "Model the domain first",
    service: "saas-mvp-development",
    body: "A good schema removes whole categories of bugs. I start with entities, invariants, and who may see what, before any UI exists.",
  },
  {
    title: "Make the money add up",
    service: "fintech-accounting",
    body: "Financial systems get double-entry, idempotent writes, and reconciliation from day one. Every number on a report traces back to the rows that produced it.",
  },
  {
    title: "Measure, then optimise",
    service: "architecture-performance",
    body: "Slow reports and chatty APIs get fixed with query plans and profiles, not guesses.",
  },
  {
    title: "Leave it documented",
    service: "software-engineering-consultancy",
    body: "Clear READMEs, decision notes, and careful code review keep a team fast after I've moved on.",
  },
] as const;
