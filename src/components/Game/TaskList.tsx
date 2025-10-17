export default function TaskList({ tasks }: { tasks: string[] }) {
  return (
    <ol className="mt-2 list-decimal pl-5 space-y-1 text-sm text-slate-700">
      {tasks.map((t, i) => (
        <li key={i}>{t}</li>
      ))}
    </ol>
  );
}
