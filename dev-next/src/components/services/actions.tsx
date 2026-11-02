import { ArrowUpRightIcon, EnvelopeSimpleIcon, LinkedinLogoIcon } from "@phosphor-icons/react/ssr";
import { buttonVariants } from "@/components/ui/button";
import { profile } from "@/content/profile";
import { getLink } from "@/content/links";
import { cn } from "@/lib/utils";

/** "Request a quote" (email) and "Hire me on Upwork" buttons, plus "Message me on LinkedIn" when asked. */
export function HireActions({
  subject = "Project enquiry",
  linkedin = false,
}: {
  subject?: string;
  linkedin?: boolean;
}) {
  const upwork = getLink("upwork");
  const linkedinLink = getLink("linkedin");
  const quote = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}`;
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <a href={quote} className={cn(buttonVariants(), "h-9 px-3.5 text-[0.8rem]")}>
        <EnvelopeSimpleIcon data-icon="inline-start" />
        Request a quote
      </a>
      {upwork && (
        <a
          href={upwork.url}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: "outline" }), "h-9 px-3.5 text-[0.8rem]")}
        >
          Hire me on Upwork
          <ArrowUpRightIcon data-icon="inline-end" />
        </a>
      )}
      {linkedin && linkedinLink && (
        <a
          href={linkedinLink.url}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: "outline" }), "h-9 px-3.5 text-[0.8rem]")}
        >
          <LinkedinLogoIcon data-icon="inline-start" />
          Message me on LinkedIn
        </a>
      )}
    </div>
  );
}
