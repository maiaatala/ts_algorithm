export function joinNonNullStrings(...strings: (string | null)[]): string {
  return strings
    .map((str) => (str ? str.trim() : null))
    .filter(Boolean)
    .join(' ');
}
