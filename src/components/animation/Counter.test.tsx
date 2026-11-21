import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Counter } from "./Counter";

function mockReducedMotion(matches: boolean) {
  vi.stubGlobal(
    "matchMedia",
    vi.fn().mockImplementation((query: string) => ({
      matches,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  );
}

describe("Counter", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("shows the final value immediately when reduced motion is on", () => {
    mockReducedMotion(true);
    render(<Counter value={12500} prefix="$" suffix="+" />);

    expect(screen.getByText("$12,500+")).toBeInTheDocument();
  });

  it("formats decimals", () => {
    mockReducedMotion(true);
    render(<Counter value={4.9} decimals={1} suffix="/5" />);

    expect(screen.getByText("4.9/5")).toBeInTheDocument();
  });

  it("starts the count from zero when motion is allowed", () => {
    mockReducedMotion(false);
    render(<Counter value={250} />);

    expect(screen.getByText("0")).toBeInTheDocument();
  });
});
