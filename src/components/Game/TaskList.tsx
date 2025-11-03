type TaskListProps = {
  steps: { text: string }[];
  activeIndex?: number;
};

export default function TaskList({ steps, activeIndex }: TaskListProps) {
  return (
    <ol className="list-decimal pl-6 space-y-2">
      {steps.map((s, i) => {
        const active = i === activeIndex;

        return (
          <li key={i} className={active ? 'font-semibold text-violet-700' : undefined}>
            {active ? <span className="mr-1">➜</span> : null}
            {s.text}
          </li>
        );
      })}
    </ol>
  );
}
