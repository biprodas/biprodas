import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts } from "@/content/posts";
import { profile } from "@/content/profile";
import { formatDate } from "@/lib/dates";
import { allPosts, getPost } from "@/lib/posts";
import { cn, container, eyebrow, textLink } from "@/lib/ui";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/writing/[slug]">): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: `/writing/${post.slug}` },
    openGraph: { type: "article", title: post.title, description: post.summary },
  };
}

export default async function PostPage({ params }: PageProps<"/writing/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { default: Body } = await import(`@/content/writing/${slug}.mdx`);
  const others = allPosts().filter((p) => p.slug !== slug);

  return (
    <article className={cn(container, "pt-12 sm:pt-20")}>
      <div className="mx-auto max-w-2xl">
        <Link href="/writing" className="font-mono text-xs text-dim transition-colors hover:text-ink">
          ← All writing
        </Link>
        <header className="mt-10 border-b border-line pb-10">
          <p className={cn(eyebrow, "flex flex-wrap gap-x-3")}>
            <time dateTime={post.date} className="text-signal">
              {formatDate(post.date)}
            </time>
            <span>· {post.minutes} min read</span>
            <span>· {post.topics.join(", ")}</span>
          </p>
          <h1 className="mt-5 font-display text-title text-ink">{post.title}</h1>
          <p className="mt-5 text-xl leading-8 text-muted">{post.summary}</p>
        </header>

        <div className="mt-8 text-[1.075rem]">
          <Body />
        </div>

        <footer className="mt-16 space-y-10 border-t border-line pt-10">
          <p className="leading-7 text-muted">
            Thoughts or disagreements?{" "}
            <a href={`mailto:${profile.email}?subject=${encodeURIComponent(post.title)}`} className={textLink}>
              Write to me
            </a>
            .
          </p>
          {others.length > 0 && (
            <div>
              <p className={eyebrow}>More field notes</p>
              <ul className="mt-4 space-y-3">
                {others.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/writing/${p.slug}`} className={textLink}>
                      {p.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </footer>
      </div>
    </article>
  );
}
