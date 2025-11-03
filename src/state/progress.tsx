import {
  useEffect, useMemo, useReducer, useCallback, type ReactNode, useContext,
} from 'react';
import { Ctx, type ProgressCtx } from './progressContextBase';
import { progressReducer, initialProgressState } from '../reducers/progressReducer';
import { readProgress, writeProgress } from '../utils/progressStorage';

// Provider component to manage and provide progress state
export function ProgressProvider({ children }: { children: ReactNode }) {
  // Set up reducer for progress state
  const [state, dispatch] = useReducer(progressReducer, initialProgressState);

  const load = useCallback(() => {
    dispatch({ type: 'LOAD_START' });
    // Attempt to read progress from storage
    try {
      const ids = readProgress();
      dispatch({ type: 'LOAD_SUCCESS', payload: ids });
    } catch(e) {
      dispatch({
        type: 'LOAD_ERROR',
        payload: e instanceof Error ? e.message : 'Kunde inte läsa progress',
      });
    }
  }, []);

  // Load progress on mount
  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    writeProgress(state.completed);
  }, [state.completed]);

  // Mark a level as done
  const markDone = useCallback<ProgressCtx['markDone']>((id) => {
    dispatch({ type: 'MARK_DONE', payload: id });
  }, []);

  // Reset progress
  const reset = useCallback<ProgressCtx['reset']>(() => {
    dispatch({ type: 'RESET' });
  }, []);

  const value = useMemo<ProgressCtx>(() => ({
    state,
    markDone,
    reset,
  }),
  [state, markDone, reset]);

  // Provide progress context to children
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

// Custom hook to access progress context
// eslint-disable-next-line react-refresh/only-export-components
export function useProgress(): ProgressCtx {
  const ctx = useContext(Ctx);
  if (!ctx) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }

  return ctx;
}
