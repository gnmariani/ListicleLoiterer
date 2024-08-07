import NewTodoForm from "@/components/TodoForm/NewTodoForm";
import { useTodos } from "@/hooks/useTodos";
import { requestCreateTodo, requestUpdateTodo, Todo } from "@/lib/todos-lib";
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
        populateCache: true,
        revalidate: false,
      });
    }
  };

  const updateTask = async (task: Todo) => {
    await requestUpdateTodo(task);
    mutate([...todos, task]);
  };

  return (
    <div className="space-y-6">
      <Header />
      <NewTodoForm newTask={addNewTask} />
      <TodosList todos={todos} updateTask={updateTask} />
    </div>
  );
};

export default TodosHome;
