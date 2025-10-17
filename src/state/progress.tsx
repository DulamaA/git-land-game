import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';

type State = { completed: number[] };
type Action = { type: 'MARKERA_KLAR'; id: number } | { type: 'ATERSTALL' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'MARKERA_KLAR':
      if (state.completed.includes(action.id)) return state;
      return { completed: [...state.completed, action.id].sort((a, b) => a - b) };
    case 'ATERSTALL':
      return { completed: [] };
    default:
      return state;
  }
}

function load(): State {
  try {
    const raw = localStorage.getItem('progress');
    return raw ? JSON.parse(raw) : { completed: [] };
  } catch {
    return { completed: [] };
  }
}

const Ctx = createContext<{
  state: State;
  levelDone: (id: number) => void;
  reset: () => void;
} | null>(null);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, load);

  useEffect(() => {
    localStorage.setItem('progress', JSON.stringify(state));
  }, [state]);

  const value = useMemo(
    () => ({
      state,
      levelDone: (id: number) => dispatch({ type: 'MARKERA_KLAR', id }),
      reset: () => dispatch({ type: 'ATERSTALL' }),
    }),
    [state],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useProgress() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useFramsteg måste användas inuti FramstegProvider');
  return ctx;
}
