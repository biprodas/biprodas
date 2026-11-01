import type { Metadata } from "next";
import Image from "next/image";
import portrait from "@/assets/biprodas-roy.png";
import { SectionHeading } from "@/components/SectionHeading";
import { certifications, education } from "@/content/education";
import { experience } from "@/content/experience";
import { profile } from "@/content/profile";
import { formatDate, formatRange } from "@/lib/dates";
import { cn, container, eyebrow, panel, textLink } from "@/lib/ui";

export const metadata: Metadata = {
  title: "About",
  description:
    "Biprodas Roy: software engineer, co-founder and aspiring AI researcher from Jashore, Bangladesh. Journey, principles and credentials.",
  alternates: { canonical: "/about" },
};

/** The journey, oldest first: education, then every role. */
function journey() {
  const steps = [
    ...education.map((e) => ({ when: formatRange(e.start, e.end), title: e.degree, where: e.institution })),
    ...[...experience]
      .reverse()
      .flatMap((x) =>
        [...x.positions].reverse().map((p) => ({ when: formatRange(p.start, p.end), title: p.title, where: x.org })),
      ),
  ];
  return steps;
}

export default function AboutPage() {
  return (
    <div className={cn(container, "space-y-28 pt-16 sm:pt-24")}>
      <section className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-start">
        <div>
          <SectionHeading as="h1" index="05" label="About" title="An engineer who builds, then asks why">
            <p>{profile.summary}</p>
          </SectionHeading>
          <div className="max-w-3xl space-y-5 text-lg leading-8 text-muted">
            <p>
              I grew up and studied in Jashore, Bangladesh, and started my career writing MERN applications and teaching
              data structures to new developers. In 2019 I co-founded Semicolon IT Solutions, where I spent four and a
              half years leading a team of 10–15 engineers and shipping multi-tenant systems for more than 50 clients —
              from school ERPs to microfinance core banking.
            </p>
            <p>
              Since then I&apos;ve worked remotely with teams in Sydney and Seoul on FinTech platforms and real-time AI
              meeting infrastructure, while building my own products on the side. The thread through all of it: I like
              systems where correctness matters and the domain is messy.
            </p>
            <p>
              The questions I can&apos;t answer with engineering alone are pulling me toward research — particularly how
              we evaluate AI systems that act on real software and real data.
            </p>
          </div>
        </div>
        <figure className={cn(panel, "overflow-hidden p-3")}>
          <Image
            src={portrait}
            alt="Watercolour portrait of Biprodas Roy"
            sizes="(min-width: 1024px) 28rem, 100vw"
            className="w-full rounded-xl"
          />
          <figcaption className="px-2 pt-3 pb-1 font-mono text-[0.65rem] text-dim">
            {profile.coordinates} · {profile.location}
          </figcaption>
        </figure>
      </section>

      <section aria-labelledby="principles">
        <SectionHeading index="05.1" label="Principles" title={<span id="principles">How I work</span>} />
        <ol className="grid gap-5 md:grid-cols-2">
          {profile.principles.map((p, i) => (
            <li key={p.title} className={cn(panel, "p-6 sm:p-8")}>
              <p className="font-mono text-xs text-signal">0{i + 1}</p>
              <h3 className="mt-3 text-xl font-medium text-ink">{p.title}</h3>
              <p className="mt-3 leading-7 text-muted">{p.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="journey" className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <SectionHeading index="05.2" label="Trajectory" title={<span id="journey">The journey</span>} />
          <h3 className={eyebrow}>Currently</h3>
          <ul className="mt-4 space-y-3">
            {profile.currently.map((c) => (
              <li key={c} className="flex gap-3 leading-7 text-muted">
                <span aria-hidden className="text-aurora">
                  ◉
                </span>
                {c}
              </li>
            ))}
          </ul>
        </div>
        <ol className="relative border-l border-line">
          {journey().map((step) => (
            <li key={`${step.title}-${step.where}`} className="relative pb-8 pl-8 last:pb-0">
              <span aria-hidden className="absolute top-2 -left-[4.5px] size-2 rounded-full bg-line-strong" />
              <p className="font-mono text-xs text-dim">{step.when}</p>
              <p className="mt-1 text-ink">{step.title}</p>
              <p className="text-sm text-muted">{step.where}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="credentials">
        <SectionHeading index="05.3" label="Credentials" title={<span id="credentials">Certifications</span>} />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((c) => (
            <li key={c.slug} className={cn(panel, "p-5")}>
              <p className="font-mono text-xs text-dim">
                {c.issuer} · {formatDate(c.issued)}
              </p>
              <p className="mt-2 text-ink">
                {c.url ? (
                  <a href={c.url} className={textLink}>
                    {c.title}
                  </a>
                ) : (
                  c.title
                )}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
