// Facts (service titles, linked projects and roles, engagement types, terms, Upwork link) mirror
// data/services.yaml. INVENTED COPY: the descriptions, "best for" lines, process steps and FAQ wording
// are written for biprodas.dev. Edit freely.

export type Service = {
  id: string;
  title: string;
  body: string;
  projects?: string[];
  experience?: string[];
};

export const services: Service[] = [
  {
    id: "saas-mvp",
    title: "SaaS & MVP Builds",
    body: "From idea to a product people can sign up for and pay for: multi-tenant architecture, auth and roles, subscription billing, and a deploy you can grow on.",
    projects: ["pitchpool", "akaunty", "cloud-prep"],
  },
  {
    id: "erp",
    title: "ERP Systems Development & Integration",
    body: "Operational systems for schools, finance and fleets: modules for each department, reporting that reconciles, and integrations with the tools you already use.",
    projects: ["school-erp", "microfinance-core-banking"],
    experience: ["codepal", "semicolon"],
  },
  {
    id: "fintech",
    title: "FinTech & Accounting Systems",
    body: "Double-entry ledgers, billing and payments, payroll and loan schedules, built so every number on a report traces back to the rows that produced it.",
    projects: ["akaunty", "microfinance-core-banking"],
    experience: ["codepal"],
  },
  {
    id: "ai-llm",
    title: "AI / LLM Feature Integration",
    body: "LLM features that work in production: retrieval and RAG, agentic workflows, real-time transcription and translation, with review steps where accuracy matters.",
    projects: ["startdescribe"],
    experience: ["must-company"],
  },
  {
    id: "backend-api",
    title: "Custom Backend & API Development",
    body: "REST and GraphQL APIs, background jobs and queues, and data models in PostgreSQL, designed for the load you expect and the integrations you need.",
    projects: ["pitchpool", "school-erp", "larmts"],
  },
  {
    id: "architecture-performance",
    title: "Architecture Review & Performance",
    body: "A second pair of eyes on multi-tenancy, data modelling and scaling, or a fix for the report that takes 40 seconds and the API that keeps timing out.",
    projects: ["school-erp", "pitchpool"],
    experience: ["semicolon"],
  },
  {
    id: "consultancy",
    title: "Software Engineering Consultancy",
    body: "Technical direction for teams without a senior engineer: roadmaps, code review, testing and delivery practices, and mentoring developers into independent contributors.",
    experience: ["semicolon"],
  },
];

export const engagements = [
  {
    id: "fixed-scope",
    title: "Fixed-scope project",
    body: "An agreed scope, timeline and price, delivered in milestones.",
    bestFor: "MVPs, new modules, integrations",
  },
  {
    id: "monthly-retainer",
    title: "Monthly retainer",
    body: "A set amount of time each month for ongoing development, maintenance or technical leadership.",
    bestFor: "Products after launch, growing teams",
  },
  {
    id: "hourly-consulting",
    title: "Hourly consulting",
    body: "Billed by the hour for reviews, advice and short pieces of work.",
    bestFor: "Architecture and code reviews, second opinions",
  },
  {
    id: "long-term-contract",
    title: "Long-term contract",
    body: "Joining your team as a contractor for months at a time, working inside your process and tools.",
    bestFor: "Teams that need a senior engineer now",
  },
] as const;

export const process = [
  { title: "Talk it through", body: "A short call or email thread about the problem, the users and the constraints." },
  { title: "Proposal", body: "A written scope, a timeline and a quote, with the open questions called out." },
  { title: "Build", body: "Work in small iterations with regular demos, so you can steer as it takes shape." },
  { title: "Launch & handover", body: "Deployment, documentation and a handover, with optional support after." },
] as const;

export const hiring = {
  /** Upwork profile URL from data/services.yaml. Empty hides the Upwork button. */
  upwork: "https://www.upwork.com/freelancers/~017dd9d645b9e068e4?mp_source=share",
};

export const faq = [
  {
    q: "How much does a project cost?",
    a: "It depends on the scope, so I quote each project. Send a few lines on what you need and I'll reply with questions or a proposal.",
  },
  {
    q: "Which timezones do you work with?",
    a: "Any. I'm based in Bangladesh (UTC+6) and keep a few hours' overlap with clients in Asia-Pacific, Europe and North America. I've worked remotely with teams in Seoul and Sydney.",
  },
  {
    q: "Who owns the code?",
    a: "You do. The code, designs and IP are yours once the project is paid for, and I'm happy to sign an NDA before we talk details.",
  },
  {
    q: "What happens after launch?",
    a: "Every project ends with documentation and a handover, so your team can run it without me. If you'd like ongoing help, I offer maintenance and improvements on a monthly retainer.",
  },
  {
    q: "Can I hire you through Upwork?",
    a: "Yes. Email is the quickest way to start, and if you prefer a platform's contracts and payments, we can work through Upwork instead.",
  },
] as const;
