"use client";

// The shadcn accordion uses React context, so it has to render on the client.
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function Faq({ items }: { items: readonly { q: string; a: string }[] }) {
  return (
    <Accordion className="border-y">
      {items.map((f) => (
        <AccordionItem key={f.q} value={f.q}>
          <AccordionTrigger className="py-3.5 text-[0.98rem] font-semibold hover:text-primary hover:no-underline">
            {f.q}
          </AccordionTrigger>
          <AccordionContent className="pb-4 text-[0.92rem] leading-relaxed text-ink-2">{f.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
