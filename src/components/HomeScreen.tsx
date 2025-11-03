import { useNavigate } from 'react-router-dom';
import { useProgress } from '../state/progress';
import { LEVELS } from '../data/levels';
import { asset } from '../utils/asset';
import GitLandLogo from './GitLandLogo';

export default function HomeScreen() {
  const navigate = useNavigate();
  const { state } = useProgress();
  const done = state.completed;
  const maxDone = done.length ? Math.max(...done) : 0;
  const next = Math.min(LEVELS.length, maxDone + 1);
  const canContinue = maxDone > 0;

  return (
    <header
      className="mx-auto max-w-5xl min-h-[72vh] grid items-center gap-8
        md:gap-12 md:grid-cols-2 px-6 lg:px-8 pt-10 md:pt-12 pb-10 mt-6 md:mt-14">
      <div className="max-w-prose text-left md:text-left">
        <h1 className="sr-only">Git-Land</h1>

        <GitLandLogo className="mb-1" />

        <p className="mt-3 text-base leading-relaxed text-slate-700">
          Ett litet äventyr in i Git-världen. Lös uppgifter steg för steg och lär dig vanliga kommandon i lugn takt
          eller slå på timern om du vill tävla mot klockan.
        </p>

        <ul className="mt-4 space-y-2 text-sm text-slate-700 list-disc pl-5">
          <li>
            Skriv kommandot i rutan och tryck <strong>Kör</strong>.
          </li>
          <li>
            <strong>Tips</strong> visas automatiskt om du kör fel tre gånger.
          </li>
          <li>
            <strong>Reset</strong> startar nivån om från början.
          </li>
          <li>
            <strong>Timer</strong> är frivillig (du kan pausa eller nollställa).
          </li>
          <li>
            <strong>Framsteg sparas automatiskt</strong> i din webbläsare - välj <em>Fortsätt</em> för att hoppa in där
            du slutade.
          </li>
          <li>
            <strong>Repo-status</strong> visar vad som händer i ditt “simulerade-repo”.
          </li>
        </ul>

        <div className="mt-6 flex items-center gap-3 justify-center md:justify-start">
          <button
            onClick={() => navigate(`/game/${next}`)}
            className="rounded-lg bg-green-600 text-white px-4 py-2 shadow
           hover:bg-green-700 active:bg-green-800 transition
            focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
          >
            {canContinue ? 'Fortsätt' : 'Starta'}
          </button>

          {canContinue && (
            <button
              onClick={() => navigate('/levels')}
              className="rounded-lg border border-green-300 bg-green-50 text-green-700 px-4 py-2 text-sm shadow-sm
             hover:bg-green-100 active:bg-green-200 transition
             focus:outline-none focus:ring-2 focus:ring-green-600/40 focus:ring-offset-2"
            >
              Välj nivå
            </button>
          )}
        </div>
      </div>

      <div className="mt-8 md:mt-0 shrink-0 justify-self-center md:justify-self-end pr-0 md:pr-8">
        <img
          src={asset('images/git-cat.png')}
          alt="Git-Lands maskot med laptop"
          width={160}
          height={160}
          loading="lazy"
          decoding="async"
          className="w-44 md:w-48 lg:w-60 h-auto object-contain rounded-xl shadow mx-auto"
        />
      </div>
    </header>
  );
}
