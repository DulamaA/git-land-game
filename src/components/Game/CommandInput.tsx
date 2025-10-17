type Props = {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
};
export default function CommandInput({ value, onChange, placeholder }: Props) {
  return (
    <div className="mt-4">
      <label className="block text-xs uppercase tracking-wide text-slate-500 mb-1">
        Skriv kommandot
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? '> t.ex. git add .'}
        className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-600"
      />
    </div>
  );
}
