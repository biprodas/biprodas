// Facts come from data/experience.yaml. The one-line summaries are written for this site.
import type { Experience } from "./types";

export const experience: Experience[] = [
  {
    slug: "must-company",
    org: "MUST Company",
    location: "Seoul, South Korea",
    mode: "remote",
    employment: "full-time",
    positions: [{ title: "Software Engineer", start: "2024-05", end: "2026-06" }],
    summary: "Real-time AI meeting infrastructure and a blockchain marketplace front end.",
    highlights: [
      "Developed MustBreak, an AI-powered real-time meeting platform for transcription, translation and multilingual collaboration across distributed teams, with AI-generated summaries and searchable conversation history.",
      "Integrated Slack workflows and low-latency real-time communication infrastructure to support enterprise-grade multilingual collaboration.",
      "Developed responsive frontend features for MSquare Market, a blockchain-based digital asset marketplace, including crypto wallet connection flows and transaction UIs.",
    ],
    tech: ["Python", "FastAPI", "DynamoDB", "Next.js", "TypeScript"],
  },
  {
    slug: "codepal",
    org: "CodePal",
    location: "Sydney, Australia",
    mode: "remote",
    employment: "contract",
    positions: [{ title: "Software Engineer", start: "2023-06", end: "2024-11" }],
    summary: "A CRM/ERP platform for car-rental and rent-to-own operators.",
    highlights: [
      "Architected and delivered Drivus, a CRM/ERP platform for car-rental and rent-to-own operators, covering fleet, vehicle tracking, contract management, payments, tolls/fines and financial reporting.",
      "Engineered accounting, payroll and loan-amortization engines with automated workflows, cutting manual reconciliation time by 35%.",
      "Integrated Pay Advantage for recurring billing and built an event-driven notification system for payments, contracts and compliance.",
    ],
    tech: ["NestJS", "PostgreSQL", "Next.js", "Pay Advantage"],
  },
  {
    slug: "semicolon",
    org: "Semicolon IT Solutions",
    location: "Jashore, Bangladesh",
    employment: "founder",
    positions: [
      { title: "Co-Founder & CTO", start: "2022", end: "2023-12" },
      { title: "Co-Founder & Full-stack Engineer", start: "2019-08", end: "2022" },
    ],
    summary: "Co-founded a software firm and led its engineering.",
    highlights: [
      "Co-founded a software firm serving 50+ clients globally; directed technical strategy, the engineering roadmap and delivery.",
      "Led 10–15 engineers across frontend, backend and QA; established coding standards, code review, software testing and agile processes.",
      "Architected multi-tenant enterprise applications from schema design through production.",
      "Reduced ERP report generation time from ~40s to under 5s and cut API latency by 35% through query optimization and backend refactoring.",
      "Mentored 20+ junior engineers and interns through code reviews and pairing.",
    ],
    tech: ["NestJS", "Next.js", "PostgreSQL", "Redis", "BullMQ", "TypeORM"],
  },
  {
    slug: "utshab",
    org: "Utshab Technology Ltd",
    location: "Jashore, Bangladesh",
    employment: "full-time",
    positions: [{ title: "Web Developer", start: "2018-01", end: "2019-03" }],
    summary: "Full-stack MERN applications, and teaching algorithms on the side.",
    highlights: [
      "Built full-stack web apps on the MERN stack, owning REST API design, MongoDB schema modeling and modular frontend components.",
      "Delivered Data Structures & Algorithms training in C/C++, mentoring entry-level developers and interns.",
    ],
    tech: ["MongoDB", "Express", "React", "Node.js", "C", "C++"],
  },
];
