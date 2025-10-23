import { useNavigate, useParams, Link } from 'react-router-dom';
import { LEVELS } from '../data/levels';
import { useProgress } from '../state/progress';
import OctocatAvatar from '../components/Game/OctocatAvatar';
import { variantByLevel } from '../utils/octocatVariants';

// Level screen component displaying level details and navigation
export default function LevelScreen() {
  const { levelId } = useParams();
  const id = Number(levelId) || 1;
  const level = LEVELS.find((lvl) => lvl.id === id);
  const nav = useNavigate();
  const { markDone } = useProgress();

  // If level not found, show error message
  if (!level) {
    return (
      <div className="space-y-3 p-4 sm:p-6">
        <p className="text-base sm:text-lg">Nivån finns inte.</p>
        <Link to="/levels" className="text-blue-700 underline">
          ← Alla nivåer
        </Link>
      </div>
    );
  }

  // Determine if current level is the last one and prepare navigation data
  const isLast = level.id >= LEVELS.length;
  const nextId = Math.min(level.id + 1, LEVELS.length);
  const variant = variantByLevel[level.id] ?? 'base';
  const bubble = `Level ${level.id}: ${level.title}`;

  // Render the level screen layout
  return (
    <section className="rounded-2xl border bg-white p-4 sm:p-6 shadow-sm">
      {/* Topbar */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link
          to="/levels"
          className="inline-flex w-full justify-center sm:w-auto rounded-lg border px-3 py-2 text-sm hover:bg-slate-50"
        >
          ← Alla nivåer
        </Link>

        <div className="text-center text-sm text-slate-500 sm:text-right">
          {level.id} / {LEVELS.length}
        </div>
      </div>

      {/* Grid layout for avatar and level details */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-[auto,1fr]">
        <div className="order-2 md:order-1 md:sticky md:top-4">
          <OctocatAvatar variant={variant} say={bubble} />
        </div>

  
        <div className="order-1 md:order-2 space-y-4">
          <h2 className="text-lg sm:text-xl font-semibold">
            {level.id}. {level.title}
          </h2>
         
         {/* Task list */}
          <ol className="list-decimal space-y-2 pl-5 sm:pl-6">
            {level.tasks.map((t, i) => (
              <li key={i} className="text-sm sm:text-base leading-relaxed">
                {t.split(/`([^`]+)`/g).map((seg, idx) =>
                  idx % 2 ? (
                    <code
                      key={idx}
                      className="rounded bg-slate-200/70 px-1 py-0.5 break-words whitespace-pre-wrap"
                    >
                      {seg}
                    </code>
                  ) : (
                    <span key={idx}>{seg}</span>
                  ),
                )}
              </li>
            ))}
          </ol>

          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <Link
              to={`/game/${level.id}`}
              className="inline-flex w-full sm:w-auto justify-center rounded-lg bg-indigo-600 px-3 py-2 text-white hover:bg-indigo-700"
            >
              Spela nivån
            </Link>
           
           {/* Navigation buttons */}
            <button
              onClick={() => {
                markDone(level.id);
                if (isLast) nav('/levels');
                else nav(`/levels/${nextId}`);
              }}
              className="inline-flex w-full sm:w-auto justify-center rounded-lg bg-emerald-600 px-3 py-2 text-white hover:bg-emerald-700"
            >
              Markera klar → {isLast ? 'Till nivåer' : `Nivå ${nextId}`}
            </button>

            <Link
              to="/levels"
              className="inline-flex w-full sm:w-auto justify-center rounded-lg border px-3 py-2 text-sm hover:bg-slate-50"
            >
              Till nivåer
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
