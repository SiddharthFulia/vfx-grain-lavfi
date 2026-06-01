/** Concatenate filter snippets into one -vf string. Drops empties, strips trailing commas. */
export function composeChain(parts: ReadonlyArray<string>): string {
  const cleaned = parts
    .map((p) => p.trim())
    .filter((p) => p.length > 0)
    .map((p) => p.replace(/,+$/, ''));
  return cleaned.join(',');
}

/** Deterministic numeric formatter so snapshots stay stable across locales. */
export function num(n: number, digits = 3): string {
  if (Number.isInteger(n)) return String(n);
  return n
    .toFixed(digits)
    .replace(/0+$/, '')
    .replace(/\.$/, '');
}
