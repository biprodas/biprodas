"use client";

import { useState } from "react";
import { CheckIcon, QuotesIcon } from "@phosphor-icons/react";

export function CopyBibtex({ bibtex, title }: { bibtex: string; title: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(bibtex);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch {
          // Clipboard blocked; nothing else to do.
        }
      }}
      aria-label={copied ? `BibTeX for ${title} copied` : `Copy BibTeX for ${title}`}
      className="inline-flex items-center gap-1 text-[0.82rem] font-semibold text-ink-2 hover:text-primary"
    >
      {copied ? <CheckIcon className="size-3.5 text-primary" /> : <QuotesIcon className="size-3.5" />}
      <span aria-live="polite">{copied ? "Copied" : "Cite"}</span>
    </button>
  );
}
