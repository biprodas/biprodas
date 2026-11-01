// Facts copied from data/skills.yaml, certifications.yaml and awards.yaml.
import type { Award, Certification, SkillGroup } from "./types";

export const skills: SkillGroup[] = [
  { group: "Languages", items: ["TypeScript", "JavaScript", "Python", "SQL", "Java", "C++"] },
  {
    group: "Frontend",
    items: ["React", "Next.js", "React Native", "Tailwind CSS", "TanStack Query", "Zustand", "Redux", "shadcn/ui"],
  },
  {
    group: "Backend & Architecture",
    items: ["Node.js", "NestJS", "Express", "FastAPI", "REST APIs", "GraphQL", "Microservices", "WebSockets"],
  },
  {
    group: "Data & Messaging",
    items: ["PostgreSQL", "Redis", "MongoDB", "MySQL", "DynamoDB", "BullMQ", "TypeORM", "Prisma"],
  },
  {
    group: "Cloud & DevOps",
    items: ["AWS (EC2, S3, Lambda, RDS)", "Docker", "CI/CD (GitHub Actions)", "Nginx", "Vercel"],
  },
  { group: "Security & Auth", items: ["OAuth 2.0", "JWT", "RBAC", "ABAC", "Row-Level Security"] },
  {
    group: "AI & LLMs",
    items: [
      "LLM integration",
      "RAG",
      "Agentic workflows",
      "LangGraph",
      "OpenAI/Anthropic APIs",
      "Pinecone",
      "pgvector",
      "Prompt engineering",
    ],
  },
  {
    group: "Engineering Practices",
    items: [
      "System Design",
      "Software Testing",
      "Debugging",
      "Code Review",
      "Technical Documentation",
      "Agile",
      "Product Thinking",
    ],
  },
  { group: "Tools", items: ["Linux", "VS Code", "Git", "GitHub"] },
];

export const certifications: Certification[] = [
  {
    id: "aws-developer-associate",
    title: "AWS Certified Developer – Associate",
    issuer: "Amazon Web Services",
    issued: "2026",
    url: "https://www.credly.com/badges/4d0c8176-caa8-426d-a585-db032b996210",
    infoUrl: "https://aws.amazon.com/certification/certified-developer-associate/",
  },
  {
    id: "aws-solutions-architect-associate",
    title: "AWS Certified Solutions Architect – Associate",
    issuer: "Amazon Web Services",
    issued: "2025",
    url: "https://www.credly.com/badges/8cd1fa7d-ed80-492e-bbf5-cfe8d4011129",
    infoUrl: "https://aws.amazon.com/certification/certified-solutions-architect-associate/",
  },
  {
    id: "aws-ai-practitioner",
    title: "AWS Certified AI Practitioner",
    issuer: "Amazon Web Services",
    issued: "2025",
    url: "https://www.credly.com/badges/e329c8fb-2511-4c1f-b00c-6f336863b4f4",
    infoUrl: "https://aws.amazon.com/certification/certified-ai-practitioner/",
  },
  {
    id: "aws-cloud-practitioner",
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    issued: "2025",
    url: "https://www.credly.com/badges/d26478be-16ba-423e-8d9d-981039016e08",
    infoUrl: "https://aws.amazon.com/certification/certified-cloud-practitioner/",
  },
  {
    id: "hackerrank-sql-intermediate",
    title: "SQL (Intermediate)",
    issuer: "HackerRank",
    issued: "2020",
    infoUrl: "https://www.hackerrank.com/skills-verification/sql_intermediate",
  },
  {
    id: "hackerrank-problem-solving-intermediate",
    title: "Problem Solving (Intermediate)",
    issuer: "HackerRank",
    issued: "2020",
    infoUrl: "https://www.hackerrank.com/skills-verification/problem_solving_intermediate",
  },
];

export const awards: Award[] = [
  { id: "icpc-dhaka-2015", title: "ACM-ICPC Asia Dhaka Regional", issuer: "ICPC", date: "2015" },
  {
    id: "just-intra-contest-2014",
    title: "Intra-university Programming Contest",
    issuer: "Jashore University of Science & Technology",
    date: "2014",
  },
  {
    id: "problem-solving-2000",
    title: "2,000+ algorithmic problems solved",
    description: "Across Codeforces, LeetCode, UVa, CodeChef and HackerRank.",
  },
];
