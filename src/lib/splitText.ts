export interface SplitWord {
  /** The word without surrounding whitespace. */
  text: string;
  /** Every character of the word, as user-perceived characters (emoji stay whole). */
  chars: string[];
  /** True when a space followed this word in the source text. */
  spaceAfter: boolean;
}

export interface SplitLine {
  words: SplitWord[];
}

const graphemeSegmenter = new Intl.Segmenter(undefined, { granularity: "grapheme" });

function toChars(word: string): string[] {
  return Array.from(graphemeSegmenter.segment(word), (part) => part.segment);
}

/**
 * Splits text into lines, words and characters.
 *
 * Lines are separated by newline characters. Browsers decide where text wraps
 * visually, so "lines" here means the lines you wrote, not the wrapped ones.
 * Runs of spaces collapse into a single `spaceAfter` flag, matching how HTML
 * renders whitespace. An empty or whitespace-only string returns no lines.
 */
export function splitText(text: string): SplitLine[] {
  return text
    .split(/\r?\n/)
    .map((line) => {
      const trimmed = line.trim();
      if (trimmed === "") return null;
      const parts = trimmed.split(/\s+/);
      const words: SplitWord[] = parts.map((word, index) => ({
        text: word,
        chars: toChars(word),
        spaceAfter: index < parts.length - 1,
      }));
      return { words };
    })
    .filter((line): line is SplitLine => line !== null);
}
