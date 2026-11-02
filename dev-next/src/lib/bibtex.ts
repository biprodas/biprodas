import type { Publication } from "@/content/types";

const entryType = (p: Publication) =>
  p.type === "journal"
    ? "article"
    : p.type === "conference" || p.type === "workshop" || p.type === "poster" || p.type === "book-chapter"
      ? "inproceedings"
      : "misc";

export function bibtex(p: Publication) {
  const year = p.date.slice(0, 4);
  const surname = (p.authors[0] ?? "anon").split(" ").at(-1)!.toLowerCase();
  const word = p.title.toLowerCase().match(/[a-z]{4,}/)?.[0] ?? "paper";
  const type = entryType(p);
  const fields: [string, string][] = [
    ["title", p.title],
    ["author", p.authors.join(" and ")],
    [type === "article" ? "journal" : type === "inproceedings" ? "booktitle" : "howpublished", p.venue],
    ["year", year],
  ];
  const doi = p.links.find((l) => l.kind === "doi");
  if (doi) fields.push(["doi", doi.url.replace(/^https?:\/\/doi\.org\//, "")]);
  return `@${type}{${surname}${year}${word},\n${fields.map(([k, v]) => `  ${k} = {${v}}`).join(",\n")}\n}`;
}
