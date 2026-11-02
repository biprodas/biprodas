// Facts copied from data/skills.yaml and awards.yaml.
import type { Award, Skill, SkillCategory } from "./types";

const byOrder = (a: { order: number }, b: { order: number }) => a.order - b.order;

export const skills: Skill[] = [
  { name: "TypeScript", category: "languages", featured: true, order: 1 },
  { name: "JavaScript", category: "languages", featured: true, order: 2 },
  { name: "Python", category: "languages", featured: true, order: 3 },
  { name: "SQL", category: "languages", featured: true, order: 4 },
  { name: "Java", category: "languages", featured: true, order: 5 },
  { name: "C++", category: "languages", featured: true, order: 6 },
  { name: "React", category: "frontend", featured: false, order: 1 },
  { name: "Next.js", category: "frontend", featured: false, order: 2 },
  { name: "React Native", category: "frontend", featured: false, order: 3 },
  { name: "Tailwind CSS", category: "frontend", featured: false, order: 4 },
  { name: "TanStack Query", category: "frontend", featured: false, order: 5 },
  { name: "Zustand", category: "frontend", featured: false, order: 6 },
  { name: "Redux", category: "frontend", featured: false, order: 7 },
  { name: "shadcn/ui", category: "frontend", featured: false, order: 8 },
  { name: "Node.js", category: "backend", featured: true, order: 1 },
  { name: "NestJS", category: "backend", featured: true, order: 2 },
  { name: "Express", category: "backend", featured: true, order: 3 },
  { name: "FastAPI", category: "backend", featured: true, order: 4 },
  { name: "REST APIs", category: "backend", featured: true, order: 5 },
  { name: "GraphQL", category: "backend", featured: true, order: 6 },
  { name: "Microservices", category: "backend", featured: false, order: 7 },
  { name: "WebSockets", category: "backend", featured: false, order: 8 },
  { name: "PostgreSQL", category: "data", featured: true, order: 1 },
  { name: "Redis", category: "data", featured: true, order: 2 },
  { name: "MongoDB", category: "data", featured: true, order: 3 },
  { name: "MySQL", category: "data", featured: true, order: 4 },
  { name: "DynamoDB", category: "data", featured: true, order: 5 },
  { name: "BullMQ", category: "data", featured: true, order: 6 },
  { name: "TypeORM", category: "data", featured: false, order: 7 },
  { name: "Prisma", category: "data", featured: false, order: 8 },
  { name: "AWS (EC2, S3, Lambda, RDS)", category: "cloud-devops", featured: true, order: 1 },
  { name: "Docker", category: "cloud-devops", featured: true, order: 2 },
  { name: "CI/CD (GitHub Actions)", category: "cloud-devops", featured: true, order: 3 },
  { name: "Nginx", category: "cloud-devops", featured: true, order: 4 },
  { name: "Vercel", category: "cloud-devops", featured: true, order: 5 },
  { name: "OAuth 2.0", category: "security", featured: false, order: 1 },
  { name: "JWT", category: "security", featured: false, order: 2 },
  { name: "RBAC", category: "security", featured: false, order: 3 },
  { name: "ABAC", category: "security", featured: false, order: 4 },
  { name: "Row-Level Security", category: "security", featured: false, order: 5 },
  { name: "LLM integration", category: "ai", featured: true, order: 1 },
  { name: "RAG", category: "ai", featured: true, order: 2 },
  { name: "Agentic workflows", category: "ai", featured: true, order: 3 },
  { name: "LangGraph", category: "ai", featured: true, order: 4 },
  { name: "OpenAI/Anthropic APIs", category: "ai", featured: true, order: 5 },
  { name: "Pinecone", category: "ai", featured: true, order: 6 },
  { name: "pgvector", category: "ai", featured: false, order: 7 },
  { name: "Prompt engineering", category: "ai", featured: false, order: 8 },
  { name: "System Design", category: "practices", featured: false, order: 1 },
  { name: "Software Testing", category: "practices", featured: false, order: 2 },
  { name: "Debugging", category: "practices", featured: false, order: 3 },
  { name: "Code Review", category: "practices", featured: false, order: 4 },
  { name: "Technical Documentation", category: "practices", featured: false, order: 5 },
  { name: "Agile", category: "practices", featured: false, order: 6 },
  { name: "Product Thinking", category: "practices", featured: false, order: 7 },
  { name: "Linux", category: "tools", featured: false, order: 1 },
  { name: "VS Code", category: "tools", featured: false, order: 2 },
  { name: "Git", category: "tools", featured: false, order: 3 },
  { name: "GitHub", category: "tools", featured: false, order: 4 },
];

const categories: Omit<SkillCategory, "skills">[] = [
  { slug: "languages", title: "Languages", order: 1 },
  { slug: "frontend", title: "Frontend", order: 2 },
  { slug: "backend", title: "Backend & Architecture", order: 3 },
  { slug: "data", title: "Data & Messaging", order: 4 },
  { slug: "cloud-devops", title: "Cloud & DevOps", order: 5 },
  { slug: "security", title: "Security & Auth", order: 6 },
  { slug: "ai", title: "AI & LLMs", order: 7 },
  { slug: "practices", title: "Engineering Practices", order: 8 },
  { slug: "tools", title: "Tools", order: 9 },
];

export const skillCategories: SkillCategory[] = [...categories].sort(byOrder).map((c) => ({
  ...c,
  skills: skills
    .filter((s) => s.category === c.slug)
    .sort(byOrder)
    .map((s) => s.name),
}));

export function getSkill(name: string) {
  return skills.find((s) => s.name === name);
}

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
