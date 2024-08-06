import { Todo } from "@/lib/todos-lib";
import { TodoWrapper } from "./UI/TodoWrapper";

export const TodosList = ({
  todos,
  updateTask,
}: {
  todos: Todo[];
  updateTask: (task: Todo) => void;
}) => {
  const incomplete = todos.filter((todo) => !todo.completed);
  const complete = todos.filter((todo) => todo.completed);

  return (
    <>
      {incomplete.length > 0 ? (
        <TodoWrapper title="Incomplete" count={incomplete.length.toString()}>
          {incomplete.map((todo) => (
            <TodoItem key={todo.id} todo={todo} update={updateTask} />
          ))}
        </TodoWrapper>
      ) : null}

      {complete.length > 0 ? (
        <TodoWrapper title="Completed" count={complete.length.toString()}>
          {complete.map((todo) => (
            <TodoItem key={todo.id} todo={todo} update={updateTask} />
          ))}
        </TodoWrapper>
      ) : null}
    </>
  );
};

const TodoItem = ({
  todo,
  update,
}: {
  todo: Todo;
  update: (task: Todo) => void;
}) => {
  return (
    <li>
      <span>
        <input
          type="checkbox"
          id={todo.id}
          name="task"
          value={todo.title}
          checked={todo.completed}
          onChange={(event) =>
            update({ ...todo, completed: event.target.checked })
          }
        />
        <label htmlFor={todo.id}>{todo.title}</label>
      </span>
      <button aria-label="Delete"></button>
    </li>
  );
};
