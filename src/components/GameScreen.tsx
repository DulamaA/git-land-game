import GameButtons from './GameButtons';
import LevelHeader from './Game/LevelHeader';
import TaskList from './Game/TaskList';
import CommandInput from './Game/CommandInput';
import Hint from './Game/Hint';
import RepoStatus from './Game/RepoStatus';
import { useGame } from '../hooks/useGame';
import { useNavigate } from 'react-router-dom';

export default function GameScreen() {
  // Navigation hook
  const navigate = useNavigate();

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
    prevLevel,
    nextLevel,
    run,
    resetCurrent,
    toggle,
  } = useGame();

  // Handle exit button click
  const handleExit = () => navigate('/');

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
          onPrev={prevLevel}
          onNext={nextLevel}
        />

        <TaskList tasks={level.tasks} />

        <CommandInput value={input} onChange={setInput} placeholder="> t.ex. git add ." />

        {error && <p className="mt-2 text-sm font-medium text-red-600">{error}</p>}

        <GameButtons
          onRun={run}
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
