import GameButtons from './GameButtons';
import LevelHeader from './Game/LevelHeader';
import TaskList from './Game/TaskList';
import CommandInput from './Game/CommandInput';
import RepoStatus from './Game/RepoStatus';
import OctocatAvatar from './Game/OctocatAvatar';
import { variantByLevel } from '../utils/octocatVariants';
import type { OctoMood } from '../utils/octocatVariants';
import { talk, pick } from '../utils/octocatTalk';
import { useGame } from '../hooks/useGame';
import { useNavigate, useParams } from 'react-router-dom';
import { useProgress } from '../state/progress';
import { useEffect, useMemo, useState } from 'react';

export default function GameScreen() {
  const navigate = useNavigate();
  const { markDone } = useProgress();

  const {
    steps,
    levelIndex,
    level,
    input,
    error,
    seconds,
    running,
    totalLevels,
    repo,
    statusMsg,
    setInput,
    goToLevel,
    prevLevel,
    nextLevel,
    run,
    runSolution,
    resetCurrent,
    toggle,
    resetTimer,
    levelDone,
    hints,
    hintStage,
    showSolution,
    solutionText,
    locked,
  } = useGame();

  const { level: levelParam } = useParams();

  useEffect(() => {
    const levelNum = Number(levelParam);
    if (Number.isFinite(levelNum) && levelNum > 0) goToLevel(levelNum);
  }, [levelParam, goToLevel]);

  const [mood, setMood] = useState<OctoMood>('idle');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setInput('');
    setMood('idle');
  }, [levelIndex, setInput]);

  const variant = useMemo(() => variantByLevel[levelIndex + 1] ?? 'base', [levelIndex]);

  const bubble = useMemo(() => {
    if (statusMsg?.type === 'error') return pick(talk.error);
    if (statusMsg?.type === 'ok') return pick(talk.happy);

    const idleInfoTexts = new Set(['Väntar på kommando...', 'Återställd nivå']);
    const isIdleInfo =
      !statusMsg || (statusMsg.type === 'info' && idleInfoTexts.has(statusMsg.text));

    if (isIdleInfo) {
      return talk.defaultIdle(level.id, level.title);
    }

    if (statusMsg?.type === 'info') return pick(talk.info);

    if (hintStage > 0 && !showSolution) return 'Kolla tipsen här nedan!';
    if (showSolution) return 'Här är lösningen - kör den för att gå vidare.';

    return talk.defaultIdle(level.id, level.title);
  }, [statusMsg, hintStage, showSolution, level.id, level.title]);

  useEffect(() => {
    if (!statusMsg) return;
    if (statusMsg.type === 'error') setMood('error');
    else if (statusMsg.type === 'ok') setMood('happy');
    else setMood('idle');
  }, [statusMsg]);

  const handleExit = () => navigate('/');

  const handleRun = () => {
    const finished = run();
    if (finished) {
      markDone(level.id);
      if (levelIndex < totalLevels - 1) {
        nextLevel();
        navigate(`/game/${level.id + 1}`);
      } else {
        navigate('/');
      }
    }
  };

  const handleRunSolution = () => {
    const finished = runSolution();
    if (finished) {
      markDone(level.id);
      if (levelIndex < totalLevels - 1) {
        nextLevel();
        navigate(`/game/${level.id + 1}`);
      } else {
        navigate('/');
      }
    }
  };

  const [resetTick, setResetTick] = useState(0);

  const handleReset = () => {
    setMood('idle');
    resetCurrent();
    setResetTick((t) => t + 1);
  };

  return (
    <section className="mx-auto max-w-[90rem] px-3 sm:px-4 md:px-6 lg:px-12 mt-10 md:mt-16 lg:mt-28 grid gap-4 sm:gap-6 md:gap-10 md:grid-cols-2">
      <div className="mx-2 sm:mx-0 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 md:p-6 lg:p-10 shadow-sm min-w-0">
        <div className="pb-2 mb-4">
          <LevelHeader
            levelId={level.id}
            title={level.title}
            levelIndex={levelIndex}
            totalLevels={totalLevels}
            running={running}
            seconds={seconds}
            onToggleTimer={toggle}
            onResetTimer={resetTimer}
            onPrev={() => {
              if (levelIndex > 0) {
                setMood('idle');
                prevLevel();
                navigate(`/game/${level.id - 1}`);
              }
            }}
            onNext={() => {
              if (!levelDone) return;
              if (levelIndex < totalLevels - 1) {
                setMood('idle');
                nextLevel();
                navigate(`/game/${level.id + 1}`);
              }
            }}
          />

          <div className="mt-3">
            <TaskList steps={steps} />
          </div>
        </div>

        <div className="space-y-4 mt-6">
          <CommandInput
            key={resetTick}
            value={input}
            onChange={setInput}
            placeholder="> t.ex. git add ."
            autoFocus
            onEnter={handleRun}
            onEscape={handleReset}
            // readOnly={locked}
          />

          {error && (
            <p className="mt-2 text-sm font-medium text-red-600" role="alert">
              {error}
            </p>
          )}

          {hintStage > 0 && (
            <div className="mt-3 rounded-xl border border-sky-200 bg-sky-50 p-3 text-sm">
              <p className="font-semibold mb-1">Tips</p>
              <ul className="list-disc pl-5 space-y-1">
                {hints.slice(0, hintStage).map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>
          )}

          {showSolution && (
            <div className="mt-3 rounded-xl border border-amber-300 bg-amber-50 p-3 text-sm">
              <p className="font-semibold mb-1">Lösning</p>
              <p className="mb-2">
                Kör kommandot för att komma vidare:
                <br />
                <code className="px-2 py-1 bg-white rounded">{solutionText || '—'}</code>
              </p>
              <button
                onClick={handleRunSolution}
                className="rounded-lg px-3 py-1.5 bg-amber-500 text-white hover:opacity-90"
              >
                Kör lösningen åt mig
              </button>
              {locked && (
                <p className="mt-2 text-amber-700">
                  Du har nått max antal försök. Skriv kommandot själv eller klicka knappen.
                </p>
              )}
            </div>
          )}

          <div className="pt-1">
            <GameButtons
              onRun={handleRun}
              onReset={handleReset}
              onHint={() => {
                if (hintStage > 0)
                  window.scrollTo({ top: window.scrollY + 350, behavior: 'smooth' });
              }}
              onExit={handleExit}
            />
          </div>
        </div>
      </div>

      <div className="mx-2 sm:mx-0 flex flex-col gap-4 md:sticky md:top-8 self-start min-w-0">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 lg:p-8 shadow-sm">
          <OctocatAvatar variant={variant} say={bubble} mood={mood} />
        </div>
        <RepoStatus repo={repo} message={statusMsg} />
      </div>
    </section>
  );
}
