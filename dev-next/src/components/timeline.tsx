import { education, experience } from "@/content/experience";
import { initials, yearRange } from "@/lib/format";
import { cn } from "@/lib/utils";

type Node = {
  key: string;
  kind: "education" | "work" | "milestone";
  when: string;
  title: string;
  sub: string;
  start: string;
};

/** Education and roles as one chronological list, oldest first. Founding a company is a milestone. */
function nodes(): Node[] {
  const list: Node[] = [
    ...education.map((e) => ({
      key: e.id,
      kind: "education" as const,
      when: e.startDate ? yearRange(e.startDate, e.endDate ?? "present") : (e.endDate?.slice(0, 4) ?? ""),
      title: `${e.degreeShort ?? e.degree} ${initials(e.fieldOfStudy)}`,
      sub: e.institution.name,
      start: e.startDate ?? e.endDate ?? "",
    })),
    ...experience.map((e) => {
      const founder = e.positions.some((p) => p.employmentType === "Founder");
      return {
        key: e.id,
        kind: founder ? ("milestone" as const) : ("work" as const),
        when: yearRange(e.startDate, e.endDate ?? "present"),
        title: founder ? `Co-founded ${e.company.name}` : e.company.name,
        sub: e.positions[0].title,
        start: e.startDate,
      };
    }),
  ];
  return list.sort((a, b) => a.start.localeCompare(b.start));
}

const swatch = "mr-1.5 inline-block size-2 border-[1.5px] align-[0.05em]";

/** Horizontal on wider screens, vertical on phones, with a legend for the markers. */
export function Timeline() {
  return (
    <div>
      <ol className="timeline horizontal">
        {nodes().map((n) => (
          <li key={n.key} data-kind={n.kind}>
            <p className="text-meta">{n.when}</p>
            <p className="mt-1 leading-snug font-semibold">{n.title}</p>
            <p className="text-[0.86rem] text-muted-foreground">{n.sub}</p>
          </li>
        ))}
      </ol>
      <p aria-hidden className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-[0.8rem] text-muted-foreground">
        <span>
          <i className={cn(swatch, "scale-[0.86] rotate-45 rounded-[1px] border-primary")} />
          education
        </span>
        <span>
          <i className={cn(swatch, "rounded-full border-muted-foreground")} />
          work
        </span>
        <span>
          <i className={cn(swatch, "rounded-full border-primary bg-primary")} />
          founded a company
        </span>
      </p>
    </div>
  );
}
