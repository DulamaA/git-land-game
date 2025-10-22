// Extracts the first hint enclosed in backticks from a task string
export function getFirstHint(task: string): string | null {
  const m = task.match(/`([^`]+)`/);
  return m ? m[1] : null;
}
