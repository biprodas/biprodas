import type { MDXComponents } from "mdx/types";

const components: MDXComponents = {
  h2: (props) => <h2 className="mt-14 mb-4 font-display text-3xl text-ink sm:text-4xl" {...props} />,
  h3: (props) => <h3 className="mt-10 mb-3 text-lg font-semibold text-ink" {...props} />,
  p: (props) => <p className="my-5 leading-8 text-muted" {...props} />,
  a: (props) => (
    <a
      className="text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-signal"
      {...props}
    />
  ),
  ul: (props) => <ul className="my-6 space-y-3 pl-5 text-muted marker:text-signal" {...props} />,
  ol: (props) => <ol className="my-6 list-decimal space-y-3 pl-5 text-muted marker:text-dim" {...props} />,
  li: (props) => <li className="list-disc pl-1 leading-7 [ol>&]:list-decimal" {...props} />,
  strong: (props) => <strong className="font-semibold text-ink" {...props} />,
  em: (props) => <em className="text-ink/90" {...props} />,
  code: (props) => <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[0.85em] text-aurora" {...props} />,
  blockquote: (props) => (
    <blockquote className="my-8 border-l-2 border-nebula pl-5 font-display text-2xl text-ink" {...props} />
  ),
  hr: () => <hr className="my-12 border-line" />,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
