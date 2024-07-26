export function validateLimit (limit: unknown): boolean {
  if (limit === null || limit === undefined) return true
  const parsedLimit = Number(limit)
  if (isNaN(parsedLimit)) return false

  if (parsedLimit < 0) return false

  if (typeof parsedLimit !== 'number') return false

  return true
}
