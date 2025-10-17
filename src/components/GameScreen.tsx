import GameButtons from './GameButtons';
import LevelHeader from './Game/LevelHeader';
import TaskList from './Game/TaskList';
import CommandInput from './Game/CommandInput';
import Hint from './Game/Hint';
import { useGame } from '../hooks/useGame';

type Props = { onExit: () => void };

export default function GameScreen({ onExit }: Props) {
  const {
    levelIndex,
    level,
    input,
    showHint,
    firstHint,
    seconds,
    running,
    totalLevels,
    setInput,
    setShowHint,
    prevLevel,
    nextLevel,
    run,
    resetCurrent,
    toggle,
  } = useGame();

  return (
    <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
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

      <GameButtons
        onRun={run}
        onReset={resetCurrent}
        onHint={() => setShowHint((v) => !v)}
        onExit={onExit}
      />

      <Hint visible={showHint} hint={firstHint} />
    </section>
  );
}
