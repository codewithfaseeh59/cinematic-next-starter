import Image from "next/image";
import { HorizontalScroll } from "@/components/animation/HorizontalScroll";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { SectionHeader } from "./SectionHeader";
import styles from "./Showcase.module.css";

export function Showcase() {
  const { eyebrow, title, projects } = siteConfig.showcase;

  return (
    <div id="work">
      <HorizontalScroll
        label="Selected projects"
        header={
          <Container>
            <SectionHeader eyebrow={eyebrow} title={title} />
          </Container>
        }
      >
        {projects.map((project) => (
          <article key={project.title} className={styles.card}>
            <div className={styles.media}>
              <Image
                src={project.image}
                alt={project.imageAlt}
                fill
                sizes="(max-width: 40rem) 80vw, 24rem"
                className={styles.image}
              />
            </div>
            <div className={styles.meta}>
              <span>{project.category}</span>
              <span>{project.year}</span>
            </div>
            <h3 className={styles.name}>{project.title}</h3>
            <p className={styles.description}>{project.description}</p>
          </article>
        ))}
      </HorizontalScroll>
    </div>
  );
}
