import { Todo } from "@/lib/todos-lib";
import { TodoSection } from "./TodoSection";
import { TodoItem } from "./TodoItem";

type TodoList = {
  todos: Todo[];
  updateTask: (task: Todo) => void;
};

export const TodosList = ({ todos, updateTask }: TodoList) => {
  const incomplete = todos.filter((todo) => !todo.completed);
  const complete = todos.filter((todo) => todo.completed);

  return (
    <>
      {incomplete.length > 0 ? (
        <TodoSection title="Incomplete" count={incomplete.length.toString()}>
          {incomplete.map((todo) => (
            <TodoItem key={todo.id} todo={todo} update={updateTask} />
          ))}
        </TodoSection>
      ) : null}

      {complete.length > 0 ? (
        <TodoSection title="Completed" count={complete.length.toString()}>
          {complete.map((todo) => (
            <TodoItem key={todo.id} todo={todo} update={updateTask} />
          ))}
        </TodoSection>
      ) : null}
    </>
  );
};
