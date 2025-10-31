import { asset } from './asset';

export type OctoVariantKey = 'base' | 'branching' | 'remote' | 'rebase';
export type OctoMood = 'idle' | 'info' | 'happy' | 'error';

export const octoSources: Record<OctoVariantKey, Partial<Record<OctoMood, string>>> = {
  base: { idle: asset('images/git-cat.png') },
  branching: {
    idle: asset('images/git-utvecklare.png'),
    happy: asset('images/git-happy.png'),
    error: asset('images/git-error.png'),
  },
  remote: { idle: asset('images/git-samurai.png') },
  rebase: { idle: asset('images/git-rosa.png') },
} as const;

export const variantFilters: Record<OctoVariantKey, string> = {
  base: '',
  branching: 'filter saturate-125',
  remote: 'filter hue-rotate-15',
  rebase: 'filter contrast-110',
};

export function getOctoSrc(variant: OctoVariantKey, mood: OctoMood): string {
  const v = octoSources[variant] ?? {};
  return (
    v[mood] ??
    v.idle ??
    octoSources.branching[mood] ??
    octoSources.base.idle ??
    '/images/git-cat.png'
  );
}

export const variantByLevel: Record<number, OctoVariantKey> = {
  1: 'branching',
  2: 'base',
  3: 'remote',
  4: 'rebase',
};
