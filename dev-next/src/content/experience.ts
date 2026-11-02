// Facts copied from data/experience.yaml, data/education.yaml and data/teaching.yaml. Keep titles and dates in sync.
import type { Education, Experience, ExperienceEntry, Teaching } from "./types";

const entries: ExperienceEntry[] = [
  {
    id: "must-company",
    company: { name: "MUST Company", location: "Seoul, South Korea" },
    workMode: "Remote",
    positions: [
      {
        id: "must-company-software-engineer",
        title: "Software Engineer",
        employmentType: "Full-time",
        startDate: "2024-05",
        endDate: "2026-06",
        description:
          "Remote engineering for a Seoul-based company, on real-time AI meeting software and a blockchain marketplace.",
        bullets: [
          "Developed MustBreak, an AI-powered real-time meeting platform for transcription, translation and multilingual collaboration across distributed teams, with AI-generated summaries and searchable conversation history.",
          "Integrated Slack workflows and low-latency real-time communication infrastructure to support enterprise-grade multilingual collaboration.",
          "Developed responsive frontend features for MSquare Market, a blockchain-based digital asset marketplace, implementing crypto wallet connection flows and transaction UIs.",
        ],
        technologies: ["Python", "FastAPI", "DynamoDB", "Next.js", "TypeScript"],
      },
    ],
    order: 1,
  },
  {
    id: "codepal",
    company: { name: "CodePal", location: "Sydney, Australia" },
    workMode: "Remote",
    positions: [
      {
        id: "codepal-software-engineer",
        title: "Software Engineer",
        employmentType: "Contract",
        startDate: "2023-06",
        endDate: "2024-11",
        description:
          "Remote contract work for a Sydney-based company, building a CRM/ERP platform for car-rental and rent-to-own operators.",
        bullets: [
          "Architected and delivered Drivus, a CRM/ERP platform for car-rental and rent-to-own operators, covering fleet, vehicle tracking, contract management, payments, tolls/fines and financial reporting.",
          "Engineered accounting, payroll and loan-amortization engines with automated workflows, cutting manual reconciliation time by 35%.",
          "Integrated Pay Advantage for recurring billing and built an event-driven notification system for payments, contracts and compliance.",
        ],
        technologies: ["NestJS", "PostgreSQL", "Next.js", "Pay Advantage"],
      },
    ],
    order: 2,
  },
  {
    id: "semicolon",
    company: { name: "Semicolon IT Solutions", location: "Jashore, Bangladesh" },
    positions: [
      {
        id: "semicolon-cto",
        title: "Co-Founder & CTO",
        employmentType: "Founder",
        startDate: "2022",
        endDate: "2023-12",
        description: "The software firm I co-founded in Jashore and later led as CTO.",
        bullets: [
          "Co-founded a software firm serving 50+ clients globally; directed technical strategy, the engineering roadmap and delivery.",
          "Led 10–15 engineers across frontend, backend and QA; established coding standards, code review, software testing and agile processes.",
          "Mentored 20+ junior engineers and interns through code reviews and pairing.",
        ],
      },
      {
        id: "semicolon-full-stack-engineer",
        title: "Co-Founder & Full-stack Engineer",
        employmentType: "Founder",
        startDate: "2019-08",
        endDate: "2022",
        bullets: [
          "Architected multi-tenant enterprise applications from schema design through production.",
          "Reduced ERP report generation time from ~40s to under 5s and cut API latency by 35% through query optimization and backend refactoring.",
        ],
      },
    ],
    order: 3,
  },
  {
    id: "utshab",
    company: { name: "Utshab Technology Ltd", location: "Jashore, Bangladesh" },
    positions: [
      {
        id: "utshab-web-developer",
        title: "Web Developer",
        employmentType: "Full-time",
        startDate: "2018-01",
        endDate: "2019-03",
        description: "Full-stack web development on the MERN stack, plus algorithms training for new developers.",
        bullets: [
          "Built full-stack web apps on the MERN stack, owning REST API design, MongoDB schema modeling and modular frontend components.",
          "Delivered Data Structures & Algorithms training in C/C++, mentoring entry-level developers and interns.",
        ],
        technologies: ["MongoDB", "Express", "React", "Node.js", "C", "C++"],
      },
    ],
    order: 4,
  },
];

export const experience: Experience[] = [...entries]
  .sort((a, b) => a.order - b.order)
  .map((e) => {
    const current = e.positions.some((p) => !p.endDate);
    return {
      ...e,
      startDate: e.positions.map((p) => p.startDate).sort()[0],
      endDate: current
        ? undefined
        : e.positions
            .map((p) => p.endDate!)
            .sort()
            .at(-1),
      current,
    };
  });

const educationEntries: Education[] = [
  {
    id: "bsc-cse-just",
    institution: {
      name: "Jashore University of Science & Technology",
      location: "Jashore, Bangladesh",
      website: "https://just.edu.bd/",
      logo: "/images/logos/just.png",
    },
    degree: "Bachelor of Science",
    degreeShort: "B.Sc.",
    fieldOfStudy: "Computer Science & Engineering",
    startDate: "2013-05",
    endDate: "2017-09",
    order: 1,
  },
];

export const education = [...educationEntries].sort((a, b) => a.order - b.order);

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
