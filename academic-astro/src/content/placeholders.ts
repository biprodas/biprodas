// ─────────────────────────────────────────────────────────────────────────────
// PLACEHOLDER CONTENT. Every value in this file is INVENTED stand-in text so the
// design can be seen with realistic copy. None of it is a fact about Biprodas.
//
// Each value is used only while the matching field in src/data is
// empty or still a TODO. Fill the YAML and the placeholder disappears on its own.
// `pnpm build` prints the placeholders still in use. In `astro dev` they get a
// dotted amber underline.
//
// Never copy these into the YAML as if they were real.
// ─────────────────────────────────────────────────────────────────────────────

import type { ResearchInterest } from "../data/index.ts";

export const placeholders = {
  // PLACEHOLDER → profile.headline.academic
  headline: "I build systems people can rely on.",

  // PLACEHOLDER → profile.bio.academic
  bio: "I build data-intensive systems for a living and want to study how to make AI-driven ones trustworthy.",

  // PLACEHOLDER → profile.summary.academic
  summary:
    "Eight years of building production software, multi-tenant ledgers, real-time multilingual meetings and government GIS platforms, have left me with more questions than answers. I want to spend the next years studying them properly: how we make systems built on language models trustworthy, measurable and fair to the people who depend on them.",

  // PLACEHOLDER → profile.researchInterests
  researchInterests: [
    {
      topic: "Evaluation of LLM-based systems",
      note: "Shipping an AI meeting assistant taught me that “it seemed fine in the demo” is not a measurement.",
    },
    {
      topic: "Reliability of agentic workflows",
      note: "Tool-using agents fail in quiet, compounding ways. I want principled ways to detect and contain that.",
    },
    {
      topic: "Multilingual and low-resource language technology",
      note: "Bengali has 230M speakers and comparatively thin tooling. Real-time translation made the gap tangible.",
    },
    {
      topic: "Correctness in data-intensive systems",
      note: "Double-entry ledgers are a small, beautiful example of invariants that software must never break.",
    },
  ] satisfies ResearchInterest[],

  // PLACEHOLDER → profile.researchStatement
  researchStatement: [
    "I came to research questions the way many engineers do: sideways, through things that broke. While building MustBreak, a real-time transcription and translation platform, I watched summaries that read fluently but quietly dropped who had agreed to what. Nobody on the team could say how often that happened, because we had no good way to measure it.",
    "That gap, between systems that look right and systems we can show are right, is what I want to study. I am interested in evaluation methods for LLM-based systems that go beyond benchmark accuracy: measuring faithfulness, catching silent failures in multi-step agentic workflows, and doing this well for languages like Bengali that most evaluation suites ignore.",
    "My engineering background shapes how I want to work. I care about artefacts other people can run, about evaluation that survives contact with production traffic, and about the unglamorous invariants, like a ledger that always balances, that make software trustworthy. I am looking for an MS or PhD programme where I can turn these instincts into rigorous research.",
  ].join("\n\n"),

  // PLACEHOLDER → profile.openTo
  openTo: [
    "MS / PhD positions in Computer Science (Fall 2027)",
    "Research assistantships",
    "Collaborations on LLM evaluation",
  ],

  // PLACEHOLDER → profile.currently
  currently: {
    focus: "Reading on faithfulness metrics for abstractive summarisation; preparing graduate applications.",
    reading: [
      "Designing Data-Intensive Applications (Kleppmann)",
      "Holistic Evaluation of Language Models (Liang et al.)",
    ],
  },

  // PLACEHOLDER → profile.about
  about: [
    "I grew up in Jashore, Bangladesh, and wrote my first real program in a university lab where the power cut out often enough that you learned to save every few minutes. Competitive programming came next: late nights on UVa and Codeforces, an ICPC regional, and the slow realisation that I liked understanding why a solution worked more than the verdict itself.",
    "After graduating I built software for a living. I co-founded Semicolon IT Solutions, led a team of engineers, and shipped systems for microfinance NGOs, government land-acquisition projects and companies in Seoul and Sydney. Along the way I mentored more than twenty junior engineers, which is still the work I am proudest of.",
    "Outside of work I read widely, mostly history and popular science, and I teach algorithms to anyone who will sit still long enough. I am happiest when explaining something hard in a way that finally clicks.",
  ].join("\n\n"),

  // PLACEHOLDER → profile.contact.*
  contact: {
    intro:
      "I read every message myself. If you include a specific question, my reply will be specific too.",
    responseTime: "Usually replies within a few days",
    topics: [
      {
        title: "Graduate admissions",
        body: "If you are on an admissions committee or a prospective advisor, I am glad to share my research statement, transcripts, or the code behind the projects on this site.",
      },
      {
        title: "Research collaboration",
        body: "I am open to working on evaluation of LLM-based systems, reliability of agentic workflows, and Bengali language technology.",
      },
      {
        title: "Engineering opportunities",
        body: "For recruiters and teams: the engineering side of my work, products and case studies, lives at biprodas.dev.",
      },
      {
        title: "Mentoring",
        body: "If you are an early-career engineer looking for direction, or want to talk algorithms, just write. No agenda needed.",
      },
    ],
  },

  // PLACEHOLDER → profile.principles
  principles: [
    {
      title: "Measure before believing.",
      note: "If a system matters, I want a number for how often it is wrong, and I want to know how that number was produced.",
    },
    {
      title: "Invariants over heroics.",
      note: "The best production fix I made was a constraint that made a whole class of bug impossible.",
    },
    {
      title: "Explain it to someone new.",
      note: "Mentoring taught me that if I cannot explain a design to a junior engineer, I do not yet understand it.",
    },
  ],

  // PLACEHOLDER → profile.languages
  languages: [
    { name: "Bengali", proficiency: "native" as const },
    { name: "English", proficiency: "full-professional" as const },
  ],

  // PLACEHOLDER → education[bsc-cse-just].thesis / grade / coursework
  education: {
    "bsc-cse-just": {
      grade: { value: "3.xx", scale: "4.00", kind: "cgpa" as const },
      thesis: {
        title: "Undergraduate thesis title goes here (e.g. a study in Bengali text classification)",
        kind: "thesis" as const,
        supervisors: ["Supervisor name"],
        abstract:
          "A two-sentence abstract of the undergraduate thesis: the problem, the method, and the one result worth remembering.",
        links: [],
      },
      coursework: [
        "Algorithms",
        "Theory of Computation",
        "Machine Learning",
        "Database Systems",
        "Distributed Systems",
        "Compiler Design",
      ],
    },
  } as Record<string, unknown>,

  // PLACEHOLDER → projects[<id>].researchSummary / questions
  projects: {
    "microfinance-core-banking": {
      researchSummary:
        "A ledger shared by 20 branches is a distributed-consistency problem with a regulator watching. The interesting part was keeping double-entry invariants intact under concurrent posting, offline field collection and later reconciliation.",
      questions: [
        "Can ledger invariants be checked continuously and cheaply in production, rather than at month-end?",
        "What does a useful formal model of offline-first financial data entry look like?",
      ],
    },
    pitchpool: {
      researchSummary:
        "Match-day traffic arrives in bursts that are predictable in time but not in size. Most of the work was in admission control and scheduling, so that leaderboards stayed correct while the database could still scale to zero between events.",
      questions: [
        "How should rate limiting adapt when load is bursty but forecastable?",
        "What is the right correctness model for a leaderboard that is eventually, but not always, consistent?",
      ],
    },
    larmts: {
      researchSummary:
        "A GIS system where every polygon maps to a family being compensated or resettled. It made data quality a question of fairness, not just engineering.",
      questions: ["How do we audit spatial datasets for errors that fall disproportionately on vulnerable people?"],
    },
    akaunty: {
      researchSummary:
        "Translating plain-language intent (“I got paid”) into balanced journal entries is a small, well-specified semantic-parsing problem with a hard correctness check: the books must balance.",
      questions: ["Could an LLM front-end be made provably safe by constraining it to a ledger’s invariants?"],
    },
    startdescribe: {
      researchSummary:
        "Generating product copy at scale raises an evaluation problem with no ground truth. Quality was judged by conversions, which is a noisy and delayed signal.",
      questions: ["What are reliable offline proxies for the quality of generated marketing text?"],
    },
    "school-erp": {
      researchSummary:
        "Row-level security pushes tenant isolation into the database itself. That trades application complexity for a policy language that is easy to get subtly wrong.",
      questions: ["Can row-level security policies be statically verified against a tenancy specification?"],
    },
    "cloud-prep": {
      researchSummary:
        "A spaced-repetition practice tool. It is a small testbed for questions about learning analytics and knowledge tracing.",
      questions: ["How few questions are needed to estimate per-topic mastery with useful confidence?"],
    },
  } as Record<string, { researchSummary: string; questions: string[] }>,

  // PLACEHOLDER → publications.yaml (shown only while it is empty)
  publications: [
    {
      id: "placeholder-paper",
      title: "Measuring Faithfulness in Real-Time Multilingual Meeting Summaries",
      authors: ["Biprodas Roy", "Co-author Name"],
      type: "preprint" as const,
      status: "in-preparation" as const,
      venue: "Manuscript in preparation",
      date: "2026",
      abstract:
        "An example abstract: what the paper studies, how, and what it found. Replace with a real publication in src/data/publications.yaml.",
      keywords: ["LLM evaluation", "summarisation", "multilingual"],
    },
  ],
};
