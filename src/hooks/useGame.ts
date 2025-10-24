import { useMemo, useState, useCallback } from 'react';
import { LEVELS } from '../data/levels';
import { useTimer } from './useTimer';
import { getFirstHint } from '../utils/getFirstHint';
import { applyEffect, initialRepoState, type RepoState, type StatusMsg } from '../models/repo';
import type { Step } from '../types';

// ---------- helpers ----------

// Trim and convert all whitespace sequences to single spaces
function normalizeSpaces(s: string) {
  return s.trim().replace(/\s+/g, ' ');
}

// Create a regex pattern from an expected command string
function patternFromExpected(cmd: string): RegExp {
  const ESC = cmd
    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // escape special
    .replace(/<[^>]+>/g, '\\S+') // <placeholder> → no-whitespace-token
    .replace(/\s+/g, '\\s+'); // spaces → \s+
  return new RegExp(`^${ESC}$`, 'i');
}

// Extract backtick-enclosed commands from a legacy task string
function getExpectedCommands(task: string): string[] {
  const out: string[] = [];
  const re = /`([^`]+)`/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(task))) out.push(m[1].trim());
  return out;
}

// Normalize one level into {text, expects, hints}
type NormStep = { text: string; expects: string[]; hints?: string[] };
type RawLevel = { steps?: Step[]; tasks?: string[] } | null | undefined;
function toNormSteps(level: RawLevel): NormStep[] {
  if (!level) return [];

  // New model: steps: Step[]
  if (Array.isArray(level.steps)) {
    return level.steps.map((s) => ({
      text: s.text,
      expects: s.expects ?? [],
      hints: s.hints ?? [],
    }));
  }

  // Legacy model: tasks: string[] that contain backtick answers
  const tasks: string[] = level.tasks ?? [];
  return tasks.map((t) => ({
    text: t.replace(/`([^`]+)`/g, '…'),
    expects: getExpectedCommands(t),
  }));
}

// ---------- hook ----------

export function useGame() {
  // Level and task state
  const [levelIndex, setLevelIndex] = useState(0);
  const [taskIndex, setTaskIndex] = useState(0);
  const [input, setInput] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [repo, setRepo] = useState<RepoState>(initialRepoState);
  const [statusMsg, setStatusMsg] = useState<StatusMsg | null>({
    type: 'info',
    text: 'Väntar på kommando...',
  });

  const [, setMisses] = useState(0);

  // Timer state
  const { seconds, running, toggle, reset: resetTimer } = useTimer(false);

  // Current level and normalized steps
  const level = LEVELS[levelIndex];
  const steps = useMemo(() => toNormSteps(level), [level]);
  const step = useMemo(
    () => steps[taskIndex] ?? { text: '', expects: [], hints: [] },
    [steps, taskIndex],
  );

  // UI text + validation list + first hint
  const taskText = step.text;
  const expectedList = useMemo(() => step.expects, [step]);
  const firstHint = useMemo(
    () => step.hints?.[0] ?? getFirstHint(taskText) ?? '',
    [step, taskText],
  );

  // Total number of levels
  const totalLevels = LEVELS.length;

  // Handlers for navigating levels
  const prevLevel = useCallback(() => {
    setLevelIndex((i) => Math.max(0, i - 1));
    setTaskIndex(0);
    setInput('');
    setShowHint(false);
    setError(null);
    setRepo(initialRepoState);
    setStatusMsg({ type: 'info', text: 'Väntar på kommando...' });
    setMisses(0);
    resetTimer();
  }, [resetTimer]);

  const nextLevel = useCallback(() => {
    setLevelIndex((i) => Math.min(LEVELS.length - 1, i + 1));
    setTaskIndex(0);
    setInput('');
    setShowHint(false);
    setError(null);
    setRepo(initialRepoState);
    setStatusMsg({ type: 'info', text: 'Väntar på kommando...' });
    setMisses(0);
    resetTimer();
  }, [resetTimer]);

  // Go to specific level
  const goToLevel = useCallback(
    (id: number) => {
      const idx = Math.max(0, Math.min(LEVELS.length - 1, id - 1));
      setLevelIndex((prev) => {
        if (prev === idx) return prev;
        // reset only when changing level
        setTaskIndex(0);
        setInput('');
        setShowHint(false);
        setError(null);
        setRepo(initialRepoState);
        setStatusMsg({ type: 'info', text: 'Väntar på kommando...' });
        setMisses(0);
        resetTimer();
        return idx;
      });
    },
    [resetTimer],
  );

  // Run/submit handler
  const run = useCallback((): boolean => {
    if (expectedList.length === 0) {
      const isLast = taskIndex >= steps.length - 1;
      setTaskIndex((t) => Math.min(t + 1, steps.length - 1));
      setInput('');
      setShowHint(false);
      setError(null);
      setStatusMsg({ type: 'info', text: 'Inga kommandon att köra för denna uppgift.' });
      setMisses(0);
      return isLast;
    }

    const user = normalizeSpaces(input);

    let matched: string | null = null;
    for (const exp of expectedList) {
      if (patternFromExpected(exp).test(user)) {
        matched = exp;
        break;
      }
    }

    if (matched) {
      const { repo: nextRepo, message } = applyEffect(repo, matched, input);
      setRepo(nextRepo);
      setStatusMsg(message);

      const isLast = taskIndex >= steps.length - 1;
      setTaskIndex((t) => Math.min(t + 1, steps.length - 1));
      setInput('');
      setShowHint(false);
      setError(null);
      setMisses(0);

      return isLast;
    } else {
      setError('Fel kommando. Kolla mellanslag/flagga och försök igen.');
      setShowHint(true);
      setStatusMsg({ type: 'error', text: `Fel: "${input || 'tomt'}"` });
      setMisses((m) => {
        const n = m + 1;
        if (n >= 2) setShowHint(true);
        return n;
      });
      return false;
    }
  }, [input, expectedList, steps.length, taskIndex, repo]);

  // Reset current level state
  const resetCurrent = useCallback(() => {
    setInput('');
    setShowHint(false);
    setTaskIndex(0);
    setError(null);
    setRepo(initialRepoState);
    setStatusMsg({ type: 'info', text: 'Återställd nivå' });
    setMisses(0);
    resetTimer();
  }, [resetTimer]);

  return {
    // data
    levelIndex,
    level,
    steps,
    taskIndex,
    input,
    showHint,
    firstHint,
    error,
    repo,
    statusMsg,
    seconds,
    running,
    totalLevels,
    // setters/handlers
    setInput,
    setShowHint,
    goToLevel,
    prevLevel,
    nextLevel,
    run,
    resetCurrent,
    toggle,
  };
}
