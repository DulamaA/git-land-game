/**
* This file show the Octocat avatar with variant and mood, and an optional speech bubble.
* It gets the image source and filter classes from the octocatVariants utilities.
* The mood animations and asset mapping are handled in the utils; parents pass text via props.
*/

import type { OctoMood, OctoVariantKey } from '../../utils/octocatVariants';
import { variantFilters, getOctoSrc } from '../../utils/octocatVariants';

type Props = {
  variant: OctoVariantKey;
  say?: string;
  mood?: OctoMood;
};

export default function OctocatAvatar({
  variant, say, mood = 'idle',
}: Props) {
  const src = getOctoSrc(variant, mood);
  const filterClass = variantFilters[variant] ?? '';
  const moodClass = mood === 'happy' ? 'animate-bounce' : mood === 'error' ? 'animate-shake' : '';

  return (
    <div className="relative flex flex-col sm:flex-row items-center sm:items-end gap-3">
      {say && (
        <div className="relative">
          <div
            className="relative max-w-[18rem] sm:max-w-[22rem] rounded-2xl bg-violet-600 text-white px-3 py-2 shadow-md
                       border border-violet-700 text-sm leading-snug break-words
                       text-center sm:text-left"
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

      {/* Ensure the image always has space and can’t collapse */}
      <div className="relative min-h-[96px]">
        <img
          src={src}
          alt="Octocat avatar"
          className={`h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 object-contain
                      select-none drop-shadow-lg rounded-xl ${filterClass} ${moodClass}`}
          draggable={false}
        />
      </div>
    </div>
  );
}
