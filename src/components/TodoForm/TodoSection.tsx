type TodoSection = {
  count: string;
  title: string;
};

export const TodoSection = ({
  title,
  count,
  children,
}: React.PropsWithChildren<TodoSection>) => {
  return (
    <section>
      <h2 className="flex items-center gap-2.5 border-b border-stone-200 py-2 font-semibold">
        {title}
        <span className="inline-grid h-5 w-5 place-content-center rounded-full bg-slate-600 text-xs text-white">
          {count}
        </span>
      </h2>
      <ul role="list">{children}</ul>
    </section>
  );
};
