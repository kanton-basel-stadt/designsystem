export default function toPascalCase(input: string): string {
  if (/^[A-Z][a-z]+(?:[A-Z][a-z]*)*$/.test(input)) {
    return input // Already in PascalCase, return as-is
  }

  return input
    .replace(/_/g, ' ')
    .replace(/-/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('')
}
