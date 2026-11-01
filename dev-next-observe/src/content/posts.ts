// Invented copy — replace with real content. Each post's body lives in src/content/writing/<slug>.mdx.
import type { Post } from "./types";

export const posts: Post[] = [
  {
    slug: "one-door-into-the-ledger",
    title: "One door into the ledger",
    summary:
      "What building a microfinance core banking system taught me about making correctness a property of the architecture.",
    date: "2026-09",
    topics: ["FinTech", "Architecture"],
  },
  {
    slug: "multi-tenancy-is-a-spectrum",
    title: "Multi-tenancy is a spectrum",
    summary:
      "Shared tables, row-level security, schemas, databases: how I choose an isolation model, and why the answer changes as a product grows.",
    date: "2026-06",
    topics: ["SaaS", "PostgreSQL"],
  },
  {
    slug: "notes-toward-agentic-software",
    title: "Notes toward agentic software",
    summary: "A working note on what code review taught me about evaluating AI agents that change real systems.",
    date: "2026-03",
    topics: ["AI", "Research"],
  },
];
