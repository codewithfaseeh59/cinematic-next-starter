import { Counter } from "@/components/animation/Counter";
import { Reveal } from "@/components/animation/Reveal";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { siteConfig } from "@/config/site";
import { SectionHeader } from "./SectionHeader";
import styles from "./Stats.module.css";

export function Stats() {
  const { eyebrow, title, items } = siteConfig.stats;

  return (
    <Section id="results">
      <Container>
        <SectionHeader eyebrow={eyebrow} title={title} />
        <dl className={styles.list}>
          {items.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.1} className={styles.item}>
              <dd className={styles.value}>
                <Counter
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                />
              </dd>
              <dt className={styles.label}>{stat.label}</dt>
            </Reveal>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
