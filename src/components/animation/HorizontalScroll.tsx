"use client";

import { useRef, type ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { gsap, useGSAP } from "@/lib/gsap";
import { whenIdle } from "@/lib/whenIdle";
import styles from "./HorizontalScroll.module.css";

interface HorizontalScrollProps {
  /** Shown above the cards and pinned with them. */
  header?: ReactNode;
  /** The cards. Each direct child becomes one slide. */
  children: ReactNode;
  className?: string;
  /** Accessible name for the region. */
  label: string;
}

/**
 * Pins the section while vertical scrolling slides the cards sideways. Without
 * JavaScript, or under reduced motion, the cards sit in a normal row the user
 * can scroll or swipe by hand.
 */
export function HorizontalScroll({ header, children, className, label }: HorizontalScrollProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    (_, contextSafe) => {
      const section = sectionRef.current;
      const track = trackRef.current;
      const progress = progressRef.current;
      if (!section || !track || !progress || reducedMotion) return;

      const pin = () => {
        section.dataset.pinned = "true";

        const getDistance = () => Math.max(track.scrollWidth - section.clientWidth, 0);

        gsap.to(track, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: true,
            start: "top top",
            end: () => `+=${getDistance()}`,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              progress.style.transform = `scaleX(${self.progress})`;
            },
          },
        });
      };

      // pin in its own idle task so it does not add to the hydration task
      const cancel = whenIdle(contextSafe ? contextSafe(pin) : pin);
      return () => {
        cancel();
        delete section.dataset.pinned;
      };
    },
    { scope: sectionRef, dependencies: [reducedMotion] },
  );

  return (
    <section
      ref={sectionRef}
      aria-label={label}
      className={className ? `${styles.section} ${className}` : styles.section}
    >
      {header}
      <div className={styles.viewport}>
        <div ref={trackRef} className={styles.track}>
          {children}
        </div>
      </div>
      <div className={styles.progress} aria-hidden="true">
        <span ref={progressRef} className={styles.bar} />
      </div>
    </section>
  );
}
