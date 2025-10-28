import GameButtons from './GameButtons';
import LevelHeader from './Game/LevelHeader';
import TaskList from './Game/TaskList';
import CommandInput from './Game/CommandInput';
import Hint from './Game/Hint';
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
  // Navigation hook
  const navigate = useNavigate();

  // Progress management hook
  const { markDone } = useProgress();

  // Destructure game state and handlers from the useGame hook
  const {
    steps,
    levelIndex,
    level,
    input,
    showHint,
    firstHint,
    error,
    seconds,
    running,
    totalLevels,
    repo,
    statusMsg,
    setInput,
    setShowHint,
    goToLevel,
    prevLevel,
    nextLevel,
    run,
    resetCurrent,
    toggle,
  } = useGame();

  // Sync level from URL param on mount
  const { level: levelParam } = useParams();

  useEffect(() => {
    const levelNum = Number(levelParam);
    if (Number.isFinite(levelNum) && levelNum > 0) {
      goToLevel(levelNum);
    }
  }, [levelParam, goToLevel]);

  //Simple motion: bounce on info, shake on error, then return to idle
  const [mood, setMood] = useState<OctoMood>('idle');

  //Mobil scroll + Delete hint/input after changing the level
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setShowHint(false);
    setInput('');
    setMood('idle');
  }, [levelIndex, setInput, setShowHint]);

  //Octocat variant + speech bubble
  const variant = useMemo(() => variantByLevel[levelIndex + 1] ?? 'base', [levelIndex]);

  const bubble = useMemo(() => {
    if (statusMsg?.type === 'error') return pick(talk.error);
    if (statusMsg?.type === 'info') return pick(talk.info);
    if (showHint) return 'Kolla Hint-rutan för en ledtråd!';
    return talk.defaultIdle(level.id, level.title);
  }, [statusMsg, showHint, level.id, level.title]);

  //Update mood after result(no auto-reset)
  useEffect(() => {
    if (!statusMsg) return;
    if (statusMsg.type === 'error') setMood('error');
    else if (statusMsg.type === 'info') setMood('happy');
  }, [statusMsg]);

  const handleExit = () => navigate('/');

  // Handler for running the current command
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

  // Render the main game screen layout
  return (
    <section className="mx-auto max-w-[90rem] px-3 sm:px-4 md:px-6 lg:px-12 mt-10 md:mt-16 lg:mt-28 grid gap-4 sm:gap-6 md:gap-10 md:grid-cols-2">
      <div className="mx-2 sm:mx-0 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 md:p-6 lg:p-10 shadow-sm min-w-0">
        <LevelHeader
          levelId={level.id}
          title={level.title}
          levelIndex={levelIndex}
          totalLevels={totalLevels}
          running={running}
          seconds={seconds}
          onToggleTimer={toggle}
          onPrev={() => {
            if (levelIndex > 0) {
              setMood('idle');
              setShowHint(false);
              prevLevel();
              navigate(`/game/${level.id - 1}`);
            }
          }}
          onNext={() => {
            if (levelIndex < totalLevels - 1) {
              setMood('idle');
              setShowHint(false);
              nextLevel();
              navigate(`/game/${level.id + 1}`);
            }
          }}
        />

        <TaskList steps={steps} />

        <CommandInput value={input} onChange={setInput} placeholder="> t.ex. git add ." />

        {error && <p className="mt-2 text-sm font-medium text-red-600" role="alert">{error}</p>}

        {showHint && <Hint visible={showHint} hint={firstHint} />}

        <GameButtons
          onRun={handleRun}
          onReset={resetCurrent}
          onHint={() => setShowHint((v) => !v)}
          onExit={handleExit}
        />
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
