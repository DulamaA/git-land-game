import { useNavigate, useParams, Link } from 'react-router-dom';
import { LEVELS } from '../data/levels';
import { useProgress } from '../state/progress';

export default function LevelScreen() {
  const { levelId } = useParams();
  const id = Number(levelId);
  const level = LEVELS.find((level) => level.id === id);
  const nav = useNavigate();
  const { markDone } = useProgress()!;

  if (!level) {
    return (
      <div className="space-y-3">
        <p>Nivån finns inte.</p>
        <Link to="/levels" className="text-blue-700 underline">
          ← Alla nivåer
        </Link>
      </div>
    );
  }

  return (
    <section className="rounded-2xl border bg-white p-6 shadow-sm space-y-4">
      <h2 className="text-xl font-semibold">
        {level.id}. {level.title}
      </h2>
      <ol className="list-decimal pl-6 space-y-2">
        {level.tasks.map((t, i) => (
          <li key={i}>
            {t.split(/`([^`]+)`/g).map((seg, idx) =>
              idx % 2 ? (
                <code key={idx} className="rounded bg-slate-200/70 px-1 py-0.5">
                  {seg}
                </code>
              ) : (
                <span key={idx}>{seg}</span>
              ),
            )}
          </li>
        ))}
      </ol>

      <div className="flex gap-2">
        <button
          onClick={() => {
            markDone(level.id);
            nav(`/levels/${level.id + 1}`);
          }}
          className="rounded-lg bg-emerald-600 px-3 py-1.5 text-white"
        >
          Markera klar → Nästa
        </button>
        <Link to="/levels" className="rounded-lg border px-3 py-1.5 text-sm hover:bg-slate-50">
          Till nivåer
        </Link>
      </div>
    </section>
  );
}
