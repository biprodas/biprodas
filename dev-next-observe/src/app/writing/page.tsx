import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import { formatDate } from "@/lib/dates";
import { allPosts } from "@/lib/posts";
import { cn, container } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Writing",
  description: "Essays and field notes by Biprodas Roy on architecture, product engineering and applied AI research.",
  alternates: { canonical: "/writing" },
};

export default function WritingPage() {
  const posts = allPosts();
  return (
    <div className={cn(container, "pt-16 sm:pt-24")}>
      <SectionHeading as="h1" index="04" label="Field notes" title="Writing">
        Essays on how systems are built, and working notes from research in progress.
      </SectionHeading>
      <ul className="divide-y divide-line border-y border-line">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/writing/${post.slug}`}
              className="group grid gap-3 py-8 sm:grid-cols-[9rem_1fr_auto] sm:items-baseline sm:gap-10"
            >
              <span className="font-mono text-xs text-dim">{formatDate(post.date)}</span>
              <span>
                <span className="block font-display text-3xl text-ink transition-colors group-hover:text-signal">
                  {post.title}
                </span>
                <span className="mt-2 block max-w-2xl leading-7 text-muted">{post.summary}</span>
                <span className="mt-3 flex flex-wrap gap-3 font-mono text-[0.7rem] text-dim">
                  {post.topics.map((t) => (
                    <span key={t}>#{t.toLowerCase()}</span>
                  ))}
                </span>
              </span>
              <span className="font-mono text-xs text-dim">{post.minutes} min read</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
