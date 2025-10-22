import { useMemo, useState, useCallback } from 'react';
import { LEVELS } from '../data/levels';
import { useTimer } from './useTimer';
import { getFirstHint } from '../utils/getFirstHint';
import { applyEffect, initialRepoState, type RepoState, type StatusMsg } from '../models/repo';

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

// Extract backtick-enclosed commands from a task string
function getExpectedCommands(task: string): string[] {
  const out: string[] = [];
  const re = /`([^`]+)`/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(task))) out.push(m[1].trim());
  return out;
}

export function useGame() {
  //Level and task state
  const [levelIndex, setLevelIndex] = useState(0);
  const [taskIndex, setTaskIndex] = useState(0);
  const [input, setInput] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [repo, setRepo] = useState<RepoState>(initialRepoState);
  const [StatusMsg, setStatusMsg] = useState<StatusMsg | null>({
    type: 'info',
    text: 'Väntar på kommando...',
  });

  // Timer state
  const { seconds, running, toggle, reset: resetTimer } = useTimer(false);

  // Current level, task, hints, and expected commands
  const level = LEVELS[levelIndex];
  const tasks = level?.tasks ?? [];
  const task = tasks[taskIndex] ?? '';

  // First hint for the current task
  const firstHint = useMemo(() => getFirstHint(task) ?? '', [task]);

  // Expected commands for the current task
  const expectedList = useMemo(() => getExpectedCommands(task), [task]);

  // Total number of levels
  const totalLevels = LEVELS.length;

  // Handlers for navigating levels and tasks
  const prevLevel = useCallback(() => {
    setLevelIndex((i) => Math.max(0, i - 1));
    setTaskIndex(0);
    setInput('');
    setShowHint(false);
    setError(null);
    setRepo(initialRepoState);
    setStatusMsg({
      type: 'info',
      text: 'Väntar på kommando...',
    });
    resetTimer();
  }, [resetTimer]);

  // Next level handler
  const nextLevel = useCallback(() => {
    setLevelIndex((i) => Math.min(LEVELS.length - 1, i + 1));
    setTaskIndex(0);
    setInput('');
    setShowHint(false);
    setError(null);
    setRepo(initialRepoState);
    setStatusMsg({
      type: 'info',
      text: 'Väntar på kommando...',
    });
    resetTimer();
  }, [resetTimer]);

  // Run/submit handler
  const run = useCallback(() => {
    if (expectedList.length === 0) {
      setTaskIndex((t) => Math.min(t + 1, tasks.length - 1));
      setInput('');
      setShowHint(false);
      setError(null);
      setStatusMsg({ type: 'info', text: 'Inga kommandon att köra för denna uppgift.' });
      return;
    }

    // Check if input matches any expected command
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

      setTaskIndex((t) => Math.min(t + 1, tasks.length - 1));
      setInput('');
      setShowHint(false);
      setError(null);
    } else {
      setError('Fel kommando. Kolla mellanslag/flagga och försök igen.');
      // Show hint on incorrect input
      setShowHint(true);
      setStatusMsg({ type: 'error', text: `Fel: "${input || 'tomt'}"` });
    }
  }, [input, expectedList, tasks.length, repo]);

  // Reset current task state
  const resetCurrent = useCallback(() => {
    setInput('');
    setShowHint(false);
    setTaskIndex(0);
    setError(null);
    setRepo(initialRepoState);
    setStatusMsg({
      type: 'info',
      text: 'Återställd nivå',
    });
    resetTimer();
  }, [resetTimer]);

  return {
    // data
    levelIndex,
    level,
    taskIndex,
    input,
    showHint,
    firstHint,
    error,
    repo,
    StatusMsg,
    seconds,
    running,
    totalLevels,
    // setters/handlers
    setInput,
    setShowHint,
    prevLevel,
    nextLevel,
    run,
    resetCurrent,
    toggle,
  };
}
