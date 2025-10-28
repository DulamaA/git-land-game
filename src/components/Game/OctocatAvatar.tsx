import type { OctoMood, OctoVariantKey } from '../../utils/octocatVariants';
import { variantFilters, getOctoSrc } from '../../utils/octocatVariants';

type Props = {
  variant: OctoVariantKey;
  say?: string;
  mood?: OctoMood;
};

export default function OctocatAvatar({ variant, say, mood = 'idle' }: Props) {
  const src = getOctoSrc(variant, mood);
  const filterClass = variantFilters[variant] ?? '';
  const moodClass = mood === 'happy' ? 'animate-bounce' : mood === 'error' ? 'animate-shake' : '';

  return (
    <div className="relative flex items-end gap-3">
      {say && (
        <div
          className="max-w-[22rem] rounded-2xl bg-white/90 text-black px-3 py-2 shadow-md text-sm"
          role="status"
          aria-live="polite"
        >
          {say}
        </div>
      )}

      <div className="relative">
        <img
          src={src}
          alt="Octocat avatar"
          className={`h-32 w-32 select-none drop-shadow-lg rounded-xl ${filterClass} ${moodClass}`}
          draggable={false}
        />
      </div>
    </div>
  );
}
