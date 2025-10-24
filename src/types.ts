export type View = 'home' | 'game';

export type Step = {
  text: string;
  expects: string[];
  hints?: string[];
};

export type Level = {
  id: number;
  title: string;
  tasks?: string[];
  steps?: Step[];
};
