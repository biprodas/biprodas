import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon } from "@phosphor-icons/react/ssr";
import type { Testimonial } from "@/content/types";
import { publicFileExists } from "@/lib/public-file";
import { cn } from "@/lib/utils";

export function Quote({ t, size = "default" }: { t: Testimonial; size?: "default" | "large" }) {
  const large = size === "large";
  return (
    <figure id={t.id} className="scroll-mt-6">
      <blockquote
        className={cn(
          "text-pretty",
          large
            ? "text-[1.35rem] leading-[1.45] font-medium tracking-[-0.01em] sm:text-[1.6rem]"
            : "text-[1rem] leading-[1.7] text-ink-2",
        )}
      >
        <p>&ldquo;{t.quote}&rdquo;</p>
      </blockquote>
      <figcaption className={cn("flex items-center gap-3", large ? "mt-5" : "mt-3")}>
        {t.avatar && publicFileExists(t.avatar) && (
          <Image src={t.avatar} alt="" width={36} height={36} className="size-9 shrink-0 rounded-full object-cover" />
        )}
        <div className="text-[0.86rem] leading-snug">
          <p>
            {t.linkedinUrl ? (
              <a href={t.linkedinUrl} className="font-semibold text-foreground hover:text-primary hover:underline">
                {t.name}
              </a>
            ) : (
              <span className="font-semibold text-foreground">{t.name}</span>
            )}
            <span className="text-muted-foreground">
              , {t.position}
              {t.company && ` at ${t.company}`}
            </span>
          </p>
          {(t.workedOn || t.source) && (
            <p className="mt-0.5 text-[0.8rem] text-muted-foreground">
              {t.workedOn && (
                <>
                  On{" "}
                  <Link href={t.workedOn.href} className="prose-link text-ink-2">
                    {t.workedOn.label}
                  </Link>
                </>
              )}
              {t.workedOn && t.source && " · "}
              {t.source && (
                <a href={t.source.url} className="inline-flex items-center gap-0.5 hover:text-primary">
                  {t.source.label}
                  <ArrowUpRightIcon aria-hidden className="size-3" />
                </a>
              )}
            </p>
          )}
        </div>
      </figcaption>
    </figure>
  );
}
