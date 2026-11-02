// SAMPLE CONTENT for designing /testimonials. Shown only in development, and only while
// testimonials.ts is empty; production builds never render it. These people do not exist.
import type { Testimonial } from "./types";

export const sampleTestimonials: Testimonial[] = [
  {
    id: "sample-client-founder",
    quote:
      "Sample quote. We came with a spreadsheet and a deadline and left with a billing system our finance team actually trusts. Biprodas asked about edge cases we hadn't thought of, and the reports reconciled from the first month.",
    name: "Sample Client",
    position: "Founder",
    company: "Sample Startup",
    relationship: "client",
    workedOn: { label: "FinTech & Accounting Systems", href: "/services/fintech-accounting" },
    source: { label: "LinkedIn", url: "#" },
    date: "2025-08",
    featured: true,
    visible: true,
    order: 1,
  },
  {
    id: "sample-client-ops",
    quote:
      "Sample quote. Our ERP reports used to time out every month-end. After Biprodas's review they ran in seconds, with documentation our own developers could follow.",
    name: "Sample Operations Lead",
    position: "Head of Operations",
    company: "Sample Logistics Co.",
    relationship: "client",
    workedOn: { label: "Architecture Review & Performance", href: "/services/architecture-performance" },
    source: { label: "Upwork review", url: "#" },
    date: "2024-03",
    featured: true,
    visible: true,
    order: 2,
  },
  {
    id: "sample-manager",
    quote:
      "Sample quote. Biprodas owned the real-time pipeline end to end and kept it fast under load. When something broke at 2 a.m., the fix came with a write-up of why.",
    name: "Sample Engineering Manager",
    position: "Engineering Manager",
    company: "Sample Company",
    relationship: "manager",
    workedOn: { label: "MustBreak", href: "/experience#must-company-software-engineer" },
    source: { label: "LinkedIn", url: "#" },
    date: "2026-06",
    featured: false,
    visible: true,
    order: 3,
  },
  {
    id: "sample-colleague",
    quote:
      "Sample quote. Pairing with Biprodas made me a better engineer. Every schema came with the why, not only the what, and those code reviews were the ones I learned the most from.",
    name: "Sample Colleague",
    position: "Software Engineer",
    company: "Sample IT Firm",
    relationship: "colleague",
    source: { label: "LinkedIn", url: "#" },
    date: "2023-12",
    featured: false,
    visible: true,
    order: 4,
  },
  {
    id: "sample-mentee",
    quote:
      "Sample quote. I joined as an intern who had never shipped anything. Six months later I was leading a module on a client project, mostly because Biprodas kept handing me harder problems.",
    name: "Sample Mentee",
    position: "Junior Developer",
    company: "Sample IT Firm",
    relationship: "mentee",
    date: "2022-10",
    featured: false,
    visible: true,
    order: 5,
  },
];
