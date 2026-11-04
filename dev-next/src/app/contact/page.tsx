import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  BriefcaseIcon,
  ClockIcon,
  EnvelopeSimpleIcon,
  FileTextIcon,
  HandshakeIcon,
  LightbulbIcon,
  MapPinIcon,
  StackIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react/ssr";
import { buttonVariants } from "@/components/ui/button";
import { Eyebrow, Section } from "@/components/page";
import { CopyEmail } from "@/components/contact/copy-email";
import { JsonLd } from "@/components/json-ld";
import { PlatformIcon } from "@/components/platform-icon";
import { LocalTime } from "@/components/layout/local-time";
import { availability, profile } from "@/content/profile";
import { links } from "@/content/links";
import { cn } from "@/lib/utils";
import { isEnabled } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Email ${profile.name} about a remote role, a contract project, an architecture review, or an idea you want to build. Based in ${profile.location.city}, ${profile.location.country} (${profile.utcOffset}).`,
  alternates: { canonical: "/contact" },
};

/** wa.me chat link with a short opener, so messages from the site are easy to spot. */
const whatsappUrl = (number: string) =>
  `https://wa.me/${number.replace(/[^0-9]/g, "")}?text=${encodeURIComponent("Hi Biprodas, I found you through biprodas.dev.")}`;

const mailto = (subject: string) => `mailto:${profile.email}?subject=${encodeURIComponent(subject)}`;

// INVENTED COPY: topics people might write about. Edit freely.
const topics: {
  title: string;
  body: string;
  icon: typeof BriefcaseIcon;
  action: { label: string; href: string };
}[] = [
  {
    title: "An open role",
    body: "Senior full-stack or backend positions, remote. Tell me about the product, the team, and the hardest problem on the roadmap.",
    icon: BriefcaseIcon,
    action: { label: "Email about a role", href: mailto("Role enquiry") },
  },
  {
    title: "A project to build",
    body: "Contract work on SaaS, ERP, FinTech, or AI features, from schema design to production, or a second opinion on an architecture you're unsure about.",
    icon: StackIcon,
    action: { label: "See services", href: "/services" },
  },
  {
    title: "A collaboration",
    body: "Research, open source, or a product worth building together. Share what you have in mind and where you think I fit.",
    icon: HandshakeIcon,
    action: { label: "Propose a collaboration", href: mailto("Collaboration") },
  },
  {
    title: "A question or an idea",
    body: "Something you read here, a contest problem, or an idea you're not sure how to build. Engineers and students are welcome.",
    icon: LightbulbIcon,
    action: { label: "Say hello", href: mailto("Hello") },
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
    sameAs: links.map((l) => l.url),
  },
};

export default function ContactPage() {
  if (!isEnabled("contact")) notFound();
  return (
    <>
      <JsonLd data={schema} />
      <header className="wide">
        <Eyebrow>Contact</Eyebrow>
        <h1 className="mt-4 text-3xl leading-tight font-semibold text-balance sm:text-4xl">Let&apos;s talk</h1>
        <p className="mt-2 text-muted-foreground">
          Have an open role, a project to discuss, an opportunity to collaborate, a question about my work, or just an
          idea you&apos;d like to talk through? My inbox is always open. Send me a few lines, and let&apos;s start a
          conversation.
        </p>
      </header>

      <section aria-labelledby="email-h" className="wide mt-10 border bg-sidebar px-6 pt-5 pb-4">
        <h2 id="email-h" className="text-sm font-semibold text-ink-2">
          Email is the best way to reach me
        </h2>
        <a
          href={`mailto:${profile.email}`}
          className="mt-1 block text-xl font-semibold break-all transition-colors hover:text-primary sm:text-2xl"
        >
          {profile.email}
        </a>
        <div className="mt-4 flex flex-wrap items-center gap-2.5">
          <a href={`mailto:${profile.email}`} className={cn(buttonVariants(), "h-9 px-3.5 text-sm")}>
            <EnvelopeSimpleIcon data-icon="inline-start" />
            Compose an email
          </a>
          {profile.whatsapp && (
            <a
              href={whatsappUrl(profile.whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "outline" }), "h-9 px-3.5 text-sm")}
            >
              <WhatsappLogoIcon data-icon="inline-start" />
              Message on WhatsApp
            </a>
          )}
          <CopyEmail />
          <Link href="/resume" className={cn(buttonVariants({ variant: "ghost" }), "h-9 px-3 text-sm")}>
            <FileTextIcon data-icon="inline-start" />
            Resume
          </Link>
        </div>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 border-t pt-3 text-sm text-muted-foreground [&_svg]:size-3.5">
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

      <Section title="What brings you here?" id="topics" className="wide">
        <p className="-mt-2 mb-6 max-w-(--spacing-main) text-muted-foreground">
          Pick whichever fits. Each opens an email with the subject filled in, or points you to the details.
        </p>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {topics.map((t) => (
            <li
              key={t.title}
              className="group relative flex flex-col border bg-card px-5 pt-4 pb-5 transition-colors hover:border-primary/40 hover:bg-[color-mix(in_oklab,var(--primary)_4%,var(--card))]"
            >
              <div className="flex items-center gap-2.5">
                <span
                  aria-hidden
                  className="grid size-7 shrink-0 place-items-center border bg-wash text-primary transition-colors group-hover:border-primary/40"
                >
                  <t.icon className="size-4" />
                </span>
                <h3 className="text-base font-semibold transition-colors group-hover:text-primary">{t.title}</h3>
              </div>
              <p className="mt-2.5 text-sm leading-relaxed text-ink-2">{t.body}</p>
              <Link
                href={t.action.href}
                className="mt-auto inline-flex items-center gap-1 pt-3 font-mono text-xs text-primary after:absolute after:inset-0"
              >
                {t.action.label}
                <ArrowRightIcon aria-hidden className="size-3" />
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Elsewhere" id="elsewhere">
        <ul className="border-t border-foreground/70">
          {links.map((e) => (
            <li key={e.url} className="border-b">
              <a
                href={e.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid grid-cols-[1.75rem_minmax(0,1fr)] gap-x-2 py-3 focus-visible:outline-offset-4 sm:grid-cols-[1.75rem_minmax(0,1fr)_auto] sm:items-baseline sm:gap-x-4"
              >
                <PlatformIcon
                  platform={e.platform}
                  className="size-4.5 translate-y-[0.2em] text-muted-foreground transition-colors group-hover:text-primary"
                />
                <span>
                  <span className="block font-semibold transition-colors group-hover:text-primary">{e.label}</span>
                  <span className="block text-sm leading-snug text-ink-2">{e.description}</span>
                </span>
                <span className="col-start-2 mt-1 inline-flex items-center gap-1 text-sm text-muted-foreground sm:col-start-3 sm:mt-0">
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
