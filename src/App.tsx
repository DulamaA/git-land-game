import { useState } from 'react';

export default function App() {
  const [started, setStarted] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <main className="mx-auto max-w-3xl p-4">
        <header>
          <h1 className="text-3xl font-bold tracking-tight">Git-Land</h1>
          <p className="mt-2 max-w-prose text-sm text-slate-600">
            Ett litet äventyr in i git-världen. Läs instruktioner, tryck Start och lös uppgifterna
            steg för steg. Vi börjar superenkelt och bygger på efterhand. Aktivera timern om du vill
            tävla mot klockan, annars ta det lugn och lär dig i din egen takt.
          </p>

          <div>
            {started ? (
              <button onClick={() => setStarted(false)}>Återställ</button>
            ) : (
              <button onClick={() => setStarted(true)}>Starta</button>
            )}
          </div>
        </header>

        <section
          aria-label="Spelyta"
          style={{ marginTop: 24, border: '1px solid #ddd', borderRadius: 12, padding: 24 }}
        >
          <div style={{ marginTop: 8 }}>
            {started && <p>Spelet är igång 🎮</p>}
            {!started && <p>Tryck Start för att börja</p>}
          </div>
        </section>
      </main>
    </div>
  );
}
