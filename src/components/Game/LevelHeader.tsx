import { formatTime } from '../../hooks/useTimer';

type HeaderProps = {
  levelId: number | string;
  title: string;
  levelIndex: number;
  totalLevels: number;
  running: boolean;
  seconds: number;
  onToggleTimer: () => void;
  onResetTimer: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export default function LevelHeader(props: HeaderProps) {
  const {
    levelId,
    title,
    levelIndex,
    totalLevels,
    running,
    seconds,
    onToggleTimer,
    onResetTimer,
    onPrev,
    onNext,
  } = props;

  const ratioRaw = totalLevels > 0 ? (Number(levelIndex) + 1) / totalLevels : 0;
  const ratio = Math.max(0, Math.min(1, ratioRaw));

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <h2 className="text-lg font-semibold leading-snug">
        <span className="block text-slate-500 text-sm font-medium">Level {levelId}</span>
        <span className="block">{title}</span>
      </h2>

      <div className="mt-2 w-full">
        <div className="h-1.5 w-full rounded bg-slate-200">
          <div
            className="h-1.5 rounded bg-green-600 transition-[width] duration-300"
            style={{ width: `${(ratio * 100).toFixed(0)}%` }}
            aria-hidden
          />
        </div>
        <span className="sr-only">Progress {Math.round(ratio * 100)} percent</span>
      </div>

      <div className="flex flex-col items-start sm:items-end gap-4">
        <div className="flex items-center gap-2 mb-1">
          <span
            className={`px-2 py-0.5 rounded-full text-[11px] font-medium border
              ${
                running
                  ? 'bg-violet-600 text-white border-violet-700'
                  : 'bg-slate-100 text-slate-700 border-slate-300'
              }`}
            aria-label="Timer"
            title="Timer"
          >
            ⏱ {formatTime(seconds)}
          </span>

          <button
            onClick={onToggleTimer}
            className={`rounded-md px-2 py-0.5 text-xs border transition
              ${
                running
                  ? 'bg-violet-50 border-violet-300 text-violet-700 hover:bg-violet-100'
                  : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
            title="Slå på/av timer"
          >
            {running ? 'Pausa' : 'Timer på'}
          </button>

          <button
            onClick={onResetTimer}
            className="rounded-md px-2 py-0.5 text-xs border border-slate-300 text-slate-600 hover:bg-slate-50"
            title="Nollställ timer"
          >
            ↺ Nollställ
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onPrev}
            disabled={levelIndex === 0}
            className="rounded-md border px-2 py-0.5 text-xs disabled:opacity-40 hover:bg-slate-50"
            title="Föregående nivå"
          >
            ◀ Föregående
          </button>

          <span className="text-xs text-slate-500 tabular-nums">
            {levelIndex + 1} / {totalLevels}
          </span>

          <button
            onClick={onNext}
            disabled={levelIndex === totalLevels - 1}
            className="rounded-md border px-2 py-0.5 text-xs disabled:opacity-40 hover:bg-slate-50"
            title="Nästa nivå"
          >
            Nästa ▶
          </button>
        </div>
      </div>
    </div>
  );
}
