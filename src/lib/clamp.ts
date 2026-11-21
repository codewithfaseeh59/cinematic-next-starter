/**
 * Restricts `value` to the range [min, max]. If the bounds are passed in the
 * wrong order they are swapped. A NaN value returns the lower bound.
 */
export function clamp(value: number, min: number, max: number): number {
  const lower = Math.min(min, max);
  const upper = Math.max(min, max);
  if (Number.isNaN(value)) return lower;
  return Math.min(Math.max(value, lower), upper);
}
