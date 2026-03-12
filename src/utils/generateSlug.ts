export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/['’]/g, '') // remove apostrophes
    .replace(/[^a-z0-9\s-]/g, '') // remove special chars
    .trim()
    .replace(/\s+/g, '-') // spaces to hyphen
    .replace(/-+/g, '-') // remove duplicate hyphens
    .replace(/^-+|-+$/g, ''); // trim hyphens
}
