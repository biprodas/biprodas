import type { SkillGroup } from "@/content/types";
import { chip, cn, eyebrow, panel } from "@/lib/ui";

/** A decorative orrery beside the real list of skill groups. */
export function SkillOrbits({ groups }: { groups: SkillGroup[] }) {
  const rings = [
    { size: "size-[40%]", anim: "animate-orbit", tint: "bg-signal" },
    { size: "size-[62%]", anim: "animate-orbit-reverse", tint: "bg-aurora" },
    { size: "size-[84%]", anim: "animate-orbit", tint: "bg-nebula" },
  ];
  return (
    <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,22rem)_1fr]">
      <div aria-hidden className="relative mx-auto aspect-square w-full max-w-xs">
        {rings.map((ring) => (
          <div
            key={ring.size}
            className={cn(
              "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-line-strong",
              ring.size,
              ring.anim,
            )}
          >
            <span className={cn("absolute -top-1 left-1/2 size-2 -translate-x-1/2 rounded-full", ring.tint)} />
          </div>
        ))}
        <div className="absolute top-1/2 left-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink shadow-[0_0_40px_10px] shadow-signal/30" />
      </div>
      <dl className="grid gap-4 sm:grid-cols-2">
        {groups.map((g) => (
          <div key={g.group} className={cn(panel, "p-5")}>
            <dt className={cn(eyebrow, "mb-3")}>{g.group}</dt>
            <dd>
              <ul className="flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <li key={item} className={chip}>
                    {item}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
