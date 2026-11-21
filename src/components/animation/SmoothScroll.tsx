"use client";

import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { useEffect, type ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { whenIdle } from "@/lib/whenIdle";

interface SmoothScrollProps {
  children: ReactNode;
}

/**
 * Lenis smooth scrolling, driven by the GSAP ticker so Lenis and ScrollTrigger
 * always read the same scroll position. Does nothing under reduced motion.
 */
export function SmoothScroll({ children }: SmoothScrollProps) {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    let stop: (() => void) | undefined;

    const start = () => {
      const lenis = new Lenis({ autoRaf: false, anchors: true });
      lenis.on("scroll", ScrollTrigger.update);

      // GSAP's ticker gives seconds, Lenis wants milliseconds.
      const onTick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(onTick);
      gsap.ticker.lagSmoothing(0);

      stop = () => {
        gsap.ticker.remove(onTick);
        lenis.destroy();
      };
    };

    const cancel = whenIdle(start);
    return () => {
      cancel();
      stop?.();
    };
  }, [reducedMotion]);

  return <>{children}</>;
}
