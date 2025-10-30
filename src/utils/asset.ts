export function asset(path: string) {
  // strips any leading slash and prefixes BASE_URL (e.g. '/git-land/')
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
}
