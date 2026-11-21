import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import styles from "./Footer.module.css";

export function Footer() {
  const { name, tagline, email, footer } = siteConfig;

  return (
    <footer className={styles.footer}>
      <Container className={styles.inner}>
        <div>
          <p className={styles.brand}>{name}</p>
          <p className={styles.tagline}>{tagline}</p>
          <a href={`mailto:${email}`} className={styles.email}>
            {email}
          </a>
        </div>
        <nav aria-label="Social">
          <ul className={styles.links}>
            {footer.links.map((link) => (
              <li key={link.href}>
                <a href={link.href} rel="noopener noreferrer" target="_blank">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <p className={styles.legal}>{footer.legal}</p>
      </Container>
    </footer>
  );
}
