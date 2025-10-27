import { useNavigate } from 'react-router-dom';

export default function HomeScreen() {
  const navigate = useNavigate();

  return (
    <header className="mx-auto max-w-5xl min-h-[72vh] grid items-center gap-12 md:grid-cols-2 px-6 lg:px-8 pt-12 pb-10 mt-8 md:mt-14">
      <div className="max-w-prose">
        <h1 className="text-3xl font-bold tracking-tight">Git-Land</h1>
        <p className="mt-3 text-base leading-relaxed text-slate-700">
          Ett litet äventyr in i Git-världen. Lös uppgifter steg för steg och lär dig vanliga
          kommandon i lugn takt eller slå på timern om du vill tävla mot klockan.
        </p>
        <ul className="mt-4 space-y-2 text-sm text-slate-700 list-disc pl-5">
          <li>
            Skriv kommandot i rutan och tryck <strong>Kör</strong>.
          </li>
          <li>
            <strong>Hint</strong> ger en ledtråd (visas automatiskt efter två fel).
          </li>
          <li>
            <strong>Reset</strong> startar nivån om från början.
          </li>
          <li>
            <strong>Timer</strong> är frivillig.
          </li>
          <li>
            <strong>Framsteg sparas automatiskt</strong> i din webbläsare.
          </li>
          <li>
            <strong>Repo-status</strong> visar vad som händer i ditt “simulerat-repo”.
          </li>
        </ul>

        <div className="mt-10 flex items-center gap-3">
          <button
            onClick={() => navigate('/game')}
            className="rounded-lg bg-green-600 text-white px-4 py-2 shadow
           hover:bg-green-700 active:bg-green-800 transition
            focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
          >
            Starta
          </button>
        </div>
      </div>

      <div className="mt-6 md:mt-0 shrink-0 justify-self-end pr-2 md:pr-8">
        <img
          src="/images/git-cat.png"
          alt="Git-Lands maskot med laptop"
          width={160}
          height={160}
          loading="lazy"
          decoding="async"
          className="w-48 lg:w-60 h-auto object-contain rounded-xl shadow"
        />
      </div>
    </header>
  );
}
