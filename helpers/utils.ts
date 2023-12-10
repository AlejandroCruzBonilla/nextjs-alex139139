export function formatDate(input: string): string {
  const date = new Date(input)
  return date.toLocaleDateString("es-MX", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function absoluteUrl(input: string) {
  return `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${input}`
}