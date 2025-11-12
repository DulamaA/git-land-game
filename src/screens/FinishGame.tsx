/**
* This file show the finish screen that congratulates the player and offers navigation.
* It displays a simple confetti animation and links to home or the level list.
* The screen is presentational; game state and progress are handled elsewhere.
*/


import { Link } from 'react-router-dom';

export default function FinishGame() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16 text-center relative">
      <h1 className="text-3xl font-extrabold text-slate-800">🎉 Grattis! Du är klar! 🎉</h1>
      <p className="mt-3 text-slate-600">Du har tagit dig igenom alla nivåer. Snyyggt jobbat!</p>

      <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 overflow-visible">
        {[...Array(48)].map((_, i) => (
          <span
            key={i}
            className="absolute text-2xl animate-[confetti_1200ms_linear_forwards]"
            style={{
              left: `${(i * 19) % 100}%`,
              top: '-16px',
              animationDelay: `${(i % 12) * 70}ms`,
              opacity: 0,
            }}
            aria-hidden
          >
            {[
              '🎊', '🎉', '✨', '💫', '🎈',
            ][i % 5]}
          </span>
        ))}
      </div>

      <div className="mt-8 flex justify-center gap-3">
        <Link to="/" className="rounded-lg bg-violet-600 text-white px-4 py-2 hover:bg-violet-700">
          Gå till startsidan
        </Link>
        <Link to="/levels" className="rounded-lg border px-4 py-2 hover:bg-slate-50">
          Spela nivåer igen
        </Link>
      </div>

      <style>{`
        @keyframes confetti {
          0%   { transform: translateY(-10px) rotate(0deg);   opacity: 0; }
          10%  { opacity: 1; }
          100% { transform: translateY(320px) rotate(260deg); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
