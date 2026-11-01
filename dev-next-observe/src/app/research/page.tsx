import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { research, researchStatement } from "@/content/research";
import { site } from "@/lib/site";
import { cn, container, eyebrow, panel, textLink } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Research interests of Biprodas Roy: agentic software engineering, grounded retrieval over business data, and real-time multilingual systems.",
  alternates: { canonical: "/research" },
};

const STATUS_STYLE = {
  active: "text-aurora border-aurora/40",
  exploring: "text-nebula border-nebula/40",
  reading: "text-signal border-signal/40",
};

export default function ResearchPage() {
  return (
    <div className={cn(container, "pt-16 sm:pt-24")}>
      <SectionHeading as="h1" index="03" label="Fields of view" title="Research interests">
        <p>{researchStatement}</p>
        <p className="mt-4 text-base">
          A more formal research profile lives on{" "}
          <a href={site.academicUrl} className={textLink}>
            biprodas.com
          </a>
          .
        </p>
      </SectionHeading>

      <div className="space-y-24">
        {research.map((area, i) => (
          <section key={area.slug} id={area.slug} aria-labelledby={`${area.slug}-title`} className="scroll-mt-24">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
              <div>
                <p className={cn(eyebrow, "flex items-center gap-3")}>
                  <span className="text-signal">FOV-{String(i + 1).padStart(2, "0")}</span>
                  <span className={cn("rounded-full border px-2 py-0.5", STATUS_STYLE[area.status])}>
                    {area.status}
                  </span>
                </p>
                <h2 id={`${area.slug}-title`} className="mt-4 font-display text-4xl text-ink sm:text-5xl">
                  {area.title}
                </h2>
                <p className="mt-5 text-lg leading-8 text-muted">{area.summary}</p>
                <p className="mt-6 border-l-2 border-nebula/60 pl-4 leading-7 text-muted italic">{area.why}</p>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className={eyebrow}>Open questions</h3>
                  <ol className="mt-4 space-y-4">
                    {area.questions.map((q, j) => (
                      <li key={q} className="grid grid-cols-[2rem_1fr] leading-7 text-ink">
                        <span className="font-mono text-sm text-nebula">Q{j + 1}</span>
                        {q}
                      </li>
                    ))}
                  </ol>
                </div>

                <div>
                  <h3 className={eyebrow}>Experiments in progress</h3>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {area.experiments.map((e) => (
                      <li key={e.title} className={cn(panel, "p-4")}>
                        <p className="font-medium text-ink">{e.title}</p>
                        <p className="mt-1 text-sm leading-6 text-muted">{e.note}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className={eyebrow}>Reading</h3>
                  <ul className="mt-4 divide-y divide-line border-y border-line">
                    {area.reading.map((r) => (
                      <li key={r.url}>
                        <a href={r.url} className="group flex items-baseline justify-between gap-4 py-3">
                          <span className="text-sm leading-6 text-muted transition-colors group-hover:text-ink">
                            {r.title}
                            <span className="text-dim"> — {r.authors}</span>
                          </span>
                          <span className="font-mono text-xs text-dim">{r.year}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
