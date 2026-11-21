import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useReducedMotion } from "./useReducedMotion";

type ChangeListener = () => void;

function mockMatchMedia(initialMatches: boolean) {
  let matches = initialMatches;
  const listeners = new Set<ChangeListener>();

  vi.stubGlobal(
    "matchMedia",
    vi.fn().mockImplementation((query: string) => ({
      get matches() {
        return matches;
      },
      media: query,
      addEventListener: (_: string, listener: ChangeListener) => listeners.add(listener),
      removeEventListener: (_: string, listener: ChangeListener) => listeners.delete(listener),
    })),
  );

  return {
    set(next: boolean) {
      matches = next;
      listeners.forEach((listener) => listener());
    },
  };
}

describe("useReducedMotion", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns true when the user prefers reduced motion", () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(true);
  });

  it("returns false when the user has no preference", () => {
    mockMatchMedia(false);
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(false);
  });

  it("updates when the preference changes", () => {
    const media = mockMatchMedia(false);
    const { result } = renderHook(() => useReducedMotion());

    act(() => media.set(true));
    expect(result.current).toBe(true);
  });
});
