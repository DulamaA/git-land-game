export type OctoVariantKey = 'base' | 'branching' | 'remote' | 'rebase';
export type OctoMood = 'idle' | 'info' | 'happy' | 'error';

export const octoSources: Record<OctoVariantKey, Partial<Record<OctoMood, string>>> = {
  base: { idle: '/images/git-cat.png' },
  branching: {
    idle: '/images/git-utvecklare.png',
    happy: '/images/git-happy.png',
    error: '/images/git-error.png',
  },
  remote: { idle: '/images/git-samurai.png' },
  rebase: { idle: '/images/git-rosa.png' },
};

export const badgeEmoji: Record<OctoVariantKey, string> = {
  base: '🐙',
  branching: '🌿',
  remote: '📡',
  rebase: '🧹',
};

export const variantFilters: Record<OctoVariantKey, string> = {
  base: '',
  branching: 'filter saturate-125',
  remote: 'filter hue-rotate-15',
  rebase: 'filter contrast-110',
};

export function srcFor(variant: OctoVariantKey, mood: OctoMood): string {
  const v = octoSources[variant] ?? {};
  return v[mood] ?? v.idle ?? '/images/git-cat.png';
}

export const variantByLevel: Record<number, OctoVariantKey> = {
  1: 'branching',
  2: 'base',
  3: 'remote',
  4: 'rebase',
};
