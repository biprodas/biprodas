// SAMPLE CONTENT for designing /research. Shown only in development, and only while research.ts is
// empty; production builds never render it. Not real publications.
import type { Research } from "./types";

export const sampleResearch: Research = {
  statement: [
    "My research grows out of problems I hit in production. Real-time AI products have to answer within a conversation's rhythm, and financial systems have to stay correct while many tenants write at once. I study both: how to keep language-model pipelines fast enough for live speech, and how to make multi-tenant data systems provably consistent.",
    "I care about results that ship. Each question below started as an incident, a slow report, or a latency budget, and the aim is a method other engineers can apply, not only a paper.",
  ],
  interests: [
    {
      topic: "Low-latency LLM pipelines for live speech",
      note: "Streaming transcription, translation, and summarisation that keep up with a conversation.",
      origin: { label: "MustBreak at MUST Company", href: "/experience#must-company-software-engineer" },
    },
    {
      topic: "Correctness in multi-tenant ledgers",
      note: "Double-entry invariants and tenant isolation enforced by the database, not by every query.",
      origin: { label: "Microfinance Core Banking", href: "/projects/microfinance-core-banking" },
    },
    {
      topic: "Retrieval quality in production RAG",
      note: "Measuring when retrieval helps a model and when it quietly makes answers worse.",
      origin: { label: "StartDescribe", href: "/projects/startdescribe" },
    },
    {
      topic: "Query performance for reporting workloads",
      note: "Why reports slow down as tenants grow, and schema patterns that keep them fast.",
      origin: { label: "School ERP", href: "/projects/school-erp" },
    },
  ],
  publications: [
    {
      id: "sample-streaming-translation",
      title: "Sample paper: Latency budgets for streaming speech translation with LLMs",
      authors: ["Biprodas Roy", "Sample Coauthor", "Another Coauthor"],
      type: "conference",
      status: "under-review",
      venue: "Sample Conference on Applied NLP",
      venueShort: "SAMPLE '26",
      date: "2026-04",
      abstract:
        "Sample abstract. Live translation must emit text within a few hundred milliseconds of speech. We break the pipeline into transcription, segmentation, and translation stages, measure where latency accumulates, and evaluate scheduling strategies that trade a small loss in quality for a large gain in responsiveness.",
      keywords: ["speech translation", "LLM serving", "latency"],
      links: [
        { kind: "pdf", url: "#" },
        { kind: "code", url: "#" },
      ],
      featured: true,
      order: 1,
    },
    {
      id: "sample-ledger-isolation",
      title: "Sample paper: Database-enforced isolation for multi-tenant financial ledgers",
      authors: ["Sample Coauthor", "Biprodas Roy"],
      type: "workshop",
      status: "published",
      venue: "Sample Workshop on Data Systems",
      venueShort: "SDS '25",
      date: "2025-09",
      abstract:
        "Sample abstract. We compare application-level tenant filters with row-level security in PostgreSQL across a production-shaped microfinance workload, and report the correctness and performance trade-offs of each.",
      keywords: ["multi-tenancy", "PostgreSQL", "ledgers"],
      links: [
        { kind: "pdf", url: "#" },
        { kind: "doi", url: "#" },
        { kind: "slides", url: "#" },
      ],
      featured: true,
      order: 2,
    },
    {
      id: "sample-thesis",
      title: "Sample thesis: Undergraduate final-year project title",
      authors: ["Biprodas Roy"],
      type: "thesis",
      status: "published",
      venue: "B.Sc. thesis, Jashore University of Science & Technology",
      date: "2017-09",
      links: [{ kind: "pdf", url: "#" }],
      featured: false,
      order: 3,
    },
  ],
  talks: [
    {
      id: "sample-talk",
      title: "Sample talk: Shipping real-time AI without blowing the latency budget",
      kind: "talk",
      event: "Sample Developer Meetup",
      date: "2025-11",
      online: true,
      links: [{ kind: "slides", url: "#" }],
    },
    {
      id: "sample-poster",
      title: "Sample poster: Tenant isolation patterns in PostgreSQL",
      kind: "poster",
      event: "Sample Workshop on Data Systems",
      date: "2025-09",
      location: "Sample City",
      links: [],
    },
  ],
};
