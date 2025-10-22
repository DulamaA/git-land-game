import { useEffect, useMemo, useReducer, useCallback, type ReactNode, useContext } from 'react';
import { Ctx, type ProgressCtx } from './progressContextBase';
import { progressReducer, initialProgressState } from '../reducers/progressReducer';
import { readProgress, writeProgress } from '../utils/progressStorage';

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(progressReducer, initialProgressState);

  const load = useCallback(() => {
    dispatch({ type: 'LOAD_START' });
    try {
      const ids = readProgress();
      dispatch({ type: 'LOAD_SUCCESS', payload: ids });
    } catch (e) {
      dispatch({
        type: 'LOAD_ERROR',
        payload: e instanceof Error ? e.message : 'Kunde inte läsa progress',
      });
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    writeProgress(state.completed);
  }, [state.completed]);

  const markDone = useCallback<ProgressCtx['markDone']>((id) => {
    dispatch({ type: 'MARK_DONE', payload: id });
  }, []);

  const reset = useCallback<ProgressCtx['reset']>(() => {
    dispatch({ type: 'RESET' });
  }, []);

  const value = useMemo<ProgressCtx>(() => ({ state, markDone, reset }), [state, markDone, reset]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useProgress(): ProgressCtx {
  const ctx = useContext(Ctx);
  if (!ctx) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return ctx;
}
