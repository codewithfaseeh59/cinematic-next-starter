import { Reveal } from "@/components/animation/Reveal";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { siteConfig } from "@/config/site";
import { SectionHeader } from "./SectionHeader";
import styles from "./Testimonials.module.css";

export function Testimonials() {
  const { eyebrow, title, items } = siteConfig.testimonials;

  return (
    <Section>
      <Container>
        <SectionHeader eyebrow={eyebrow} title={title} />
        <Reveal stagger={0.15} className={styles.grid}>
          {items.map((item) => (
            <figure key={item.author} className={styles.card}>
              <blockquote className={styles.quote}>{item.quote}</blockquote>
              <figcaption className={styles.caption}>
                <strong>{item.author}</strong>
                <span>{item.role}</span>
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </Container>
    </Section>
  );
}
