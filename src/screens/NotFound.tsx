import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
      <h1 className="text-3xl font-bold text-slate-800">404 - Sidan hittades inte</h1>
      <p className="text-slate-600">Länken kan vara felaktig eller sidan har flyttats.</p>

      <Link
        to="/"
        className="rounded-lg border border-slate-300 px-4 py-2 hover:bg-slate-50 transition"
      >
        ← Till startsidan
      </Link>
    </section>
  );
}
