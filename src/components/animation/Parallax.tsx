"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { clamp } from "@/lib/clamp";
import { gsap, useGSAP } from "@/lib/gsap";
import styles from "./Parallax.module.css";

interface ParallaxProps {
  children: ReactNode;
  /**
   * How far the content drifts, as a fraction of the frame height (0-0.5).
   * Bigger values feel deeper. Positive moves slower than the page, negative faster.
   */
  speed?: number;
  className?: string;
}

/**
 * Clips its children in a frame and slides them slower than the page scrolls.
 * The content is made taller than the frame by exactly the drift distance, so
 * no empty edge ever shows.
 */
export function Parallax({ children, speed = 0.2, className }: ParallaxProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const drift = clamp(Math.abs(speed), 0, 0.5);
  const direction = speed < 0 ? -1 : 1;

  useGSAP(
    () => {
      const frame = frameRef.current;
      const inner = innerRef.current;
      if (!frame || !inner || reducedMotion || drift === 0) return;

      // the inner box is (1 + 2 * drift) frames tall, so this is the drift in % of itself
      const shift = (drift / (1 + 2 * drift)) * 100 * direction;

      gsap.fromTo(
        inner,
        { yPercent: -shift },
        {
          yPercent: shift,
          ease: "none",
          scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    },
    { scope: frameRef, dependencies: [reducedMotion, drift, direction] },
  );

  const innerStyle: CSSProperties = { top: `${-drift * 100}%`, bottom: `${-drift * 100}%` };

  return (
    <div ref={frameRef} className={className ? `${styles.frame} ${className}` : styles.frame}>
      <div ref={innerRef} className={styles.inner} style={innerStyle}>
        {children}
      </div>
    </div>
  );
}
