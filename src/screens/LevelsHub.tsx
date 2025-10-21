import { Link } from 'react-router-dom';
import { LEVELS } from '../data/levels';
import { useProgress } from '../state/progress';

export default function LevelsHub() {
  const { state, reset } = useProgress()!;
  const done = new Set(state.completed);

  const isUnlocked = (id: number) => id === 1 || done.has(id) || done.has(id - 1);

  return (
    <section className="space-y-4">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Nivåer</h1>
        <button onClick={reset} className="rounded-lg border px-3 py-1.5 text-sm hover:bg-slate-50">
          Återställ
        </button>
      </header>

      <div className="grid gap-3">
        {LEVELS.map((l) => {
          const unlocked = isUnlocked(l.id);
          const finished = done.has(l.id);

          return (
            <Link
              key={l.id}
              to={unlocked ? `/levels/${l.id}` : '#'}
              className={`flex items-center justify-between rounded-xl border p-4 shadow-sm ${
                unlocked
                  ? 'bg-white hover:bg-slate-50'
                  : 'bg-slate-100 cursor-not-allowed opacity-70'
              }`}
            >
              <span>
                {l.id}. {l.title}
              </span>
              <span className="text-sm">
                {finished ? '✔ Klar' : unlocked ? 'Starta →' : 'Låst'}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
