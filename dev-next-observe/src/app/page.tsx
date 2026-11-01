import Image from "next/image";
import Link from "next/link";
import portrait from "@/assets/biprodas-roy.png";
import { Constellation } from "@/components/Constellation";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { RoleTicker } from "@/components/RoleTicker";
import { SectionHeading } from "@/components/SectionHeading";
import { Timeline } from "@/components/Timeline";
import { experience } from "@/content/experience";
import { profile } from "@/content/profile";
import { products, projects } from "@/content/projects";
import { research, researchStatement } from "@/content/research";
import { formatDate } from "@/lib/dates";
import { allPosts } from "@/lib/posts";
import { buttonGhost, buttonPrimary, cn, container, eyebrow, panel, panelHover, textLink } from "@/lib/ui";

export default function Home() {
  const latestPosts = allPosts().slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className={cn(container, "relative pt-16 pb-24 sm:pt-24 lg:pt-32")}>
        <div className="grid items-end gap-12 lg:grid-cols-[1fr_auto]">
          <div>
            <p className={cn(eyebrow, "flex flex-wrap items-center gap-x-3 gap-y-1")}>
              <span className="text-signal">◉ Observing</span>
              <span>{profile.coordinates}</span>
              <span className="max-sm:hidden">· {profile.location}</span>
            </p>
            <h1 className="mt-6 font-display text-display tracking-tight text-ink">
              Biprodas <span className="text-muted italic">Roy</span>
            </h1>
            <p className="mt-6 text-xl text-muted sm:text-2xl">
              <RoleTicker roles={profile.roles} />
            </p>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">{profile.headline}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/work" className={buttonPrimary}>
                Observe the work <span aria-hidden>→</span>
              </Link>
              <a href="#contact" className={buttonGhost}>
                Open a channel
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-48 sm:w-56 lg:w-64">
            <div aria-hidden className="absolute -inset-6 rounded-full border border-dashed border-line-strong" />
            <div aria-hidden className="absolute -inset-12 rounded-full border border-line/70" />
            <Image
              src={portrait}
              alt="Watercolour portrait of Biprodas Roy"
              priority
              sizes="(min-width: 1024px) 16rem, 14rem"
              className="relative aspect-square rounded-full object-cover object-top grayscale-[20%]"
            />
            <span className="absolute -right-2 bottom-4 rounded-full border border-line bg-deep px-3 py-1 font-mono text-[0.65rem] text-aurora">
              ● available
            </span>
          </div>
        </div>

        <dl className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-panel border border-line bg-line lg:grid-cols-4">
          {profile.stats.map((s) => (
            <div key={s.label} className="flex flex-col bg-void/90 p-5 sm:p-6">
              <dt className="order-2 mt-1 text-sm text-dim">{s.label}</dt>
              <dd className="font-display text-4xl text-ink sm:text-5xl">{s.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Constellations */}
      <section className={cn(container, "py-20")}>
        <Reveal>
          <SectionHeading index="01" label="Constellations" title="Systems I've built">
            Each star is a system that shipped — products I run myself and platforms I built for clients and employers.
            Hover one to trace its shape; select it to read how it works.
          </SectionHeading>
          <Constellation projects={projects} />
        </Reveal>
      </section>

      {/* Observation log */}
      <section className={cn(container, "py-20")}>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <SectionHeading index="02" label="Observation log" title="Eight years in the field">
              From a junior web developer in Jashore to co-founding a software firm, then building real-time AI and
              FinTech platforms for teams in Seoul and Sydney.
            </SectionHeading>
            <Link href="/work" className={textLink}>
              Full career log and every project →
            </Link>
          </Reveal>
          <Reveal>
            <Timeline items={experience} compact />
          </Reveal>
        </div>
      </section>

      {/* Products */}
      <section className={cn(container, "py-20")}>
        <Reveal>
          <SectionHeading index="03" label="Products" title="Things I build and run myself">
            Independent products where I own everything — the idea, the architecture, the billing, the support inbox.
          </SectionHeading>
        </Reveal>
        <ul className="grid gap-5 md:grid-cols-3">
          {products.map((p) => (
            <li key={p.slug}>
              <Reveal className="h-full">
                <ProjectCard project={p} />
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* Research */}
      <section className={cn(container, "py-20")}>
        <Reveal>
          <SectionHeading index="04" label="Fields of view" title="Where I'm pointing the telescope">
            {researchStatement}
          </SectionHeading>
        </Reveal>
        <ul className="grid gap-5 md:grid-cols-3">
          {research.map((area) => (
            <li key={area.slug}>
              <Reveal className="h-full">
                <Link href={`/research#${area.slug}`} className={cn(panel, panelHover, "flex h-full flex-col p-6")}>
                  <span className="font-mono text-[0.65rem] tracking-[0.15em] text-nebula uppercase">
                    {area.status}
                  </span>
                  <span className="mt-4 text-lg font-medium text-ink">{area.title}</span>
                  <span className="mt-3 leading-7 text-muted">{area.summary}</span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* Writing */}
      <section className={cn(container, "py-20")}>
        <Reveal>
          <SectionHeading index="05" label="Field notes" title="Writing">
            Notes on architecture, product engineering and research in progress.
          </SectionHeading>
        </Reveal>
        <ul className="divide-y divide-line border-y border-line">
          {latestPosts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/writing/${post.slug}`}
                className="group grid gap-2 py-6 sm:grid-cols-[8rem_1fr_auto] sm:items-baseline sm:gap-8"
              >
                <span className="font-mono text-xs text-dim">{formatDate(post.date)}</span>
                <span>
                  <span className="block text-lg text-ink transition-colors group-hover:text-signal">{post.title}</span>
                  <span className="mt-1 block leading-7 text-muted">{post.summary}</span>
                </span>
                <span className="font-mono text-xs text-dim">{post.minutes} min</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Contact */}
      <section id="contact" className={cn(container, "py-20")}>
        <Reveal>
          <div className={cn(panel, "relative overflow-hidden p-8 sm:p-14")}>
            <div aria-hidden className="absolute -top-24 -right-24 size-72 rounded-full bg-nebula/20 blur-3xl" />
            <p className={eyebrow}>
              <span className="text-signal">§06</span> · Open channel
            </p>
            <h2 className="mt-4 max-w-2xl font-display text-title text-ink">Have a system that needs building?</h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-muted">{profile.openTo}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={`mailto:${profile.email}`} className={buttonPrimary}>
                {profile.email}
              </a>
              {profile.social.map((s) => (
                <a key={s.url} href={s.url} className={buttonGhost} rel="me">
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
