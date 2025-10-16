import { useState } from 'react';
import HomeScreen from './components/HomeScreen';
import GameScreen from './components/GameScreen';

export default function App() {
  const [started, setStarted] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <main className="mx-auto max-w-3xl p-4">
        {!started ? (
          <HomeScreen onStart={() => setStarted(true)} />
        ) : (
          <GameScreen onExit={() => setStarted(false)} />
        )}
      </main>
    </div>
  );
}
