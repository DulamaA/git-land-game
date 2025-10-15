export default function App() {
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
        </header>

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="h-56 grid place-items-center text-slate-400">Spelyta (kommer efter)</div>
        </section>
      </main>
    </div>
  );
}
