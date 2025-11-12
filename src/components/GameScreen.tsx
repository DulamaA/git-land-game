/**
* This file show the main game screen with all components combined into the full level view.
* It manages level progression, user input, feedback messages, and UI layout.
* The logic for gameplay and state updates is handled via the useGame and useProgress hooks.
*/


import GameButtons from './GameButtons';
import LevelHeader from './Game/LevelHeader';
import TaskList from './Game/TaskList';
import CommandInput from './Game/CommandInput';
import RepoStatus from './Game/RepoStatus';
import OctocatAvatar from './Game/OctocatAvatar';
import GameFooter from './GameFooter';
import { variantByLevel } from '../utils/octocatVariants';
import type { OctoMood } from '../utils/octocatVariants';
import { talk, pick } from '../utils/octocatTalk';
import { useGame } from '../hooks/useGame';
import { useNavigate, useParams } from 'react-router-dom';
import { useProgress } from '../state/progress';
import {
  useEffect,
  useMemo,
  useState,
} from 'react';


export default function GameScreen() {
  const navigate = useNavigate();
  const { markDone, state } = useProgress();

  const {
    steps,
    taskIndex,
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
    history,
  } = useGame();

  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setInput('');
    setMood('idle');
    setShowSuccess(false);
  }, [levelIndex, setInput]);

  const alreadyDone =
    Array.isArray(state.completed) && state.completed.includes(level.id);

  const { level: levelParam } = useParams();

  useEffect(() => {
    const levelNum = Number(levelParam);
    if (Number.isFinite(levelNum) && levelNum > 0) {
      goToLevel(levelNum);
    }
  }, [levelParam, goToLevel]);

  const [mood, setMood] = useState<OctoMood>('idle');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setInput('');
    setMood('idle');
  }, [levelIndex, setInput]);

  const variant = useMemo(() => variantByLevel[levelIndex + 1] ?? 'base', [levelIndex]);

  const bubble = useMemo(() => {
    if (statusMsg?.type === 'error') {
      return pick(talk.error);
    }
    if (statusMsg?.type === 'ok') {
      return pick(talk.happy);
    }

    const idleInfoTexts = new Set(['Väntar på kommando...', 'Återställd nivå']);
    const isIdleInfo = !statusMsg || (statusMsg.type === 'info' && idleInfoTexts.has(statusMsg.text));

    if (isIdleInfo) {
      return talk.defaultIdle(level.id, level.title);
    }

    if (statusMsg?.type === 'info') {
      return pick(talk.info);
    }

    if (hintStage > 0 && !showSolution) {
      return 'Kolla tipsen här nedan!';
    }
    if (showSolution) {
      return 'Här är lösningen - kör den för att gå vidare.';
    }

    return talk.defaultIdle(level.id, level.title);
  }, [
    statusMsg, hintStage, showSolution, level.id, level.title,
  ]);

  useEffect(() => {
    if (!statusMsg) {
      return;
    }
    if (statusMsg.type === 'error') {
      setMood('error');
    } else if (statusMsg.type === 'ok') {
      setMood('happy');
    } else {
      setMood('idle');
    }
  }, [statusMsg]);

  const handleExit = () => navigate('/');

  const handleRun = () => {
    const finished = run();
    if (finished) {
      markDone(level.id);

      if (levelIndex === totalLevels - 1) {
        navigate('/congrats');

        return;
      }

      setShowSuccess(true);
    }
  };

  const handleRunSolution = () => {
    const finished = runSolution();
    if (finished) {
      markDone(level.id);

      if (levelIndex === totalLevels - 1) {
        navigate('/congrats');

        return;
      }

      setShowSuccess(true);
    }
  };

  const [resetTick, setResetTick] = useState(0);

  const handleReset = () => {
    setMood('idle');
    resetCurrent();
    setResetTick((t) => t + 1);
    setShowSuccess(false);
  };

  const snippetBelowInput =
    (level.id === 12 && steps[taskIndex]?.snippetBelowInput) ||
  steps[taskIndex]?.snippetBelowInput;


  return (
    <>
      <section
        className="mx-auto max-w-[90rem] px-3 sm:px-4 md:px-6 lg:px-12
             mt-10 md:mt-16 lg:mt-28 grid gap-8 lg:gap-10
             md:grid-cols-[minmax(0,1fr),420px]"
      >

        <div className="mx-2 sm:mx-0 rounded-2xl border border-slate-200 bg-white p-5 md:p-7 lg:p-8 shadow-sm min-w-0">
          <div className="pb-4 md:pb-5 mb-6 md:mb-8">
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
                if (!(levelDone || alreadyDone)) {
                  return;
                }
                if (levelIndex < totalLevels - 1) {
                  setMood('idle');
                  nextLevel();
                  navigate(`/game/${level.id + 1}`);
                } else {
                  navigate ('/congrats');
                }
              }}
              canGoNext={levelDone || alreadyDone}
              highlightNext={showSuccess}
            />

            {showSuccess && (
              <div className="mt-4 md:mt-5">
                <div
                  id="next-hint"
                  className="rounded-md border border-emerald-300 bg-emerald-50 px-3 py-2 text-emerald-800
                            text-sm flex items-center gap-2"
                  role="status"
                  aria-live="polite"
                >
                  <span aria-hidden="true" className="inline-flex h-5 w-5 items-center justify-center rounded-full
                                  bg-emerald-600 text-white text-xs">
                    ✓
                  </span>
                  <span>
                    Klart! Tryck <b>Nästa</b> när du är redo. <span aria-hidden>⬆️</span>
                  </span>
                </div>
              </div>
            )}

            <div className="mt-6 md:mt-8">
              <TaskList steps={steps} activeIndex={taskIndex} />
            </div>
          </div>

          <div className="max-w-[48rem] mx-auto pt-4 md:pt-5 space-y-5 md:space-y-6">
            <CommandInput
              key={resetTick}
              value={input}
              onChange={setInput}
              autoFocus
              onEnter={handleRun}
              onEscape={handleReset}
            />

            {snippetBelowInput && (
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm">
                <p className="font-semibold mb-1">Exempelkod</p>
                <pre className="bg-white rounded p-2">
                  <code className="block whitespace-pre-wrap break-words font-mono">
                    {snippetBelowInput}
                  </code>
                </pre>
              </div>
            )}

            {error && (
              <p className="text-sm font-medium text-red-600" role="alert">
                {error}
              </p>
            )}

            {hintStage > 0 && (
              <div className="rounded-xl border border-sky-200 bg-sky-50 p-3 text-sm">
                <p className="font-semibold mb-1">Tips</p>
                <ul className="list-disc pl-5 space-y-1">
                  {hints.slice(0, hintStage).map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            )}

            {showSolution && (
              <div className="rounded-xl border border-amber-300 bg-amber-50 p-3 text-sm">
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
              <GameButtons onRun={handleRun} onReset={handleReset} onExit={handleExit} />
            </div>
          </div>
        </div>

        <div className="mx-2 sm:mx-0 flex flex-col gap-4 md:gap-5 lg:gap-6 md:sticky md:top-8 self-start min-w-0">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 lg:p-8 shadow-sm overflow-visible">
            <div className="flex justify-center">
              <OctocatAvatar variant={variant} say={bubble} mood={mood} />
            </div>
          </div>

          <RepoStatus
            repo={repo}
            message={statusMsg}
            historyItems={history}
            levelId={level.id}
            defaultScope='upto' />
        </div>
      </section>

      <GameFooter />
    </>
  );
}
