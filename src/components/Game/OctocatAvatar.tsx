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
        <div className="relative">
          <div
            className="relative max-w-[22rem] rounded-2xl bg-violet-600 text-white px-3 py-2 shadow-md
                 border border-violet-700 text-sm"
            role="status"
            aria-live="polite"
          >
            {say}

            <span
              className="pointer-events-none absolute -bottom-1.5 right-4 block h-3 w-3 rotate-45
                   bg-violet-600 border-b border-r border-violet-700"
              aria-hidden="true"
            />
          </div>
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
