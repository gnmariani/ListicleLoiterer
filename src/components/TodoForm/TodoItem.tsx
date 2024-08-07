import { Todo } from "@/lib/todos-lib";
import { HiCheck, HiTrash } from "react-icons/hi2";

type TodoItem = {
  todo: Todo;
  updateTodo: (task: Todo) => void;
  deleteTodo: (task: Todo) => void;
};

export const TodoItem = ({ todo, updateTodo, deleteTodo }: TodoItem) => (
  <li className="border-b border-stone-200 py-2">
    <div className="group flex flex-row rounded border border-transparent p-3 hover:bg-stone-50">
      <label className="relative flex w-full cursor-pointer items-center gap-x-2 focus-within:bg-stone-50">
        <input
          className="peer m-0 grid h-5 w-5 cursor-pointer appearance-none place-content-center rounded-full border border-current checked:before:h-5 checked:before:w-5 checked:before:rounded-full checked:before:bg-green-700 focus:outline-none focus-visible:ring focus-visible:ring-red-300 focus-visible:ring-offset-2"
          type="checkbox"
          id={todo.id}
          name="task"
          value={todo.title}
          checked={todo.completed}
          onChange={(event) =>
            updateTodo({ ...todo, completed: event.target.checked })
          }
        />
        <HiCheck className="invisible absolute left-[2px] text-white peer-checked:visible" />
        {todo.title}
      </label>
      <button
        onClick={() => deleteTodo(todo)}
        aria-label="Delete"
        className="invisible group-hover:visible"
      >
        <HiTrash className="h-5 w-5 text-red-400" />
      </button>
    </div>
  </li>
);
