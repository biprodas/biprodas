import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  BriefcaseIcon,
  ClockIcon,
  DownloadSimpleIcon,
  EnvelopeSimpleIcon,
  GithubLogoIcon,
  GlobeIcon,
  LinkedinLogoIcon,
  MapPinIcon,
} from "@phosphor-icons/react/ssr";
import { buttonVariants } from "@/components/ui/button";
import { Eyebrow, Section } from "@/components/page";
import { CopyEmail } from "@/components/contact/copy-email";
import { JsonLd } from "@/components/json-ld";
import { LocalTime } from "@/components/layout/local-time";
import { availability, profile } from "@/content/profile";
import { hiring } from "@/content/services";
import { hasResume } from "@/lib/resume";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact",
  description: `Email ${profile.name} about a remote role, a contract project or an architecture review. Based in ${profile.location.city}, ${profile.location.country} (${profile.utcOffset}).`,
  alternates: { canonical: "/contact" },
};

const mailto = (subject: string) => `mailto:${profile.email}?subject=${encodeURIComponent(subject)}`;

// INVENTED COPY: topics people might write about. Edit freely.
const topics: { title: string; body: string; action: { label: string; href: string } }[] = [
  {
    title: "A role on your team",
    body: "Senior full-stack or backend positions, remote. Tell me about the product, the team and the hardest problem on the roadmap.",
    action: { label: "Email about a role", href: mailto("Role enquiry") },
  },
  {
    title: "A system to build",
    body: "Contract work on SaaS platforms, ledgers and billing, or AI features: from schema design through to production.",
    action: { label: "See services", href: "/services" },
  },
  {
    title: "A design review",
    body: "Multi-tenancy, data modelling, queues or performance. Happy to give a second opinion on an architecture you're unsure about.",
    action: { label: "About architecture reviews", href: "/services/architecture-performance" },
  },
  {
    title: "Talking shop",
    body: "Competitive programming, AWS certifications, or anything you've read on this site. Engineers and students are welcome.",
    action: { label: "Say hello", href: mailto("Hello") },
  },
];

// INVENTED COPY: the `for` lines. Edit freely.
const elsewhere = [
  {
    name: "GitHub",
    url: profile.social.github,
    handle: "github.com/biprodas",
    for: "Code and public repositories.",
    icon: GithubLogoIcon,
  },
  {
    name: "LinkedIn",
    url: profile.social.linkedin,
    handle: "in/biprodas-roy",
    for: "Work history. You can message me there too.",
    icon: LinkedinLogoIcon,
  },
  ...(hiring.upwork
    ? [
        {
          name: "Upwork",
          url: hiring.upwork,
          handle: "upwork.com",
          for: "Hire me through Upwork's contracts and payments.",
          icon: BriefcaseIcon,
        },
      ]
    : []),
  {
    name: "Academic site",
    url: profile.academicSite,
    handle: "biprodas.com",
    for: "The research side of my work.",
    icon: GlobeIcon,
  },
];

