import type { Metadata } from "next";
import {
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
import { LocalTime } from "@/components/layout/local-time";
import { availability, profile } from "@/content/profile";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact",
  description: `How to reach ${profile.name}: email, and what to write about.`,
  alternates: { canonical: "/contact" },
};

// INVENTED COPY: topics people might write about. Edit freely.
const topics = [
  {
    title: "A role on your team",
    body: "Senior full-stack or backend positions, remote. Tell me about the product, the team and the hardest problem on the roadmap.",
  },
  {
    title: "A system to build",
    body: "Contract work on SaaS platforms, ledgers and billing, or AI features: from schema design through to production.",
  },
  {
    title: "A design review",
    body: "Multi-tenancy, data modelling, queues or performance. Happy to give a second opinion on an architecture you're unsure about.",
  },
  {
    title: "Talking shop",
    body: "Competitive programming, AWS certifications, or anything you've read on this site. Engineers and students are welcome.",
  },
];

const elsewhere = [
  { name: "GitHub", url: profile.social.github, detail: "github.com/biprodas", icon: GithubLogoIcon },
  { name: "LinkedIn", url: profile.social.linkedin, detail: "in/biprodas-roy", icon: LinkedinLogoIcon },
  { name: "Academic site", url: profile.academicSite, detail: "biprodas.com", icon: GlobeIcon },
];

export default function ContactPage() {
  return (
    <>
      <header>
        <Eyebrow>Contact</Eyebrow>
        <h1 className="mt-4 text-[2.1rem] font-semibold sm:text-[2.5rem]">Let&apos;s talk</h1>
        <p className="mt-4 text-[1.05rem] leading-relaxed text-ink-2">
          Whether it&apos;s a role, a project or a question about something I&apos;ve built, email reaches me fastest. A
          few lines on what you&apos;re working on is plenty.
        </p>
      </header>

      <section aria-labelledby="email-h" className="mt-10 border bg-sidebar px-6 pt-5 pb-4">
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
          <a
            href={profile.resume}
            download="Biprodas-Roy-Resume.pdf"
            className={cn(buttonVariants({ variant: "ghost" }), "h-9 px-3 text-[0.8rem]")}
          >
            <DownloadSimpleIcon data-icon="inline-start" />
            Resume
          </a>
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

      <Section title="What you might be writing about" id="topics">
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {topics.map((t) => (
            <li
              key={t.title}
              className="group border bg-card px-5 pt-4 pb-5 transition-colors hover:border-primary/40 hover:bg-[color-mix(in_oklab,var(--primary)_4%,var(--card))]"
            >
              <h3 className="text-[1.02rem] font-semibold transition-colors group-hover:text-primary">{t.title}</h3>
              <p className="mt-1.5 text-[0.88rem] leading-[1.65] text-ink-2">{t.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Elsewhere" id="elsewhere">
        <ul className="border bg-card px-5">
          {elsewhere.map((e) => (
            <li key={e.url} className="border-b last:border-b-0">
              <a href={e.url} className="group flex items-center justify-between gap-4 py-3">
                <span className="inline-flex items-center gap-2.5 font-semibold transition-colors group-hover:text-primary">
                  <e.icon
                    aria-hidden
                    className="size-4 text-muted-foreground transition-colors group-hover:text-primary"
                  />
                  {e.name}
                </span>
                <span className="truncate text-[0.82rem] text-muted-foreground transition-colors group-hover:text-primary">
                  {e.detail}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
