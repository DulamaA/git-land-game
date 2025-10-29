import { formatTime } from '../../hooks/useTimer';

type HeaderProps = {
  levelId: number | string;
  title: string;
  levelIndex: number;
  totalLevels: number;
  running: boolean;
  seconds: number;
  onToggleTimer: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export default function LevelHeader({
  levelId,
  title,
  levelIndex,
  totalLevels,
  running,
  seconds,
  onToggleTimer,
  onPrev,
  onNext,
}: HeaderProps) {
  return (
    <div className="flex items-center justify-between gap-3">
      <h2 className="text-lg font-semibold leading-snug">
        <span className="block text-slate-500 text-sm font-medium">Level {levelId}</span>
        {title}
      </h2>

      <div className="flex items-center gap-2">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium border
          ${running ? 'bg-violet-600 text-white border-violet-700' : 'bg-slate-100 text-slate-700 border-slate-300'}`}
        >
          ⏱ {formatTime(seconds)}
        </span>

        <button
          onClick={onToggleTimer}
          className={`rounded-lg px-2 py-1 text-sm border transition
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
          onClick={onPrev}
          disabled={levelIndex === 0}
          className="rounded-lg border px-3 py-1 disabled:opacity-40"
        >
          ◀ Föregående
        </button>

        <span className="text-sm text-slate-500">
          {levelIndex + 1} / {totalLevels}
        </span>

        <button
          onClick={onNext}
          disabled={levelIndex === totalLevels - 1}
          className="rounded-lg border px-3 py-1 disabled:opacity-40"
        >
          Nästa ▶
        </button>
      </div>
    </div>
  );
}
