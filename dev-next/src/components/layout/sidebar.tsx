import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, EnvelopeSimpleIcon, FileTextIcon, MapPinIcon } from "@phosphor-icons/react/ssr";
import { links } from "@/content/links";
import { availability, profile } from "@/content/profile";
import { PlatformIcon } from "@/components/platform-icon";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { LocalTime } from "./local-time";
import { NavLinks } from "./nav-links";
import { ThemeToggle } from "./theme-toggle";

const chip =
  "inline-flex items-center gap-1.5 border border-border bg-background px-2 py-0.5 font-mono text-[0.68rem] text-ink-2 transition-colors hover:border-primary/50 hover:text-primary [&_svg]:size-3.5";

const dash = "h-px border-0 bg-[linear-gradient(to_right,var(--border)_50%,transparent_50%)] bg-size-[8px_1px]";

/** Persistent identity column: sticky on desktop, a compact header on small screens. */
export function Sidebar() {
  return (
    <aside
      aria-label="About the author"
      className="identity relative border-b bg-sidebar px-4 pt-4 pb-3.5 lg:sticky lg:top-0 lg:flex lg:h-dvh lg:flex-col lg:overflow-y-auto lg:overscroll-contain lg:border-r lg:border-b-0 lg:px-7 lg:pt-8 lg:pb-5 lg:*:shrink-0"
    >
      <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-3.5">
        <Link
          href="/"
          tabIndex={-1}
          aria-hidden
          className="block size-11 overflow-hidden rounded-full bg-muted lg:size-14"
        >
          <Image
            src={profile.avatar.src}
            alt=""
            sizes="3.5rem"
            priority
            className="size-full object-cover object-[50%_30%] dark:brightness-[.88]"
          />
        </Link>
        <div className="min-w-0">
          <Link href="/" className="block text-[1.12rem] leading-tight font-semibold tracking-tight">
            {profile.name}
          </Link>
          <p className="mt-0.5 truncate font-mono text-[0.68rem] leading-snug text-muted-foreground lg:whitespace-normal">
            {profile.role}
          </p>
        </div>
        <ThemeToggle className="size-9 lg:hidden" />
      </div>

      <p className="mt-4 hidden text-[0.84rem] leading-snug text-ink-2 lg:block">{profile.bio}</p>
      <hr className={cn(dash, "mt-4 mb-3 hidden lg:block")} />

      <NavLinks />

      <div className="mt-auto hidden pt-5 lg:block">
        <section
          aria-labelledby="open-h"
          className={cn(
            "border bg-background px-3 py-2",
            // Soft glow: the accent blue in light mode, green (matching the status light) in dark mode.
            availability.open &&
              "border-primary/20 shadow-[0_0_16px_-8px_color-mix(in_oklab,var(--primary)_25%,transparent)] dark:border-emerald-500/25 dark:shadow-[0_0_16px_-8px_color-mix(in_oklab,var(--color-emerald-500)_30%,transparent)]",
          )}
        >
          <div className="flex items-center justify-between gap-2">
            <h2
              id="open-h"
              className="flex items-center gap-2 font-mono text-[0.62rem] font-semibold tracking-[0.14em] text-ink-2 uppercase"
            >
              {/* Status light: a soft pulse when open to work. */}
              <span aria-hidden className="relative flex size-1.5">
                {availability.open && (
                  <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500 opacity-60 motion-reduce:hidden" />
                )}
                <span
                  className={cn(
                    "relative size-1.5 rounded-full",
                    availability.open ? "bg-emerald-500" : "bg-muted-foreground",
                  )}
                />
              </span>
              {availability.open ? "Open to work" : "Now"}
            </h2>
            <span className="text-[0.62rem] text-muted-foreground">{availability.where}</span>
          </div>
          <p className="mt-1 text-[0.8rem] leading-tight text-ink-2">{availability.focus}</p>
          {availability.open && (
            <p className="mt-1 text-[0.76rem] leading-[1.2] font-semibold">
              {/* Highlighter stroke, repeated on each wrapped line. */}
              <span className="bg-[linear-gradient(transparent_50%,color-mix(in_oklab,var(--primary)_22%,transparent)_50%,color-mix(in_oklab,var(--primary)_22%,transparent)_90%,transparent_90%)] box-decoration-clone px-0.5">
                {availability.roles.join(" · ")}
              </span>
            </p>
          )}
          <Link
            href="/contact"
            className="group mt-1.5 inline-flex items-center gap-1 font-mono text-[0.68rem] text-primary"
          >
            Let&apos;s talk
            <ArrowRightIcon className="size-3 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </section>

        <hr className={cn(dash, "mt-3.5 mb-3")} />
        <ul className="flex flex-wrap gap-1.5" aria-label="Profiles">
          {links.map((l) => (
            <li key={l.url}>
              <a className={chip} href={l.url} target="_blank" rel="noopener noreferrer">
                <PlatformIcon platform={l.platform} />
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a className={cn(chip, "mt-1.5")} href={`mailto:${profile.email}`}>
          <EnvelopeSimpleIcon aria-hidden />
          {profile.email}
        </a>
        <Link href="/resume" className={cn(buttonVariants(), "mt-3 h-9 w-full text-[0.8rem]")}>
          <FileTextIcon data-icon="inline-start" />
          View Resume
        </Link>
        <div className="mt-2 -mr-2 flex items-center justify-between gap-2">
          <p className="flex items-center gap-1.5 text-meta [&_svg]:size-3.5">
            <MapPinIcon aria-hidden />
            {profile.location.city} · <LocalTime /> {profile.utcOffset}
          </p>
          <ThemeToggle className="size-8" />
        </div>
      </div>
    </aside>
  );
}
