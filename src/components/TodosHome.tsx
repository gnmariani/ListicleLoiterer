import { HiOutlineClipboardDocumentCheck as Icon } from "react-icons/hi2";
import NewTodoForm from "./NewTodoForm";
import { useTodos } from "@/hooks/useTodos";
import { requestCreateTodo, Todo } from "@/lib/todos-lib";

const Header = () => (
  <header className="flex flex-row items-center space-x-2">
    <Icon className="h-10 w-10" />
    <h1 className="font-serif text-3xl font-medium">To-Do List</h1>
  </header>
);

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
  return (
    <div className="space-y-6">
      <Header />
      <NewTodoForm newTask={addNewTask} />
    </div>
  );
};

export default TodosHome;
