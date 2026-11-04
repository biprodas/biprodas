// Facts (service slugs, titles and order, related projects and roles, engagement types, terms) mirror
// data/services.yaml, where the slug is the `id`. The descriptions cite facts from
// data/projects.yaml, experience.yaml, skills.yaml and certifications.yaml; keep those in step.
// INVENTED COPY: the approach and process sentences in the descriptions, "best for" lines, process steps
// and FAQ wording are written for biprodas.dev. Edit freely.

import { profile } from "./profile";

export type ServiceCategory =
  | "Product Development"
  | "Enterprise Systems"
  | "AI Engineering"
  | "Backend Engineering"
  | "Infrastructure"
  | "Consulting";

export type Service = {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  category: ServiceCategory;
  offerings: string[];
  technologies: string[];
  relatedProjects: string[];
  relatedExperience: string[];
  featured: boolean;
  order: number;
};

const unsorted: Service[] = [
  {
    slug: "saas-mvp-development",
    title: "SaaS & MVP Development",
    shortDescription: "End-to-end development of scalable SaaS products.",
    description: [
      "A SaaS product has to do more than work in a demo. It needs sign-up, tenants that can't see each other's data, roles, billing that matches what each plan allows, and hosting that doesn't cost a fortune before the first customer arrives. I build all of it, from the database schema to the production deploy.",
      "PitchPool, a multi-tenant platform for competition prediction pools, shows what that looks like. It has automated scoring, live leaderboards, and subscription billing with plans, entitlement gating and webhooks behind a provider-agnostic gateway, so the payment provider can change without touching the product. Access runs on three-tier role-based access control with safeguards against privilege escalation.",
      "Early products also need to stay cheap and stay up. On PitchPool, in-memory job scheduling and consolidated tasks cut idle database traffic by around 90%, which let serverless PostgreSQL scale to zero. On match days, BullMQ ingestion with rate limiting, circuit breaking and retries keeps the leaderboards accurate through the spikes.",
      "I've shipped other products the same way. Cloud Prep, my own product, is a practice app for AWS certification exams with per-topic accuracy and weak-area tracking. StartDescribe is an AI SaaS for e-commerce product descriptions and images, with Stripe subscriptions, where optimised workflows raised onboarding conversion by 40%.",
      "An MVP should be small, not throwaway. I scope the first version around the workflow your users will pay for, and build it on foundations the next features can sit on.",
    ].join("\n\n"),
    category: "Product Development",
    offerings: [
      "MVP development",
      "Multi-tenant architecture",
      "Subscription and billing",
      "Authentication and authorization",
      "Full-stack product development",
    ],
    technologies: ["Next.js", "NestJS", "PostgreSQL", "Docker"],
    relatedProjects: ["pitchpool", "cloud-prep", "startdescribe"],
    relatedExperience: [],
    featured: true,
    order: 1,
  },
  {
    slug: "erp-development",
    title: "ERP Systems Development & Integration",
    shortDescription: "Custom enterprise resource planning systems and business workflows.",
    description: [
      "Most operations software starts as spreadsheets and a handful of disconnected tools. I build ERPs that replace them with one system: a module for each department, shared data underneath, and reports that agree with each other.",
      "I've built this for schools, microfinance NGOs and rental fleets. The School ERP covers admissions, academics, students, parents and staff, finance, campus services, communication and reporting. The microfinance core banking system runs group lending, savings, loan disbursement, repayment schedules and field-agent collection for 3 organisations across 20 branches, with HR, payroll and MIS reporting alongside. At CodePal I architected Drivus, a CRM/ERP for car-rental and rent-to-own operators covering fleet, vehicle tracking, contracts, payments, tolls and fines, and financial reporting.",
      "I start with the domain: the entities, the rules that must always hold, and who is allowed to see what. In multi-tenant systems the database enforces tenant isolation itself, with PostgreSQL row-level security, instead of trusting every query to remember a filter. Branches, roles and permissions are modelled up front, because retrofitting them later is where ERPs tend to break.",
      "Reports get the same care. At Semicolon I cut ERP report generation from around 40 seconds to under 5 through query optimisation and backend refactoring. On Drivus, automated accounting and payroll workflows cut manual reconciliation time by 35%.",
      "An ERP also has to fit the tools you already use: Drivus, for example, bills through Pay Advantage and sends event-driven notifications for payments, contracts and compliance. Every deployment comes with documentation, and the microfinance rollout included training and technical support for the teams using it.",
    ].join("\n\n"),
    category: "Enterprise Systems",
    offerings: [
      "Custom ERP development",
      "Accounting and financial modules",
      "Inventory and warehouse management",
      "Procurement and purchasing",
      "Multi-branch and multi-entity systems",
      "ERP integration",
    ],
    technologies: ["NestJS", "PostgreSQL", "Next.js"],
    relatedProjects: ["akaunty", "microfinance-core-banking"],
    relatedExperience: ["codepal", "semicolon"],
    featured: true,
    order: 2,
  },
  {
    slug: "fintech-accounting",
    title: "FinTech & Accounting Systems",
    shortDescription: "Financial software built around reliable accounting principles.",
    description: [
      "Financial software has one job above all: the numbers have to add up. I build ledgers, billing and payroll systems on double-entry accounting, so every balance on a report traces back to the journal entries that produced it.",
      'Akaunty, my own product, gives freelancers, agencies, NGOs and small businesses simple financial tracking. Users record "I got paid" or "I spent money", and the system generates balanced journal entries underneath, which feed profit & loss, cash flow, balance sheet, trial balance and general ledger reports.',
      "For NGO microfinance I engineered the double-entry ledger of a multi-tenant core banking system, with transaction posting and reconciliation, microcredit portfolio management, savings products and repayment scheduling. It runs across 3 organisations and 20 branches.",
      "At CodePal I built the accounting, payroll and loan-amortisation engines behind Drivus, a platform for car-rental and rent-to-own operators. Automated workflows cut manual reconciliation time by 35%, and recurring billing runs through Pay Advantage.",
      "A few rules carry through all of it. Money moves as balanced entries, not edits to a balance. Writes are idempotent, so a retried payment webhook can't post twice. And reconciliation is built in from day one rather than left as a month-end chore.",
    ].join("\n\n"),
    category: "Enterprise Systems",
    offerings: [
      "Double-entry accounting",
      "General ledger",
      "Chart of accounts",
      "Financial reporting",
      "Billing and subscriptions",
      "Reconciliation workflows",
      "Microfinance systems",
    ],
    technologies: ["NestJS", "PostgreSQL", "Next.js"],
    relatedProjects: ["akaunty", "microfinance-core-banking"],
    relatedExperience: ["codepal"],
    featured: true,
    order: 3,
  },
  {
    slug: "ai-llm-integration",
    title: "AI & LLM Feature Integration",
    shortDescription: "Integrating practical AI capabilities into software products.",
    description: [
      "Adding an LLM call to a product takes an afternoon. Making it fast, accurate and affordable enough for real users takes engineering: latency budgets, retries, cost control, and a plan for when the model gets it wrong.",
      "At MUST Company I developed MustBreak, an AI-powered real-time meeting platform for transcription, translation and multilingual collaboration across distributed teams. It produces AI-generated summaries, keeps conversation history searchable, and connects to Slack workflows, all on low-latency real-time infrastructure built with Python, FastAPI and DynamoDB.",
      "StartDescribe brings the same thinking to e-commerce. Its AI pipeline generates product descriptions and images with OpenAI and Perplexity, inside a multi-tenant SaaS with Stripe subscriptions. Optimised generation workflows cut content generation time by 30%.",
      "For products that need to answer from their own data, I build retrieval-augmented generation (RAG) with pgvector or Pinecone, and agentic workflows with LangGraph, on OpenAI and Anthropic APIs. Where accuracy matters, the design includes a review step so a person can check the output before it reaches a customer.",
      "I'm an AWS Certified AI Practitioner, and I treat AI features like any other production system: measured, tested against real inputs, and easy to roll back.",
    ].join("\n\n"),
    category: "AI Engineering",
    offerings: [
      "LLM integration",
      "Retrieval-augmented generation (RAG)",
      "AI-powered workflows",
      "Agentic applications",
      "LLM pipelines",
    ],
    technologies: ["TypeScript", "Python", "LLM APIs"],
    relatedProjects: ["startdescribe"],
    relatedExperience: ["must-company"],
    featured: true,
    order: 4,
  },
  {
    slug: "architecture-performance",
    title: "Architecture Review & Performance Optimization",
    shortDescription: "Improving system architecture, reliability, and performance.",
    description: [
      "Most performance problems aren't mysterious. They're a missing index, a query that runs once per row, a report that loads the whole table, or a tenancy model that suited ten customers and not a hundred. A fresh pair of eyes finds them faster than a team that has been living with them.",
      "At Semicolon I reduced ERP report generation from around 40 seconds to under 5, and cut API latency by 35%, through query optimisation and backend refactoring. On PitchPool, rethinking job scheduling cut idle database traffic by around 90%, enough for serverless PostgreSQL to scale to zero.",
      "An architecture review looks at how the system fits together: the data model, multi-tenancy and isolation, how background work is queued, and where it will break as you grow. I've architected multi-tenant enterprise applications from schema design to production, including tenant isolation enforced by PostgreSQL row-level security, and I hold the AWS Certified Solutions Architect – Associate.",
      "I measure before changing anything, with query plans and profiles rather than guesses. You get the findings in writing, ranked by impact and effort, and I can either implement the fixes or hand them to your team.",
    ].join("\n\n"),
    category: "Consulting",
    offerings: [
      "Architecture assessment",
      "Database design review",
      "Multi-tenancy strategy",
      "API performance optimization",
      "Query optimization",
      "Scalability assessment",
    ],
    technologies: ["PostgreSQL", "NestJS", "Node.js"],
    relatedProjects: [],
    relatedExperience: ["semicolon"],
    featured: true,
    order: 5,
  },
  {
    slug: "backend-api-development",
    title: "Custom Backend & API Development",
    shortDescription: "Robust backend systems and API development.",
    description: [
      "The backend is where a product's rules live. I build APIs and services that enforce those rules, handle failure without losing data, and stay readable for the next developer.",
      "At CodePal I built the backend for Drivus, a CRM/ERP for car-rental and rent-to-own operators, including recurring billing through Pay Advantage and an event-driven notification system for payments, contracts and compliance. On PitchPool, a BullMQ ingestion pipeline with rate limiting, circuit breaking and retry with backoff keeps live leaderboards accurate through match-day traffic spikes.",
      "I design REST and GraphQL APIs, WebSocket connections for real-time features, and background jobs for anything that shouldn't hold up a request. Authentication uses JWT and OAuth 2.0, with role-based or attribute-based access control depending on what the product needs, and third-party services are integrated behind interfaces so they can be swapped.",
      "Data modelling comes first. I work mostly in PostgreSQL, with Redis for caching and queues, and reach for MongoDB or DynamoDB when the access pattern calls for it. Where tenants share a database, row-level security keeps their data apart.",
      "The usual stack is Node.js with NestJS or Express, or Python with FastAPI, written in TypeScript or typed Python.",
    ].join("\n\n"),
    category: "Backend Engineering",
    offerings: [
      "REST API development",
      "Authentication and authorization",
      "Third-party integrations",
      "WebSockets",
      "Background jobs",
      "Database architecture",
    ],
    technologies: ["Node.js", "NestJS", "PostgreSQL", "TypeScript"],
    relatedProjects: ["pitchpool"],
    relatedExperience: ["codepal"],
    featured: true,
    order: 6,
  },
  {
    slug: "cloud-devops",
    title: "Cloud Infrastructure & DevOps",
    shortDescription: "Deployment and infrastructure for production applications.",
    description: [
      "Good infrastructure is boring: every merge deploys, servers come back after a restart, and you hear about problems before your customers do. I set up that kind of infrastructure for production applications.",
      "I hold four AWS certifications: Solutions Architect – Associate, Developer – Associate, AI Practitioner and Cloud Practitioner. On AWS I work with EC2, S3, Lambda and RDS. Outside it, I deploy frontends on Vercel and run applications on VPS hosts with Docker, Nginx and Coolify.",
      "Applications are containerised with Docker, so they run the same on a laptop and in production. CI/CD pipelines in GitHub Actions run the checks and deploy on every merge. Servers run Linux, configured and documented so your team can look after them.",
      "Infrastructure should fit the budget too. On PitchPool, consolidating background jobs cut idle database traffic by around 90%, which let serverless PostgreSQL scale to zero when nobody was using it.",
      "Databases are deployed alongside the application, and monitoring is in place before launch rather than after the first outage.",
    ].join("\n\n"),
    category: "Infrastructure",
    offerings: [
      "Dockerization",
      "VPS deployment",
      "CI/CD pipelines",
      "Server configuration",
      "Database deployment",
      "Production monitoring",
    ],
    technologies: ["Docker", "Linux", "GitHub Actions", "Coolify"],
    relatedProjects: [],
    relatedExperience: [],
    featured: false,
    order: 7,
  },
  {
    slug: "software-engineering-consultancy",
    title: "Software Engineering Consultancy",
    shortDescription: "Technical guidance for software products and engineering teams.",
    description: [
      "Some decisions are expensive to get wrong: the stack, the data model, whether to build or buy, and what to build first. I help founders and teams make them with someone who has made them before.",
      "I co-founded Semicolon IT Solutions and served as its CTO, directing technical strategy, the engineering roadmap and delivery for a firm serving 50+ clients globally. I led 10–15 engineers across frontend, backend and QA, and put coding standards, code review, testing and agile processes in place.",
      "Mentoring is part of the work. I've mentored more than 20 junior engineers and interns through code review and pairing, growing them into independent contributors on client projects.",
      "Consultancy can be a one-off: choosing a technology, checking whether a product idea is feasible, or designing the database before any code is written. Or it can be ongoing: a development roadmap, architecture planning as the product grows, and regular reviews that keep engineering practices in shape.",
      `With ${profile.yearsOfExperience}+ years building SaaS, ERP and FinTech systems, my advice comes from running software in production.`,
    ].join("\n\n"),
    category: "Consulting",
    offerings: [
      "Technical consultation",
      "Technology selection",
      "Product feasibility assessment",
      "System architecture planning",
      "Database design strategy",
      "Development roadmap",
      "Engineering best practices",
    ],
    technologies: ["Software Architecture", "TypeScript", "PostgreSQL"],
    relatedProjects: [],
    relatedExperience: ["semicolon"],
    featured: true,
    order: 8,
  },
];

