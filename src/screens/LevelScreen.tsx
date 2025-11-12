/**
* This file show the level preview screen for a single level.
* It displays the avatar, title, and task list with buttons to play or go back.
* Unlock logic and navigation are handled via progress state and react-router.
*/


import {
  useNavigate, useParams, Link,
} from 'react-router-dom';
import { LEVELS } from '../data/levels';
import { useProgress } from '../state/progress';
import OctocatAvatar from '../components/Game/OctocatAvatar';
import { variantByLevel } from '../utils/octocatVariants';
import TaskList from '../components/Game/TaskList';

type PreviewStep = { text: string };

function toPreviewSteps(level: { steps?: { text: string }[]; tasks?: string[] } | undefined): PreviewStep[] {
  if (!level) {
    return [];
  }
  if (Array.isArray(level.steps) && level.steps.length > 0) {
    return level.steps.map((s) => ({ text: s.text }));
  }
  const tasks = level.tasks ?? [];

  return tasks.map((t) =>
    ({ text: t.replace(/`([^`]+)`/g, '…') }));
}

export default function LevelScreen() {
  const { levelId } = useParams();
  const id = Number(levelId) || 1;
  const level = LEVELS.find((lvl) => lvl.id === id);
  const nav = useNavigate();
  const { state } = useProgress();
  const done = new Set(state.completed);

  if (!level) {
    return (
      <main className="mx-auto max-w-prose px-4 py-10">
        <div className="space-y-3">
          <p className="text-base sm:text-lg">Nivån finns inte.</p>
          <Link to="/levels" className="text-blue-700 underline">← Alla nivåer</Link>
        </div>
      </main>
    );
  }

  const isUnlocked = level.id === 1 || done.has(level.id) || done.has(level.id - 1);
  const variant = variantByLevel[level.id] ?? 'base';
  const bubble = `Level ${level.id}: ${level.title}`;
  const steps = toPreviewSteps(level);

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <section className="rounded-2xl border bg-white p-4 sm:p-6 shadow-sm">
        {/* Topbar */}
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link
            to="/levels"
            className="inline-flex w-full justify-center sm:w-auto rounded-lg
            border px-3 py-2 text-sm hover:bg-slate-50"
          >
            ← Alla nivåer
          </Link>
          <div className="text-center text-sm text-slate-500 sm:text-right">
            {level.id} / {LEVELS.length}
          </div>
        </div>

        {/* Grid layout for avatar and level details */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[240px,1fr]">
          {/* Avatar column */}
          <div className="order-2 lg:order-1 lg:sticky lg:top-4">
            <div className="rounded-2xl p-3 sm:p-4">
              <div className="relative overflow-visible">
                <OctocatAvatar variant={variant} say={bubble} />
              </div>
            </div>
          </div>


          {/* Text/content column */}
          <div className="order-1 lg:order-2 space-y-4">
            <h2 className="text-lg sm:text-xl font-semibold text-balance">
              {level.id}. {level.title}
            </h2>

            {/* Wrap long words/URLs nicely */}
            <div className="break-words hyphens-auto leading-relaxed">
              <TaskList steps={steps} />
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              <button
                onClick={() => isUnlocked && nav(`/game/${level.id}`)}
                disabled={!isUnlocked}
                className={`inline-flex w-full sm:w-auto justify-center rounded-lg px-3 py-2 text-white
                  ${isUnlocked ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-slate-400 cursor-not-allowed'}`}
              >
                {isUnlocked ? 'Spela nivån' : 'Låst'}
              </button>

              <Link
                to="/levels"
                className="inline-flex w-full sm:w-auto justify-center rounded-lg
                border px-3 py-2 text-sm hover:bg-slate-50"
              >
                Till nivåer
              </Link>
            </div>

            {!isUnlocked && (
              <p className="text-sm text-slate-500">
                Denna nivå låses upp när du klarat föregående nivå.
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
