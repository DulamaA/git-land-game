export default function FinishGame() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16 text-center">
      <div className="relative inline-block">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800">
          🎉 Grattis! Du är klar! 🎉
        </h1>
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-visible">
          {[...Array(40)].map((_, i) => (
            <span
              key={i}
              className="absolute text-xl animate-[fall_1200ms_linear_forwards] opacity-0"
              style={{
                left: `${(i * 23) % 100}%`,
                animationDelay: `${(i % 10) * 80}ms`,
              }}
            >
              {['🎊', '🎉', '✨', '💫', '🎈'][i % 5]}
            </span>
          ))}
        </div>
      </div>

      <p className="mt-4 text-slate-600">Du har tagit dig igenom alla nivåer. Snyggt jobbat!</p>

      <div className="mt-8 flex justify-center gap-3">
        <a
          href={import.meta.env.BASE_URL}
          className="rounded-lg bg-violet-600 text-white px-4 py-2"
        >
          Gå till startsidan
        </a>
        <a href={`${import.meta.env.BASE_URL}levels`} className="rounded-lg border px-4 py-2">
          Spela nivåer igen
        </a>
      </div>

      <style>{`
        @keyframes fall {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translateY(280px) rotate(240deg); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
