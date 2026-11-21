import { describe, expect, it } from "vitest";
import { splitText } from "./splitText";

describe("splitText", () => {
  it("splits 'Hello big world' into one line, three words and their chars", () => {
    const lines = splitText("Hello big world");

    expect(lines).toHaveLength(1);
    const words = lines[0]?.words ?? [];
    expect(words.map((word) => word.text)).toEqual(["Hello", "big", "world"]);
    expect(words[0]?.chars).toEqual(["H", "e", "l", "l", "o"]);
    expect(words[1]?.chars).toEqual(["b", "i", "g"]);
    expect(words[2]?.chars).toEqual(["w", "o", "r", "l", "d"]);
  });

  it("keeps spaces between words but not after the last one", () => {
    const words = splitText("Hello big world")[0]?.words ?? [];

    expect(words.map((word) => word.spaceAfter)).toEqual([true, true, false]);
    const rebuilt = words.map((word) => word.text + (word.spaceAfter ? " " : "")).join("");
    expect(rebuilt).toBe("Hello big world");
  });

  it("collapses repeated spaces like HTML does", () => {
    const words = splitText("a    b")[0]?.words ?? [];
    expect(words.map((word) => word.text)).toEqual(["a", "b"]);
  });

  it("splits on newlines into separate lines", () => {
    const lines = splitText("Light\nSound\r\nMotion");
    expect(lines.map((line) => line.words.map((word) => word.text))).toEqual([
      ["Light"],
      ["Sound"],
      ["Motion"],
    ]);
  });

  it("returns no lines for an empty or whitespace-only string", () => {
    expect(splitText("")).toEqual([]);
    expect(splitText("   \n  ")).toEqual([]);
  });

  it("keeps emoji and accented letters as single characters", () => {
    const word = splitText("café 👍🏽")[0]?.words[1];
    expect(word?.chars).toEqual(["👍🏽"]);
    expect(splitText("café")[0]?.words[0]?.chars).toHaveLength(4);
  });
});
