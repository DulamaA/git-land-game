import GameButtons from './GameButtons';
import LevelHeader from './Game/LevelHeader';
import TaskList from './Game/TaskList';
import CommandInput from './Game/CommandInput';
import Hint from './Game/Hint';
import RepoStatus from './Game/RepoStatus';
import { useGame } from '../hooks/useGame';
import { useNavigate, useParams } from 'react-router-dom';
import { useProgress } from '../state/progress';
import { useEffect } from 'react';

export default function GameScreen() {
  // Navigation hook
  const navigate = useNavigate();

  // Progress management hook
  const { markDone } = useProgress();

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

  // Destructure game state and handlers from the useGame hook
  const {
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

  // Render the main game screen layout
  return (
    <section className="mt-6 grid gap-4 md:grid-cols-[1fr_300px]">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
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
              prevLevel();
              navigate(`/game/${level.id - 1}`);
            }
          }}
          onNext={() => {
            if (levelIndex < totalLevels - 1) {
              nextLevel();
              navigate(`/game/${level.id + 1}`);
            }
          }}
        />

        <TaskList tasks={level.tasks} />

        <CommandInput value={input} onChange={setInput} placeholder="> t.ex. git add ." />

        {error && <p className="mt-2 text-sm font-medium text-red-600">{error}</p>}

        <GameButtons
          onRun={handleRun}
          onReset={resetCurrent}
          onHint={() => setShowHint((v) => !v)}
          onExit={handleExit}
        />

        <Hint visible={showHint} hint={firstHint} />
      </div>

      <RepoStatus repo={repo} message={statusMsg} />
    </section>
  );
}
