"use client";

import { useRef, type ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { gsap, useGSAP } from "@/lib/gsap";
import { whenIdle } from "@/lib/whenIdle";
import styles from "./Magnetic.module.css";

interface MagneticProps {
  children: ReactNode;
  /** How far the element follows the pointer, as a fraction of its offset (0-1). */
  strength?: number;
  className?: string;
}

/** Pulls its child toward the mouse pointer while hovering, then springs back. */
export function Magnetic({ children, strength = 0.35, className }: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    (_, contextSafe) => {
      const element = ref.current;
      if (!element || reducedMotion) return;

      let detach: (() => void) | undefined;

      const attach = () => {
        const moveX = gsap.quickTo(element, "x", { duration: 0.5, ease: "power3.out" });
        const moveY = gsap.quickTo(element, "y", { duration: 0.5, ease: "power3.out" });

        const onMove = (event: PointerEvent) => {
          if (event.pointerType !== "mouse") return;
          const rect = element.getBoundingClientRect();
          moveX((event.clientX - (rect.left + rect.width / 2)) * strength);
          moveY((event.clientY - (rect.top + rect.height / 2)) * strength);
        };

        const onLeave = () => {
          moveX(0);
          moveY(0);
        };

        element.addEventListener("pointermove", onMove);
        element.addEventListener("pointerleave", onLeave);
        detach = () => {
          element.removeEventListener("pointermove", onMove);
          element.removeEventListener("pointerleave", onLeave);
        };
      };

      const cancel = whenIdle(contextSafe ? contextSafe(attach) : attach);
      return () => {
        cancel();
        detach?.();
      };
    },
    { scope: ref, dependencies: [reducedMotion, strength] },
  );

  return (
    <span ref={ref} className={className ? `${styles.magnetic} ${className}` : styles.magnetic}>
      {children}
    </span>
  );
}
