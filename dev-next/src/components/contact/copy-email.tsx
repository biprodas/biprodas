"use client";

import { useState } from "react";
import { CheckIcon, CopyIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { profile } from "@/content/profile";

export function CopyEmail() {
  const [copied, setCopied] = useState(false);
  return (
    <Button
      variant="outline"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(profile.email);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch {
          // Clipboard blocked; the mailto link still works.
        }
      }}
    >
      {copied ? <CheckIcon data-icon="inline-start" /> : <CopyIcon data-icon="inline-start" />}
      <span aria-live="polite">{copied ? "Copied" : "Copy address"}</span>
    </Button>
  );
}
