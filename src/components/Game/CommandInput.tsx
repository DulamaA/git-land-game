/**
 * Renders the text input for entering commands and handles keyboard events.
 * Enter → onEnter, Escape → onEscape. Label is linked via htmlFor/id for a11y.
 */

type Props = {
  value: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (v: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
  onEnter?: () => void;
  onEscape?: () => void;
};

export default function CommandInput({
  value,
  onChange,
  placeholder,
  autoFocus,
  onEnter,
  onEscape,
}: Props) {
  return (
    <div className="mt-4">
      <label
        htmlFor="command-input"
        className="block text-xs uppercase tracking-wide text-slate-500 mb-1"
      >
        Skriv kommandot
      </label>

      <div className="flex items-center gap-2">
        <span className="select-none font-mono text-slate-500">&gt;</span>

        <input
          id="command-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder ?? 't.ex. git init'}
          autoFocus={autoFocus}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              onEnter?.();
            } else if (e.key === 'Escape') {
              e.preventDefault();
              onEscape?.();
            }
          }}
          className="flex-1 rounded-lg border px-3 py-2 font-mono text-sm
           focus:outline-none focus:ring-2 focus:ring-violet-600"
        />
      </div>
    </div>
  );
}
