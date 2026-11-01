import type { Metadata } from "next";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectIndex } from "@/components/ProjectIndex";
import { SectionHeading } from "@/components/SectionHeading";
import { SkillOrbits } from "@/components/SkillOrbits";
import { Timeline } from "@/components/Timeline";
import { experience } from "@/content/experience";
import { projects } from "@/content/projects";
import { skills } from "@/content/skills";
import { cn, container } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Work",
  description: "Career log, case studies and every system Biprodas Roy has built: SaaS, FinTech, ERP and real-time AI.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <div className={cn(container, "space-y-28 pt-16 sm:pt-24")}>
      <section>
        <SectionHeading as="h1" index="01" label="Work" title="The observation log">
          Eight years of building software for businesses that depend on it — as an employee, a contractor and a
          co-founder.
        </SectionHeading>
        <Timeline items={experience} />
      </section>

      <section aria-labelledby="projects">
        <SectionHeading index="01.2" label="Catalogue" title={<span id="projects">Projects</span>}>
          Products I run myself, and platforms I built for clients and employers.
        </SectionHeading>
        <ProjectIndex
          cards={projects.map((p) => ({ slug: p.slug, kind: p.kind, card: <ProjectCard project={p} /> }))}
        />
      </section>

      <section aria-labelledby="instruments">
        <SectionHeading index="01.3" label="Instruments" title={<span id="instruments">The toolkit</span>}>
          What I reach for, grouped by where it sits in a system.
        </SectionHeading>
        <SkillOrbits groups={skills} />
      </section>
    </div>
  );
}
