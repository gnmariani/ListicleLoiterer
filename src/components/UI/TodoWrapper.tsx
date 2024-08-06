import { ReactNode } from "react";

type TodoWrapper = {
  count: string;
  title: string;
  children?: ReactNode | undefined;
};

export const TodoWrapper = (todos: TodoWrapper) => {
  return (
    <section>
      <h2>
        {todos.title}
        <span>{todos.count}</span>
      </h2>
      <ul>{todos.children}</ul>
    </section>
  );
};
