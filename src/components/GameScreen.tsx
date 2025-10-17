import { useMemo, useState } from 'react';
import { LEVELS } from '../data/levels';
import GameButtons from './GameButtons';

type Props = {
  onExit: () => void;
};

export default function GameScreen({ onExit }: Props) {
  const [levelIndex, setLevelIndex] = useState(0);
  const [input, setInput] = useState('');
  const [showHint, setShowHint] = useState(false);

  const level = LEVELS[levelIndex];

  function prevLevel() {
    setLevelIndex((prevIndex) => Math.max(0, prevIndex - 1));
    setInput('');
    setShowHint(false);
  }

  function nextLevel() {
    setLevelIndex((prevIndex) => Math.min(LEVELS.length - 1, prevIndex + 1));
    setInput('');
    setShowHint(false);
  }

  const firstHint = useMemo(() => {
    const firstTask = level.tasks[0] ?? '';
    const m = firstTask.match(/`([^`]+)`/);
    return m ? m[1] : null;
  }, [level]);

  function run() {
    console.log('RUN: ', input);
    setInput('');
  }

  function resetCurrent() {
    setInput('');
    setShowHint(false);
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

      <div className="mt-4">
        <label className="block text-xs uppercase tracking-wide text-slate-500 mb-1">
          Skriv kommandot
        </label>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="> t.ex. git add ."
          className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-600"
        />
      </div>

      <GameButtons
        onRun={run}
        onReset={resetCurrent}
        onHint={() => setShowHint((v) => !v)}
        onExit={onExit}
      />

      {showHint && firstHint && (
        <p className="mt-2 text-sm text-slate-600">
          Hint: <code className="px-1 py-0.5 bg-slate-100 rounded">{firstHint}</code>
        </p>
      )}
    </section>
  );
}
