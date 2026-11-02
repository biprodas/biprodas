import { indexTestimonials, realTestimonials, testimonialsAreSample } from "./testimonials";
import { sampleTestimonials } from "./testimonials-samples";

const source = indexTestimonials ? realTestimonials : testimonialsAreSample ? sampleTestimonials : [];

export const testimonials = source.filter((t) => t.visible).sort((a, b) => a.order - b.order);

export const featuredTestimonials = testimonials.filter((t) => t.featured);
