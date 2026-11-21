import Image from "next/image";
import { Magnetic } from "@/components/animation/Magnetic";
import { Parallax } from "@/components/animation/Parallax";
import { Reveal } from "@/components/animation/Reveal";
import { SplitText } from "@/components/animation/SplitText";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import styles from "./Hero.module.css";

export function Hero() {
  const { name, nav, hero } = siteConfig;

  return (
    <section id="top" className={styles.hero}>
      <div className={styles.visual}>
        <Parallax speed={0.15} className={styles.parallax}>
          <Image
            src={hero.image}
            alt={hero.imageAlt}
            fill
            priority
            sizes="100vw"
            className={styles.image}
          />
        </Parallax>
        <div className={styles.shade} />
      </div>

      <Container className={styles.content}>
        <header className={styles.nav}>
          <a href="#top" className={styles.brand}>
            {name}
          </a>
          <nav aria-label="Primary">
            <ul className={styles.links}>
              {nav.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        </header>

        <div className={styles.copy}>
          <p className={styles.eyebrow}>{hero.eyebrow}</p>
          <SplitText
            as="h1"
            text={hero.headline}
            by="words"
            onScroll={false}
            delay={0.2}
            className={styles.title}
          />
          <Reveal delay={0.7}>
            <p className={styles.subtitle}>{hero.subheadline}</p>
          </Reveal>
          <Reveal delay={0.9} className={styles.actions}>
            <Magnetic>
              <Button href={hero.primaryCta.href}>{hero.primaryCta.label}</Button>
            </Magnetic>
            <Magnetic>
              <Button href={hero.secondaryCta.href} variant="ghost">
                {hero.secondaryCta.label}
              </Button>
            </Magnetic>
          </Reveal>
        </div>
      </Container>

      <div className={styles.scrollHint} aria-hidden="true">
        <span>Scroll</span>
        <span className={styles.scrollLine} />
      </div>
    </section>
  );
}
