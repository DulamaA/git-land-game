/**
* This file show TypeScript types for views, steps, and levels used by the app.
* It defines the TStep and TLevel shapes that drive the learning flow.
* The data and hooks import these types for strong typing across modules.
*/

export type View = 'home' | 'game';

export type TStep = {
  text: string;
  expects: string[];
  hints?: string[];
  snippetBelowInput?: string;
};

export type TLevel = {
  id: number;
  title: string;
  tasks?: string[];
  steps?: TStep[];
};
