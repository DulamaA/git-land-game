type Props = {
  onRun: () => void;
  onReset: () => void;
  onHint: () => void;
  onExit: () => void;
  canGoNext?: boolean;
  onNext?: () => void;
};

export default function GameButtons({ onRun, onReset, onHint, onExit, canGoNext, onNext }: Props) {
  return (
    <div className="mt-2 flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={onRun}
        className="rounded-full bg-violet-600 text-white px-4 py-1.5 text-sm font-medium shadow hover:bg-violet-700 active:bg-violet-800 transition"
      >
        Kör
      </button>

      <button
        type="button"
        onClick={onReset}
        className="rounded-full bg-gray-500 text-white px-4 py-1.5 text-sm font-medium shadow hover:bg-gray-600 active:bg-gray-700 transition"
      >
        Reset
      </button>

      <button
        type="button"
        onClick={onHint}
        className="rounded-full bg-yellow-400 text-white px-4 py-1.5 text-sm font-medium shadow hover:bg-yellow-500 active:bg-yellow-600 transition"
      >
        Hint
      </button>

      {canGoNext && onNext && (
        <button
          type="button"
          onClick={onNext}
          className="rounded-full bg-emerald-600 text-white px-4 py-1.5 text-sm font-medium shadow hover:bg-emerald-700 active:bg-emerald-800 transition"
        >
          Nästa ▶
        </button>
      )}

      <button
        type="button"
        onClick={onExit}
        className="ml-auto rounded-full bg-red-600 text-white px-5 py-1.5 text-sm font-medium shadow hover:bg-red-700 active:bg-red-800 transition"
      >
        Avsluta
      </button>
    </div>
  );
}
