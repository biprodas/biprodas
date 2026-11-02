// Facts mirror data/articles.yaml. Only articles that are actually published; empty until they
// exist, and never invent articles here. The "articles" feature flag in config/site.ts stays off
// until there is a page to show them.
import type { Article } from "./types";

export const realArticles: Article[] = [];

/** Newest first. */
export const articles = realArticles
  .filter((a) => a.visible)
  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

export const featuredArticles = articles.filter((a) => a.featured);

export const indexArticles = articles.length > 0;

/** Where an article is read: its external URL, or its page on this site. */
export const articleHref = (a: Article) => (a.source === "external" ? a.externalUrl : `/articles/${a.slug}`);
