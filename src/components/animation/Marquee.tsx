"use client";

import { useRef, type ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { clamp } from "@/lib/clamp";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { whenIdle } from "@/lib/whenIdle";
import styles from "./Marquee.module.css";

interface MarqueeProps {
  children: ReactNode;
  /** Base speed in pixels per second. */
  speed?: number;
  /** Scroll direction of the content when the page is not moving. */
  direction?: "left" | "right";
  /** How strongly page scroll speed boosts the marquee. 0 turns the effect off. */
  velocityFactor?: number;
  className?: string;
}

/**
 * Endless horizontal ticker. The content is rendered twice and the track slides
 * by exactly one copy, so the loop is seamless. Scrolling the page speeds it up
 * and flips it to follow the scroll direction. Under reduced motion it becomes
 * a static, wrapping row.
 */
export function Marquee({
  children,
  speed = 80,
  direction = "left",
  velocityFactor = 1,
  className,
}: MarqueeProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    (_, contextSafe) => {
      const track = trackRef.current;
      const root = rootRef.current;
      if (!track || !root || reducedMotion) return;

      const start = () => {
        const baseDirection = direction === "left" ? 1 : -1;
        const copyWidth = track.scrollWidth / 2;
        const tween = gsap.fromTo(
          track,
          { x: direction === "left" ? 0 : -copyWidth },
          {
            x: direction === "left" ? -copyWidth : 0,
            ease: "none",
            duration: Math.max(copyWidth / speed, 1),
            repeat: -1,
          },
        );

        if (velocityFactor <= 0) return;

        let settle: gsap.core.Timeline | undefined;
        ScrollTrigger.create({
          onUpdate: (self) => {
            const boost = clamp(Math.abs(self.getVelocity()) / 400, 0, 8) * velocityFactor;
            // scrolling down keeps the base direction, scrolling up reverses it
            const target = baseDirection * self.direction * (1 + boost);

            settle?.kill();
            settle = gsap
              .timeline()
              .to(tween, { timeScale: target, duration: 0.25, ease: "power1.out" })
              .to(tween, { timeScale: baseDirection, duration: 1.2, ease: "power2.out" });
          },
        });
      };

      // start in its own idle task so it does not add to the hydration task
      return whenIdle(contextSafe ? contextSafe(start) : start);
    },
    { scope: rootRef, dependencies: [reducedMotion, speed, direction, velocityFactor] },
  );

  const rootClass = [styles.root, reducedMotion ? styles.static : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={rootRef} className={rootClass}>
      <div ref={trackRef} className={styles.track}>
        <div className={styles.copy}>{children}</div>
        <div className={styles.copy} aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