export const services = [...unsorted].sort((a, b) => a.order - b.order);

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

/**
 * Service pages with real copy, which go in the sitemap and may be indexed.
 * The rest render with `noindex` so thin pages don't count against the site.
 */
export const indexedServices = new Set<string>(services.map((s) => s.slug));

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
  {
    id: "full-time-role",
    title: "Full-time role",
    body: "Joining your company as a permanent, remote senior engineer, owning features and systems end to end.",
    bestFor: "Companies hiring a senior full-stack or backend engineer",
    link: { label: "View resume", href: "/resume" },
  },
] as const;

export const process = [
  {
    title: "Talk it through",
    body: "A short call or email thread about the problem, the users and the constraints. No cost and no commitment.",
    outcome: "A straight answer on fit and approach",
  },
  {
    title: "Proposal",
    body: "A written scope, timeline and quote, with milestones, open questions and risks called out up front.",
    outcome: "Scope, milestones and price in writing",
  },
  {
    title: "Build",
    body: "Small iterations with regular demos on a staging link, so you can steer while it takes shape.",
    outcome: "Working software at every milestone",
  },
  {
    title: "Launch & handover",
    body: "Deployment, documentation and a walkthrough for your team, with optional support afterwards.",
    outcome: "Code, docs and access, handed over",
  },
] as const;

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
