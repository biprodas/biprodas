import type { Publication } from "../data/index.ts";

const ENTRY: Record<Publication["type"], string> = {
  journal: "article",
  conference: "inproceedings",
  workshop: "inproceedings",
  preprint: "misc",
  thesis: "phdthesis",
  book: "book",
  "book-chapter": "incollection",
  "technical-report": "techreport",
  patent: "misc",
  poster: "misc",
};

const lastName = (name: string) => name.trim().split(/\s+/).at(-1) ?? name;

/** BibTeX for a publication: its own `bibtex` field when present, otherwise generated. */
export function bibtex(pub: Publication): string {
  if (pub.bibtex) return pub.bibtex.trim();
  const year = pub.date?.slice(0, 4);
  const key = `${lastName(pub.authors[0] ?? "anon").toLowerCase()}${year ?? ""}${pub.title.split(/\s+/)[0]?.toLowerCase().replace(/\W/g, "") ?? ""}`;
  const venueField = pub.type === "journal" ? "journal" : pub.type.includes("conference") || pub.type === "workshop" ? "booktitle" : "howpublished";
  const fields: [string, string | undefined][] = [
    ["title", `{${pub.title}}`],
    ["author", pub.authors.join(" and ")],
    [venueField, pub.venue],
    ["year", year],
    ["volume", pub.volume],
    ["number", pub.issue],
    ["pages", pub.pages],
    ["publisher", pub.publisher],
    ["doi", pub.doi],
    ["eprint", pub.arxiv],
    ["note", pub.status !== "published" ? statusLabel(pub.status) : undefined],
  ];
  const body = fields
    .filter(([, v]) => v)
    .map(([k, v]) => `  ${k.padEnd(9)} = {${v}}`)
    .join(",\n");
  return `@${ENTRY[pub.type]}{${key},\n${body}\n}`;
}

export function statusLabel(s: Publication["status"]): string {
  return { published: "Published", accepted: "Accepted", "under-review": "Under review", submitted: "Submitted", "in-preparation": "In preparation" }[s];
}

/** "Cite this page": a small @misc entry for the person/site. */
export function personBibtex(name: string, url: string, year: number): string {
  const last = lastName(name);
  return `@misc{${last.toLowerCase()}${year},\n  author    = {${last}, ${name.replace(` ${last}`, "")}},\n  title     = {${name}: personal academic homepage},\n  year      = {${year}},\n  url       = {${url}}\n}`;
}
