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

import { useState } from "react";
import { Banner } from "@/components/banner";

const ERROR_MESSAGE = "An error occured.";

export const TodosHome = () => {
  const { todos, mutate, isError } = useTodos();
  const [displayBanner, setDisplayBanner] = useState(false);
  const [errorMessage, setErrorMessage] = useState(ERROR_MESSAGE);

  const addNewTask = async (newTask: FormDataEntryValue | null) => {
    if (newTask && typeof newTask === "string") {
      const task: Todo = {
        id: "",
        title: newTask,
        completed: false,
        priority: 0, //TODO: Should priority organize order of todo's?
      };

      try {
        const res = await requestCreateTodo(task);
        if (res.status !== 200) {
          setErrorMessage(res.error.message);
          throw new Error(res.error.message);
        }
        mutate([...todos, task], {
          optimisticData: [...todos, task],
          rollbackOnError: true,
        });
        // Reset on success
        setDisplayBanner(false);
        setErrorMessage(ERROR_MESSAGE);
      } catch (error) {
        setDisplayBanner(true);
      }
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
      {isError || displayBanner ? (
        <Banner
          title="Error"
          message={errorMessage}
          onClose={setDisplayBanner}
        />
      ) : null}
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
