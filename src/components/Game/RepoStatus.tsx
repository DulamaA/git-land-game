import type { RepoState, StatusMsg } from '../../models/repo';

// Component to display the current status of the repository
export default function RepoStatus({
  repo,
  message,
}: {
  repo: RepoState;
  message: StatusMsg | null;
}) {
    // Get the list of branches and the current branch
  const branches = Object.keys(repo.branches);
  const currentBranch = repo.current;

  // Determine the color based on the message type
  const color =
    message?.type === 'ok'
      ? 'text-emerald-700'
      : message?.type === 'error'
        ? 'text-red-700'
        : 'text-slate-600';

  return (
    // Render the repository status panel
    <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm text-sm">
      <div className="mb-2 font-semibold">Repo-status</div>

      <div className="mb-3">
        <div className="text-slate-500">Senaste:</div>
        <div className={color}>{message?.text ?? 'Väntar på kommando...'}</div>
      </div>

      <div className="grid gap-2">
        <div>
          <span className="text-slate-500">Initierat: </span>
          <span className={repo.initialized ? 'text-emerald-700' : 'text-red-700'}>
            {repo.initialized ? 'Ja' : 'Nej'}
          </span>
        </div>

        <div>
          <span className="text-slate-500">Brancher: </span>
          <ul className="mt-1 space-y-1">
            {branches.length === 0 && <li className="text-slate-500">-</li>}
            {branches.map((b) => (
              <li key={b} className={b === currentBranch ? 'font-medium' : ''}>
                {b}
                {''}
                <span className="text-slate-400">({repo.branches[b]?.length ?? 0} commits=)</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}
