import type { RepoState, StatusMsg } from '../../models/repo';

type Props = {
  repo: RepoState;
  message?: StatusMsg | null;
};

// Component to display the current status of the repository
export default function RepoStatus({ repo, message }: Props) {
  const current = repo.current ?? '-';

  const messageClass =
    message?.type === 'ok' ? 'text-emerald-300' : message?.type === 'error' ? 'text-red-300' : 'text-white';

  const branchEntries = Object.entries(repo.branches ?? {});
  branchEntries.sort(([a], [b]) => {
    if (a === repo.current) {
      return -1;
    }
    if (b === repo.current) {
      return 1;
    }


    return a.localeCompare(b);
  });

  const origin =
    typeof repo.remotes?.origin === 'string' ?
      repo.remotes.origin : repo.remotes?.origin ? 'configured' : null;

  return (
    <aside className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-sm text-sm space-y-4">
      <h3 className="mb-1 text-base font-semibold text-white">Repo-status</h3>

      <div>
        <div className="text-xs font-semibold uppercase tracking-wide text-white/90 mb-1">Senaste</div>
        <div className={messageClass}>{message?.text ?? 'Väntar på kommando...'}</div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-white/90 mb-1">Initierat</div>
          <div className={repo.initialized ? 'text-emerald-300' : 'text-red-300'}>
            {repo.initialized ? 'Ja' : 'Nej'}
          </div>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-white/90 mb-1">Aktiv branch</div>
          <span
            className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs
                       bg-emerald-900/40 border border-emerald-700 text-emerald-200"
          >
            🌿 {current}
          </span>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-white/90 mb-1">Remote “origin”</div>
          <div className="text-white/90">{origin ?? '—'}</div>
        </div>
      </div>

      {/* Branches */}
      <div>
        <div className="text-xs font-semibold uppercase tracking-wide text-white/90 mb-1">Branches</div>
        {branchEntries.length === 0 ? (
          <div className="text-white/90">Inga branches ännu.</div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {branchEntries.map(([b, commitsArr]) => {
              const commits = commitsArr?.length ?? 0;
              const isCurrent = b === repo.current;

              return (
                <span
                  key={b}
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs border ${
                    isCurrent ? 'bg-emerald-900/40 border-emerald-700 text-emerald-200' :
                      'bg-slate-800 border-slate-700 text-white'
                  }`}
                  title={`${b} (${commits} commits)`}
                >
                  🌿 {b}
                  <span className="text-[11px] tabular-nums text-white/70">({commits})</span>
                  {isCurrent && <span className="ml-1 text-white/60">(aktiv)</span>}
                </span>
              );
            })}
          </div>
        )}
      </div>
    </aside>
  );
}