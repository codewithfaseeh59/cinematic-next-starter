"use client";

import { useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { gsap, useGSAP } from "@/lib/gsap";
import { formatNumber } from "@/lib/formatNumber";
import { onceVisible } from "@/lib/onceVisible";

interface CounterProps {
  /** The number to count up to. */
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  /** Count-up length in seconds. */
  duration?: number;
  className?: string;
}

/**
 * Counts from 0 to `value` when it enters the viewport. The final number is
 * always in the markup, so it is correct without JavaScript and under
 * reduced motion.
 */
export function Counter({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 2,
  className,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();
  const finalText = `${prefix}${formatNumber(value, decimals)}${suffix}`;

  useGSAP(
    () => {
      const element = ref.current;
      if (!element || reducedMotion) return;

      const counter = { current: 0 };
      const render = () => {
        element.textContent = `${prefix}${formatNumber(counter.current, decimals)}${suffix}`;
      };

      render();
      const tween = gsap.to(counter, {
        current: value,
        duration,
        ease: "power2.out",
        onUpdate: render,
        paused: true,
      });
      const stopWatching = onceVisible(element, () => tween.play());

      // if GSAP reverts mid-count, leave the real number on screen
      return () => {
        stopWatching();
        element.textContent = finalText;
      };
    },
    { scope: ref, dependencies: [reducedMotion, value, decimals, prefix, suffix, duration] },
  );

  return (
    <span ref={ref} className={className}>
      {finalText}
    </span>
  );
}
