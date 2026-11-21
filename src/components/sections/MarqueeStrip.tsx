import { Marquee } from "@/components/animation/Marquee";
import { siteConfig } from "@/config/site";
import styles from "./MarqueeStrip.module.css";

export function MarqueeStrip() {
  return (
    <div className={styles.strip}>
      <Marquee speed={90}>
        {siteConfig.marquee.map((item) => (
          <span key={item} className={styles.item}>
            {item}
            <span className={styles.dot} aria-hidden="true" />
          </span>
        ))}
      </Marquee>
    </div>
  );
}
