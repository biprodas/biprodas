"use client";

import { useState } from "react";
import { CheckIcon, CopyIcon } from "@phosphor-icons/react";

export function CopyId({ id, label }: { id: string; label: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(id);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch {
          // Clipboard blocked; the ID is still selectable.
        }
      }}
      aria-label={copied ? `${label} copied` : `Copy ${label}`}
      title={copied ? "Copied" : "Copy ID"}
      className="ml-1 inline-grid size-5 place-items-center align-middle text-muted-foreground transition-opacity group-focus-within:opacity-100 group-hover:opacity-100 hover:text-primary focus-visible:opacity-100 motion-reduce:transition-none [@media(hover:hover)]:opacity-0"
    >
      {copied ? <CheckIcon className="size-3.5 text-primary" /> : <CopyIcon className="size-3.5" />}
    </button>
  );
}
