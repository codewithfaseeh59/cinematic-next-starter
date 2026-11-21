import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export default function HomePage() {
  return (
    <main id="main">
      <Section>
        <Container>
          <h1 style={{ fontSize: "var(--text-hero)", lineHeight: "var(--leading-tight)" }}>
            Nocturne Studio
          </h1>
          <p style={{ marginTop: "var(--space-4)", color: "var(--color-text-muted)" }}>
            We design and build cinematic digital experiences.
          </p>
        </Container>
      </Section>
    </main>
  );
}
