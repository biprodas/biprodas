// Titles, summaries, tech, highlights and links come from data/projects.yaml. Roles, statuses and all
// case-study prose are invented copy — replace with real content.
import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "pitchpool",
    title: "PitchPool",
    summary:
      "Multi-tenant SaaS platform for competition prediction pools with automated scoring, live leaderboards and subscription billing.",
    kind: "client",
    role: "Lead full-stack engineer",
    tech: ["Next.js", "TypeScript", "NestJS", "PostgreSQL", "Prisma", "Redis", "BullMQ", "Docker"],
    topics: ["SaaS", "Multi-tenancy", "Billing"],
    highlights: [
      "Shipped subscription billing (plans, entitlement gating and webhooks) behind a provider-agnostic gateway; designed three-tier RBAC with privilege-escalation safeguards.",
      "Cut idle database traffic by ~90% through in-memory job scheduling and consolidated tasks, letting serverless PostgreSQL scale to zero.",
      "Built BullMQ ingestion with rate limiting, circuit breaking and retry/backoff, so leaderboards held accurate through match-day spikes.",
    ],
    links: [{ kind: "live", url: "https://pitchpool.io" }],
    featured: true,
    caseStudy: {
      problem:
        "Prediction pools are quiet for six days and frantic for ninety minutes. PitchPool needed to feel instant on match day — scores landing, leaderboards reshuffling — while costing almost nothing during the long silence between fixtures.",
      constraints: [
        "Many independent pools (tenants), each with its own members, rules and billing plan.",
        "Third-party score feeds with strict rate limits and occasional outages.",
        "A serverless Postgres bill that grows with every idle connection and poll.",
        "Admins inside a pool must never be able to escalate into another pool or the platform.",
      ],
      architecture: {
        summary:
          "A Next.js front end talks to a NestJS API. Score ingestion runs as BullMQ workers in front of Redis, which also caches leaderboards. Postgres holds tenants, predictions and billing state; a provider-agnostic gateway sits between the API and the payment provider.",
        layers: [
          { label: "Client", items: ["Next.js app", "Live leaderboard"] },
          { label: "API", items: ["NestJS", "RBAC guards", "Billing gateway"] },
          { label: "Workers", items: ["BullMQ ingestion", "Scoring jobs", "Circuit breaker"] },
          { label: "Data", items: ["PostgreSQL (serverless)", "Redis cache"] },
          { label: "External", items: ["Score feeds", "Payment provider"] },
        ],
      },
      decisions: [
        {
          title: "Schedule work in memory, not in the database",
          body: "Polling tables for due jobs kept the database awake around the clock. Moving scheduling into memory and batching related tasks let the database scale to zero between fixtures — idle traffic dropped by about 90%.",
        },
        {
          title: "Treat the score feed as unreliable by default",
          body: "Ingestion goes through a queue with rate limiting, retries with backoff and a circuit breaker. When a provider stalls, scoring pauses cleanly and catches up, rather than writing half a match into the leaderboard.",
        },
        {
          title: "Billing behind an interface",
          body: "Plans and entitlements are modelled in our own schema; the payment provider is an adapter. Swapping or adding a provider touches one module, and feature gates never call the provider directly.",
        },
      ],
      outcome: [
        "Leaderboards stayed accurate through match-day spikes.",
        "Near-zero infrastructure cost between fixtures.",
        "Three-tier RBAC with explicit safeguards against privilege escalation.",
      ],
    },
  },
  {
    slug: "microfinance-core-banking",
    title: "Microfinance Core Banking System",
    shortTitle: "Core Banking",
    summary:
      "Multi-tenant core banking platform for NGO microfinance operations, deployed across 3 organizations and 20 branches.",
    kind: "client",
    role: "Architect & lead engineer",
    tech: ["Next.js", "NestJS", "PostgreSQL", "Redis", "BullMQ", "TypeORM"],
    topics: ["FinTech", "Microfinance", "Accounting"],
    highlights: [
      "Covers group lending, savings products, loan disbursement, repayment scheduling and field-agent collection, with training and technical support for deployments.",
      "Engineered the double-entry accounting ledger with transaction posting and reconciliation, alongside microcredit portfolio management, HR/payroll and MIS/AIS reporting.",
    ],
    links: [],
    featured: true,
    caseStudy: {
      problem:
        "NGO microfinance runs on small loans collected weekly by field agents, often from villages with poor connectivity. Every taka has to land in the right ledger, in the right branch, for the right member — and regulators expect reports that reconcile to the last digit.",
      constraints: [
        "Several organizations on one platform, each with its own branches, products and chart of accounts.",
        "Field collection happening far from the office, entered in batches.",
        "Loan products with different interest methods, grace periods and repayment frequencies.",
        "Month-end MIS and AIS reports that must reconcile with the ledger exactly.",
      ],
      architecture: {
        summary:
          "A NestJS modular monolith with domain modules for members, lending, savings, HR and accounting. Every financial event posts balanced journal entries through a single posting service. Reports run as queued jobs against read-optimised views.",
        layers: [
          { label: "Client", items: ["Branch dashboard", "Collection entry"] },
          { label: "Domain", items: ["Lending", "Savings", "Members", "HR/Payroll"] },
          { label: "Ledger", items: ["Posting service", "Reconciliation"] },
          { label: "Jobs", items: ["Repayment schedules", "MIS/AIS reports"] },
          { label: "Data", items: ["PostgreSQL", "Redis"] },
        ],
      },
      decisions: [
        {
          title: "One door into the ledger",
          body: "Disbursements, collections, savings deposits and payroll never write to accounts directly. They describe a business event; the posting service turns it into balanced debits and credits. That made reconciliation a property of the system, not a monthly chore.",
        },
        {
          title: "Generate schedules, then freeze them",
          body: "Repayment schedules are generated from the loan product at disbursement and stored. Later product changes never rewrite history, which keeps audits simple and arguments short.",
        },
        {
          title: "Reports as jobs",
          body: "Heavy MIS and AIS reports run on a queue against prepared views, so branch staff never wait on a spinner while the database is doing month-end work.",
        },
      ],
      outcome: [
        "Live across 3 organizations and 20 branches.",
        "Ledger, portfolio, HR/payroll and regulatory reporting in one system.",
        "Training and technical support delivered alongside each deployment.",
      ],
    },
  },
  {
    slug: "akaunty",
    title: "Akaunty",
    summary:
      "Multi-tenant SaaS that gives freelancers, agencies, NGOs and small businesses simple financial tracking, with proper double-entry accounting underneath.",
    kind: "product",
    status: "live",
    role: "Founder & sole engineer",
    tech: ["Next.js", "NestJS", "PostgreSQL", "Drizzle", "Redis", "BullMQ", "TanStack Query", "Paddle"],
    topics: ["FinTech", "Accounting", "SaaS"],
    highlights: [
      'Users record "I got paid" or "I spent money"; the system generates balanced journal entries underneath.',
      "Profit & loss, cash flow, balance sheet, trial balance and general ledger reporting.",
    ],
    links: [{ kind: "live", url: "https://akaunty.vercel.app" }],
    featured: true,
    caseStudy: {
      problem:
        "Small teams need real books — for taxes, for funders, for knowing whether they're okay — but they don't think in debits and credits. Most tools either hide the accounting and produce numbers an accountant can't trust, or expose it and lose the user on day one.",
      constraints: [
        "Users who will never learn accounting vocabulary.",
        "Output that an accountant would still sign off on.",
        "Many small tenants, each cheap to run.",
      ],
      architecture: {
        summary:
          "A Next.js app with TanStack Query over a NestJS API. Plain-language transactions are translated into journal entries by a rules layer. Reports are derived from the ledger, never stored separately. Paddle handles subscriptions.",
        layers: [
          { label: "Client", items: ["Next.js", "TanStack Query"] },
          { label: "API", items: ["NestJS", "Transaction rules"] },
          { label: "Ledger", items: ["Journal entries", "Report builder"] },
          { label: "Data", items: ["PostgreSQL + Drizzle", "Redis / BullMQ"] },
          { label: "External", items: ["Paddle billing"] },
        ],
      },
      decisions: [
        {
          title: "Plain language on top, double-entry underneath",
          body: 'The interface speaks in events — "got paid", "spent money", "moved money". A rules layer maps each event to accounts, so every report is derived from a balanced ledger the user never has to see.',
        },
        {
          title: "Reports are queries, not copies",
          body: "P&L, cash flow and the balance sheet are computed from journal entries. There is no second source of truth to drift out of sync.",
        },
      ],
      outcome: ["Live and in use by small teams.", "Five standard financial reports from one ledger."],
    },
  },
  {
    slug: "startdescribe",
    title: "StartDescribe",
    summary:
      "AI SaaS platform for e-commerce product descriptions and image generation, with multi-tenant architecture and Stripe-based subscriptions.",
    kind: "client",
    role: "Full-stack engineer",
    tech: ["Next.js", "TypeScript", "Tailwind", "Supabase", "Stripe", "OpenAI", "Perplexity"],
    topics: ["AI", "SaaS", "E-commerce"],
    highlights: [
      "Implemented secure authentication, an AI content generation pipeline, transactional emails and SEO-optimized pages.",
      "Increased onboarding conversion by 40% and reduced content generation time by 30% through optimized workflows and automation.",
    ],
    links: [{ kind: "live", url: "https://startdescribe.com" }],
  },
  {
    slug: "cloud-prep",
    title: "Cloud Prep",
    summary:
      "Practice app for AWS certification exams — questions organized by certification and AWS service, with an explanation on every answer and per-topic accuracy tracking.",
    kind: "product",
    status: "live",
    role: "Founder & sole engineer",
    tech: ["Next.js", "TypeScript", "Supabase", "TanStack Query", "Tailwind CSS", "Paddle"],
    topics: ["EdTech", "AWS", "Certification Prep"],
    highlights: [
      "Covers Cloud Practitioner, AI Practitioner, Developer Associate and Solutions Architect Associate.",
      "Weak-area tracking per topic, in-app cheat sheets, bookmarks and review loops.",
    ],
    links: [{ kind: "live", url: "https://cloudprep.biprodas.dev" }],
  },
  {
    slug: "school-erp",
    title: "School ERP",
    summary:
      "School administration platform covering admissions, academics, students, parents and staff, finance, campus services, communication and reporting.",
    kind: "product",
    status: "building",
    role: "Founder & sole engineer",
    tech: ["Next.js", "NestJS", "PostgreSQL", "TypeORM", "Redis", "BullMQ", "TanStack Query", "Tailwind CSS"],
    topics: ["EdTech", "ERP", "Multi-tenancy"],
    highlights: [
      "Tenant isolation with PostgreSQL row-level security on tenanted tables.",
      "Next.js dashboard with a configurable sidebar, backed by a NestJS API.",
    ],
    links: [{ kind: "repo", url: "https://github.com/biprodas/school-erp" }],
  },
  {
    slug: "larmts",
    title: "Land Acquisition and Resettlement Management Tracking System",
    shortTitle: "LARMTS",
    summary:
      "Government GIS platform for land acquisition, compensation tracking and resettlement of affected individuals across infrastructure projects.",
    kind: "client",
    role: "Full-stack engineer",
    tech: ["Node.js", "Express", "PostgreSQL/PostGIS", "React", "Leaflet"],
    topics: ["GIS", "GovTech", "Infrastructure"],
    highlights: [
      "Implemented grievance management and reporting.",
      "Deployed in the MRT-5 and CEIP-1 national projects in Bangladesh.",
    ],
    links: [],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const products = projects.filter((p) => p.kind === "product");
export const featuredProjects = projects.filter((p) => p.featured);
