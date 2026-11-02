// Real testimonials only, quoted exactly and with the person's permission. Empty until they exist;
// never invent testimonials here.
import type { Testimonial } from "./types";

export const realTestimonials: Testimonial[] = [];

export const indexTestimonials = realTestimonials.some((t) => t.visible);

export const testimonialsAreSample = !indexTestimonials && process.env.NODE_ENV !== "production";

export const showTestimonials = indexTestimonials || testimonialsAreSample;
