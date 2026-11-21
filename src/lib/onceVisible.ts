/**
 * Calls `callback` once, the first time `element` scrolls into view.
 *
 * One-shot reveals do not need ScrollTrigger: an IntersectionObserver is much
 * cheaper because it never forces layout, which matters when a page has dozens
 * of them. ScrollTrigger is kept for scrubbed and pinned effects.
 *
 * Returns a cleanup function that stops observing.
 */
export function onceVisible(
  element: Element,
  callback: () => void,
  rootMargin = "0px 0px -12% 0px",
): () => void {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        observer.disconnect();
        callback();
      }
    },
    { rootMargin },
  );

  observer.observe(element);
  return () => observer.disconnect();
}
