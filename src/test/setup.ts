import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach, vi } from "vitest";

function stubBrowserApis() {
  // jsdom has no matchMedia. Tests that care about the value stub their own on top.
  vi.stubGlobal(
    "matchMedia",
    (query: string): MediaQueryList =>
      ({
        matches: false,
        media: query,
        addEventListener: () => undefined,
        removeEventListener: () => undefined,
      }) as unknown as MediaQueryList,
  );

  // jsdom has no IntersectionObserver; this one never reports an intersection.
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
      takeRecords() {
        return [];
      }
    },
  );
}

// GSAP calls matchMedia while registering ScrollTrigger, which happens on import,
// so the stubs must exist before any test file loads. beforeEach restores them
// after tests that call vi.unstubAllGlobals().
stubBrowserApis();
beforeEach(stubBrowserApis);

afterEach(() => {
  cleanup();
});
