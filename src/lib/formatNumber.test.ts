import { describe, expect, it } from "vitest";
import { formatNumber } from "./formatNumber";

describe("formatNumber", () => {
  it("adds thousands separators", () => {
    expect(formatNumber(1234567)).toBe("1,234,567");
  });

  it("formats zero and small numbers", () => {
    expect(formatNumber(0)).toBe("0");
    expect(formatNumber(7)).toBe("7");
  });

  it("rounds to the requested number of decimals", () => {
    expect(formatNumber(3.14159, 2)).toBe("3.14");
    expect(formatNumber(2, 1)).toBe("2.0");
  });

  it("rounds to a whole number by default", () => {
    expect(formatNumber(9.6)).toBe("10");
  });

  it("handles negative numbers", () => {
    expect(formatNumber(-1500)).toBe("-1,500");
    expect(formatNumber(-0)).toBe("0");
  });

  it("returns 0 for non-finite values", () => {
    expect(formatNumber(Number.NaN)).toBe("0");
    expect(formatNumber(Infinity)).toBe("0");
  });

  it("clamps absurd decimal counts", () => {
    expect(formatNumber(1.5, -3)).toBe("2");
    expect(formatNumber(1.5, 99)).toBe("1.500000");
  });
});
