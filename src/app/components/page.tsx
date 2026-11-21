import type { Metadata } from "next";
import Image from "next/image";
import { Counter } from "@/components/animation/Counter";
import { HorizontalScroll } from "@/components/animation/HorizontalScroll";
import { Magnetic } from "@/components/animation/Magnetic";
import { Marquee } from "@/components/animation/Marquee";
import { Parallax } from "@/components/animation/Parallax";
import { Reveal } from "@/components/animation/Reveal";
import { SplitText } from "@/components/animation/SplitText";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { siteConfig } from "@/config/site";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Components",
  description: "Every animation primitive in the starter, running live.",
  alternates: { canonical: "/components" },
};

const demoWords = ["Light", "Sound", "Motion", "Story"];

export default function ComponentsPage() {
  const projects = siteConfig.showcase.projects;

  return (
    <main id="main">
      <Section>
        <Container>
          <p className={styles.eyebrow}>Component library</p>
          <SplitText as="h1" text="Animation primitives" by="chars" className={styles.title} />
          <p className={styles.lead}>
            Every building block of the starter, live. Turn on reduced motion in your system
            settings and each one falls back to a calm, fully readable version.
          </p>
        </Container>
      </Section>

      <Section>
        <Container>
          <h2 className={styles.heading}>SplitText</h2>
          <p className={styles.note}>By lines, words and characters.</p>
          <div className={styles.stack}>
            <SplitText text={"Cinema for\nthe browser"} by="lines" className={styles.sample} />
            <SplitText text="Stories worth scrolling" by="words" className={styles.sample} />
            <SplitText text="Nocturne" by="chars" className={styles.sample} />
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <h2 className={styles.heading}>Reveal</h2>
          <p className={styles.note}>Four directions, then a staggered group.</p>
          <div className={styles.row}>
            {(["up", "down", "left", "right"] as const).map((direction) => (
              <Reveal key={direction} direction={direction} className={styles.tile}>
                {direction}
              </Reveal>
            ))}
          </div>
          <Reveal stagger={0.12} className={`${styles.row} ${styles.gap}`}>
            {demoWords.map((word) => (
              <div key={word} className={styles.tile}>
                {word}
              </div>
            ))}
          </Reveal>
        </Container>
      </Section>

      <Section>
        <Container>
          <h2 className={styles.heading}>Marquee</h2>
          <p className={styles.note}>
            Scroll the page and it speeds up, scroll up and it reverses.
          </p>
        </Container>
        <Marquee>
          {demoWords.map((word) => (
            <span key={word} className={styles.marqueeItem}>
              {word}
            </span>
          ))}
        </Marquee>
      </Section>

      <Section>
        <Container>
          <h2 className={styles.heading}>Parallax</h2>
          <p className={styles.note}>The image drifts slower than the page.</p>
          <Parallax speed={0.2} className={styles.parallax}>
            <Image
              src="/images/work-halcyon.svg"
              alt="Abstract red arcs on a dark background"
              fill
              sizes="(max-width: 80rem) 100vw, 80rem"
              className={styles.cover}
            />
          </Parallax>
        </Container>
      </Section>

      <Section>
        <Container>
          <h2 className={styles.heading}>Counter</h2>
          <p className={styles.note}>Counts up when it enters the viewport.</p>
          <div className={styles.row}>
            <Counter value={1250} suffix="+" className={styles.counter} />
            <Counter value={98} suffix="%" className={styles.counter} />
            <Counter value={4.9} decimals={1} className={styles.counter} />
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <h2 className={styles.heading}>Magnetic</h2>
          <p className={styles.note}>Hover with a mouse and the buttons lean toward the pointer.</p>
          <div className={styles.row}>
            <Magnetic>
              <Button href="#horizontal">Primary</Button>
            </Magnetic>
            <Magnetic strength={0.6}>
              <Button href="#horizontal" variant="ghost">
                Stronger pull
              </Button>
            </Magnetic>
          </div>
        </Container>
      </Section>

      <div id="horizontal">
        <HorizontalScroll
          label="Horizontal scroll demo"
          header={
            <Container>
              <h2 className={styles.heading}>HorizontalScroll</h2>
              <p className={styles.note}>The section pins while the cards slide sideways.</p>
            </Container>
          }
        >
          {projects.map((project) => (
            <div key={project.title} className={styles.slide}>
              <h3>{project.title}</h3>
              <p>{project.category}</p>
            </div>
          ))}
        </HorizontalScroll>
      </div>
    </main>
  );
}
