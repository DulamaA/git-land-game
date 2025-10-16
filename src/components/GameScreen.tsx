type Props = {
  onExit: () => void;
};

export default function GameScreen({ onExit }: Props) {
  return (
    <section
      aria-label="Spelyta"
      className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <p>🎮 Spelet är igång</p>
      <button
        onClick={onExit}
        className="mt-3 rounded-lg bg-red-600 text-white px-4 py-2 hover:bg-red-700 active:bg-red-800 transition"
      >
        Avsluta
      </button>
    </section>
  );
}
