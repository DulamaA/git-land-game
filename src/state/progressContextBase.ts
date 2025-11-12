/**
* This file show the progress context base with types for state and context.
* It defines the ProgressCtx API (markDone, reset) and the React context object.
* The provider and logic for loading/saving progress live in the progress module.
*/

import { createContext } from 'react';

// Define types for progress state and context
export type ProgressState = {
  completed: number[];
  loading: boolean;
  error: string | null;
};

export type ProgressCtx = {
  state: ProgressState;
  // eslint-disable-next-line  no-unused-vars
  markDone: (id: number) => void;
  reset: () => void;
};

// Create context for progress state
export const Ctx = createContext<ProgressCtx | null>(null);
