type Props = {
  onStart: () => void;
};

export default function HomeScreen({ onStart }: Props) {
  return (
    <header className="md:flex md:items-start md:justify-between gap-6">
      <div className="max-w-prose">
        <h1 className="text-3xl font-bold tracking-tight">Git-Land</h1>
        <p className="mt-2 text-sm text-slate-600">
          Ett litet äventyr in i git-världen. Läs instruktioner, tryck Start och lös uppgifterna
          steg för steg. Vi börjar superenkelt och bygger på efterhand. Aktivera timern om du vill
          tävla mot klockan, annars ta det lugn och lär dig i din egen takt.
        </p>
        <button
          onClick={onStart}
          className="mt-3 rounded-lg bg-green-600 text-white px-4 py-2 hover:bg-green-700 active:bg-green-800 transition"
        >
          Starta
        </button>
      </div>

      <div className="mt-4 md:mt-0 shrink-0">
        <img
          src="/images/git-cat.png"
          alt="Git-Lands maskot med laptop"
          width={160}
          height={160}
          loading="lazy"
          decoding="async"
          className="w-40 h-40 object-contain mx-auto md:mx-0"
        />
      </div>
    </header>
  );
}
