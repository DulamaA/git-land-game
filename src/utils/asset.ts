/**
* This file show a small helper that resolves asset URLs correctly.
* It ensures that paths work even when the app is deployed under a subdirectory.
* The function prefixes the given path with the app’s BASE_URL.
*/

export function asset(path: string) {
  // strips any leading slash and prefixes BASE_URL (e.g. '/git-land/')
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
}
