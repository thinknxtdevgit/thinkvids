// Two-letter avatar initials from a name (falls back to an email/handle).
export function initialsFrom(name: string, fallback = ""): string {
  const source = (name || fallback).trim();
  if (!source) return "?";
  const parts = source.split(/\s+/).filter(Boolean);
  const letters = parts.length >= 2 ? parts[0][0] + parts[1][0] : source.slice(0, 2);
  return letters.toUpperCase();
}
