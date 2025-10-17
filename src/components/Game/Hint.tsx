export default function Hint({ visible, hint }: { visible: boolean; hint: string | null }) {
  if (!visible || !hint) return null;
  return (
    <p className="mt-2 text-sm text-slate-600">
      Hint: <code className="px-1 py-0.5 bg-slate-100 rounded">{hint}</code>
    </p>
  );
}
