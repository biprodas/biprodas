// Facts (titles, summaries, links, stack, highlights) mirror data/projects.yaml.
// INVENTED COPY: each `story` and `diagram` is narrative written for biprodas.dev to explain the
// architecture. It adds no metrics beyond data/. Edit freely.
import type { Domain, Project } from "./types";

export const projects: Project[] = [
  {
    slug: "pitchpool",
    title: "PitchPool",
    summary:
      "Multi-tenant SaaS platform for competition prediction pools with automated scoring, live leaderboards and subscription billing.",
    domains: ["SaaS"],
    topics: ["SaaS", "Multi-tenancy", "Billing"],
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "NestJS",
      "PostgreSQL",
      "Prisma",
      "Redis",
      "BullMQ",
      "JWT/OAuth",
      "Docker",
    ],
    links: [{ kind: "live", url: "https://pitchpool.io", label: "pitchpool.io" }],
    featured: true,
    highlights: [
      "Shipped subscription billing (plans, entitlement gating and webhooks) behind a provider-agnostic gateway; designed three-tier RBAC with privilege-escalation safeguards.",
      "Cut idle database traffic by ~90% through in-memory job scheduling and consolidated tasks, enabling serverless PostgreSQL to scale to zero.",
      "Built BullMQ ingestion with rate limiting, circuit breaking and retry/backoff, keeping leaderboards accurate through match-day spikes.",
    ],
    story: {
      problem:
        "Prediction pools are quiet for days and then everyone arrives at once. When a match ends, thousands of predictions have to be scored and every leaderboard re-ranked while people refresh the page. In between, the platform should cost almost nothing to run.",
      approach:
        "The API stays thin and stateless. Match data arrives through a queue-backed ingestion worker that protects the upstream feed with rate limits and a circuit breaker. Scoring runs as idempotent jobs, so a retried job can never double-count. Scheduling lives in memory rather than in database polling, which lets serverless PostgreSQL sleep when nothing is happening.",
      decisions: [
        {
          title: "Provider-agnostic billing",
          body: "Plans and entitlements live in our own schema; the payment provider sits behind a gateway interface and reaches us only through verified webhooks.",
        },
        {
          title: "Three-tier RBAC",
          body: "Platform, organisation and pool roles are checked separately, with explicit guards against granting a role higher than your own.",
        },
        {
          title: "Idle should be free",
          body: "Background tasks were consolidated and moved off database polling so the database can scale to zero between match days.",
        },
      ],
    },
    diagram: {
      title: "Scoring and ingestion",
      cols: 4,
      rows: 2,
      nodes: [
        { id: "web", label: "Web app", sub: "Next.js · React", kind: "client", col: 0, row: 0 },
        { id: "api", label: "API", sub: "NestJS · RBAC", kind: "service", col: 1, row: 0 },
        { id: "pg", label: "PostgreSQL", sub: "Prisma · serverless", kind: "data", col: 2, row: 0 },
        { id: "cache", label: "Leaderboards", sub: "Redis", kind: "data", col: 3, row: 0 },
        { id: "billing", label: "Billing gateway", sub: "provider-agnostic", kind: "external", col: 0, row: 1 },
        { id: "queue", label: "Job queue", sub: "BullMQ", kind: "queue", col: 1, row: 1 },
        { id: "worker", label: "Scoring worker", sub: "idempotent jobs", kind: "worker", col: 2, row: 1 },
        { id: "feed", label: "Match feed", sub: "rate-limited", kind: "external", col: 3, row: 1 },
      ],
      edges: [
        { from: "web", to: "api", label: "HTTPS" },
        { from: "api", to: "pg", label: "SQL" },
        { from: "billing", to: "api", label: "webhooks", async: true },
        { from: "api", to: "queue", label: "enqueue", async: true },
        { from: "queue", to: "worker" },
        { from: "feed", to: "worker", label: "ingest" },
        { from: "worker", to: "pg", label: "scores" },
        { from: "worker", to: "cache", label: "rank" },
      ],
    },
  },
  {
    slug: "microfinance-core-banking",
    title: "Microfinance Core Banking System",
    shortTitle: "Microfinance Core Banking",
    summary:
      "Multi-tenant core banking platform for NGO microfinance operations, deployed across 3 organizations and 20 branches.",
    domains: ["FinTech"],
    topics: ["FinTech", "Microfinance", "Accounting"],
    tech: ["Next.js", "NestJS", "PostgreSQL", "Redis", "BullMQ", "TypeORM"],
    links: [],
    featured: true,
    highlights: [
      "Covers group lending, savings products, loan disbursement, repayment scheduling and field-agent collection, with training and technical support for deployments.",
      "Engineered the double-entry accounting ledger with transaction posting and reconciliation, alongside microcredit portfolio management, HR/payroll and MIS/AIS reporting.",
    ],
    story: {
      problem:
        "Microfinance NGOs run on small loans to groups of borrowers, collected weekly by field agents. Every taka has to be accounted for, across many branches, under audit. Spreadsheets break down quickly at that scale.",
      approach:
        "Every operation, whether a disbursement, a collection or an interest accrual, becomes a balanced journal posting in one double-entry ledger. Branch, product and borrower views are projections of that ledger, so reports reconcile by construction. Repayment schedules and accruals run as scheduled background jobs rather than request-time calculations.",
      decisions: [
        {
          title: "One ledger, many views",
          body: "Portfolio, savings and branch reports are queries over posted journal lines, not separately maintained totals, so they can't drift apart.",
        },
        {
          title: "Tenant per organisation",
          body: "Each NGO is a tenant with its own branches, products and chart of accounts, so one deployment serves several organisations.",
        },
        {
          title: "Jobs for time-based money",
          body: "Interest, schedules and overdue flags are computed by queued jobs with retries, keeping the API responsive at month end.",
        },
      ],
    },
    diagram: {
      title: "Ledger-centred core",
      cols: 4,
      rows: 2,
      nodes: [
        { id: "web", label: "Branch & HQ app", sub: "Next.js", kind: "client", col: 0, row: 0 },
        { id: "api", label: "Core API", sub: "NestJS · TypeORM", kind: "service", col: 1, row: 0 },
        { id: "ledger", label: "Ledger", sub: "double-entry posting", kind: "service", col: 2, row: 0 },
        { id: "pg", label: "PostgreSQL", sub: "per-tenant books", kind: "data", col: 3, row: 0 },
        { id: "field", label: "Field agents", sub: "collections", kind: "client", col: 0, row: 1 },
        { id: "queue", label: "Job queue", sub: "BullMQ · Redis", kind: "queue", col: 1, row: 1 },
        { id: "sched", label: "Schedulers", sub: "repayment · accrual", kind: "worker", col: 2, row: 1 },
        { id: "mis", label: "MIS / AIS", sub: "reporting", kind: "worker", col: 3, row: 1 },
      ],
      edges: [
        { from: "web", to: "api", label: "HTTPS" },
        { from: "field", to: "api", label: "collect" },
        { from: "api", to: "ledger", label: "post" },
        { from: "ledger", to: "pg", label: "journal" },
        { from: "api", to: "queue", label: "enqueue", async: true },
        { from: "queue", to: "sched" },
        { from: "sched", to: "ledger", label: "accrue" },
        { from: "pg", to: "mis", label: "read" },
      ],
    },
  },
  {
    slug: "akaunty",
    title: "Akaunty",
    summary:
      "Multi-tenant SaaS that gives freelancers, agencies, NGOs and small businesses simple financial tracking, with proper double-entry accounting underneath.",
    domains: ["FinTech", "SaaS"],
    topics: ["FinTech", "Accounting", "SaaS"],
    tech: ["Next.js", "NestJS", "PostgreSQL", "Drizzle", "Redis", "BullMQ", "TanStack Query", "Paddle"],
    links: [{ kind: "live", url: "https://akaunty.vercel.app", label: "akaunty.vercel.app" }],
    featured: true,
    kind: "product",
    highlights: [
      'Users record "I got paid" or "I spent money"; the system generates balanced journal entries underneath.',
      "Profit & loss, cash flow, balance sheet, trial balance and general ledger reporting.",
    ],
    story: {
      problem:
        "Small businesses need real books (a balance sheet, a trial balance, a P&L) but they don't think in debits and credits. Most simple tools give up the accounting; most accounting tools give up the simplicity.",
      approach:
        "The interface asks plain questions: money in or money out, from whom, for what. A ledger engine turns each answer into a balanced double-entry posting against the tenant's chart of accounts. Every report is then a query over the same journal, built in the background for larger books.",
      decisions: [
        {
          title: "Intent in, journal out",
          body: "The UI records intent; the ledger engine owns the accounting rules, so they live in one tested place.",
        },
        {
          title: "Reports from the journal",
          body: "P&L, cash flow, balance sheet and trial balance all derive from posted lines, so they reconcile with each other by design.",
        },
        {
          title: "Billing via webhooks",
          body: "Paddle handles subscriptions; plan changes reach the API only through verified webhook events.",
        },
      ],
    },
    diagram: {
      title: "Intent to journal",
      cols: 4,
      rows: 2,
      nodes: [
        { id: "web", label: "Web app", sub: "Next.js · TanStack", kind: "client", col: 0, row: 0 },
        { id: "api", label: "API", sub: "NestJS", kind: "service", col: 1, row: 0 },
        { id: "ledger", label: "Ledger engine", sub: "double-entry", kind: "service", col: 2, row: 0 },
        { id: "pg", label: "PostgreSQL", sub: "Drizzle", kind: "data", col: 3, row: 0 },
        { id: "paddle", label: "Paddle", sub: "subscriptions", kind: "external", col: 0, row: 1 },
        { id: "queue", label: "Job queue", sub: "BullMQ · Redis", kind: "queue", col: 1, row: 1 },
        { id: "reports", label: "Report builder", sub: "P&L · balance sheet", kind: "worker", col: 2, row: 1 },
      ],
      edges: [
        { from: "web", to: "api", label: "intent" },
        { from: "api", to: "ledger", label: "post" },
        { from: "ledger", to: "pg", label: "journal" },
        { from: "paddle", to: "api", label: "webhooks", async: true },
        { from: "api", to: "queue", label: "enqueue", async: true },
        { from: "queue", to: "reports" },
        { from: "reports", to: "pg", label: "query" },
      ],
    },
  },
  {
    slug: "startdescribe",
    title: "StartDescribe",
    summary:
      "AI SaaS platform for e-commerce product descriptions and image generation, with multi-tenant architecture and Stripe-based subscriptions.",
    domains: ["AI", "SaaS"],
    topics: ["AI", "SaaS", "E-commerce"],
    tech: ["Next.js", "TypeScript", "Tailwind", "Supabase", "Stripe", "OpenAI", "Perplexity"],
    links: [{ kind: "live", url: "https://startdescribe.com", label: "startdescribe.com" }],
    featured: true,
    highlights: [
      "Implemented secure authentication, an AI content generation pipeline, transactional emails and SEO-optimized pages.",
      "Increased onboarding conversion by 40% and reduced content generation time by 30% through optimized workflows and automation.",
    ],
    story: {
      problem:
        "Store owners with hundreds of products need descriptions and images that are accurate, on-brand and good for search, without spending a day per catalogue.",
      approach:
        "A generation pipeline first researches the product, then drafts copy and images with the store's tone and constraints in the prompt. Results land in the merchant's workspace for review before anything is published. Onboarding was shortened so a new store sees its first generated description quickly.",
      decisions: [
        {
          title: "Research before writing",
          body: "A retrieval step gathers product facts first, so the model writes from context instead of guessing.",
        },
        {
          title: "Human in the loop",
          body: "Generated content stays a draft until the merchant approves it.",
        },
        {
          title: "Managed foundations",
          body: "Supabase for auth and Postgres, Stripe for billing: engineering time goes into the pipeline, not the plumbing.",
        },
      ],
    },
    diagram: {
      title: "Generation pipeline",
      cols: 3,
      rows: 3,
      nodes: [
        { id: "web", label: "Merchant app", sub: "Next.js", kind: "client", col: 0, row: 0 },
        { id: "api", label: "Server routes", sub: "Next.js", kind: "service", col: 1, row: 0 },
        { id: "supa", label: "Supabase", sub: "Postgres · Auth", kind: "data", col: 2, row: 0 },
        { id: "stripe", label: "Stripe", sub: "subscriptions", kind: "external", col: 0, row: 1 },
        { id: "pipeline", label: "Pipeline", sub: "research → draft", kind: "worker", col: 1, row: 1 },
        { id: "openai", label: "OpenAI", sub: "text · images", kind: "external", col: 2, row: 1 },
        { id: "perplexity", label: "Perplexity", sub: "product research", kind: "external", col: 2, row: 2 },
      ],
      edges: [
        { from: "web", to: "api", label: "HTTPS" },
        { from: "api", to: "supa", label: "store" },
        { from: "stripe", to: "api", label: "webhooks", async: true },
        { from: "api", to: "pipeline", label: "generate" },
        { from: "pipeline", to: "openai", label: "draft" },
        { from: "pipeline", to: "perplexity", label: "research" },
      ],
    },
  },
  {
    slug: "school-erp",
    title: "School ERP",
    summary:
      "School administration platform covering admissions, academics, students, parents and staff, finance, campus services, communication and reporting.",
    domains: ["EdTech"],
    topics: ["EdTech", "ERP", "Multi-tenancy"],
    tech: ["Next.js", "React", "NestJS", "PostgreSQL", "TypeORM", "Redis", "BullMQ", "TanStack Query", "Tailwind CSS"],
    links: [{ kind: "repo", url: "https://github.com/biprodas/school-erp", label: "github.com/biprodas/school-erp" }],
    featured: false,
    kind: "product",
    highlights: [
      "Tenant isolation with PostgreSQL row-level security on tenanted tables.",
      "Next.js dashboard with a configurable sidebar, backed by a NestJS API.",
    ],
    story: {
      problem:
        "A school ERP touches admissions, classes, exams, fees, staff and parents. Many schools share one deployment, and a single missing WHERE clause must never leak one school's students to another.",
      approach:
        "Isolation is enforced by the database, not by convention. Each request sets the tenant in the session and PostgreSQL row-level security policies filter every tenanted table, so application code can't forget. Notices and long reports run on a queue.",
      decisions: [
        {
          title: "Row-level security",
          body: "Tenant filtering lives in PostgreSQL policies, so even a buggy query can't read across tenants.",
        },
        {
          title: "Configurable navigation",
          body: "The dashboard sidebar is data-driven, so each school sees only the modules it uses.",
        },
        {
          title: "Clear module boundaries",
          body: "Admissions, academics, finance and communication are separate NestJS modules.",
        },
      ],
    },
    diagram: {
      title: "Tenant isolation",
      cols: 4,
      rows: 2,
      nodes: [
        { id: "web", label: "Dashboard", sub: "Next.js", kind: "client", col: 0, row: 0 },
        { id: "api", label: "API", sub: "NestJS · TypeORM", kind: "service", col: 1, row: 0 },
        { id: "guard", label: "Tenant context", sub: "per request", kind: "service", col: 2, row: 0 },
        { id: "pg", label: "PostgreSQL", sub: "row-level security", kind: "data", col: 3, row: 0 },
        { id: "queue", label: "Job queue", sub: "BullMQ · Redis", kind: "queue", col: 1, row: 1 },
        { id: "jobs", label: "Workers", sub: "notices · reports", kind: "worker", col: 2, row: 1 },
      ],
      edges: [
        { from: "web", to: "api", label: "HTTPS" },
        { from: "api", to: "guard", label: "scope" },
        { from: "guard", to: "pg", label: "RLS" },
        { from: "api", to: "queue", label: "enqueue", async: true },
        { from: "queue", to: "jobs" },
        { from: "jobs", to: "pg", label: "writes" },
      ],
    },
  },
  {
    slug: "cloud-prep",
    title: "Cloud Prep",
    summary:
      "Practice app for AWS certification exams, with questions organized by certification and AWS service, an explanation on every answer and per-topic accuracy tracking.",
    domains: ["EdTech"],
    topics: ["EdTech", "AWS", "Certification Prep"],
    tech: ["Next.js", "TypeScript", "Supabase", "TanStack Query", "Tailwind CSS", "Paddle"],
    links: [{ kind: "live", url: "https://cloudprep.biprodas.dev", label: "cloudprep.biprodas.dev" }],
    featured: false,
    kind: "product",
    highlights: [
      "Covers Cloud Practitioner, AI Practitioner, Developer Associate and Solutions Architect Associate.",
      "Weak-area tracking per topic, in-app cheat sheets, bookmarks and review loops.",
    ],
    story: {
      problem:
        "Studying for AWS exams, I wanted to know where I was weak, not just my overall score. Most question banks don't explain wrong answers or track accuracy per service.",
      approach:
        "Every question is tagged by certification and AWS service, and every attempt is recorded. Accuracy rolls up per topic, so review is steered toward weak areas, with an explanation and a cheat sheet one tap away.",
      decisions: [
        {
          title: "Tag everything",
          body: "Certification and service tags make per-topic accuracy a simple aggregate.",
        },
        { title: "Review loops", body: "Missed and bookmarked questions come back until they stick." },
        {
          title: "Small, fast stack",
          body: "Next.js with Supabase and TanStack Query keeps the app responsive with very little server code.",
        },
      ],
    },
    diagram: {
      title: "Practice loop",
      cols: 3,
      rows: 2,
      nodes: [
        { id: "web", label: "Practice app", sub: "Next.js · TanStack", kind: "client", col: 0, row: 0 },
        { id: "engine", label: "Quiz engine", sub: "scoring · review", kind: "service", col: 1, row: 0 },
        { id: "supa", label: "Supabase", sub: "Postgres · Auth", kind: "data", col: 2, row: 0 },
        { id: "paddle", label: "Paddle", sub: "subscriptions", kind: "external", col: 1, row: 1 },
        { id: "stats", label: "Weak areas", sub: "per-topic accuracy", kind: "worker", col: 2, row: 1 },
      ],
      edges: [
        { from: "web", to: "engine", label: "answers" },
        { from: "engine", to: "supa", label: "attempts" },
        { from: "web", to: "paddle", label: "checkout" },
        { from: "paddle", to: "supa", label: "webhooks", async: true },
        { from: "supa", to: "stats", label: "aggregate" },
      ],
    },
  },
  {
    slug: "larmts",
    title: "Land Acquisition and Resettlement Management Tracking System (LARMTS)",
    shortTitle: "LARMTS",
    summary:
      "Government GIS platform for land acquisition, compensation tracking and resettlement of affected individuals across infrastructure projects.",
    domains: ["GovTech"],
    topics: ["GIS", "GovTech", "Infrastructure"],
    tech: ["Node.js", "Express", "PostgreSQL/PostGIS", "React", "Leaflet"],
    links: [],
    featured: false,
    highlights: [
      "Implemented grievance management and reporting.",
      "Deployed in the MRT-5 and CEIP-1 national projects in Bangladesh.",
    ],
    story: {
      problem:
        "Large infrastructure projects acquire land parcel by parcel and must compensate and resettle every affected person. On paper it's hard to see what has been paid, what is disputed, and where.",
      approach:
        "Parcels live as geometries in PostGIS and are drawn on a Leaflet map. Each parcel links to its owners, valuations, compensation payments and grievances, so officials move between the map and the case file.",
      decisions: [
        { title: "Map as the index", body: "Pick a parcel on the map and see everything attached to it." },
        {
          title: "Spatial queries in the database",
          body: "PostGIS answers which parcels a corridor touches directly in SQL.",
        },
        {
          title: "Grievances as records",
          body: "Disputes have their own workflow and reporting, so nothing is lost between field visits.",
        },
      ],
    },
    diagram: {
      title: "Parcel-centred GIS",
      cols: 3,
      rows: 2,
      nodes: [
        { id: "web", label: "Web GIS", sub: "React · Leaflet", kind: "client", col: 0, row: 0 },
        { id: "api", label: "API", sub: "Node.js · Express", kind: "service", col: 1, row: 0 },
        { id: "postgis", label: "PostGIS", sub: "parcels · geometry", kind: "data", col: 2, row: 0 },
        { id: "grievance", label: "Grievances", sub: "workflow · reports", kind: "service", col: 1, row: 1 },
        { id: "comp", label: "Compensation", sub: "valuation · payment", kind: "service", col: 2, row: 1 },
      ],
      edges: [
        { from: "web", to: "api", label: "JSON" },
        { from: "api", to: "postgis", label: "spatial" },
        { from: "api", to: "grievance" },
        { from: "grievance", to: "comp", label: "resolve" },
        { from: "comp", to: "postgis", label: "parcel" },
      ],
    },
  },
];

export const domains: Domain[] = ["FinTech", "SaaS", "AI", "EdTech", "GovTech"];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
