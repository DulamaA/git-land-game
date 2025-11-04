import React, {
  useEffect, useMemo, useRef,
} from 'react';
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

type Scope = 'level' | 'upto' | 'all';
type Variant = 'light' | 'dark';

type Props = {
  historyItems: HistoryItem[];
  levelId: number;
  defaultScope?: Scope;
  variant?: Variant;
  className?: string;
};

export default function TerminalPanel({
  historyItems,
  levelId,
  defaultScope = 'upto',
  variant = 'light',
  className = '',
}: Props) {
  const [scope, setScope] = React.useState<Scope>(defaultScope);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const list = useMemo(() => {
    const safe = Array.isArray(historyItems) ? historyItems : [];
    const base =
      scope === 'level' ? safe.filter((h) => h.levelId === levelId) :
        scope === 'upto' ? safe.filter((h) => h.levelId <= levelId) : safe;

    return [...base].sort((a, b) => a.ts - b.ts);
  }, [historyItems, levelId, scope]);

  // auto-scroll to bottom when list is updated
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) {
      return;
    }
    el.scrollTop = el.scrollHeight;
  }, [list.length]);

  const copyAll = async() => {
    const text = list.map((h) => `$ ${h.input}  ${h.ok ? '✅' : '❌'}`).join('\n');
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // ignore
    }
  };

  // Light/dark mode
  const isDark = variant === 'dark';
  const colors = {
    title: isDark ? 'text-white' : 'text-slate-800',
    buttonActive: isDark ? 'bg-white text-slate-900 border-white' : 'bg-slate-900 text-white border-slate-900',
    buttonIdle: isDark ? 'bg-transparent text-white border-slate-500' : 'bg-white text-slate-700 border-slate-300',
    surface: isDark ? 'border-slate-700 bg-slate-950/60' : 'border-slate-200 bg-slate-50',
    prompt: isDark ? 'text-slate-500' : 'text-slate-400',
    cmd: isDark ? 'text-slate-100' : 'text-slate-800',
    ok: isDark ? 'text-emerald-400' : 'text-emerald-600',
    err: isDark ? 'text-red-400' : 'text-red-600',
    empty: isDark ? 'text-slate-400' : 'text-slate-500',
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Header + controls */}
      <div className="flex items-center gap-2">
        <h4 className={`text-sm font-semibold ${colors.title}`}>Terminal</h4>
        <div className="ml-auto flex items-center gap-2 text-[11px]">
          <button
            onClick={() => setScope('level')}
            className={`rounded px-2 py-1 border ${scope === 'level' ? colors.buttonActive : colors.buttonIdle}`}
            title="Visa endast kommandon för aktuell nivå"
            aria-pressed={scope === 'level'}
          >
            Per level
          </button>
          <button
            onClick={() => setScope('upto')}
            className={`rounded px-2 py-1 border ${scope === 'upto' ? colors.buttonActive : colors.buttonIdle}`}
            title="Visa alla kommandon upp till aktuell nivå"
            aria-pressed={scope === 'upto'}
          >
            Upp till nu
          </button>
          <button
            onClick={() => setScope('all')}
            className={`rounded px-2 py-1 border ${scope === 'all' ? colors.buttonActive : colors.buttonIdle}`}
            title="Visa alla kommandon"
            aria-pressed={scope === 'all'}
          >
            All levels
          </button>
          <button
            onClick={copyAll}
            className={`rounded px-2 py-1 border ${colors.buttonIdle}`}
            title="Kopiera visade kommandon"
          >
            Kopiera
          </button>
        </div>
      </div>

      {/* Terminal surface */}
      <div
        ref={scrollRef}
        className={`rounded border p-2 max-h-56 overflow-y-auto ${colors.surface}`}
        role="log"
        aria-live="polite"
      >
        {list.length === 0 ? (
          <p className={`text-[12px] ${colors.empty}`}>Inga kommandon ännu.</p>
        ) : (
          <ul className="font-mono text-[12px] space-y-1">
            {list.map((h, i) => (
              <li key={`${h.ts}-${i}`} className="flex items-center gap-2">
                <span className={`${colors.prompt} select-none`}>$</span>
                <span className={`${colors.cmd} break-words`}>{h.input || '∅'}</span>
                <span className={h.ok ? colors.ok : colors.err}>{h.ok ? '✅' : '❌'}</span>
                <span className={`${colors.prompt} ml-auto`}>
                  {new Date(h.ts).toLocaleTimeString()} • L{h.levelId} S{h.stepIndex + 1}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}