import { useMemo, useState, useCallback } from 'react';
import { LEVELS } from '../data/levels';
import { useTimer } from './useTimer';
import { getFirstHint } from '../utils/getFirstHint';

export function useGame() {
  const [levelIndex, setLevelIndex] = useState(0);
  const [input, setInput] = useState('');
  const [showHint, setShowHint] = useState(false);

  const { seconds, running, toggle, reset: resetTimer } = useTimer(false);
  const level = LEVELS[levelIndex];

  const firstHint = useMemo(() => getFirstHint(level?.tasks?.[0] ?? ''), [level]);

  const prevLevel = useCallback(() => {
    setLevelIndex((i) => Math.max(0, i - 1));
    setInput('');
    setShowHint(false);
  }, []);

  const nextLevel = useCallback(() => {
    setLevelIndex((i) => Math.min(LEVELS.length - 1, i + 1));
    setInput('');
    setShowHint(false);
  }, []);

  const run = useCallback(() => {
    console.log('RUN: ', input);
    setInput('');
  }, [input]);

  const resetCurrent = useCallback(() => {
    setInput('');
    setShowHint(false);
    resetTimer();
  }, [resetTimer]);

  return {
    // data
    levelIndex,
    level,
    input,
    showHint,
    firstHint,
    seconds,
    running,
    totalLevels: LEVELS.length,
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
