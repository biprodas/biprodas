// Facts come from data/profile.yaml. The headline, "open to" line, principles and "currently" list are
// invented copy — replace with real content.

export const profile = {
  name: "Biprodas Roy",
  roles: ["Software Engineer", "Product Builder", "Systems Thinker", "AI Researcher"],
  headline: "I build the systems behind products people rely on — and study how AI will change the way they're built.",
  summary:
    "Full-stack engineer with 8+ years designing and building scalable SaaS and real-time systems for ERP, FinTech and AI platforms. I work across TypeScript, Node.js/NestJS, Python/FastAPI, React/Next.js, PostgreSQL and AWS, with a focus on system architecture, multi-tenant applications and low-latency infrastructure. I've led small engineering teams and delivered platforms serving 100+ businesses.",
  tagline: "Coding the future, one commit at a time.",
  email: "biprodas.cse@gmail.com",
  location: "Jashore, Bangladesh",
  /** Jashore, used as the observatory's position. */
  coordinates: "23.17° N · 89.21° E",
  openTo: "Senior engineering roles, contract builds, and research collaborations in applied AI.",
  social: [
    { label: "GitHub", url: "https://github.com/biprodas", handle: "@biprodas" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/biprodas-roy/", handle: "in/biprodas-roy" },
  ],
  stats: [
    { value: "8+", label: "years shipping software" },
    { value: "100+", label: "businesses on platforms I built" },
    { value: "50+", label: "clients served as a co-founder" },
    { value: "20+", label: "engineers mentored" },
  ],
  principles: [
    {
      title: "Model the domain before the database",
      body: "Most systems fail at the edges of their vocabulary. I start with the nouns the business already uses — ledgers, contracts, tenants — and let the schema follow.",
    },
    {
      title: "Latency is a product feature",
      body: "A report that takes 40 seconds is a report nobody runs. Speed changes behaviour, so I treat it as a requirement, not a polish step.",
    },
    {
      title: "Boring infrastructure, interesting products",
      body: "Postgres, Redis, a queue and good observability carry most products further than people expect. I spend novelty where users can feel it.",
    },
    {
      title: "Leave systems easier to change",
      body: "The best measure of an architecture is how the next engineer feels in their first week. I optimise for that reader.",
    },
  ],
  currently: [
    "Building Akaunty: double-entry accounting that small teams never have to think about.",
    "Reading on agentic software engineering, and how to evaluate it honestly.",
    "Preparing to move deeper into AI research through graduate study.",
  ],
};
