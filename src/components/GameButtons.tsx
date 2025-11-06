type Props = {
  onRun: () => void;
  onReset: () => void;
  onExit: () => void;
};

export default function GameButtons({
  onRun, onReset, onExit,
}: Props) {
  return (
    <div className="mt-2 flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={onRun}
        className="rounded-full bg-violet-600 text-white px-4 py-1.5 text-sm font-medium shadow
        hover:bg-violet-700 active:bg-violet-800 transition"
      >
        Kör
      </button>

      <button
        type="button"
        onClick={onReset}
        className="rounded-full bg-gray-500 text-white px-4 py-1.5 text-sm font-medium shadow
        hover:bg-gray-600 active:bg-gray-700 transition"
      >
        Återställ
      </button>

      <button
        type="button"
        onClick={onExit}
        className="ml-auto rounded-full bg-red-600 text-white px-5 py-1.5 text-sm font-medium shadow
        hover:bg-red-700 active:bg-red-800 transition"
      >
        Avsluta
      </button>
    </div>
  );
}
