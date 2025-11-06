export type View = 'home' | 'game';

export type TStep = {
  text: string;
  expects: string[];
  hints?: string[];
};

export type TLevel = {
  id: number;
  title: string;
  tasks?: string[];
  steps?: TStep[];
};
