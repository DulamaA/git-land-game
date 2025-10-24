type TaskListProps = { steps: { text: string }[] };

export default function TaskList({ steps }: TaskListProps) {
  return (
    <ol className="list-decimal pl-6 space-y-2">
      {steps.map((s, i) => (
        <li key={i}>{s.text}</li>
      ))}
    </ol>
  );
}
