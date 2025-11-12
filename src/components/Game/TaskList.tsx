/**
* This file show a numbered task list of steps with an optional active highlight.
* It renders each step and marks the active one with a pointer and bold style.
* The steps data and active index are passed in from parent components via props.
*/

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
