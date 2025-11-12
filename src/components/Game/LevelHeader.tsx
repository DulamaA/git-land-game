/**
* This file show the level header UI with timer, navigation, title, and progress bar.
* It renders buttons for starting/pausing/resetting the timer and moving between levels.
* The timer and navigation logic is handled outside this file and passed in via props.
*/

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
  canGoNext?: boolean;
  onNext: () => void;
  highlightNext?: boolean;
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
    canGoNext = false,
    onNext,
    highlightNext = false,
  } =
    props;

  const ratioRaw = totalLevels > 0 ? (Number(levelIndex) + 1) / totalLevels : 0;
  const ratio = Math.max(0, Math.min(1, ratioRaw));

  return (
    <div className="flex flex-col gap-4 md:gap-5">
      {/* Top row: timer + nav on the right */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1" /> {/* left spacer */}
        <div className="flex flex-col items-end gap-3">
          <div className="flex items-center gap-2">
            <span
              className={`px-2 py-0.5 rounded-full text-[11px] font-medium border ${
                running ? 'bg-violet-600 text-white border-violet-700' :
                  'bg-slate-100 text-slate-700 border-slate-300'
              }`}
              aria-label="Timer"
              title="Timer"
            >
              ⏱ {formatTime(seconds)}
            </span>

            <button
              onClick={onToggleTimer}
              className={`rounded-md px-2 py-0.5 text-xs border transition ${
                running ? 'bg-violet-50 border-violet-300 text-violet-700 hover:bg-violet-100' :
                  'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
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

          <div className="flex items-center gap-3">
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
              disabled={!canGoNext}
              title={canGoNext ? 'Nästa nivå' : 'Slutför nivån först'}
              aria-disabled={!canGoNext}
              aria-describedby={highlightNext && canGoNext ? 'next-hint' : undefined}
              className={`rounded-md border px-2 py-0.5 text-xs disabled:opacity-40 hover:bg-slate-50 ${
                highlightNext && canGoNext ? 'ring-2 ring-emerald-400 animate-pulse' : ''
              }`}
            >
              Nästa ▶
            </button>
          </div>
        </div>
      </div>

      {/* Title under the controls */}
      <h2
        className="text-lg md:text-xl font-semibold leading-snug text-balance"
        title={`Level ${levelId}: ${title}`}
      >
        <span className="text-slate-500 font-medium">Level {levelId}</span>
        <span className="mx-2">·</span>
        <span>{title}</span>
      </h2>

      {/* Progress bar */}
      <div className="w-full mb-3 md:mb-4">
        <div className="h-1.5 w-full rounded bg-slate-200">
          <div
            className="h-1.5 rounded bg-green-600 transition-[width] duration-300"
            style={{ width: `${(ratio * 100).toFixed(0)}%` }}
            aria-hidden
          />
        </div>
        <span className="sr-only">Progress {Math.round(ratio * 100)} percent</span>
      </div>
    </div>
  );
}
