"use client";

import { useEffect, useMemo, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { animateIn } from "@/lib/animateIn";
import { splitText } from "@/lib/splitText";
import styles from "./SplitText.module.css";

export type SplitBy = "lines" | "words" | "chars";
type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface SplitTextProps {
  text: string;
  /** Heading level to render. */
  as?: HeadingTag;
  /** Which pieces get their own animated span. */
  by?: SplitBy;
  /** Seconds between each piece. */
  stagger?: number;
  /** Seconds to wait before starting. */
  delay?: number;
  /** Play when scrolled into view (true) or immediately on load (false). */
  onScroll?: boolean;
  className?: string;
}

/**
 * Splits a heading into lines, words or characters and reveals them one after
 * another. Screen readers get the original text from aria-label; the split
 * spans are hidden from them so the heading is not read letter by letter.
 */
export function SplitText({
  text,
  as: Tag = "h2",
  by = "words",
  stagger = 0.06,
  delay = 0,
  onScroll = true,
  className,
}: SplitTextProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const reducedMotion = useReducedMotion();
  const lines = useMemo(() => splitText(text), [text]);

  useEffect(() => {
    const element = ref.current;
    if (!element || reducedMotion) return;

    const pieces = Array.from(element.querySelectorAll("[data-split-piece]"));
    if (pieces.length === 0) return;

    return animateIn(element, pieces, {
      from: "translateY(60%)",
      duration: 0.9,
      delay,
      stagger,
      immediate: !onScroll,
    });
  }, [reducedMotion, text, by, stagger, delay, onScroll]);

  return (
    <Tag ref={ref} aria-label={text} className={className}>
      {lines.map((line, lineIndex) => {
        const words = line.words.map((word, wordIndex) => {
          const wordKey = `${lineIndex}-${wordIndex}`;
          const space = word.spaceAfter ? " " : null;

          if (by === "chars") {
            return (
              <span key={wordKey} className={styles.word}>
                {word.chars.map((char, charIndex) => (
                  <span key={charIndex} data-split-piece className={styles.piece}>
                    {char}
                  </span>
                ))}
                {space}
              </span>
            );
          }

          if (by === "words") {
            return (
              <span key={wordKey}>
                <span data-split-piece className={styles.piece}>
                  {word.text}
                </span>
                {space}
              </span>
            );
          }

          return (
            <span key={wordKey}>
              {word.text}
              {space}
            </span>
          );
        });

        return (
          <span
            key={lineIndex}
            aria-hidden="true"
            className={styles.line}
            {...(by === "lines" ? { "data-split-piece": "" } : {})}
          >
            {words}
          </span>
        );
      })}
    </Tag>
  );
}
