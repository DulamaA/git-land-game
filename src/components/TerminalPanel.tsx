import { useMemo, useState } from 'react';
import type { StatusMsg } from '../models/repo';

export type HistoryItem = {
  ts: number;
  levelId: number;
  stepIndex: number;
  input: string;
  matched?: string | null;
  ok: boolean;
  message: StatusMsg;
};

type Props = {
  history: HistoryItem[];
  levelId: number;
  defaultScope?: 'level' | 'all';
};

export default function TerminalPanel({
  history, levelId, defaultScope = 'level',
}: Props) {
  const [scope, setScope] = useState<'level' | 'all'>(defaultScope);

  const list = useMemo(() => {
    const base = scope === 'level' ? history.filter((h) => h.levelId === levelId) : history;

    return [...base].sort((a, b) => a.ts - b.ts);
  }, [history, levelId, scope]);

  const copyAll = async() => {
    const text = list.map((h) => `$ ${h.input}  ${h.ok ? '✅' : '❌'}`).join('\n');
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // ignore
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 lg:p-6 shadow-sm">
      <div className="mb-2 flex items-center gap-2">
        <h3 className="text-base font-semibold text-slate-800">Terminal</h3>
        <div className="ml-auto flex items-center gap-2 text-xs">
          <button
            onClick={() => setScope('level')}
            className={`rounded px-2 py-1 border ${
              scope === 'level' ? 'bg-slate-900 text-white border-slate-900' :
                'bg-white text-slate-700 border-slate-300'
            }`}
            title="Visa endast kommandon för aktuell nivå"
          >
            Per level
          </button>
          <button
            onClick={() => setScope('all')}
            className={`rounded px-2 py-1 border ${
              scope === 'all' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-700 border-slate-300'
            }`}
            title="Visa kommandon för hela spelet"
          >
            All levels
          </button>
          <button
            onClick={copyAll}
            className="rounded px-2 py-1 border bg-white text-slate-700 border-slate-300"
            title="Kopiera visade kommandon"
          >
            Kopiera
          </button>
        </div>
      </div>

      {list.length === 0 ? (
        <p className="text-sm text-slate-500">Inga kommandon ännu.</p>
      ) : (
        <ul className="font-mono text-xs space-y-1 max-h-56 overflow-y-auto
        rounded border border-slate-200 bg-slate-50 p-2">
          {list.map((h, i) => (
            <li key={`${h.ts}-${i}`} className="flex items-center gap-2">
              <span className="text-slate-400 select-none">$</span>
              <span className="text-slate-800 break-words">{h.input || '∅'}</span>
              <span className={h.ok ? 'text-emerald-600' : 'text-red-600'}>{h.ok ? '✅' : '❌'}</span>
              <span className="ml-auto text-slate-400">
                {new Date(h.ts).toLocaleTimeString()}
                {scope === 'all' && (
                  <span>
                    {' '}
                    • L{h.levelId} S{h.stepIndex + 1}
                  </span>
                )}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}