// Real testimonials only, quoted exactly and with the person's permission. Empty until they exist;
// never invent testimonials here.
import type { Testimonial } from "./types";

const linkedin = {
  label: "Recommendation on LinkedIn",
  url: "https://www.linkedin.com/in/biprodas-roy/details/recommendations/",
};
const upwork = { label: "Review on Upwork", url: "https://www.upwork.com/freelancers/~017dd9d645b9e068e4" };

export const realTestimonials: Testimonial[] = [
  {
    id: "m-hasan-khan",
    quote:
      "I've had the pleasure of working with Biprodas, and I can confidently say that he is one of the most talented developers I've worked with. He has a strong logical mindset and an impressive ability to break down complex problems into practical solutions. What stands out most is his persistence and problem-solving skills. No matter how challenging the issue, he consistently finds an effective solution while maintaining high-quality work. Beyond his technical expertise, he is a great teammate who is always willing to collaborate, share knowledge, and support others. Working with him has been a genuinely positive experience, and I highly recommend him to any team looking for a skilled developer and an exceptional problem solver.",
    highlight: "one of the most talented developers I've worked with",
    name: "M. Hasan Khan",
    linkedinUrl: "https://www.linkedin.com/in/m-hasan-khan-50a56611a/",
    position: "Senior AI Engineer & Team Lead",
    relationship: "manager",
    source: linkedin,
    date: "2026-06",
    featured: true,
    visible: true,
    avatar: "/images/testimonials/m-hasan-khan.jpg",
    order: 1,
  },
  {
    id: "milon-hossain",
    quote:
      "Biprodas is the best programmer i ever worked with & i can recommend! He harnesses amazing problem solving & programming skills. Always keen to learn new technologies its been fun working with him for the last 3 years. I always wish the best for him!",
    highlight: "the best programmer i ever worked with",
    name: "Milon Hossain",
    linkedinUrl: "https://www.linkedin.com/in/milon-hossain-ab6492201/",
    position: "Partner & colleague",
    company: "Semicolon IT Solutions",
    relationship: "colleague",
    source: linkedin,
    date: "2022-06",
    featured: false,
    visible: true,
    avatar: "/images/testimonials/milon-hossain.jpg",
    order: 2,
  },
  {
    id: "masud-pervez",
    quote:
      "I had the pleasure of working with him for 2 year and I can say without hesitation that he is one of the most skilled and experienced developers I have ever worked with. He has a deep understanding of multiple programming languages and frameworks, as well as a keen eye for detail and problem-solving skills that are second to none.",
    highlight: "one of the most skilled and experienced developers I have ever worked with",
    name: "Masud Pervez",
    linkedinUrl: "https://www.linkedin.com/in/masud-pervez-/",
    position: "Software Engineer (Web)",
    relationship: "mentee",
    source: linkedin,
    date: "2023-02",
    featured: false,
    visible: true,
    avatar: "/images/testimonials/masud-pervez.jpg",
    order: 3,
  },
  {
    id: "ashish-sarker",
    quote:
      "Mr. Biprodas Roy dada has great personality. I found him as a good team lead, teacher, mentor, colleague, programmer and developer. May God bless you. Good luck.",
    highlight: "a good team lead, teacher, mentor, colleague, programmer and developer",
    name: "Ashish Sarker",
    linkedinUrl: "https://www.linkedin.com/in/ashish-sarker-3122321b3/",
    position: "Software Engineer",
    relationship: "mentee",
    source: linkedin,
    date: "2022-06",
    featured: false,
    visible: true,
    avatar: "/images/testimonials/ashish-sarker.jpg",
    order: 4,
  },
  {
    id: "fahad-moin-crm",
    quote:
      "Working with Biprodas was an absolute pleasure!! I hired him to tackle some complex tasks, and he was excellent. I was thoroughly impressed by his depth of technical expertise and business knowledge. He is proactive in clarifying requirements, and communication was clear and timely. I would definitely work with him again and would highly recommend him.",
    highlight: "I was thoroughly impressed by his depth of technical expertise and business knowledge.",
    name: "Fahad Moin",
    linkedinUrl: "https://www.linkedin.com/in/fahad-moain/",
    position: "Client",
    relationship: "client",
    source: upwork,
    date: "2024-03",
    featured: true,
    visible: true,
    order: 5,
  },
  {
    id: "maxim-melnic-admin-dashboard",
    quote:
      "I hired Biprodas for fairly complex project with charts, tables and other UI/UX things that needed huge attention to detail. He implemented design pixel-perfect from Figma, and responsiveness was just amazing on EVERY screen size. I would definitely recommend him and will hire for on-going support after launch!",
    highlight: "He implemented design pixel-perfect from Figma",
    name: "Maxim Melnic",
    linkedinUrl: "https://www.linkedin.com/in/maxim-melnic-41a64034b/",
    position: "Client",
    relationship: "client",
    source: upwork,
    date: "2024-05",
    featured: true,
    visible: true,
    order: 6,
  },
  {
    id: "maxim-melnic-frontend",
    quote:
      "I enjoyed work together! He is really skilled and the code is clean and thoroughly designed. I can definitely recommend Biprodas, he was always ready to help and available to answer my questions!",
    highlight: "the code is clean and thoroughly designed",
    name: "Maxim Melnic",
    linkedinUrl: "https://www.linkedin.com/in/maxim-melnic-41a64034b/",
    position: "Client",
    relationship: "client",
    source: upwork,
    date: "2024-05",
    featured: false,
    visible: true,
    order: 7,
  },
];

export const indexTestimonials = realTestimonials.some((t) => t.visible);

export const testimonialsAreSample = !indexTestimonials && process.env.NODE_ENV !== "production";

export const showTestimonials = indexTestimonials || testimonialsAreSample;
