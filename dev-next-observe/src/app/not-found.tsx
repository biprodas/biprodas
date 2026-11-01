import Link from "next/link";
import { buttonGhost, buttonPrimary, cn, container, eyebrow } from "@/lib/ui";

export default function NotFound() {
  return (
    <div className={cn(container, "flex min-h-[60vh] flex-col justify-center py-24")}>
      <p className={eyebrow}>
        <span className="text-signal">ERR 404</span> · Signal lost
      </p>
      <h1 className="mt-5 font-display text-display text-ink">Nothing in this patch of sky.</h1>
      <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
        The page you were looking for has drifted out of view, or was never charted. Try the work, or press{" "}
        <kbd className="rounded border border-line px-1.5 font-mono text-sm">/</kbd> to search.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/" className={buttonPrimary}>
          Return to the observatory
        </Link>
        <Link href="/work" className={buttonGhost}>
          See the work
        </Link>
      </div>
    </div>
  );
}
