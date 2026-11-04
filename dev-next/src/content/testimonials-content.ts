import { publicFileExists } from "@/lib/public-file";
import { indexTestimonials, realTestimonials, testimonialsAreSample } from "./testimonials";
import { sampleTestimonials } from "./testimonials-samples";

const source = indexTestimonials ? realTestimonials : testimonialsAreSample ? sampleTestimonials : [];

// Server-only: drops avatar paths whose file is missing, so cards fall back to initials.
export const testimonials = source
  .filter((t) => t.visible)
  .sort((a, b) => a.order - b.order)
  .map((t) => ({ ...t, avatar: t.avatar && publicFileExists(t.avatar) ? t.avatar : undefined }));

export const featuredTestimonials = testimonials.filter((t) => t.featured);
