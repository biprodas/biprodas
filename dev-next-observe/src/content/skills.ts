// From data/skills.yaml.
import type { SkillGroup } from "./types";

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
  { group: "Cloud & DevOps", items: ["AWS (EC2, S3, Lambda, RDS)", "Docker", "GitHub Actions", "Nginx", "Vercel"] },
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
    group: "Practice",
    items: ["System Design", "Software Testing", "Debugging", "Code Review", "Technical Writing", "Product Thinking"],
  },
];
