import Link from "next/link";
import { PageHeader } from "@/components/page";

export default function NotFound() {
  return (
    <>
      <PageHeader eyebrow="404" title="Page not found" lede="This page may have moved, or the link has a typo." />
      <Link href="/" className="prose-link">
        Back to the start
      </Link>
    </>
  );
}
