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
      <button onClick={onExit}>Avsluta</button>
    </section>
  );
}
