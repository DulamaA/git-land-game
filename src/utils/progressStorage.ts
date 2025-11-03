// Utilities for reading and writing progress to localStorage
const KEY = 'gitland_progress_v1';

// Read progress from localStorage
export function readProgress(): number[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);

    return Array.isArray(parsed) ? parsed.filter((n) => Number.isFinite(n)) : [];
  } catch {
    return [];
  }
}

// Write progress to localStorage
export function writeProgress(ids: number[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(ids));
  } catch {
    // ignore
  }
}
