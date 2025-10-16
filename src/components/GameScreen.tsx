import { useState } from 'react';
import { LEVELS } from '../data/levels';

type Props = {
  onExit: () => void;
};

export default function GameScreen({ onExit }: Props) {
  const [levelIndex, setLevelIndex] = useState(0);
  const level = LEVELS[levelIndex];

  function prevLevel() {
    setLevelIndex((prevIndex) => Math.max(0, prevIndex - 1));
  }
  function nextLevel() {
    setLevelIndex((prevIndex) => Math.min(LEVELS.length - 1, prevIndex + 1));
  }

  return (
    <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">
          Level {level.id}: {level.title}
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={prevLevel}
            disabled={levelIndex === 0}
            className="rounded-lg border px-3 py-1 disabled:opacity-40"
          >
            ◀ Föregående
          </button>
          <span className="text-sm text-slate-500">
            {levelIndex + 1} / {LEVELS.length}
          </span>
          <button
            onClick={nextLevel}
            disabled={levelIndex === LEVELS.length - 1}
            className="rounded-lg border px-3 py-1 disabled:opacity-40"
          >
            Nästa ▶
          </button>
        </div>
      </div>

      <ol className="mt-2 list-decimal pl-5 space-y-1 text-sm text-slate-700">
        {level.tasks.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ol>

      <div className="mt-4 flex items-center gap-2">
        <button
          onClick={onExit}
          className="mt-3 rounded-lg bg-red-600 text-white px-4 py-2 hover:bg-red-700 active:bg-red-800 transition"
        >
          Avsluta
        </button>
      </div>
    </section>
  );
}
