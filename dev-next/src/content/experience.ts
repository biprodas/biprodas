// Facts copied from data/experience.yaml, data/education.yaml and data/teaching.yaml. Keep titles and dates in sync.
import type { Education, Experience, Teaching } from "./types";

export const experience: Experience[] = [
  {
    id: "must-company",
    org: "MUST Company",
    location: "Seoul, South Korea",
    workMode: "remote",
    positions: [{ title: "Software Engineer", start: "2024-05", end: "2026-06" }],
    tech: ["Python", "FastAPI", "DynamoDB", "Next.js", "TypeScript"],
    highlights: [
      "Developed MustBreak, an AI-powered real-time meeting platform for transcription, translation and multilingual collaboration across distributed teams, with AI-generated summaries and searchable conversation history.",
      "Integrated Slack workflows and low-latency real-time communication infrastructure to support enterprise-grade multilingual collaboration.",
      "Developed responsive frontend features for MSquare Market, a blockchain-based digital asset marketplace, implementing crypto wallet connection flows and transaction UIs.",
    ],
  },
  {
    id: "codepal",
    org: "CodePal",
    location: "Sydney, Australia",
    employmentType: "contract",
    workMode: "remote",
    positions: [{ title: "Software Engineer", start: "2023-06", end: "2024-11" }],
    tech: ["NestJS", "PostgreSQL", "Next.js", "Pay Advantage"],
    highlights: [
      "Architected and delivered Drivus, a CRM/ERP platform for car-rental and rent-to-own operators, covering fleet, vehicle tracking, contract management, payments, tolls/fines and financial reporting.",
      "Engineered accounting, payroll and loan-amortization engines with automated workflows, cutting manual reconciliation time by 35%.",
      "Integrated Pay Advantage for recurring billing and built an event-driven notification system for payments, contracts and compliance.",
    ],
  },
  {
    id: "semicolon",
    org: "Semicolon IT Solutions",
    location: "Jashore, Bangladesh",
    employmentType: "founder",
    positions: [
      { title: "Co-Founder & CTO", start: "2022", end: "2023-12" },
      { title: "Co-Founder & Full-stack Engineer", start: "2019-08", end: "2022" },
    ],
    tech: [],
    highlights: [
      "Co-founded a software firm serving 50+ clients globally; directed technical strategy, the engineering roadmap and delivery.",
      "Led 10–15 engineers across frontend, backend and QA; established coding standards, code review, software testing and agile processes.",
      "Architected multi-tenant enterprise applications from schema design through production.",
      "Reduced ERP report generation time from ~40s to under 5s and cut API latency by 35% through query optimization and backend refactoring.",
      "Mentored 20+ junior engineers and interns through code reviews and pairing.",
    ],
  },
  {
    id: "utshab",
    org: "Utshab Technology Ltd",
    location: "Jashore, Bangladesh",
    positions: [{ title: "Web Developer", start: "2018-01", end: "2019-03" }],
    tech: ["MongoDB", "Express", "React", "Node.js", "C", "C++"],
    highlights: [
      "Built full-stack web apps on the MERN stack, owning REST API design, MongoDB schema modeling and modular frontend components.",
      "Delivered Data Structures & Algorithms training in C/C++, mentoring entry-level developers and interns.",
    ],
  },
];

export const education: Education[] = [
  {
    id: "bsc-cse-just",
    institution: "Jashore University of Science & Technology",
    location: "Jashore, Bangladesh",
    degree: "B.Sc. in Computer Science & Engineering",
    start: "2013-05",
    end: "2017-09",
  },
];

export const teaching: Teaching[] = [
  {
    id: "semicolon-mentoring",
    title: "Engineering Mentorship",
    role: "mentor",
    org: "Semicolon IT Solutions",
    start: "2019-08",
    end: "2023-12",
    audience: "20+ junior engineers and interns",
    summary: "Code reviews and pairing, growing mentees into independent contributors on client projects.",
  },
  {
    id: "utshab-dsa-training",
    title: "Data Structures & Algorithms Training (C/C++)",
    role: "trainer",
    org: "Utshab Technology Ltd",
    start: "2018-01",
    end: "2019-03",
    audience: "Entry-level developers and interns",
  },
  {
    id: "just-contest-prep",
    title: "Programming Contest Preparation Sessions",
    role: "organizer",
    org: "Jashore University of Science & Technology",
  },
];
