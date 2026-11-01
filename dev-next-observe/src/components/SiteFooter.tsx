import Link from "next/link";
import { profile } from "@/content/profile";
import { nav, site } from "@/lib/site";
import { cn, container, eyebrow } from "@/lib/ui";
import { LocalTime } from "./LocalTime";

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-line/60 bg-void/60 backdrop-blur-sm">
      <div className={cn(container, "grid gap-10 py-12 sm:grid-cols-[1.5fr_1fr_1fr]")}>
        <div className="space-y-3">
          <p className="font-display text-2xl text-ink">{profile.name}</p>
          <p className="max-w-sm text-sm leading-6 text-muted">{profile.tagline}</p>
          <p className={eyebrow}>
            {profile.coordinates} · <LocalTime />
          </p>
        </div>
        <div>
          <p className={cn(eyebrow, "mb-3")}>Navigate</p>
          <ul className="space-y-2 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-muted transition-colors hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className={cn(eyebrow, "mb-3")}>Elsewhere</p>
          <ul className="space-y-2 text-sm">
            <li>
              <a href={`mailto:${profile.email}`} className="text-muted transition-colors hover:text-ink">
                Email
              </a>
            </li>
            {profile.social.map((s) => (
              <li key={s.url}>
                <a href={s.url} className="text-muted transition-colors hover:text-ink" rel="me">
                  {s.label}
                </a>
              </li>
            ))}
            <li>
              <a href={site.academicUrl} className="text-muted transition-colors hover:text-ink">
                Academic site ↗
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className={cn(container, "flex flex-wrap justify-between gap-2 pb-10 font-mono text-[0.7rem] text-dim")}>
        <span>© {profile.name}. Built with Next.js.</span>
        <span>Press / to search the sky.</span>
      </div>
    </footer>
  );
}
