import {
  useMemo,
  useState,
  useCallback,
  useEffect,
} from 'react';
import { LEVELS } from '../data/levels';
import { useTimer } from './useTimer';
import {
  applyEffect, createInitialRepoState, type RepoState, type StatusMsg,
} from '../models/repo';
import type { TStep } from '../types';


// Trim and convert all whitespace sequences to single spaces
function normalizeSpaces(s: string) {
  return s.trim().replace(/\s+/g, ' ');
}

function tokenForPlaceholder(name: string) {
  if (/(message|url)/i.test(name)) {
    return '(?:"[^"]+"|\'[^\']+\'|\\S[\\s\\S]*)';
  }

  if (/branch/i.test(name)) {
    return '[\\w./-]+';
  }

  return '\\S+';
}

function patternFromExpected(cmd: string): RegExp {
  const ESC = cmd
    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // escape special
    .replace(/<([^>]+)>/g, (_, name) => tokenForPlaceholder(name)) // no-whitespace-token
    .replace(/\s+/g, '\\s+'); // spaces → \s+

  return new RegExp(`^${ESC}$`, 'i');
}

// Normalize one level into {text, expects, hints}
type NormStep = {
  text: string;
  expects: string[];
  hints?: string[];
};
type RawLevel = { steps?: TStep[]; tasks?: string[] } | null | undefined;

function toNormSteps(level: RawLevel): NormStep[] {
  if (!level) {
    return [];
  }
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
    expects: [],
  }));
}

// function getThreeHints(taskText: string, expects?: string[]): string[] {
//  const h1 = getFirstHint(taskText, 0, expects) || '';
//  const h2 = getFirstHint(taskText, 1, expects) || '';
//  const h3 = getFirstHint(taskText, 2, expects) || '';

//  return [h1, h2, h3].filter(Boolean);
// }

// ---------- hook ----------

