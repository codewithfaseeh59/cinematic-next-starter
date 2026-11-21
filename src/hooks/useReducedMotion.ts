import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

// One shared media query for every component on the page. Creating a new
// MediaQueryList per component per render adds up when dozens of components ask.
let mediaQuery: MediaQueryList | null = null;
const listeners = new Set<() => void>();

function notifyAll(): void {
  listeners.forEach((listener) => listener());
}

function subscribe(onChange: () => void): () => void {
  if (listeners.size === 0) {
    mediaQuery = window.matchMedia(QUERY);
    mediaQuery.addEventListener("change", notifyAll);
  }
  listeners.add(onChange);

  return () => {
    listeners.delete(onChange);
    if (listeners.size === 0 && mediaQuery) {
      mediaQuery.removeEventListener("change", notifyAll);
      mediaQuery = null;
    }
  };
}

function getSnapshot(): boolean {
  return (mediaQuery ?? window.matchMedia(QUERY)).matches;
}

// On the server we cannot know the preference, so we assume motion is allowed.
function getServerSnapshot(): boolean {
  return false;
}

/** Returns true when the user has asked the OS/browser for reduced motion. */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
