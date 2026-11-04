// Facts (titles, summaries, type, URLs, stack, highlights) mirror data/projects.yaml.
// INVENTED COPY: each `story` and `diagram` is narrative written for biprodas.dev to explain the
// architecture. It adds no metrics beyond data/. Edit freely.
import type { Domain, Project } from "./types";

const allProjects: Project[] = [
  {
    slug: "akaunty",
    title: "Akaunty",
    summary:
      "Multi-tenant SaaS that gives freelancers, agencies, NGOs, and small businesses simple financial tracking, with proper double-entry accounting underneath.",
    description:
      "Akaunty is bookkeeping for people who don't want to learn bookkeeping. Freelancers, agencies, NGOs, and small businesses record money in and money out in plain terms, and Akaunty writes the balanced double-entry journal underneath. From that journal it produces profit and loss, cash flow, balance sheet, trial balance, and general ledger reports.",
    type: "Product",
    role: "Founder & sole engineer",
    status: "In Progress",
    domains: ["FinTech", "SaaS"],
    topics: ["Double-entry Accounting", "General Ledger", "Financial Reporting", "Multi-tenancy"],
    technologies: ["Next.js", "NestJS", "PostgreSQL", "Drizzle", "Redis", "BullMQ", "TanStack Query", "Paddle"],
    liveUrl: "https://akaunty.vercel.app",
    featured: true,
    order: 1,
    features: [
      'Plain-language entry: record "I got paid" or "I spent money", and the balanced journal entry is written for you',
      "A chart of accounts for each business, ready to use from day one",
      "Double-entry general ledger underneath every transaction",
      "Profit & loss, cash flow, and balance sheet reports",
      "Trial balance and general ledger views",
      "A separate, isolated workspace for each business",
      "Subscription billing through Paddle",
    ],
    contributions: [
      "Came up with the product idea and defined its scope",
      "Designed the ledger engine that turns plain-language intent into balanced double-entry postings",
      "Built the whole stack alone: Next.js frontend, NestJS API, PostgreSQL with Drizzle, and Redis/BullMQ workers",
      "Integrated Paddle for subscription billing",
    ],
    // data/projects.yaml lists these as highlights; they describe what the product does, so they live in `features`.
    highlights: [],
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
          body: "P&L, cash flow, balance sheet, and trial balance all derive from posted lines, so they reconcile with each other by design.",
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
    slug: "inventory-commerce",
    title: "Inventory Commerce",
    summary:
      "Multi-tenant ERP SaaS for retail, distribution, and e-commerce: inventory, warehouses, POS, procurement, omnichannel commerce with COD and couriers, and double-entry accounting with a configurable tax engine.",
    description:
      "Retailers, distributors, and online sellers in Bangladesh often run on spreadsheets, a separate POS, order lists from Facebook pages, and manual accounting, so stock is wrong across branches and channels and the books lag behind. Inventory Commerce brings stock, warehouses, point of sale, purchasing, B2B sales, an online storefront with cash-on-delivery and courier fulfilment, and double-entry accounting into one system, where every sale, receipt, and transfer posts its stock movement and its journal together. It starts with Bangladesh VAT and is built so a new country is a new country pack, not a rewrite.",
    type: "Product",
    role: "Founder & sole engineer",
    status: "In Progress",
    domains: ["FinTech", "SaaS"],
    topics: [
      "Inventory Management",
      "Point of Sale",
      "E-commerce",
      "Double-entry Accounting",
      "Tax Engine",
      "Multi-tenancy",
    ],
    technologies: [
      "TypeScript",
      "Next.js",
      "NestJS",
      "PostgreSQL",
      "Drizzle",
      "Redis",
      "BullMQ",
      "Turborepo",
      "Docker",
    ],
    featured: false,
    order: 5,
    features: [
      "Inventory across branches, warehouses, zones, and bins, with moving-average costing",
      "Warehouse management: receiving, transfers, and stock counts",
      "Point of sale for retail branches, with cash and mobile-money payments",
      "Procurement: purchase orders, goods receipts, supplier bills, and imports with landed cost",
      "B2B credit sales and accounts receivable for distributors",
      "Online storefront with cash-on-delivery and courier fulfilment",
      "Returns and refunds across every channel",
      "Double-entry general ledger, posted automatically from every business document",
      "Configurable tax engine, starting with Bangladesh VAT and statutory forms",
      "Multi-currency documents, with books kept in each legal entity's base currency",
    ],
    contributions: [
      "Came up with the product and wrote its product requirements, technical design, and database specification",
      "Designed the architecture: a NestJS modular monolith with PostgreSQL row-level security and a single write path for stock and for journals",
      "Defined the accounting model: a posting matrix from business events to journals, with COD revenue recognised on delivery",
      "Set up the monorepo with Turborepo and pnpm, with lint rules that enforce module boundaries, tenant safety, and no hard-coded country rules",
    ],
    highlights: [],
    story: {
      problem:
        "A shop with two branches, a stockroom, and a Facebook page already has three versions of its stock. Add cash-on-delivery orders that come back undelivered, VAT forms, and a distributor buying on credit, and spreadsheets stop adding up.",
      approach:
        "Every business command runs in one database transaction: the document, its stock movements, the updated costs, the journal, and any statutory number commit together or not at all. Stock changes only through the inventory service and journals only through the posting service, so the warehouse and the ledger can't disagree.",
      decisions: [
        {
          title: "One write path each",
          body: "Stock moves only through InventoryService and journals only through PostingService, so every quantity and every balance has one source.",
        },
        {
          title: "Revenue on delivery",
          body: "COD orders move cost into goods in transit at dispatch and recognise revenue on delivery; a return to origin reverses only the stock movement.",
        },
        {
          title: "Country packs",
          body: "Tax rules, statutory documents, the chart of accounts, and providers live in country packs, and lint rules stop country details leaking into the core.",
        },
      ],
    },
    diagram: {
      title: "One transaction per command",
      cols: 4,
      rows: 2,
      nodes: [
        { id: "web", label: "Staff app & POS", sub: "Next.js", kind: "client", col: 0, row: 0 },
        { id: "api", label: "API", sub: "NestJS modules", kind: "service", col: 1, row: 0 },
        { id: "inv", label: "Inventory", sub: "stock · costing", kind: "service", col: 2, row: 0 },
        { id: "pg", label: "PostgreSQL", sub: "Drizzle · RLS", kind: "data", col: 3, row: 0 },
        { id: "store", label: "Storefront", sub: "COD · couriers", kind: "client", col: 0, row: 1 },
        { id: "worker", label: "Worker", sub: "BullMQ · outbox", kind: "worker", col: 1, row: 1 },
        { id: "gl", label: "Posting", sub: "double-entry GL", kind: "service", col: 2, row: 1 },
      ],
      edges: [
        { from: "web", to: "api", label: "commands" },
        { from: "store", to: "api", label: "orders" },
        { from: "api", to: "inv", label: "post" },
        { from: "api", to: "gl", label: "post" },
        { from: "inv", to: "pg", label: "movements" },
        { from: "gl", to: "pg", label: "journals" },
        { from: "pg", to: "worker", label: "outbox", async: true },
      ],
    },
  },
  {
    slug: "school-erp",
    title: "School ERP",
    summary:
      "Multi-tenant school management SaaS for Bangladesh: mobile-first, in Bangla and English, covering academics, attendance, exams and results, fees, communication, and reporting.",
    description:
      "Most schools in Bangladesh still run on paper registers, spreadsheets, and desktop software: fees reconciled by hand, results tabulated in Excel, and guardians hearing about absences days late. School ERP puts a school's academics, finance, people, and communication on one affordable, mobile-first platform in Bangla and English. A school signs up and configures itself (sessions, classes, grading rules, fee heads, roles) without a sales call, and every school's data is isolated by PostgreSQL row-level security in a single shared deployment. The first release targets a pilot with a handful of schools: student records, attendance, exams and results with Bangladesh GPA grading, fee collection, notices, and a guardian portal.",
    domains: ["EdTech", "SaaS"],
    topics: ["School Management", "ERP", "Multi-tenancy", "Row-level Security", "Localization"],
    technologies: [
      "Next.js",
      "React",
      "NestJS",
      "PostgreSQL",
      "TypeORM",
      "Redis",
      "BullMQ",
      "TanStack Query",
      "Tailwind CSS",
      "Docker",
    ],
    sourceUrl: "https://github.com/biprodas/school-erp",
    featured: false,
    order: 4,
    type: "Product",
    role: "Founder & sole engineer",
    status: "In Progress",
    features: [
      "Self-serve signup and a setup wizard, so a school can be running within a day",
      "Academic structure: sessions, shifts, classes, sections, subjects, and teacher assignments",
      "Student and guardian records, with Excel import",
      "Mobile attendance and student leave",
      "Exams and results with Bangladesh GPA grading and report-card PDFs",
      "Fee heads, invoices, counter collection, receipts, and dues",
      "Notices, in-app notifications, and email",
      "A web portal for guardians and students",
      "Role-based access with configurable roles, including a managing-committee role",
      "Bangla and English throughout",
      "A dashboard sidebar each school can configure",
    ],
    contributions: [
      "Came up with the product and wrote its product requirements: personas, tenancy model, module scope, and a phased roadmap",
      "Designed the multi-tenant architecture, with PostgreSQL row-level security on every tenanted table",
      "Built the tenancy foundation: a NestJS API with TypeORM migrations and seeders, and a Next.js dashboard with a configurable sidebar",
      "Set up local infrastructure with Docker Compose: PostgreSQL, Redis, and a mail catcher",
    ],
    highlights: [
      "Tenant isolation with PostgreSQL row-level security on tenanted tables.",
      "Next.js dashboard with a configurable sidebar, backed by a NestJS API.",
    ],
    story: {
      problem:
        "A school ERP touches admissions, classes, exams, fees, staff, and guardians, and most schools in Bangladesh still do all of it on paper and in spreadsheets. To be affordable it has to serve many schools from one deployment, and a single missing WHERE clause must never leak one school's students to another.",
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
          title: "Configurable, not custom",
          body: "Grading rules, fee heads, terms, shifts, roles, and report cards are settings, so a new school never needs a code change.",
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
    slug: "reslo",
    visible: false,
    title: "Reslo",
    summary:
      "AI-powered career toolkit that centralises your profile and builds ATS-ready resumes and cover letters, with share links, an ATS checker, and a job tracker.",
    description:
      "Reslo puts a whole job search in one place. You keep reusable career profiles as the single source of your experience, then generate a resume from one in a click, or start from a template or an imported PDF. A drag-and-drop builder with a live preview and an AI writing copilot help you sharpen each bullet, an ATS checker scores the result against a job description, and matching cover letters are drafted from the resume and the job post. Finished resumes export to PDF or go out as private share links and portfolio pages, and a Kanban job tracker follows every application.",
    type: "Product",
    role: "Founder & sole engineer",
    status: "In Progress",
    domains: ["SaaS", "AI"],
    topics: ["Resume Builder", "Career Profiles", "ATS Optimization", "Job Tracking", "AI Writing"],
    technologies: [
      "Next.js",
      "TypeScript",
      "Better Auth",
      "Drizzle",
      "Neon Postgres",
      "OpenAI",
      "Anthropic",
      "Polar",
      "Resend",
      "Tailwind CSS",
    ],
    demoUrl: "https://reslo-nine.vercel.app",
    featured: false,
    order: 6,
    features: [
      "Reusable career profiles, with presets for developers, designers, academics, students, and general use",
      "One-click resume generation from a career profile",
      "Drag-and-drop builder with 16 section types and a live preview",
      "ATS-ready templates with customizable colors, fonts, and spacing",
      "AI writing copilot that improves bullets and adds metrics, grounded in your real experience",
      "Cover letters drafted from a resume and a job post",
      "ATS checker with a readability score and missing keywords for a job description",
      "PDF import that parses an existing resume into editable sections",
      "Watermark-free PDF export",
      "Share links and hosted portfolio pages, with passwords, expiry, and view counts",
      "Kanban job tracker with list view, archive, and an activity log per application",
      "Document storage for transcripts, portfolios, and references, attached to profiles",
      "Free, Basic, and Pro plans with monthly AI credits",
    ],
    contributions: [
      "Came up with the product and built it alone",
      "Built the drag-and-drop resume builder with live preview and PDF export",
      "Built the AI copilot, cover letter drafting, and ATS checker on OpenAI and Anthropic models",
      "Built PDF import, share links and portfolio pages, and the Kanban job tracker",
      "Set up auth with Better Auth, Drizzle on Neon Postgres, Resend emails, and Polar billing driven by a catalog in the database",
    ],
    highlights: [],
    story: {
      problem:
        "A job search scatters the same facts across a dozen resumes, cover letters, portfolio links, and a spreadsheet of applications. Every new role means editing copies, and they drift apart.",
      approach:
        "Career profiles hold your experience once. Resumes and cover letters are generated from a profile and tailored per job with AI that only works from what's in the profile, so nothing is invented. The same workspace exports, shares, and tracks every application.",
      decisions: [
        {
          title: "Profile as the source of truth",
          body: "Resumes are views of a career profile, so updating your experience once updates every resume built from it.",
        },
        {
          title: "AI grounded in your data",
          body: "The copilot rewrites and tightens what you've written; it doesn't invent experience you don't have.",
        },
        {
          title: "Catalog in the database",
          body: "Plans and prices live in Reslo's own database and are pushed to Polar from the admin, instead of being set up by hand in the billing dashboard.",
        },
      ],
    },
    diagram: {
      title: "Profile to application",
      cols: 4,
      rows: 2,
      nodes: [
        { id: "web", label: "Builder", sub: "Next.js", kind: "client", col: 0, row: 0 },
        { id: "server", label: "Server", sub: "Better Auth · API", kind: "service", col: 1, row: 0 },
        { id: "db", label: "Postgres", sub: "Neon · Drizzle", kind: "data", col: 2, row: 0 },
        { id: "ai", label: "AI models", sub: "OpenAI · Anthropic", kind: "external", col: 3, row: 0 },
        { id: "share", label: "Share links", sub: "portfolio · PDF", kind: "client", col: 0, row: 1 },
        { id: "polar", label: "Polar", sub: "billing", kind: "external", col: 1, row: 1 },
        { id: "files", label: "File storage", sub: "S3 · documents", kind: "data", col: 2, row: 1 },
      ],
      edges: [
        { from: "web", to: "server", label: "edit" },
        { from: "server", to: "db", label: "profiles" },
        { from: "server", to: "ai", label: "copilot · ATS" },
        { from: "server", to: "files", label: "PDFs" },
        { from: "polar", to: "server", label: "webhooks", async: true },
        { from: "share", to: "server", label: "view" },
      ],
    },
  },
  {
    slug: "cloud-prep",
    title: "Cloud Prep",
    summary:
      "Practice app for AWS certification exams, with questions organized by certification and AWS service, an explanation on every answer, and per-topic accuracy tracking.",
    description:
      "Cloud Prep is a practice app for four AWS certification exams: Cloud Practitioner, AI Practitioner, Developer Associate, and Solutions Architect Associate. Questions are organized by certification and AWS service, every answer comes with an explanation, and accuracy is tracked per topic so you can see where you're weak.",
    type: "Product",
    domains: ["EdTech", "SaaS"],
    topics: ["AWS Certification", "Exam Preparation", "Progress Tracking"],
    technologies: ["Next.js", "TypeScript", "Supabase", "TanStack Query", "Tailwind CSS", "Paddle"],
    liveUrl: "https://cloudprep.biprodas.dev",
    featured: false,
    order: 2,
    // data/projects.yaml lists these as highlights; they describe what the product does, so they live in `features`.
    highlights: [],
    features: [
      "Practice questions for Cloud Practitioner, AI Practitioner, Developer Associate, and Solutions Architect Associate",
      "Questions organized by certification and AWS service",
      "An explanation on every answer",
      "Per-topic accuracy and weak-area tracking",
      "In-app cheat sheets",
      "Bookmarks and review loops",
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
    slug: "pitchpool",
    title: "PitchPool",
    summary:
      "Multi-tenant SaaS platform for competition prediction pools with automated scoring, live leaderboards, and subscription billing.",
    description:
      "PitchPool runs prediction competitions. Participants join pools, predict match results, and follow live leaderboards that update as each result is scored automatically. Every tenant gets its own isolated pools, participants, and roles, and subscription plans decide which features a tenant can use.",
    type: "Product",
    role: "Founder & sole engineer",
    status: "In Progress",
    domains: ["SaaS", "Sports & Competition"],
    topics: ["Multi-tenancy", "Subscription Billing", "Real-time Leaderboards", "RBAC", "Background Jobs"],
    technologies: [
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
    liveUrl: "https://pitchpool.io",
    // TODO: set `thumbnail: "/images/projects/pitchpool/cover.png"` once the file is in public/.
    featured: true,
    order: 3,
    features: [
      "Multi-tenant workspaces, each with its own pools, participants, and roles",
      "Automated scoring of predictions as match results come in",
      "Live leaderboards, re-ranked after every scored result",
      "Platform, organisation, and pool roles, with safeguards against privilege escalation",
      "Match results ingested automatically from an external feed",
      "Subscription plans with feature gating and webhook-driven billing",
    ],
    contributions: [
      "Came up with the product idea and defined its scope",
      "Designed the architecture: the multi-tenant data model, queue-based ingestion and scoring, and billing",
      "Built the whole stack alone: Next.js frontend, NestJS API, PostgreSQL with Prisma, and Redis/BullMQ workers",
      "Deployed it to production at pitchpool.io",
    ],
    challenges: [
      "Traffic is near zero for days, then spikes when a match ends and every prediction has to be scored at once",
      "Keeping leaderboards accurate when the upstream match feed is slow, rate-limited, or failing",
      "Letting serverless PostgreSQL scale to zero between match days, which meant moving scheduled work off database polling",
    ],
    highlights: [
      "Shipped subscription billing (plans, entitlement gating, and webhooks) behind a provider-agnostic gateway; designed three-tier RBAC with privilege-escalation safeguards.",
      "Cut idle database traffic by ~90% through in-memory job scheduling and consolidated tasks, enabling serverless PostgreSQL to scale to zero.",
      "Built BullMQ ingestion with rate limiting, circuit breaking, and retry/backoff, keeping leaderboards accurate through match-day spikes.",
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
          body: "Platform, organisation, and pool roles are checked separately, with explicit guards against granting a role higher than your own.",
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
    slug: "ielzy",
    visible: false,
    title: "Ielzy",
    summary:
      "AI-powered IELTS preparation app with adaptive Reading, Listening, Writing, and Speaking practice, full mock tests, and a personal study planner.",
    description:
      "Ielzy prepares candidates for IELTS across all four skills. Each skill has guides, lessons, practice sets, a mistake log, vocabulary and progress tracking, and timed mock tests run per skill or as a full exam, including a speaking test with a device check. A diagnostic on sign-up feeds a personal study planner with goals, a calendar, scheduled mocks, and reviews, while vocabulary and grammar paths, flashcards, daily practice, and an AI assistant fill the gaps. Behind it, an admin area manages the content library, media, users, and plans.",
    type: "Product",
    role: "Founder & sole engineer",
    status: "In Progress",
    domains: ["EdTech", "AI"],
    topics: ["IELTS", "Exam Preparation", "Adaptive Learning", "Mock Tests", "Study Planning"],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Better Auth",
      "Drizzle",
      "Neon Postgres",
      "Cloudflare R2",
      "Resend",
      "Tiptap",
    ],
    featured: false,
    order: 7,
    features: [
      "Reading, Listening, Writing, and Speaking modules, each with guides, lessons, practice, a mistake log, and progress",
      "Timed mock tests per skill and as a full exam, with results and answer review",
      "Speaking tests with a microphone and device check",
      "Onboarding diagnostic and a personal study planner with goals, a calendar, scheduled mocks, and reviews",
      "Vocabulary learning paths, collections, flashcards, quizzes, and daily practice",
      "Grammar lessons, quizzes, daily practice, and a mistake log",
      "Writing task bank, model articles, drills, and writing reports",
      "An AI study assistant",
      "Achievements and progress tracking across skills",
      "Admin content library for test series, papers, and parts, with previews and a media library",
      "Email and Google sign-in, with email verification and password reset",
    ],
    contributions: [
      "Came up with the product and defined its scope across the four IELTS skills",
      "Built the whole app alone: the Next.js App Router frontend, Drizzle schema and migrations on Neon Postgres, and Better Auth sign-in",
      "Built the mock-test engine for timed per-skill and full exams, with results and review",
      "Built the admin content system, with a Tiptap editor and a media library on Cloudflare R2",
    ],
    highlights: [],
    story: {
      problem:
        "IELTS candidates juggle PDFs, YouTube videos, and scattered practice tests, with no clear sense of which skill is holding their band score back or what to study next.",
      approach:
        "Every skill follows the same loop: learn, practise, review your mistakes, track progress. A diagnostic at sign-up seeds a study plan, and mock tests that mirror the real exam feed results back into it. All content is authored in an admin area, so new tests and lessons ship without code changes.",
      decisions: [
        {
          title: "One loop per skill",
          body: "Reading, Listening, Writing, and Speaking share the same guide, practice, mistakes, and progress structure, so moving between skills feels familiar.",
        },
        {
          title: "Direct-to-storage media",
          body: "Listening audio and charts upload straight to Cloudflare R2 with short-lived presigned URLs, so large files never pass through the app server.",
        },
        {
          title: "Content as data",
          body: "Test series, papers, and passages live in the database and are managed in the admin, not hard-coded into pages.",
        },
      ],
    },
    diagram: {
      title: "Practice and content",
      cols: 4,
      rows: 2,
      nodes: [
        { id: "web", label: "Student app", sub: "Next.js · React", kind: "client", col: 0, row: 0 },
        { id: "server", label: "Server", sub: "App Router · Better Auth", kind: "service", col: 1, row: 0 },
        { id: "db", label: "Postgres", sub: "Neon · Drizzle", kind: "data", col: 2, row: 0 },
        { id: "email", label: "Resend", sub: "auth emails", kind: "external", col: 3, row: 0 },
        { id: "admin", label: "Admin", sub: "content · media", kind: "client", col: 0, row: 1 },
        { id: "r2", label: "Cloudflare R2", sub: "audio · figures", kind: "data", col: 2, row: 1 },
      ],
      edges: [
        { from: "web", to: "server", label: "practice · mocks" },
        { from: "server", to: "db", label: "SQL" },
        { from: "server", to: "email", label: "verify" },
        { from: "admin", to: "server", label: "author" },
        { from: "admin", to: "r2", label: "presigned PUT" },
        { from: "web", to: "r2", label: "media" },
      ],
    },
  },
  {
    slug: "detgate",
    visible: false,
    title: "DETGate",
    summary:
      "Planned practice app for the Duolingo English Test, built on the same foundation as Ielzy: practice by question type, timed mock tests, and a personal study plan.",
    description:
      "DETGate is a planned companion to Ielzy for the Duolingo English Test. The DET is short, adaptive, and taken at home, with many small question types instead of four long papers, so practice has to be quick, varied, and timed. DETGate will let candidates drill each question type, take full timed mock tests, review their mistakes, and follow a study plan, reusing the practice, mock-test, and content foundations built for Ielzy.",
    type: "Product",
    role: "Founder & sole engineer",
    status: "Planned",
    domains: ["EdTech", "AI"],
    topics: ["Duolingo English Test", "Exam Preparation", "Mock Tests", "Study Planning"],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Better Auth",
      "Drizzle",
      "Neon Postgres",
      "Cloudflare R2",
      "Resend",
    ],
    featured: false,
    order: 8,
    features: [
      "Practice for each DET question type, from reading and listening to writing and speaking tasks",
      "Full timed mock tests that follow the real test's pace",
      "Speaking and writing practice with recorded and typed answers",
      "Mistake review and progress tracking by question type",
      "A personal study plan",
      "An admin content library for questions, audio, and images",
    ],
    contributions: [
      "Defining the product as the Duolingo English Test counterpart to Ielzy",
      "Planning to reuse Ielzy's stack and its practice, mock-test, and content foundations",
    ],
    highlights: [],
    story: {
      problem:
        "The Duolingo English Test is short and adaptive, with many small question types that come quickly one after another. Candidates need practice that matches that pace, not long papers designed for other exams.",
      approach:
        "DETGate will follow the loop that works in Ielzy, practise, review mistakes, track progress, but organised by DET question type, with timed mocks that mirror the test's pace. The stack and the content system carry over from Ielzy, so the work goes into the DET-specific parts.",
      decisions: [
        {
          title: "Build on Ielzy",
          body: "Auth, the content library, media storage, and the mock-test engine are reused rather than rebuilt.",
        },
        {
          title: "Question types first",
          body: "Practice is organised around the DET's many short question types rather than four long sections.",
        },
        {
          title: "Pace as a feature",
          body: "Timers and quick transitions are part of practice, because speed is part of the test.",
        },
      ],
    },
    diagram: {
      title: "Planned architecture",
      cols: 4,
      rows: 2,
      nodes: [
        { id: "web", label: "Practice app", sub: "Next.js · React", kind: "client", col: 0, row: 0 },
        { id: "server", label: "Server", sub: "App Router · Better Auth", kind: "service", col: 1, row: 0 },
        { id: "db", label: "Postgres", sub: "Neon · Drizzle", kind: "data", col: 2, row: 0 },
        { id: "email", label: "Resend", sub: "auth emails", kind: "external", col: 3, row: 0 },
        { id: "admin", label: "Admin", sub: "questions · media", kind: "client", col: 0, row: 1 },
        { id: "r2", label: "Cloudflare R2", sub: "audio · images", kind: "data", col: 2, row: 1 },
      ],
      edges: [
        { from: "web", to: "server", label: "practice · mocks" },
        { from: "server", to: "db", label: "SQL" },
        { from: "server", to: "email", label: "verify" },
        { from: "admin", to: "server", label: "author" },
        { from: "admin", to: "r2", label: "upload" },
        { from: "web", to: "r2", label: "media" },
      ],
    },
  },
  {
    slug: "microfinance-core-banking",
    title: "Microfinance Core Banking System",
    shortTitle: "Microfinance Core Banking",
    summary:
      "Multi-tenant core banking platform for NGO microfinance operations, deployed across 3 organizations and 20 branches.",
    description:
      "A core banking system for NGOs that run microfinance programmes. It covers group lending and savings products from loan disbursement through repayment schedules and field-agent collection, and posts every transaction to a double-entry ledger that reconciles. It runs in 3 organizations across 20 branches, with microcredit portfolio management, HR/payroll, and MIS/AIS reporting alongside.",
    type: "Enterprise",
    role: "Founding Engineer & Tech Lead",
    status: "Maintained",
    domains: ["FinTech"],
    topics: ["Core Banking", "Microfinance", "Double-entry Accounting", "Multi-tenancy"],
    technologies: ["Next.js", "NestJS", "PostgreSQL", "Redis", "BullMQ", "TypeORM"],
    featured: true,
    order: 9,
    features: [
      "Group lending and savings products",
      "Loan disbursement, repayment schedules, and field-agent collection",
      "Double-entry ledger with transaction posting and reconciliation",
      "Microcredit portfolio management",
      "HR and payroll",
      "MIS and AIS reporting",
    ],
    contributions: [
      "Ran requirements analysis with the microfinance operations it had to serve",
      "Architected the system and chose the tech stack",
      "Designed the database, including the multi-tenant model and the double-entry ledger",
      "Built the foundation across frontend, backend, and database so other engineers and teams could build on it without friction",
      "Kept engineering hands-on while leading teams of 5–7 mid-level and junior engineers on the project",
    ],
    highlights: [
      "Covers group lending, savings products, loan disbursement, repayment scheduling, and field-agent collection, with training and technical support for deployments.",
      "Engineered the double-entry accounting ledger with transaction posting and reconciliation, alongside microcredit portfolio management, HR/payroll, and MIS/AIS reporting.",
    ],
    story: {
      problem:
        "Microfinance NGOs run on small loans to groups of borrowers, collected weekly by field agents. Every taka has to be accounted for, across many branches, under audit. Spreadsheets break down quickly at that scale.",
      approach:
        "Every operation, whether a disbursement, a collection, or an interest accrual, becomes a balanced journal posting in one double-entry ledger. Branch, product, and borrower views are projections of that ledger, so reports reconcile by construction. Repayment schedules and accruals run as scheduled background jobs rather than request-time calculations.",
      decisions: [
        {
          title: "One ledger, many views",
          body: "Portfolio, savings, and branch reports are queries over posted journal lines, not separately maintained totals, so they can't drift apart.",
        },
        {
          title: "Tenant per organisation",
          body: "Each NGO is a tenant with its own branches, products, and chart of accounts, so one deployment serves several organisations.",
        },
        {
          title: "Jobs for time-based money",
          body: "Interest, schedules, and overdue flags are computed by queued jobs with retries, keeping the API responsive at month end.",
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
    slug: "larmts",
    title: "Land Acquisition and Resettlement Management Tracking System (LARMTS)",
    shortTitle: "LARMTS",
    summary:
      "Government GIS platform for land acquisition, compensation tracking, and resettlement of affected individuals across infrastructure projects.",
    description:
      "LARMTS is a government GIS platform for the land side of large infrastructure projects. It maps every parcel a project needs, tracks acquisition and compensation for each affected owner, follows the resettlement of the people displaced, and records their grievances through to resolution. It was deployed separately for two national infrastructure projects in Bangladesh, MRT Line 5 (Northern Route) and the Coastal Embankment Improvement Project, Phase-1 (CEIP-1). Both follow the same land acquisition and resettlement process, but each project has its own land, affected people, and records.",
    type: "Enterprise",
    role: "Lead engineer",
    status: "Completed",
    domains: ["GovTech"],
    topics: ["GIS", "Land Acquisition", "Resettlement", "Infrastructure", "Grievance Management"],
    technologies: ["Node.js", "Express", "PostgreSQL/PostGIS", "React", "Leaflet"],
    featured: false,
    order: 10,
    features: [
      "Interactive GIS map of every parcel a project needs to acquire",
      "Land acquisition tracking, parcel by parcel",
      "Compensation tracking for each affected owner",
      "Resettlement tracking for displaced people",
      "Grievance management, from complaint to resolution",
      "Reporting for project officials",
      "Separate deployments for MRT Line 5 (Northern Route) and CEIP-1, each with its own parcels, affected people, and records",
    ],
    contributions: [
      "Led a team of 4–5 engineers at Semicolon IT Solutions",
      "Designed the system architecture and the API structure",
      "Designed the PostGIS data model, linking each parcel's geometry to its owners, valuations, and payments",
      "Built the React and Leaflet GIS map of project parcels",
      "Built compensation and resettlement tracking for each affected person",
      "Implemented grievance management and reporting",
    ],
    highlights: [
      "Implemented grievance management and reporting.",
      "Deployed for two national projects in Bangladesh: MRT Line 5 (Northern Route) and the Coastal Embankment Improvement Project, Phase-1 (CEIP-1).",
    ],
    challenges: [
      "Linking map geometry to the legal and financial record of each parcel, so the map and the case file never disagree",
      "Tracking compensation and resettlement per person, where an error falls on a family rather than a spreadsheet",
      "Keeping grievances visible until they are resolved, across field visits and handovers between officials",
    ],
    story: {
      problem:
        "Large infrastructure projects acquire land parcel by parcel and must compensate and resettle every affected person. On paper it's hard to see what has been paid, what is disputed, and where.",
      approach:
        "Parcels live as geometries in PostGIS and are drawn on a Leaflet map. Each parcel links to its owners, valuations, compensation payments, and grievances, so officials move between the map and the case file.",
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
  {
    slug: "drivus",
    title: "Drivus",
    summary:
      "Web-based CRM for car-rental and rent-to-own operators, covering leads, customers, contracts, payments, vehicles, tolls and fines, and financial reporting.",
    description:
      "Drivus runs the business side of a car-rental and rent-to-own operator. It collects and analyses lead data, manages customers and their contracts, automates recurring payments through Pay Advantage, keeps vehicle records and tracking, and handles tolls, fines, and incidents. Accounting and loan-amortization engines generate the financial reports, and task automation, CRM notifications, SMS, and email keep staff and customers informed. Automated workflows cut manual reconciliation time by 35%.",
    type: "Enterprise",
    role: "Founding Software Engineer & Tech Lead",
    domains: ["FinTech"],
    topics: ["CRM", "Car Rental", "Rent-to-Own", "Payments Automation", "Loan Amortization"],
    technologies: ["Next.js", "NestJS", "PostgreSQL", "Pay Advantage"],
    startDate: "2023-06",
    endDate: "2024-11",
    featured: false,
    order: 11,
    features: [
      "Lead capture and lead analytics",
      "Customer management",
      "Contract management with automated recurring payments",
      "Vehicle records and tracking",
      "Tolls, fines, and incident management",
      "Loan amortization for rent-to-own contracts",
      "Financial and accounting report generation",
      "Task automation and CRM notifications",
      "SMS and email integration",
    ],
    contributions: [
      "Joined as the founding software engineer and laid the foundation: requirements, architecture, database design, and tech stack",
      "Engineered the accounting and loan-amortization engines and the automated workflows around them",
      "Integrated Pay Advantage for recurring billing",
      "Built an event-driven notification system for payments, contracts, and compliance",
      "Led the engineering team as tech lead",
    ],
    highlights: [
      "Architected and delivered Drivus, a CRM/ERP platform for car-rental and rent-to-own operators, covering fleet, vehicle tracking, contract management, payments, tolls/fines, and financial reporting.",
      "Engineered accounting and loan-amortization engines with automated workflows, cutting manual reconciliation time by 35%.",
      "Integrated Pay Advantage for recurring billing and built an event-driven notification system for payments, contracts, and compliance.",
    ],
    story: {
      problem:
        "A rent-to-own car business is part rental desk, part lender, and part fleet manager. Every contract carries recurring payments, an amortization schedule, a vehicle, and a stream of tolls, fines, and incidents to pass on to the right driver. Run in spreadsheets, reconciliation alone eats days.",
      approach:
        "One platform follows a customer from lead to contract to final payment. Contracts drive recurring billing through Pay Advantage and an amortization schedule; payments, tolls, and fines post to the accounting engine, so reports come from the same records the staff work in. Events from billing and contracts fan out as notifications, SMS, and email.",
      decisions: [
        {
          title: "Contracts at the centre",
          body: "Payments, amortization, vehicles, tolls, and fines all hang off the contract, so a driver's full position is one lookup.",
        },
        {
          title: "Accounting by automation",
          body: "Financial events post through the accounting engine instead of being re-keyed, which is where the reconciliation time went.",
        },
        {
          title: "Event-driven notifications",
          body: "Billing and contract events trigger reminders and alerts, rather than staff chasing payments by hand.",
        },
      ],
    },
    diagram: {
      title: "Contract-centred CRM",
      cols: 4,
      rows: 2,
      nodes: [
        { id: "web", label: "CRM app", sub: "Next.js", kind: "client", col: 0, row: 0 },
        { id: "api", label: "API", sub: "NestJS", kind: "service", col: 1, row: 0 },
        { id: "acct", label: "Accounting engine", sub: "amortization · reports", kind: "service", col: 2, row: 0 },
        { id: "pg", label: "PostgreSQL", sub: "contracts · ledger", kind: "data", col: 3, row: 0 },
        { id: "pay", label: "Pay Advantage", sub: "recurring billing", kind: "external", col: 0, row: 1 },
        { id: "events", label: "Events", sub: "payments · contracts", kind: "queue", col: 1, row: 1 },
        { id: "notify", label: "Notifications", sub: "CRM alerts", kind: "worker", col: 2, row: 1 },
        { id: "comms", label: "SMS & email", sub: "providers", kind: "external", col: 3, row: 1 },
      ],
      edges: [
        { from: "web", to: "api", label: "HTTPS" },
        { from: "api", to: "acct", label: "post" },
        { from: "acct", to: "pg", label: "journal" },
        { from: "pay", to: "api", label: "payments", async: true },
        { from: "api", to: "events", label: "emit", async: true },
        { from: "events", to: "notify" },
        { from: "notify", to: "comms", label: "send" },
      ],
    },
  },
  {
    slug: "mustbreak",
    title: "MustBreak",
    summary:
      "AI real-time meeting platform for transcription, translation, and multilingual collaboration, with AI summaries, searchable history, and a Slack translator bot.",
    description:
      "MustBreak, built at MUST Company in Seoul, is a real-time AI translator for meetings and chat. People speak in their own language and everyone in the room reads the conversation in theirs, with automatic language detection, speaker identification, and noise cancelling. Meetings become shareable minutes with speaker separation, AI summaries and chat, and searchable history, so late joiners can catch up. In Slack, the @MustBreak bot translates conversations in place.",
    type: "Enterprise",
    role: "Full-stack engineer",
    status: "Completed",
    domains: ["AI", "SaaS"],
    topics: ["Real-time Translation", "Speech Transcription", "Multilingual Collaboration", "Slack Integration"],
    technologies: ["Python", "FastAPI", "DynamoDB", "Next.js", "TypeScript"],
    liveUrl: "https://mustbreak.ai",
    startDate: "2024-05",
    endDate: "2026-06",
    featured: false,
    order: 12,
    features: [
      "Real-time transcription and translation across 60+ languages",
      "Group conversations with speaker identification",
      "Automatic language and voice recognition",
      "Noise cancelling that isolates the speaker's voice",
      "Pronunciation support for non-native English speakers",
      "Meeting notes with speaker separation, AI summaries, and AI chat",
      "Searchable conversation history, including catch-up for late joiners",
      "Shareable, confidential meeting minutes",
      "@MustBreak Slack bot for translation inside Slack",
      "Mobile web and mobile app access",
    ],
    contributions: [
      "Worked across the stack as a full-stack engineer at MUST Company",
      "Built low-latency real-time transcription and translation infrastructure",
      "Built the @MustBreak Slack bot and the Slack workflows around it",
      "Built meeting features: speaker separation, AI summaries and chat, and searchable conversation history",
      "Built responsive frontend features in Next.js and TypeScript",
    ],
    highlights: [
      "Developed MustBreak, an AI-powered real-time meeting platform for transcription, translation, and multilingual collaboration across distributed teams, with AI-generated summaries and searchable conversation history.",
      "Integrated Slack workflows and low-latency real-time communication infrastructure to support enterprise-grade multilingual collaboration.",
    ],
    story: {
      problem:
        "Distributed teams lose meetings to language. Non-native speakers follow half the conversation, notes miss what was said, and the same friction carries over into chat.",
      approach:
        "Audio streams from each participant are transcribed and translated in real time, tagged by speaker, and fanned out to everyone in their chosen language. The same transcript then drives meeting notes, AI summaries, and searchable history, and a Slack bot brings translation into the team's chat.",
      decisions: [
        {
          title: "Latency first",
          body: "Translation is only useful while the conversation is still happening, so the real-time path is kept short and low-latency from microphone to every listener.",
        },
        {
          title: "One transcript, many uses",
          body: "Live captions, minutes, summaries, and search all read from the same speaker-tagged transcript.",
        },
        {
          title: "Meet teams where they talk",
          body: "The Slack bot brings the same translation into chat, so it isn't limited to meetings.",
        },
      ],
    },
    diagram: {
      title: "Real-time translation",
      cols: 4,
      rows: 2,
      nodes: [
        { id: "web", label: "Meeting app", sub: "Next.js · mobile web", kind: "client", col: 0, row: 0 },
        { id: "api", label: "Realtime API", sub: "FastAPI", kind: "service", col: 1, row: 0 },
        { id: "ai", label: "AI models", sub: "speech · translation", kind: "external", col: 2, row: 0 },
        { id: "db", label: "DynamoDB", sub: "transcripts · history", kind: "data", col: 3, row: 0 },
        { id: "slack", label: "Slack", sub: "@MustBreak bot", kind: "client", col: 0, row: 1 },
        { id: "notes", label: "Meeting notes", sub: "summaries · chat", kind: "worker", col: 2, row: 1 },
      ],
      edges: [
        { from: "web", to: "api", label: "audio stream" },
        { from: "api", to: "ai", label: "transcribe · translate" },
        { from: "api", to: "db", label: "transcript" },
        { from: "slack", to: "api", label: "events" },
        { from: "db", to: "notes", label: "summarize" },
      ],
    },
  },
  {
    slug: "msquare-market",
    title: "MSquare Market",
    summary:
      "Blockchain-based digital asset marketplace from the MSQUARE ecosystem, with crypto wallet connection, transaction flows, and an admin panel for listings, users, and transactions.",
    description:
      "MSquare Market is a blockchain-based digital asset marketplace built at MUST Company in Seoul as part of the MSQUARE ecosystem. Users connect a crypto wallet, browse and trade digital assets, follow their transactions, and manage their accounts. Behind it, an admin panel lets staff manage listings and assets, manage users, monitor transactions, and follow sales and activity on dashboards. I worked on the frontend, mostly on the admin panel.",
    type: "Enterprise",
    role: "Frontend engineer",
    status: "Completed",
    domains: ["FinTech"],
    topics: ["Blockchain", "Digital Asset Marketplace", "Crypto Wallets", "Admin Dashboards"],
    technologies: ["Next.js", "TypeScript"],
    startDate: "2024-05",
    endDate: "2026-06",
    featured: false,
    order: 13,
    features: [
      "Crypto wallet connection",
      "Transaction flows for buying and transferring digital assets, with status tracking",
      "Marketplace pages for browsing assets",
      "User account pages with owned assets and history",
      "Admin panel to manage listings and assets",
      "Admin user management",
      "Transaction monitoring for staff",
      "Sales and activity dashboards and reports",
    ],
    contributions: [
      "Worked as a frontend engineer at MUST Company, mostly on the admin panel",
      "Built admin screens for managing listings, assets, and users, monitoring transactions, and dashboards and reports",
      "Implemented crypto wallet connection flows and transaction UIs",
      "Built responsive marketplace and user account pages in Next.js and TypeScript",
    ],
    highlights: [
      "Developed responsive frontend features for MSquare Market, a blockchain-based digital asset marketplace, implementing crypto wallet connection flows and transaction UIs.",
    ],
    story: {
      problem:
        "A digital asset marketplace has two audiences. Buyers need wallet connection and transactions that make on-chain steps understandable, and staff need to see and control everything that happens on the marketplace.",
      approach:
        "The user-facing app wraps wallet connection and each transaction in clear, step-by-step UI with visible status. The admin panel brings listings, users, and transactions into one place, with dashboards for sales and activity, so staff can act without touching the chain directly.",
      decisions: [
        {
          title: "Status at every step",
          body: "Transactions show where they are, from signing to confirmation, so users aren't left guessing while the chain catches up.",
        },
        {
          title: "Admin as an operations tool",
          body: "Listings, users, and transactions are managed from one panel, with reports alongside, instead of separate scripts or spreadsheets.",
        },
        {
          title: "Responsive throughout",
          body: "Marketplace and account pages work on phones as well as desktops, where most wallet users are.",
        },
      ],
    },
    diagram: {
      title: "Marketplace and admin",
      cols: 4,
      rows: 2,
      nodes: [
        { id: "web", label: "Marketplace", sub: "Next.js", kind: "client", col: 0, row: 0 },
        { id: "wallet", label: "Crypto wallet", sub: "connect · sign", kind: "external", col: 1, row: 0 },
        { id: "chain", label: "Blockchain", sub: "transactions", kind: "external", col: 2, row: 0 },
        { id: "admin", label: "Admin panel", sub: "Next.js", kind: "client", col: 0, row: 1 },
        { id: "api", label: "Marketplace API", sub: "listings · users", kind: "service", col: 1, row: 1 },
        { id: "reports", label: "Dashboards", sub: "sales · activity", kind: "worker", col: 2, row: 1 },
      ],
      edges: [
        { from: "web", to: "wallet", label: "connect" },
        { from: "wallet", to: "chain", label: "sign" },
        { from: "web", to: "api", label: "browse" },
        { from: "admin", to: "api", label: "manage" },
        { from: "api", to: "reports", label: "aggregate" },
      ],
    },
  },
  {
    slug: "must-hiring",
    visible: false,
    title: "MUST Hiring & Match Hire",
    shortTitle: "MUST Hiring",
    summary:
      "Two AI hiring platforms at MUST Company: MUST Hiring, with resume matching, interview practice, and an ATS, built full-stack; and Match Hire, an AI-first hiring workspace, where I worked on the frontend.",
    description:
      "MUST Hiring, built at MUST Company in Seoul, serves both sides of hiring. Candidates build a profile, see an AI match score on every job before they apply, apply in one click with a saved resume and cover letter, and practise with AI-generated interview questions, recording their answers for instant feedback. Recruiters describe a role in plain language to get a full job description in 8+ languages, then work from an ATS dashboard with a searchable candidate database, AI match scores, interview scheduling, and hiring analytics. Its successor, Match Hire, is AI-first: a team describes who it wants to hire and gets candidates ranked by fit, with Kyu, an AI hiring assistant, a talent workspace, pipeline automations, and a joint inbox.",
    type: "Enterprise",
    role: "Full-stack engineer (MUST Hiring), frontend engineer (Match Hire)",
    status: "Completed",
    domains: ["AI", "SaaS"],
    topics: ["Recruitment", "Applicant Tracking", "AI Matching", "AI Search", "Interview Practice"],
    technologies: ["Python", "FastAPI", "DynamoDB", "Next.js", "TypeScript"],
    liveUrl: "https://hiring.must.company",
    startDate: "2024-05",
    endDate: "2026-06",
    featured: false,
    order: 14,
    features: [
      "AI resume matching, with a match score and recommendations for each job",
      "AI interview practice with role-specific questions, recorded audio answers, and instant feedback",
      "One-click apply with a saved resume and cover letter",
      "Guided candidate onboarding, resume management, and a career dashboard",
      "AI job description generator in 8+ languages",
      "ATS dashboard with KPI cards, funnel charts, and top-job insights",
      "Searchable candidate database with profiles, resumes, and match scores",
      "Interview scheduling linked to applications",
      "Analytics on hiring performance, recruiter activity, and time-to-hire",
      "Match Hire: deep search that ranks candidates by fit from a plain-language description",
      "Match Hire: profile cards with CV, persona, skills, trust score, and LinkedIn and GitHub enrichments",
      "Match Hire: Kyu, an AI hiring assistant, plus a talent workspace, automations, and a joint inbox",
    ],
    contributions: [
      "Built the whole product as a full-stack engineer at MUST Company: Python and FastAPI backend, DynamoDB, and a Next.js and TypeScript frontend",
      "Built the candidate side: profiles, AI match scores, one-click apply, and AI interview practice with audio answers",
      "Built the recruiter side: the AI job description generator, ATS dashboard, candidate database, interview scheduling, and analytics",
      "Worked as a frontend engineer on Match Hire, the AI-first successor, across search, profile cards, the talent workspace, the inbox, and reporting",
    ],
    highlights: [],
    story: {
      problem:
        "Candidates apply blind and walk into interviews unprepared, while recruiters spend hours writing job descriptions and sorting applications by hand.",
      approach:
        "AI sits at the three points where both sides lose the most time: matching a resume to a job, writing the job description, and preparing for the interview. Everything else is a standard ATS (candidates, applications, interviews, and reports) built around those match scores.",
      decisions: [
        {
          title: "Score before you apply",
          body: "Candidates see their match on every listing, so applications go where they have a chance and recruiters get better-fitting applicants.",
        },
        {
          title: "Practice with your voice",
          body: "Interview answers are recorded as audio, closer to a real interview than typing.",
        },
        {
          title: "Plain language in, JD out",
          body: "Recruiters describe the role in their own words and get a complete job description in the language they need.",
        },
      ],
    },
    diagram: {
      title: "Two-sided hiring",
      cols: 4,
      rows: 2,
      nodes: [
        { id: "cand", label: "Candidate app", sub: "Next.js", kind: "client", col: 0, row: 0 },
        { id: "api", label: "API", sub: "FastAPI", kind: "service", col: 1, row: 0 },
        { id: "ai", label: "AI services", sub: "match · JD · interview", kind: "external", col: 2, row: 0 },
        { id: "db", label: "DynamoDB", sub: "jobs · applications", kind: "data", col: 3, row: 0 },
        { id: "rec", label: "Recruiter ATS", sub: "Next.js", kind: "client", col: 0, row: 1 },
        { id: "reports", label: "Analytics", sub: "funnel · time-to-hire", kind: "worker", col: 2, row: 1 },
      ],
      edges: [
        { from: "cand", to: "api", label: "apply · practise" },
        { from: "rec", to: "api", label: "post · schedule" },
        { from: "api", to: "ai", label: "score · generate" },
        { from: "api", to: "db", label: "store" },
        { from: "db", to: "reports", label: "aggregate" },
      ],
    },
  },
  {
    slug: "must-mate",
    title: "MUST Mate",
    summary:
      "AI-powered project management and time-tracking tool with project time visualization, detailed reports, client billing, attendance, and payroll.",
    description:
      "MUST Mate, from MUST Company, is an AI-powered project management tool built around time. Teams track time on tasks, see project progress and time efficiency at a glance, and turn logged hours into detailed reports, transparent client billing, and payroll, with attendance management in the same app. Team performance views help managers spot productivity pitfalls, and integrations connect it to the tools a team already uses. I joined after the app was built, as a full-stack engineer on the team that maintained it.",
    type: "Enterprise",
    role: "Full-stack engineer (maintenance)",
    status: "Completed",
    domains: ["SaaS", "AI"],
    topics: ["Project Management", "Time Tracking", "Payroll", "Performance Optimization", "Maintenance"],
    technologies: ["Express", "Next.js", "TypeScript", "DynamoDB"],
    liveUrl: "https://mustmate.ai",
    startDate: "2024-05",
    endDate: "2026-06",
    featured: false,
    order: 15,
    features: [
      "Time tracking on tasks and projects",
      "Project time visualization and real-time progress",
      "Detailed reports on time and productivity",
      "Precise, transparent client billing from tracked time",
      "Attendance management and payroll from logged hours",
      "Team performance analysis",
      "Integrations with other workplace apps",
      "Starter, Advanced, and Enterprise plans",
    ],
    contributions: [
      "Joined the team after the app was built, as a full-stack engineer at MUST Company",
      "Found and fixed bugs across the Express API and the Next.js frontend",
      "Improved performance across the app",
      "Worked with the support team to keep the app running for its users",
    ],
    challenges: [
      "Getting productive quickly in a codebase that was already built, by someone else",
      "Tracking down bugs from user reports through the support team",
      "Improving performance in a live app without disrupting the teams using it",
    ],
    highlights: [],
    story: {
      problem:
        "A time-tracking tool is only useful if people trust it: hours have to be recorded correctly, reports have to load quickly, and billing and payroll have to match what was logged.",
      approach:
        "As part of the team maintaining MUST Mate, I worked from issues raised by users and the support team, reproducing and fixing bugs across the API and the frontend and improving performance where the app was slow.",
      decisions: [
        {
          title: "Reproduce first",
          body: "Each bug report was reproduced before fixing, so the fix addressed the real cause rather than the symptom.",
        },
        {
          title: "Measure before optimizing",
          body: "Performance work started from where the app was actually slow, not from guesses.",
        },
        {
          title: "Close the loop with support",
          body: "Fixes went back through the support team, so users heard when their issue was resolved.",
        },
      ],
    },
    diagram: {
      title: "Time to billing",
      cols: 4,
      rows: 2,
      nodes: [
        { id: "web", label: "Web app", sub: "Next.js", kind: "client", col: 0, row: 0 },
        { id: "api", label: "API", sub: "Express", kind: "service", col: 1, row: 0 },
        { id: "db", label: "DynamoDB", sub: "time logs · projects", kind: "data", col: 2, row: 0 },
        { id: "apps", label: "Integrations", sub: "workplace apps", kind: "external", col: 3, row: 0 },
        { id: "reports", label: "Reports", sub: "time · performance", kind: "worker", col: 1, row: 1 },
        { id: "billing", label: "Billing & payroll", sub: "from logged hours", kind: "worker", col: 2, row: 1 },
      ],
      edges: [
        { from: "web", to: "api", label: "log time" },
        { from: "api", to: "db", label: "store" },
        { from: "apps", to: "api", label: "sync" },
        { from: "db", to: "reports", label: "aggregate" },
        { from: "db", to: "billing", label: "hours" },
      ],
    },
  },
  {
    slug: "startdescribe",
    title: "StartDescribe",
    summary:
      "AI SaaS that turns e-commerce listings into multilingual, SEO-ready product pages, syncing with Shopify, WooCommerce, and BigCommerce or working from CSV and Google Sheets.",
    description:
      "StartDescribe turns product listings into high-converting, multilingual, SEO-ready pages for dropshippers, retailers, multilingual sellers, and agencies. Merchants install it in Shopify, connect WooCommerce or BigCommerce, or upload a CSV or Google Sheet; StartDescribe fetches the products, and an AI pipeline writes descriptions, bullet points, pros and cons, and SEO copy, enhances images, and translates the results. After review and approval, the content syncs back to the store, and new products are enhanced automatically as they arrive. Teams pay through tiered Stripe subscriptions. Reworked onboarding and automation raised onboarding conversion by 40% and cut content generation time by 30%.",
    type: "Client Project",
    role: "Sole engineer",
    domains: ["AI", "SaaS"],
    topics: ["Generative AI", "E-commerce", "Shopify", "SEO", "Multilingual Content", "Subscription Billing"],
    technologies: ["Next.js", "TypeScript", "Tailwind", "Supabase", "Shopify", "Stripe", "OpenAI", "Perplexity"],
    liveUrl: "https://startdescribe.com",
    featured: true,
    order: 16,
    features: [
      "Install as a Shopify app, or connect WooCommerce or BigCommerce",
      "Bulk import from CSV or Google Sheets, with field mapping",
      "Automatic product fetching, and real-time enhancement of new products",
      "AI-written descriptions, bullet points, pros and cons, and SEO copy",
      "AI image enhancement",
      "Multilingual content with automatic translation",
      "Review and approval before publishing, then sync back to the store",
      "Team permissions, a client dashboard, and white-label options for agencies",
      "Zapier, Make, and n8n modules, plus a REST API",
      "Tiered Stripe subscriptions with a free trial",
      "Transactional emails",
    ],
    contributions: [
      "Turned the client's requirements into a product scope and architecture",
      "Built the whole product alone: Next.js frontend and server routes, Supabase auth and database, and Tailwind UI",
      "Built the Shopify app: installation, automatic product fetching, and syncing enhanced content back to the store",
      "Built the WooCommerce and BigCommerce connections and the CSV and Google Sheets import",
      "Built the AI content generation pipeline on OpenAI and Perplexity",
      "Integrated Stripe subscriptions and transactional emails",
      "Reworked onboarding and automated workflows, raising onboarding conversion by 40% and cutting content generation time by 30%",
    ],
    highlights: [
      "Built the Shopify app. Merchants install it in their store, products are fetched automatically, and AI-enhanced descriptions and images sync back to Shopify.",
      "Implemented secure authentication, an AI content generation pipeline, transactional emails, and SEO-optimized pages.",
      "Increased onboarding conversion by 40% and reduced content generation time by 30% through optimized workflows and automation.",
    ],
    story: {
      problem:
        "Store owners with hundreds of products need descriptions and images that are accurate, on-brand, and good for search, without spending a day per catalogue.",
      approach:
        "A generation pipeline first researches the product, then drafts copy and images with the store's tone and constraints in the prompt. Products are fetched from Shopify automatically, and results land in the merchant's workspace for review before they sync back to the store. Onboarding was shortened so a new store sees its first generated description quickly.",
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
        { id: "shopify", label: "Shopify", sub: "products · sync", kind: "external", col: 0, row: 2 },
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
        { from: "api", to: "shopify", label: "fetch · sync" },
      ],
    },
  },
  {
    slug: "startintegrate",
    title: "StartIntegrate",
    summary:
      "iPaaS platform offering custom apps for Make.com, Zapier, and Workato, with usage statistics, error tracking, and subscription access to a library of integrations.",
    description:
      "StartIntegrate builds and maintains custom apps for the no-code platforms Make.com, Zapier, and Workato. Subscribers get access to a library of integrations for data processing, invoicing, social media, messaging, and database tools, from OpenAI and Supabase to DoorLoop and Paymongo. Every execution is logged, so customers can search API logs, follow usage statistics, and set up their own error notifications.",
    type: "Client Project",
    role: "Sole engineer",
    status: "Completed",
    domains: ["SaaS"],
    topics: ["iPaaS", "No-code Automation", "API Integrations", "Subscription Billing"],
    technologies: ["Next.js", "TypeScript", "Tailwind", "Supabase", "Stripe", "OpenAI", "Perplexity"],
    liveUrl: "https://startintegrate.com",
    featured: false,
    order: 17,
    features: [
      "Custom apps for Make.com, Zapier, and Workato",
      "A library of integrations for data processing, invoicing, social media, messaging, and database tools",
      "Tiered subscription plans, including a free tier with test launches",
      "Usage statistics and customizable error notifications",
      "Full-text search across API logs",
      "Usage statistics and error logs kept for up to 3 months on paid plans",
      "GDPR-compliant data access, download, and deletion",
      "Ongoing app code maintenance as third-party APIs change",
    ],
    contributions: [
      "Turned the client's requirements into a product scope and architecture",
      "Built the whole platform alone: Next.js frontend, Supabase auth and database, and Tailwind UI",
      "Built the execution logging, usage statistics, and error notifications behind the customer dashboard",
      "Integrated Stripe for tiered subscription plans",
    ],
    highlights: [],
    story: {
      problem:
        "No-code platforms only reach the apps they have connectors for. When a business needs a tool that Make.com, Zapier, or Workato doesn't support well, the fallback is hand-written HTTP calls that are fragile, hard to debug and break when the API changes.",
      approach:
        "StartIntegrate ships maintained custom apps for each platform instead. Every execution passes through a logging layer, so customers can search their API logs, see usage, and get notified when something fails. Access is sold by subscription tier, and the apps are updated as the upstream APIs change.",
      decisions: [
        {
          title: "One app, three platforms",
          body: "The same integration is offered on Make.com, Zapier, and Workato, so customers aren't tied to one automation tool.",
        },
        {
          title: "Logs as a product feature",
          body: "Searchable API logs and error notifications turn debugging a broken scenario into a lookup.",
        },
        {
          title: "Retention by plan",
          body: "Paid plans keep statistics and error logs for up to 3 months, and data deletion follows GDPR timelines.",
        },
      ],
    },
    diagram: {
      title: "Custom apps with logging",
      cols: 4,
      rows: 2,
      nodes: [
        { id: "nocode", label: "No-code platforms", sub: "Make · Zapier · Workato", kind: "client", col: 0, row: 0 },
        { id: "apps", label: "Custom apps", sub: "integration library", kind: "service", col: 1, row: 0 },
        { id: "logs", label: "Execution logs", sub: "Supabase", kind: "data", col: 2, row: 0 },
        { id: "apis", label: "Third-party APIs", sub: "OpenAI · DoorLoop …", kind: "external", col: 3, row: 0 },
        { id: "portal", label: "Customer portal", sub: "Next.js", kind: "client", col: 1, row: 1 },
        { id: "alerts", label: "Error alerts", sub: "notifications", kind: "worker", col: 2, row: 1 },
      ],
      edges: [
        { from: "nocode", to: "apps", label: "execute" },
        { from: "apps", to: "apis", label: "API calls" },
        { from: "apps", to: "logs", label: "record", async: true },
        { from: "portal", to: "logs", label: "search" },
        { from: "logs", to: "alerts", label: "on error" },
      ],
    },
  },
  {
    slug: "startautomate",
    visible: false,
    title: "StartAutomate",
    summary:
      "Website and AI automations for an automation agency that builds no-code and AI workflows on Make, Zapier, and n8n.",
    description:
      "StartAutomate is an AI and no-code automation agency. I built its website, which presents the agency's services and use cases and books strategy calls, and worked with a second developer on the automations it delivers: AI appointment scheduling, customer support and follow-ups, custom chatbots, smart email assistants, and RAG systems that answer questions from a business's own documents.",
    type: "Client Project",
    role: "Engineer, with one other developer on automations",
    status: "Completed",
    domains: ["AI"],
    topics: ["AI Automation", "No-code Automation", "Chatbots", "RAG"],
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind",
      "Supabase",
      "Stripe",
      "OpenAI",
      "Perplexity",
      "n8n",
      "Make",
      "Zapier",
    ],
    liveUrl: "https://startautomate.com",
    featured: false,
    order: 18,
    features: [
      "Agency website with services, use cases, and consultation booking",
      "AI appointment scheduling that captures customer details into a CRM",
      "AI customer support and follow-ups for payment reminders and feedback",
      "Custom chatbots that qualify leads and book from CRM or staff availability",
      "Smart email assistants that reply in the client's own writing style",
      "RAG automations that answer questions from documents, databases, and wikis",
      "Workflows on Make, Zapier, and n8n, connected to CRMs such as HubSpot and Salesforce",
    ],
    contributions: ["Built the agency's website", "Built AI and no-code automations together with a second developer"],
    highlights: [],
    story: {
      problem:
        "Small teams lose hours to repetitive work: answering the same questions, chasing payments, booking calls, and copying data between tools. Off-the-shelf automations rarely fit how a particular business actually runs.",
      approach:
        "Each automation starts from a strategy call and is built on the no-code platform that fits the client, with AI steps where judgement is needed: classifying a lead, drafting a reply, answering from the company's documents. The website is the front door, explaining the services with concrete use cases and booking the first call.",
      decisions: [
        {
          title: "Platform to fit the client",
          body: "Make, Zapier, or n8n is chosen per client, so the automation lives where their team already works.",
        },
        {
          title: "Answers from their own data",
          body: "RAG grounds AI replies in the client's documents and wikis instead of the model's general knowledge.",
        },
        {
          title: "Use cases over feature lists",
          body: "The website sells with concrete workflows (time tracking, CRM sync, follow-ups) that a founder can picture in their own business.",
        },
      ],
    },
    diagram: {
      title: "AI workflow",
      cols: 4,
      rows: 2,
      nodes: [
        { id: "site", label: "Website", sub: "services · booking", kind: "client", col: 0, row: 0 },
        { id: "trigger", label: "Trigger", sub: "form · email · chat", kind: "client", col: 0, row: 1 },
        { id: "flow", label: "Workflow", sub: "Make · Zapier · n8n", kind: "service", col: 1, row: 1 },
        { id: "ai", label: "AI step", sub: "classify · draft", kind: "worker", col: 2, row: 1 },
        { id: "docs", label: "Knowledge base", sub: "RAG · docs · wikis", kind: "data", col: 2, row: 0 },
        { id: "crm", label: "CRM", sub: "HubSpot · Salesforce", kind: "external", col: 3, row: 1 },
      ],
      edges: [
        { from: "site", to: "flow", label: "book call" },
        { from: "trigger", to: "flow" },
        { from: "flow", to: "ai", label: "prompt" },
        { from: "ai", to: "docs", label: "retrieve" },
        { from: "ai", to: "crm", label: "update" },
      ],
    },
  },
];

export const projects = allProjects.filter((p) => p.visible !== false).toSorted((a, b) => a.order - b.order);

export const domains: Domain[] = ["FinTech", "SaaS", "AI", "EdTech", "GovTech", "Sports & Competition"];

export const featuredProjects = projects.filter((p) => p.featured);

/** "https://github.com/biprodas/x/" → "github.com/biprodas/x" */
export const urlLabel = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

/** Public links in display order. */
export function projectLinks(p: Project) {
  return [p.liveUrl, p.demoUrl, p.sourceUrl, p.caseStudyUrl].filter((url): url is string => !!url);
}

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
