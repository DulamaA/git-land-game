import { createContext } from 'react';

// Define types for progress state and context
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

// Create context for progress state
export const Ctx = createContext<ProgressCtx | null>(null);
