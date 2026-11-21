You are helping me build cinematic-next-starter in this repo folder. First, save this whole brief as CLAUDE.md in the repo root (exactly as written), then do STEP 1 only.

## RULES
1. I am the only author. Never add "Co-Authored-By", Claude, Anthropic or "Generated with" lines anywhere (commits, PRs, README, comments, files).
2. NEVER run git commit, git push, or create/merge pull requests. Write the code, then give me: branch name, commit message, PR title and PR description. I run the Git commands myself.
3. One feature per branch/PR. Never work on main (except step 1). Stop after each step and wait for me.
4. After each step explain in 3-5 simple lines what you built and why. I must be able to explain every file in an interview.
5. TypeScript strict, no `any`. Keep dependencies minimal: next, react, react-dom, gsap, @gsap/react, lenis, plus dev tools. Check current versions with `npm view <pkg> version` before installing. No UI kits, no Tailwind, no animation wrappers.
6. Every animation must respect prefers-reduced-motion (the content must be fully visible and usable with animation off).
7. No placeholder junk: use realistic copy for a fictional creative studio called "Nocturne Studio" (no lorem ipsum). No dead code, unused dependencies or commented-out code.

## PROJECT
A free, reusable starter template for cinematic, scroll-driven landing pages, for developers who want a premium animated site without starting from zero. People click "Use this template", edit one config file, and deploy.
Stack: Next.js (App Router), React, TypeScript strict, GSAP + ScrollTrigger via @gsap/react (useGSAP), Lenis smooth scroll synced to the GSAP ticker, CSS Modules with CSS variables (design tokens), next/font, next/image, Vitest + React Testing Library, ESLint + Prettier, GitHub Actions CI, deploy on Vercel.

## FEATURES
Reusable animation primitives (each documented in the README with a code example):
- <SmoothScroll>: Lenis provider synced with GSAP ScrollTrigger; disabled under reduced motion.
- <Reveal>: fade/slide-in on scroll with options (direction, delay, stagger children).
- <SplitText>: our own implementation that splits text into lines/words/chars for staggered reveals; keeps the original text in aria-label and hides the split spans from screen readers.
- <Marquee>: infinite horizontal text/logo marquee, speed reacts to scroll velocity.
- <Parallax>: image/background parallax with a speed prop.
- <Counter>: number that counts up when it enters the viewport.
- <HorizontalScroll>: pinned section that scrolls its cards horizontally while the page scrolls vertically.
- <Magnetic> button hover effect.
Landing page sections built from those primitives: Hero (split-text headline, parallax visual), Marquee strip, Showcase (horizontal scroll), Features (staggered cards), Stats (counters), Testimonials, CTA, Footer.
Template features: all site content in one file (src/config/site.ts), dark cinematic look (one accent color, large type, subtle film-grain overlay in CSS), SEO metadata + Open Graph, a /components demo route showing every primitive, fast and accessible (Lighthouse Performance 90+, Accessibility 95+, no layout shift).

## FOLDER STRUCTURE
src/app/ (layout.tsx, page.tsx, components/page.tsx for the demo route)
src/config/site.ts
src/components/animation/ (SmoothScroll, Reveal, SplitText, Marquee, Parallax, Counter, HorizontalScroll, Magnetic)
src/components/sections/ (Hero, MarqueeStrip, Showcase, Features, Stats, Testimonials, Cta, Footer)
src/components/ui/ (Button, Container, Section)
src/hooks/ (useReducedMotion.ts)
src/lib/ (splitText.ts, clamp.ts, formatNumber.ts) + tests
src/styles/ (tokens.css, global.css)
.github/workflows/ci.yml, .claude/settings.json, LICENSE (MIT)

## TESTS
- lib/splitText: splits "Hello big world" into the right words/chars/lines structure, keeps spaces, handles empty string
- lib/clamp and lib/formatNumber: edge cases
- useReducedMotion hook: returns true/false from a mocked matchMedia
- <SplitText>: renders aria-label with the original text and hides spans with aria-hidden
- <Counter>: shows the final value immediately when reduced motion is on

## STEPS (each its own branch and PR)
1 scaffold (main) | 2 feat/design-tokens-and-layout | 3 feat/smooth-scroll-provider | 4 feat/reduced-motion-hook | 5 feat/split-text | 6 feat/reveal-component | 7 feat/marquee | 8 feat/parallax | 9 feat/counter | 10 feat/horizontal-scroll | 11 feat/magnetic-button | 12 feat/hero-section | 13 feat/content-sections | 14 feat/site-config | 15 feat/components-demo-page | 16 feat/seo-and-og | 17 fix/performance-and-a11y | 18 ci/github-actions | 19 docs/readme
PR titles use conventional commits, for example "feat: add split text component".

## STEP 1 NOW
The folder already has README.md, .gitignore and LICENSE: do not overwrite them, merge anything Next.js needs into them. Scaffold Next.js (App Router, TypeScript strict, src directory, no Tailwind) in the current folder, add ESLint, Prettier, Vitest + React Testing Library, create .claude/settings.json with {"attribution":{"commit":"","pr":""},"includeCoAuthoredBy":false}, and save this brief as CLAUDE.md. Add scripts: typecheck, lint, test, build. Do not commit or push. Then explain what you created in simple words and give me the commit message.