export function useGame() {
  const [levelIndex, setLevelIndex] = useState(0);
  const [taskIndex, setTaskIndex] = useState(0);

  const level = LEVELS[levelIndex];
  const steps = useMemo(() => toNormSteps(level), [level]);
  const step = useMemo(() =>
    steps[taskIndex] ?? {
      text: '',
      expects: [],
      hints: [],
    },
  [steps, taskIndex]);

  const [input, setInput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const [repo, setRepo] = useState<RepoState>(createInitialRepoState);
  const [statusMsg, setStatusMsg] = useState<StatusMsg | null>({
    type: 'info',
    text: 'Väntar på kommando...',
  });

  const [, setMisses] = useState(0);
  const [hintStage, setHintStage] = useState<0 | 1 | 2 | 3>(0);
  const [showSolution, setShowSolution] = useState(false);
  const [locked, setLocked] = useState(false);

  const [levelDone, setLevelDone] = useState(false);

  type HistoryItem = {
    ts: number;
    levelId: number;
    stepIndex: number;
    input: string;
    matched?: string | null;
    ok: boolean;
    message: StatusMsg;
  };

  const [history, setHistory] = useState<HistoryItem[]>([]);

  const appendHistory = useCallback((item:
  {
    input: string; ok: boolean; matched?: string | null; message: StatusMsg,
  }) => {
    setHistory((prev) => [
      ...prev,
      {
        ts: Date.now(),
        levelId: level.id,
        stepIndex: taskIndex,
        input: item.input,
        matched: item.matched ?? null,
        ok: item.ok,
        message: item.message,
      },
    ]);
  },
  [level.id, taskIndex]);


  const {
    seconds, running, toggle, reset: resetTimer,
  } = useTimer(false);

  const expectedList = useMemo(() => step.expects, [step]);
  const solutionText = useMemo(() => expectedList[0] ?? '', [expectedList]);

  const hints = useMemo(() => {
    return (step.hints ?? []).filter(Boolean).slice(0, 3);
  }, [step.hints]);

  // const generated = getThreeHints(step.text, expectedList);
  // return [...custom, ...generated].slice(0, 3);
  // }, [step.hints, step.text, expectedList]);

  const totalLevels = LEVELS.length;

  const hardResetLevelState = useCallback(() => {
    setTaskIndex(0);
    setInput('');
    setError(null);

    setRepo(createInitialRepoState());
    setStatusMsg({ type: 'info', text: 'Väntar på kommando...' } as const);

    setMisses(0);
    setHintStage(0);
    setShowSolution(false);
    setLocked(false);

    setLevelDone(false);
    resetTimer();
  }, [resetTimer]);

  useEffect(() => {
    if (levelIndex === 2) {
      setRepo((prev) => {
        const next = structuredClone(prev);
        next.initialized = true;
        next.branches ||= {};
        next.branches.main ||= [];
        next.branches['feature/sync'] ||= [];
        next.current = 'feature/sync';

        return next;
      });

      setStatusMsg({ type: 'info', text: 'Startar på feature/sync - byt till main.' });
    }
  }, [levelIndex, setRepo, setStatusMsg]);

  // Handlers for navigating levels
  const prevLevel = useCallback(() => {
    setLevelIndex((i) => Math.max(0, i - 1));
    hardResetLevelState();
  }, [hardResetLevelState]);

  const nextLevel = useCallback(() => {
    setLevelIndex((i) => Math.min(LEVELS.length - 1, i + 1));
    hardResetLevelState();
  }, [hardResetLevelState]);

  const goToLevel = useCallback((id: number) => {
    const idx = Math.max(0, Math.min(LEVELS.length - 1, id - 1));
    setLevelIndex((prev) => {
      if (prev === idx) {
        return prev;
      }
      hardResetLevelState();

      return idx;
    });
  }, [hardResetLevelState]);

  const run = useCallback((): boolean => {
    if (locked) {
      const msg: StatusMsg = { type: 'info', text: 'Max antal försök. Kör lösningen för att gå vidare.' };
      setStatusMsg(msg);
      appendHistory({
        input, ok: false, matched: null, message: msg,
      });

      return false;
    }

    if (expectedList.length === 0) {
      const msg: StatusMsg = { type: 'info', text: 'Inga kommandon att köra för denna uppgift.' };
      setStatusMsg(msg);

      const isLast = taskIndex >= steps.length - 1;
      setTaskIndex((t) => Math.min(t + 1, steps.length - 1));
      setInput('');
      setError(null);
      setMisses(0);
      setHintStage(0);
      setShowSolution(false);
      setLocked(false);
      if (isLast) {
        setLevelDone(true);
      }

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
      appendHistory({
        input,
        ok: true,
        matched,
        message,
      });

      const isLast = taskIndex >= steps.length - 1;
      setTaskIndex((t) => Math.min(t + 1, steps.length - 1));
      setInput('');
      setError(null);
      setMisses(0);
      setHintStage(0);
      setShowSolution(false);
      setLocked(false);
      if (isLast) {
        setLevelDone(true);
      }

      return isLast;
    } else {
      const msg: StatusMsg = { type: 'error', text: `Fel: "${input || 'tomt'}"` };
      setError('Fel kommando. Kolla mellanslag/flagga och försök igen.');
      setStatusMsg(msg);
      appendHistory({
        input,
        ok: false,
        matched: null,
        message: msg,
      });

      setMisses((m) => {
        const n = m + 1;
        const nextStage = Math.min(3, (hintStage + 1) as 1 | 2 | 3);
        setHintStage(nextStage as 1 | 2 | 3);
        if (n >= 4) {
          setShowSolution(true);
          setLocked(true);
        }

        return n;
      });

      return false;
    }
  }, [
    input,
    expectedList,
    steps.length,
    taskIndex,
    repo,
    locked,
    hintStage,
    appendHistory,
  ]);


  // Solution is visible after the fourth attempt
  const runSolution = useCallback((): boolean => {
    if (!solutionText) {
      return false;
    }

    const { repo: nextRepo, message } = applyEffect(repo, solutionText, solutionText);
    setRepo(nextRepo);
    setStatusMsg(message);
    appendHistory({
      input: solutionText, ok: true, matched: solutionText, message,
    });

    const isLast = taskIndex >= steps.length - 1;
    setTaskIndex((t) => Math.min(t + 1, steps.length - 1));
    setInput('');
    setError(null);
    setMisses(0);
    setHintStage(0);
    setShowSolution(false);
    setLocked(false);

    if (isLast) {
      setLevelDone(true);
    }

    return isLast;
  }, [
    repo,
    solutionText,
    steps.length,
    taskIndex,
    appendHistory,
  ]);

  // Reset current level state
  const resetCurrent = useCallback(() => {
    hardResetLevelState();
    setStatusMsg({ type: 'info', text: 'Väntar på kommando...' });
  }, [hardResetLevelState]);

  return {
    levelIndex,
    level,
    steps,
    taskIndex,
    input,
    error,
    repo,
    statusMsg,
    seconds,
    running,
    totalLevels,
    levelDone,

    hints,
    hintStage,
    showSolution,
    solutionText,
    locked,
    history,

    setInput,
    goToLevel,
    prevLevel,
    nextLevel,
    run,
    runSolution,
    resetCurrent,
    toggle,
    resetTimer,
  };
}
