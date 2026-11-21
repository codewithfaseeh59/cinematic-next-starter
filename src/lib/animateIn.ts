import { onceVisible } from "./onceVisible";

export interface AnimateInOptions {
  /** CSS transform the elements start from, e.g. "translateY(48px)". */
  from: string;
  /** Seconds each element takes. */
  duration: number;
  /** Seconds before the first element starts. */
  delay?: number;
  /** Seconds between one element and the next. */
  stagger?: number;
  /** Play right away instead of waiting for `trigger` to scroll into view. */
  immediate?: boolean;
}

const EASE_OUT = "cubic-bezier(0.16, 1, 0.3, 1)";

/**
 * Fades and slides `targets` in with the browser's Web Animations API.
 *
 * Each animation starts paused on its first frame (invisible, offset), then
 * plays once `trigger` is visible. Unlike GSAP's from-tweens this never reads
 * computed styles, so setting up dozens of reveals does not force layout.
 * If the browser has no Web Animations support the elements simply stay visible.
 *
 * Returns a cleanup function that cancels everything.
 */
export function animateIn(
  trigger: Element,
  targets: Element[],
  { from, duration, delay = 0, stagger = 0, immediate = false }: AnimateInOptions,
): () => void {
  if (typeof trigger.animate !== "function") return () => undefined;

  const animations = targets.map((target, index) => {
    const animation = target.animate(
      [
        { opacity: 0, transform: from },
        { opacity: 1, transform: "none" },
      ],
      {
        duration: duration * 1000,
        delay: (delay + index * stagger) * 1000,
        easing: EASE_OUT,
        fill: "both",
      },
    );
    if (!immediate) animation.pause();
    return animation;
  });

  const stopWatching = immediate
    ? () => undefined
    : onceVisible(trigger, () => animations.forEach((animation) => animation.play()));

  return () => {
    stopWatching();
    animations.forEach((animation) => animation.cancel());
  };
}
