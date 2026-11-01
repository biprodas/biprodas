// Facts mirror data/profile.yaml.
// INVENTED COPY: `intro`, `headlineLine`, `about`, `now.focus` and `principles` are narrative written
// for biprodas.dev. Edit freely.

export const profile = {
  name: "Biprodas Roy",
  firstName: "Biprodas",
  role: "Software Engineer · Full Stack · AI Systems",
  headline: "Software Engineer · Full Stack Developer · AI Researcher",
  titles: ["Software Engineer", "Full Stack Developer", "AI Researcher"],
  headlineLine: "I build software that holds up in production.",
  tagline: "Coding the future, one commit at a time!",
  intro: "I design and build the systems behind SaaS, FinTech and real-time AI products, from the schema up.",
  summary:
    "Full-stack engineer with 8+ years of experience designing and building scalable SaaS and real-time systems for ERP, FinTech and AI platforms. Expertise in TypeScript, Node.js/NestJS, Python/FastAPI, React/Next.js, PostgreSQL and AWS, specialising in system architecture, multi-tenant applications and low-latency infrastructure. Led small engineering teams and delivered platforms serving 100+ businesses.",
  email: "biprodas.cse@gmail.com",
  location: { city: "Jashore", country: "Bangladesh" },
  timezone: "Asia/Dhaka",
  utcOffset: "UTC+6",
  site: "https://biprodas.dev",
  /** Resume PDF, served from public/resume.pdf (not added yet). */
  resume: "/resume.pdf",
  academicSite: "https://biprodas.com",
  social: {
    github: "https://github.com/biprodas",
    linkedin: "https://www.linkedin.com/in/biprodas-roy/",
  },
  stats: [
    { value: "8+", label: "years in production" },
    { value: "100+", label: "businesses served" },
    { value: "4", label: "AWS certifications" },
    { value: "2,000+", label: "problems solved" },
  ],
  about: [
    "I started out writing C and C++ for programming contests at university, and the habit stuck: find the constraint, model it precisely, then make it fast. These days the constraints are tenants, ledgers, queues and latency budgets rather than time limits, but the work feels the same.",
    "Most of my career has been close to money and operations: double-entry ledgers for microfinance NGOs, billing and payroll engines for rental fleets, multi-tenant ERPs for schools and businesses. More recently I've been building real-time AI systems, with live transcription, translation and LLM pipelines that have to keep up with a conversation.",
    "I co-founded a software company, led a team of 10–15 engineers and mentored more than twenty juniors along the way. I care about the unglamorous parts that make software trustworthy: schemas that can't hold invalid states, reports that reconcile, and code the next person can read.",
  ],
} as const;

/**
 * Sidebar "Open to work" card.
 * PLACEHOLDER: data/profile.yaml `openTo` is still a TODO. Confirm or edit these before launch,
 * then copy them into data/.
 */
export const availability = {
  open: true,
  focus: "Building real-time AI and multi-tenant SaaS systems.",
  roles: ["Senior full-stack & backend roles", "Contract projects"],
  where: "Remote · UTC+6",
} as const;

/** "What I'm up to". `focus` is invented; `building` lists my own products from data/projects.yaml. */
export const now = {
  focus:
    "Real-time AI systems and multi-tenant SaaS: LLM pipelines that keep up with a conversation, on infrastructure that stays cheap when idle.",
  building: [
    { slug: "akaunty", note: "double-entry accounting for small businesses" },
    { slug: "cloud-prep", note: "AWS certification practice with weak-area tracking" },
  ],
} as const;

export const principles = [
  {
    title: "Model the domain first",
    body: "A good schema removes whole categories of bugs. I start with entities, invariants and who may see what, before any UI exists.",
  },
  {
    title: "Make the money add up",
    body: "Financial systems get double-entry, idempotent writes and reconciliation from day one. Every number on a report traces back to the rows that produced it.",
  },
  {
    title: "Measure, then optimise",
    body: "Slow reports and chatty APIs get fixed with query plans and profiles, not guesses.",
  },
  {
    title: "Leave it documented",
    body: "Clear READMEs, decision notes and careful code review keep a team fast after I've moved on.",
  },
] as const;
