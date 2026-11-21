import { describe, expect, it } from "vitest";
import { clamp } from "./clamp";

describe("clamp", () => {
  it("returns the value when it is inside the range", () => {
    expect(clamp(5, 0, 10)).toBe(5);
  });

  it("limits values below the minimum and above the maximum", () => {
    expect(clamp(-3, 0, 10)).toBe(0);
    expect(clamp(42, 0, 10)).toBe(10);
  });

  it("keeps the bounds themselves", () => {
    expect(clamp(0, 0, 10)).toBe(0);
    expect(clamp(10, 0, 10)).toBe(10);
  });

  it("swaps bounds passed in the wrong order", () => {
    expect(clamp(5, 10, 0)).toBe(5);
    expect(clamp(20, 10, 0)).toBe(10);
  });

  it("handles infinities and NaN", () => {
    expect(clamp(Infinity, 0, 10)).toBe(10);
    expect(clamp(-Infinity, 0, 10)).toBe(0);
    expect(clamp(Number.NaN, 2, 10)).toBe(2);
  });

  it("works when min equals max", () => {
    expect(clamp(7, 3, 3)).toBe(3);
  });
});
