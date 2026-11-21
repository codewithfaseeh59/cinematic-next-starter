import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SplitText } from "./SplitText";

describe("SplitText", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "matchMedia",
      vi.fn().mockImplementation((query: string) => ({
        matches: true,
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("exposes the original text through aria-label", () => {
    render(<SplitText as="h1" text="We make films for the web" />);

    const heading = screen.getByRole("heading", { level: 1, name: "We make films for the web" });
    expect(heading).toHaveAttribute("aria-label", "We make films for the web");
  });

  it("hides every split span from screen readers", () => {
    const { container } = render(<SplitText text="Hello big world" by="chars" />);

    const spans = container.querySelectorAll("h2 span");
    expect(spans.length).toBeGreaterThan(0);
    const visibleToScreenReaders = Array.from(spans).filter(
      (span) => span.closest('[aria-hidden="true"]') === null,
    );
    expect(visibleToScreenReaders).toHaveLength(0);
  });

  it("wraps each word, character or line in its own piece", () => {
    const words = render(<SplitText text="Hello big world" by="words" />);
    expect(words.container.querySelectorAll("[data-split-piece]")).toHaveLength(3);
    words.unmount();

    const chars = render(<SplitText text="Hello big world" by="chars" />);
    expect(chars.container.querySelectorAll("[data-split-piece]")).toHaveLength(13);
    chars.unmount();

    const lines = render(<SplitText text={"Hello\nbig world"} by="lines" />);
    expect(lines.container.querySelectorAll("[data-split-piece]")).toHaveLength(2);
  });

  it("renders nothing visible for an empty string", () => {
    const { container } = render(<SplitText text="" />);
    expect(container.querySelectorAll("[data-split-piece]")).toHaveLength(0);
  });
});
