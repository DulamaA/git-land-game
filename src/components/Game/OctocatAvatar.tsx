import type { OctoVariantKey } from '../../utils/octocatVariants';
import { badgeEmoji, variantFilters } from '../../utils/octocatVariants';

type Props = {
  variant: OctoVariantKey;
  say?: string;
  mood?: 'idle' | 'happy' | 'oops';
};

export default function OctocatAvatar({ variant, say, mood = 'idle' }: Props) {
  const src = '/images/git-cat.png';
  const filterClass = variantFilters[variant] ?? '';
  const moodClass = mood === 'happy' ? 'animate-bounce' : mood === 'oops' ? 'animate-shake' : '';

  return (
    <div className="relative flex items-end gap-3">
      {say && (
        <div className="max-w-[22rem] rounded-2xl bg-white/90 text-black px-3 py-2 shadow-md text-sm">
          {say}
        </div>
      )}

      <div className="relative">
        <span className="absolute -right-2 -top-2 select-none rounded-full bg-black/50 px-2 py-0.5 text-white text-xs">
          {badgeEmoji[variant]}
        </span>

        <img
          src={src}
          alt="Octocat"
          className={`h-32 w-32 select-none drop-shadow-lg rounded-xl ${filterClass} ${moodClass}`}
          draggable={false}
        />
      </div>
    </div>
  );
}
