import NewTodoForm from "@/components/TodoForm/NewTodoForm";
import { useTodos } from "@/hooks/useTodos";
import {
  requestCreateTodo,
  requestDeleteTodo,
  requestUpdateTodo,
  Todo,
} from "@/lib/todos-lib";
import { TodosList } from "@/components/TodoForm/TodosList";
import { Header } from "@/components/Header";

export const TodosHome = () => {
  const { todos, mutate } = useTodos();

  const addNewTask = async (newTask: FormDataEntryValue | null) => {
    if (newTask && typeof newTask === "string") {
      const task: Todo = {
        id: "",
        title: newTask,
        completed: false,
        priority: 0, //TODO: Should priority organize order of todo's?
      };

      await requestCreateTodo(task);
      mutate([...todos, task], {
        optimisticData: [...todos, task],
        rollbackOnError: true,
      });
    }
  };

  const updateTask = async (task: Todo) => {
    await requestUpdateTodo(task);
    mutate([...todos, task]);
  };

  const deleteTask = async (task: Pick<Todo, "id">) => {
    await requestDeleteTodo(task.id);
    const updatedList = todos.filter((todo) => todo.id !== task.id);
    mutate(updatedList, {
      optimisticData: updatedList,
      rollbackOnError: true,
    });
  };

  return (
    /*TODO: the gap or space classes are not working (>_<) */
    <div className="grid [row-gap:1.25rem]">
      <Header />
      <NewTodoForm newTask={addNewTask} />
      <TodosList
        todos={todos}
        updateTodo={updateTask}
        deleteTodo={deleteTask}
      />
    </div>
  );
};

export default TodosHome;
