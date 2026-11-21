const formatterCache = new Map<number, Intl.NumberFormat>();

function getFormatter(decimals: number): Intl.NumberFormat {
  const cached = formatterCache.get(decimals);
  if (cached) return cached;
  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  formatterCache.set(decimals, formatter);
  return formatter;
}

/**
 * Formats a number with thousands separators and a fixed number of decimals.
 * Non-finite input (NaN, Infinity) is shown as 0 so the UI never prints "NaN".
 * `decimals` is clamped to the range 0-6 and rounded to a whole number.
 */
export function formatNumber(value: number, decimals = 0): string {
  const safeDecimals = Math.min(Math.max(Math.round(decimals), 0), 6);
  const safeValue = Number.isFinite(value) ? value : 0;
  // normalise -0 so it never renders as "-0"
  return getFormatter(safeDecimals).format(safeValue === 0 ? 0 : safeValue);
}
