export function getFirstHint(task: string): string | null {
  const m = task.match(/`([^`]+)`/);
  return m ? m[1] : null;
}
