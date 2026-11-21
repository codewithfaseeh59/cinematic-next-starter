import { Reveal } from "@/components/animation/Reveal";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { siteConfig } from "@/config/site";
import { SectionHeader } from "./SectionHeader";
import styles from "./Features.module.css";

export function Features() {
  const { eyebrow, title, items } = siteConfig.features;

  return (
    <Section id="services">
      <Container>
        <SectionHeader eyebrow={eyebrow} title={title} />
        <Reveal stagger={0.12} className={styles.grid}>
          {items.map((feature, index) => (
            <article key={feature.title} className={styles.card}>
              <span className={styles.number} aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className={styles.name}>{feature.title}</h3>
              <p className={styles.description}>{feature.description}</p>
            </article>
          ))}
        </Reveal>
      </Container>
    </Section>
  );
}
