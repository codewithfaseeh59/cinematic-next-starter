/**
 * Runs `task` when the browser is idle (or shortly after, where
 * requestIdleCallback does not exist, like Safari).
 *
 * Starting each animation in its own idle task, instead of all of them inside
 * the one hydration task, keeps the main thread responsive while the page loads.
 *
 * Returns a function that cancels the task if it has not run yet.
 */
export function whenIdle(task: () => void, timeout = 1500): () => void {
  if (typeof window.requestIdleCallback === "function") {
    const id = window.requestIdleCallback(task, { timeout });
    return () => window.cancelIdleCallback(id);
  }

  const id = window.setTimeout(task, 50);
  return () => window.clearTimeout(id);
}
