import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRightIcon, DownloadSimpleIcon } from "@phosphor-icons/react/ssr";
import { buttonVariants } from "@/components/ui/button";
import { Eyebrow } from "@/components/page";
import { profile } from "@/content/profile";
import { resume } from "@/lib/resume";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Resume",
  description: `${profile.name}'s resume as a PDF: experience, skills, projects and certifications.`,
  alternates: { canonical: "/resume" },
};

const button = "h-9 px-3.5 text-sm";

export default function ResumePage() {
  return (
    <>
      <header>
        <Eyebrow>Resume</Eyebrow>
        <h1 className="mt-4 text-3xl leading-tight font-semibold text-balance sm:text-4xl">Resume</h1>
        <p className="mt-2 text-muted-foreground">
          The short version, as a PDF. The full story is on the{" "}
          <Link href="/experience" className="prose-link">
            experience page
          </Link>
          .
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-2.5">
          <a
            href={resume.downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants(), button)}
          >
            <DownloadSimpleIcon data-icon="inline-start" />
            Download PDF
          </a>
          <a
            href={resume.viewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "outline" }), button)}
          >
            <ArrowUpRightIcon data-icon="inline-start" />
            Open in Google Drive
          </a>
        </div>
      </header>

      <div className="wide mt-10 border bg-sidebar">
        <iframe
          src={resume.embedUrl}
          title={`${profile.name}'s resume (PDF)`}
          loading="lazy"
          allow="autoplay"
          className="block aspect-5/7 max-h-dvh min-h-128 w-full border-0"
        />
      </div>
    </>
  );
}
