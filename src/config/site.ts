export interface NavLink {
  label: string;
  href: string;
}

export interface Project {
  title: string;
  category: string;
  year: string;
  description: string;
  image: string;
  imageAlt: string;
}

export interface Feature {
  title: string;
  description: string;
}

export interface Stat {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  /** Production URL, used for Open Graph and canonical links. */
  url: string;
  email: string;
  nav: NavLink[];
  hero: {
    eyebrow: string;
    headline: string;
    subheadline: string;
    primaryCta: NavLink;
    secondaryCta: NavLink;
    image: string;
    imageAlt: string;
  };
  marquee: string[];
  showcase: { eyebrow: string; title: string; projects: Project[] };
  features: { eyebrow: string; title: string; items: Feature[] };
  stats: { eyebrow: string; title: string; items: Stat[] };
  testimonials: { eyebrow: string; title: string; items: Testimonial[] };
  cta: { title: string; description: string; button: string };
  footer: { links: NavLink[]; legal: string };
}

export const siteConfig: SiteConfig = {
  name: "Nocturne Studio",
  tagline: "Cinematic digital experiences",
  description:
    "Nocturne Studio is an independent creative studio that designs and builds cinematic websites and brand films for ambitious teams.",
  url: "https://nocturne-studio.example",
  email: "hello@nocturne-studio.example",
  nav: [
    { label: "Work", href: "#work" },
    { label: "Services", href: "#services" },
    { label: "Results", href: "#results" },
    { label: "Contact", href: "#contact" },
  ],
  hero: {
    eyebrow: "Independent creative studio · Lisbon & Berlin",
    headline: "We make websites that feel like films",
    subheadline:
      "Nocturne Studio designs and builds story-driven digital experiences for brands that want to be remembered, not scrolled past.",
    primaryCta: { label: "Start a project", href: "#contact" },
    secondaryCta: { label: "See our work", href: "#work" },
    image: "/images/hero.svg",
    imageAlt: "Concentric rings around a glowing orange sun on a dark background",
  },
  marquee: ["Brand Films", "Art Direction", "Motion Design", "Web Experiences", "Creative Code"],
  showcase: {
    eyebrow: "Selected work",
    title: "Four stories, told in motion",
    projects: [
      {
        title: "Meridian Air",
        category: "Brand site",
        year: "2025",
        description:
          "A scroll-led journey across twelve time zones that lifted booking enquiries by 38%.",
        image: "/images/work-meridian.svg",
        imageAlt: "Abstract blue frame and circle representing Meridian Air",
      },
      {
        title: "Halcyon Audio",
        category: "Product launch",
        year: "2025",
        description:
          "A launch page where the headphones are revealed one layer at a time as you scroll.",
        image: "/images/work-halcyon.svg",
        imageAlt: "Abstract red arcs representing Halcyon Audio",
      },
      {
        title: "Oriel Foods",
        category: "E-commerce",
        year: "2024",
        description:
          "A farm-to-table storefront with a calm, tactile feel and a 22% higher basket size.",
        image: "/images/work-oriel.svg",
        imageAlt: "Abstract green grid representing Oriel Foods",
      },
      {
        title: "Vesper Records",
        category: "Identity and web",
        year: "2024",
        description:
          "A label identity and microsite built around sound-reactive type and a late-night palette.",
        image: "/images/work-vesper.svg",
        imageAlt: "Abstract purple triangles representing Vesper Records",
      },
    ],
  },
  features: {
    eyebrow: "What we do",
    title: "Everything a story needs to land",
    items: [
      {
        title: "Art direction",
        description:
          "A clear visual language, from mood boards to type and colour, so every frame feels intentional.",
      },
      {
        title: "Motion design",
        description:
          "Choreographed transitions and scroll sequences that guide attention without getting in the way.",
      },
      {
        title: "Creative development",
        description:
          "Fast, accessible, production-grade code. Beautiful on a flagship laptop and smooth on a budget phone.",
      },
      {
        title: "Brand films",
        description:
          "Short, sharp films shot and cut in-house, ready for your homepage, socials and launch events.",
      },
      {
        title: "Content strategy",
        description:
          "Words and structure that turn curious visitors into customers, written alongside the design.",
      },
      {
        title: "Launch support",
        description:
          "Performance budgets, analytics and a hand-over your team can actually run with after go-live.",
      },
    ],
  },
  stats: {
    eyebrow: "By the numbers",
    title: "Work that holds up under scrutiny",
    items: [
      { value: 120, suffix: "+", label: "Projects shipped" },
      { value: 14, label: "Industry awards" },
      { value: 98, suffix: "%", label: "Clients who return" },
      { value: 4.9, decimals: 1, suffix: "/5", label: "Average client rating" },
    ],
  },
  testimonials: {
    eyebrow: "Kind words",
    title: "What our clients say",
    items: [
      {
        quote:
          "Nocturne turned our product launch into an event. Traffic doubled in the first week and the page still loads in under two seconds.",
        author: "Amara Okafor",
        role: "Head of Marketing, Halcyon Audio",
      },
      {
        quote:
          "They listen like a partner and build like an engineering team. Rare to find both in one studio.",
        author: "Jonas Lindqvist",
        role: "Founder, Oriel Foods",
      },
      {
        quote:
          "Every detail felt considered, and the reduced-motion version was just as polished as the full one.",
        author: "Priya Raman",
        role: "Creative Director, Vesper Records",
      },
    ],
  },
  cta: {
    title: "Have a story worth telling?",
    description:
      "Tell us about your next launch, rebrand or campaign. We reply to every message within two working days.",
    button: "Say hello",
  },
  footer: {
    links: [
      { label: "Instagram", href: "https://instagram.com" },
      { label: "LinkedIn", href: "https://linkedin.com" },
      { label: "Dribbble", href: "https://dribbble.com" },
    ],
    legal: "© 2026 Nocturne Studio. All rights reserved.",
  },
};
