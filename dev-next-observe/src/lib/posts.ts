import { readFileSync } from "node:fs";
import { join } from "node:path";
import { posts } from "@/content/posts";
import type { Post } from "@/content/types";
import { sortKey } from "./dates";

const WORDS_PER_MINUTE = 230;

export function postPath(slug: string): string {
  return join(process.cwd(), "src", "content", "writing", `${slug}.mdx`);
}

export function readingMinutes(source: string): number {
  const text = source.replace(/\{\/\*[\s\S]*?\*\/\}/g, "").replace(/[#>*_`[\]()-]/g, " ");
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

export type PostWithMeta = Post & { minutes: number };

/** Posts, newest first, with reading time. Server-only: reads the MDX sources from disk. */
export function allPosts(): PostWithMeta[] {
  return [...posts]
    .sort((a, b) => sortKey(b.date) - sortKey(a.date))
    .map((post) => ({ ...post, minutes: readingMinutes(readFileSync(postPath(post.slug), "utf8")) }));
}

export function getPost(slug: string): PostWithMeta | undefined {
  return allPosts().find((p) => p.slug === slug);
}
