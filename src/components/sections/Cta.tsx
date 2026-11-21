import { Magnetic } from "@/components/animation/Magnetic";
import { Marquee } from "@/components/animation/Marquee";
import { Reveal } from "@/components/animation/Reveal";
import { SplitText } from "@/components/animation/SplitText";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { siteConfig } from "@/config/site";
import styles from "./Cta.module.css";

export function Cta() {
  const { cta, email } = siteConfig;

  return (
    <Section id="contact" className={styles.section}>
      <Container className={styles.inner}>
        <SplitText text={cta.title} className={styles.title} />
        <Reveal>
          <p className={styles.description}>{cta.description}</p>
        </Reveal>
        <Reveal delay={0.15}>
          <Magnetic>
            <Button href={`mailto:${email}`}>{cta.button}</Button>
          </Magnetic>
        </Reveal>
      </Container>
      <div className={styles.ticker}>
        <Marquee direction="right" speed={50}>
          {siteConfig.marquee.map((item) => (
            <span key={item} className={styles.tickerItem}>
              {item}
              <span className={styles.tickerDot} aria-hidden="true" />
            </span>
          ))}
        </Marquee>
      </div>
    </Section>
  );
}
