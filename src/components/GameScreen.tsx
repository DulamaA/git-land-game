import { LEVELS } from '../data/levels';

type Props = {
  onExit: () => void;
};

export default function GameScreen({ onExit }: Props) {
  const level = LEVELS[0];

  return (
    <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold">
        Level {level.id}: {level.title}
      </h2>

      <ol className="mt-2 list-decimal pl-5 space-y-1 text-sm text-slate-700">
        {level.tasks.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ol>

      <button
        onClick={onExit}
        className="mt-3 rounded-lg bg-red-600 text-white px-4 py-2 hover:bg-red-700 active:bg-red-800 transition"
      >
        Avsluta
      </button>
    </section>
  );
}
