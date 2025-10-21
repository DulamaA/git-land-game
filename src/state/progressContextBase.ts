import { createContext } from 'react';

export type ProgressState = {
  completed: number[];
  loading: boolean;
  error: string | null;
};

export type ProgressCtx = {
  state: ProgressState;
  markDone: (id: number) => void;
  reset: () => void;
};

export const Ctx = createContext<ProgressCtx | null>(null);
