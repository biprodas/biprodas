// Invented copy — replace with real content. The research areas, questions and experiments are
// stand-ins. Reading lists cite real, published papers only.
import type { ResearchArea } from "./types";

export const researchStatement =
  "Eight years of building production systems left me with a set of questions that engineering alone doesn't answer. How do we know an AI system is right, not just plausible? How should software that writes software be evaluated? I study these at the seam between applied machine learning and the systems it has to live inside.";

export const research: ResearchArea[] = [
  {
    slug: "agentic-software-engineering",
    title: "Agents that maintain real software",
    status: "active",
    summary:
      "LLM agents that read, change and test production codebases — and the evaluation methods that tell us whether they actually helped.",
    why: "I've reviewed thousands of pull requests. Most of the judgement in a good review is about context the diff doesn't show. I want to know which parts of that judgement agents can learn, and how to measure it.",
    questions: [
      "What does a fair benchmark look like for changes to a multi-tenant system, where correctness depends on invariants no single test captures?",
      "Can an agent learn a codebase's conventions from its review history, rather than from instructions?",
      "Where should a human stay in the loop — and can the agent tell when it has reached that point?",
    ],
    experiments: [
      {
        title: "Invariant-aware evaluation",
        note: "Testing agent-written migrations against tenant-isolation invariants, not just unit tests.",
      },
      {
        title: "Review-history retrieval",
        note: "Retrieving past review comments as context for agents editing the same module.",
      },
    ],
    reading: [
      {
        title: "SWE-bench: Can Language Models Resolve Real-World GitHub Issues?",
        authors: "Jimenez et al.",
        year: 2024,
        url: "https://arxiv.org/abs/2310.06770",
      },
      {
        title: "ReAct: Synergizing Reasoning and Acting in Language Models",
        authors: "Yao et al.",
        year: 2023,
        url: "https://arxiv.org/abs/2210.03629",
      },
      {
        title: "Toolformer: Language Models Can Teach Themselves to Use Tools",
        authors: "Schick et al.",
        year: 2023,
        url: "https://arxiv.org/abs/2302.04761",
      },
    ],
  },
  {
    slug: "grounded-retrieval",
    title: "Grounded answers over business data",
    status: "exploring",
    summary:
      "Retrieval-augmented generation over ledgers, contracts and operational records, where a confident wrong answer is worse than no answer.",
    why: "In FinTech and ERP work, every number has a source. I'm interested in systems that can show that source — and that know when the data can't support an answer.",
    questions: [
      "How should retrieval combine structured queries (SQL over a ledger) with unstructured documents (contracts, notes)?",
      "Which evaluation signals predict whether a grounded answer will survive an accountant's review?",
      "How does position and length of retrieved context change faithfulness on long financial records?",
    ],
    experiments: [
      {
        title: "Text-to-SQL with provenance",
        note: "Answers that cite the exact journal entries they were computed from.",
      },
      {
        title: "Abstention on thin evidence",
        note: "Teaching a RAG pipeline to say “the books don’t show this” rather than guess.",
      },
    ],
    reading: [
      {
        title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks",
        authors: "Lewis et al.",
        year: 2020,
        url: "https://arxiv.org/abs/2005.11401",
      },
      {
        title: "Lost in the Middle: How Language Models Use Long Contexts",
        authors: "Liu et al.",
        year: 2024,
        url: "https://arxiv.org/abs/2307.03172",
      },
      {
        title: "RAGAS: Automated Evaluation of Retrieval Augmented Generation",
        authors: "Es et al.",
        year: 2024,
        url: "https://arxiv.org/abs/2309.15217",
      },
    ],
  },
  {
    slug: "real-time-multilingual",
    title: "Real-time multilingual communication",
    status: "reading",
    summary:
      "Streaming speech recognition and translation for live meetings, and the trade-off between latency and quality that users actually feel.",
    why: "Building a real-time meeting platform showed me how much a half-second of delay changes a conversation. I want to understand that trade-off with more rigour than product intuition.",
    questions: [
      "How much translation quality will people trade for lower latency in a live meeting?",
      "Can meeting context — agendas, past transcripts, participant glossaries — improve streaming recognition of domain terms?",
    ],
    experiments: [
      {
        title: "Latency budget mapping",
        note: "Breaking end-to-end delay into capture, recognition, translation and delivery to see where it goes.",
      },
    ],
    reading: [
      {
        title: "Robust Speech Recognition via Large-Scale Weak Supervision",
        authors: "Radford et al.",
        year: 2023,
        url: "https://arxiv.org/abs/2212.04356",
      },
      {
        title: "Seamless: Multilingual Expressive and Streaming Speech Translation",
        authors: "Seamless Communication et al.",
        year: 2023,
        url: "https://arxiv.org/abs/2312.05187",
      },
    ],
  },
];
