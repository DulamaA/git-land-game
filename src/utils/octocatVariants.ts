export type OctoVariantKey = 'base' | 'branching' | 'remote' | 'rebase';

export const variantByLevel: Record<number, OctoVariantKey> = {
  1: 'branching',
  2: 'base',
  3: 'remote',
  4: 'rebase',
};

export const variantFilters: Record<OctoVariantKey, string> = {
  base: '',
  branching: 'filter saturate-125',
  remote: 'filter hue-rotate-15',
  rebase: 'filter contrast-110',
};

export const badgeEmoji: Record<OctoVariantKey, string> = {
  base: '🐙',
  branching: '🌿',
  remote: '📡',
  rebase: '🧹',
};