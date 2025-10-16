type Props = {
  onExit: () => void;
};

export default function GameScreen({ onExit }: Props) {
  return (
    <section
      aria-label="Spelyta"
      style={{ marginTop: 24, border: '1px solid #ddd', borderRadius: 12, padding: 24 }}
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
