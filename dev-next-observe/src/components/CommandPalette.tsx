"use client";

import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

export interface PaletteItem {
  label: string;
  href: string;
  group: string;
  hint?: string;
}

function isTyping(target: EventTarget | null): boolean {
  return (
    target instanceof HTMLElement && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))
  );
}

/** ⌘K / Ctrl+K / "/" opens a quick jump to any page, project or post. */
export function CommandPalette({ items }: { items: PaletteItem[] }) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const listId = useId();

  const q = query.trim().toLowerCase();
  const results = q ? items.filter((i) => `${i.label} ${i.group} ${i.hint ?? ""}`.toLowerCase().includes(q)) : items;

  const open = () => {
    setQuery("");
    setActive(0);
    dialogRef.current?.showModal();
    inputRef.current?.focus();
  };

  const close = () => dialogRef.current?.close();

  const go = (item: PaletteItem | undefined) => {
    if (!item) return;
    close();
    if (item.href.startsWith("http") || item.href.startsWith("mailto:")) window.location.href = item.href;
    else router.push(item.href);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (dialogRef.current?.open) return;
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !isTyping(e.target))) {
        e.preventDefault();
        open();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const onInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      go(results[active]);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={open}
        className="hidden items-center gap-2 rounded-full border border-line px-3 py-1.5 font-mono text-xs text-dim transition hover:border-line-strong hover:text-ink sm:inline-flex"
      >
        <span>Search the sky</span>
        <kbd className="rounded border border-line px-1.5 text-[0.65rem]">⌘K</kbd>
      </button>
      <button
        type="button"
        onClick={open}
        aria-label="Open search"
        className="inline-flex size-9 items-center justify-center rounded-full border border-line text-dim transition hover:text-ink sm:hidden"
      >
        <svg viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
          <circle cx="9" cy="9" r="6" />
          <path d="m14 14 4 4" />
        </svg>
      </button>

      <dialog
        ref={dialogRef}
        aria-label="Search pages, projects and writing"
        onClick={(e) => e.target === dialogRef.current && close()}
        className="m-auto mt-[12vh] w-[min(36rem,calc(100vw-2rem))] rounded-panel border border-line-strong bg-deep p-0 text-ink shadow-2xl shadow-black/60 backdrop:bg-void/70 backdrop:backdrop-blur-sm light:shadow-black/15"
      >
        <div className="flex items-center gap-3 border-b border-line px-4">
          <span className="font-mono text-xs text-signal">⌖</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={onInputKey}
            placeholder="Jump to a page, project or essay…"
            role="combobox"
            aria-expanded="true"
            aria-controls={listId}
            aria-activedescendant={results[active] ? `${listId}-${active}` : undefined}
            className="h-14 w-full bg-transparent text-base placeholder:text-dim focus:outline-none"
          />
          <kbd className="rounded border border-line px-1.5 font-mono text-[0.65rem] text-dim">esc</kbd>
        </div>
        <ul id={listId} role="listbox" className="max-h-[50vh] overflow-y-auto p-2">
          {results.length === 0 && (
            <li className="px-3 py-6 text-center text-sm text-dim">No signal. Try another word.</li>
          )}
          {results.map((item, i) => {
            const header = i === 0 || results[i - 1].group !== item.group ? item.group : null;
            return (
              <li key={`${item.group}-${item.href}`} role="presentation">
                {header && (
                  <p className="px-3 pt-3 pb-1 font-mono text-[0.65rem] tracking-[0.2em] text-dim uppercase">
                    {header}
                  </p>
                )}
                <div
                  id={`${listId}-${i}`}
                  role="option"
                  aria-selected={i === active}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => go(item)}
                  className={`flex cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-sm ${
                    i === active ? "bg-surface text-ink" : "text-muted"
                  }`}
                >
                  <span>{item.label}</span>
                  {item.hint && <span className="font-mono text-[0.7rem] text-dim">{item.hint}</span>}
                </div>
              </li>
            );
          })}
        </ul>
      </dialog>
    </>
  );
}
