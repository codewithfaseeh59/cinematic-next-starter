"use client";

import { useEffect, useRef, type ComponentPropsWithoutRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { animateIn } from "@/lib/animateIn";

export type RevealDirection = "up" | "down" | "left" | "right" | "none";

interface RevealProps extends ComponentPropsWithoutRef<"div"> {
  /** Direction the content slides in from. */
  direction?: RevealDirection;
  /** Seconds to wait before the animation starts. */
  delay?: number;
  /** Animation length in seconds. */
  duration?: number;
  /** Slide distance in pixels. */
  distance?: number;
  /** Reveal direct children one after another instead of the wrapper. Seconds between children. */
  stagger?: number;
}

function getStartTransform(direction: RevealDirection, distance: number): string {
  switch (direction) {
    case "up":
      return `translateY(${distance}px)`;
    case "down":
      return `translateY(${-distance}px)`;
    case "left":
      return `translateX(${distance}px)`;
    case "right":
      return `translateX(${-distance}px)`;
    case "none":
      return "none";
  }
}

/** Fades and slides content in once it scrolls into view. */
export function Reveal({
  direction = "up",
  delay = 0,
  duration = 0.9,
  distance = 48,
  stagger,
  children,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element || reducedMotion) return;

    const targets = stagger === undefined ? [element] : Array.from(element.children);
    if (targets.length === 0) return;

    return animateIn(element, targets, {
      from: getStartTransform(direction, distance),
      duration,
      delay,
      stagger: stagger ?? 0,
    });
  }, [reducedMotion, direction, delay, duration, distance, stagger]);

  return (
    <div ref={ref} {...rest}>
      {children}
    </div>
  );
}
