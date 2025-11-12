/**
* This file show the progress storage helpers using localStorage.
* It reads/writes completed level IDs, handling legacy shapes and normalizing data.
* The game logic calls these functions; UI does not interact with storage directly.
*/

const KEY = 'gitland_progress_v1';

// read progress from localStorage
export function readProgress(): number[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) {
      return [];
    }

    const parsed: unknown = JSON.parse(raw);

    // handle current and legacy shapes
    let arr: unknown[] = [];
    if (Array.isArray(parsed)) {
      arr = parsed as unknown[];
    } else if (parsed && typeof parsed === 'object') {
      const p = parsed as { completed?: unknown; data?: unknown };
      if (Array.isArray(p.completed)) {
        arr = p.completed;
      } else if (Array.isArray(p.data)) {
        arr = p.data;
      }
    }

    const normalized: number[] = arr
      .map((n) => Number(n))
      .filter((n) => Number.isFinite(n));

    // unique + sorted
    return Array.from(new Set(normalized)).sort((a, b) => a - b);
  } catch {
    return [];
  }
}

// write progress to localStorage: unique, sorted number[]
export function writeProgress(ids: number[]): void {
  try {
    const clean = Array.from(new Set((ids ?? []).map((n) =>
      Number(n)).filter((n) => Number.isFinite(n)))).sort((a, b) => a - b);

    localStorage.setItem(KEY, JSON.stringify(clean));
  } catch {
    // ignore
  }
}