const schema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  url: new URL("/contact", profile.site).toString(),
  mainEntity: {
    "@type": "Person",
    name: profile.name,
    jobTitle: "Software Engineer",
    email: `mailto:${profile.email}`,
    url: profile.site,
    address: {
      "@type": "PostalAddress",
      addressLocality: profile.location.city,
      addressCountry: profile.location.country,
    },
    sameAs: [profile.social.github, profile.social.linkedin, hiring.upwork, profile.academicSite].filter(Boolean),
  },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd data={schema} />
      <header>
        <Eyebrow>Contact</Eyebrow>
        <h1 className="mt-4 text-[2.1rem] font-semibold sm:text-[2.5rem]">Let&apos;s talk</h1>
        <p className="mt-4 text-[1.05rem] leading-relaxed text-ink-2">
          Whether it&apos;s a role, a project or a question about something I&apos;ve built, email reaches me fastest. A
          few lines on what you&apos;re working on is plenty.
        </p>
      </header>

      <section aria-labelledby="email-h" className="wide mt-10 border bg-sidebar px-6 pt-5 pb-4">
        <h2 id="email-h" className="text-[0.82rem] font-semibold text-ink-2">
          Email is the best way to reach me
        </h2>
        <a
          href={`mailto:${profile.email}`}
          className="mt-1 block text-[1.35rem] font-semibold break-all transition-colors hover:text-primary sm:text-[1.55rem]"
        >
          {profile.email}
        </a>
        <div className="mt-4 flex flex-wrap items-center gap-2.5">
          <a href={`mailto:${profile.email}`} className={cn(buttonVariants(), "h-9 px-3.5 text-[0.8rem]")}>
            <EnvelopeSimpleIcon data-icon="inline-start" />
            Compose an email
          </a>
          <CopyEmail />
          {hasResume && (
            <a
              href={profile.resume}
              download="Biprodas-Roy-Resume.pdf"
              className={cn(buttonVariants({ variant: "ghost" }), "h-9 px-3 text-[0.8rem]")}
            >
              <DownloadSimpleIcon data-icon="inline-start" />
              Resume
            </a>
          )}
        </div>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 border-t pt-3 text-[0.8rem] text-muted-foreground [&_svg]:size-3.5">
          <span className="inline-flex items-center gap-1.5">
            <MapPinIcon aria-hidden />
            {profile.location.city}, {profile.location.country}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ClockIcon aria-hidden />
            <LocalTime /> local time · {profile.utcOffset}
          </span>
          {availability.open && (
            <span className="inline-flex items-center gap-1.5">
              <span aria-hidden className="size-1.5 rounded-full bg-emerald-500" />
              Open to work · {availability.where.split(" · ")[0].toLowerCase()}
            </span>
          )}
        </div>
      </section>

      <Section title="What you might be writing about" id="topics" className="wide">
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {topics.map((t) => (
            <li
              key={t.title}
              className="group relative flex flex-col border bg-card px-5 pt-4 pb-5 transition-colors hover:border-primary/40 hover:bg-[color-mix(in_oklab,var(--primary)_4%,var(--card))]"
            >
              <h3 className="text-[1.02rem] font-semibold transition-colors group-hover:text-primary">{t.title}</h3>
              <p className="mt-1.5 text-[0.88rem] leading-[1.65] text-ink-2">{t.body}</p>
              <Link
                href={t.action.href}
                className="mt-auto inline-flex items-center gap-1 pt-3 font-mono text-[0.7rem] text-primary after:absolute after:inset-0"
              >
                {t.action.label}
                <ArrowRightIcon aria-hidden className="size-3 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Elsewhere" id="elsewhere">
        <ul className="border-t border-foreground/70">
          {elsewhere.map((e) => (
            <li key={e.url} className="border-b">
              <a
                href={e.url}
                className="group grid grid-cols-[1.75rem_minmax(0,1fr)] gap-x-2 py-3 focus-visible:outline-offset-4 sm:grid-cols-[1.75rem_minmax(0,1fr)_auto] sm:items-baseline sm:gap-x-4"
              >
                <e.icon
                  aria-hidden
                  className="size-[1.15rem] translate-y-[0.2em] text-muted-foreground transition-colors group-hover:text-primary"
                />
                <span>
                  <span className="block font-semibold transition-colors group-hover:text-primary">{e.name}</span>
                  <span className="block text-[0.9rem] leading-snug text-ink-2">{e.for}</span>
                </span>
                <span className="col-start-2 mt-1 inline-flex items-center gap-1 text-[0.82rem] text-muted-foreground sm:col-start-3 sm:mt-0">
                  {e.handle}
                  <ArrowUpRightIcon
                    aria-hidden
                    className="size-3.5 transition-transform group-hover:translate-x-px group-hover:-translate-y-px motion-reduce:transition-none"
                  />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
