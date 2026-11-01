// From data/education.yaml and data/certifications.yaml.
import type { Certification, Education } from "./types";

export const education: Education[] = [
  {
    institution: "Jashore University of Science & Technology",
    location: "Jashore, Bangladesh",
    degree: "B.Sc. in Computer Science & Engineering",
    start: "2013-05",
    end: "2017-09",
  },
];

export const certifications: Certification[] = [
  {
    slug: "aws-developer-associate",
    title: "AWS Certified Developer – Associate",
    issuer: "Amazon Web Services",
    issued: "2026",
    url: "https://www.credly.com/badges/4d0c8176-caa8-426d-a585-db032b996210",
  },
  {
    slug: "aws-solutions-architect-associate",
    title: "AWS Certified Solutions Architect – Associate",
    issuer: "Amazon Web Services",
    issued: "2025",
    url: "https://www.credly.com/badges/8cd1fa7d-ed80-492e-bbf5-cfe8d4011129",
  },
  {
    slug: "aws-ai-practitioner",
    title: "AWS Certified AI Practitioner",
    issuer: "Amazon Web Services",
    issued: "2025",
    url: "https://www.credly.com/badges/e329c8fb-2511-4c1f-b00c-6f336863b4f4",
  },
  {
    slug: "aws-cloud-practitioner",
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    issued: "2025",
    url: "https://www.credly.com/badges/d26478be-16ba-423e-8d9d-981039016e08",
  },
  {
    slug: "hackerrank-sql-intermediate",
    title: "SQL (Intermediate)",
    issuer: "HackerRank",
    issued: "2020",
    url: "https://www.hackerrank.com/skills-verification/sql_intermediate",
  },
  {
    slug: "hackerrank-problem-solving-intermediate",
    title: "Problem Solving (Intermediate)",
    issuer: "HackerRank",
    issued: "2020",
    url: "https://www.hackerrank.com/skills-verification/problem_solving_intermediate",
  },
];
