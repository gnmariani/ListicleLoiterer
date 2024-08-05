import { useRef } from "react";
import { FormEvent } from "react";

export const NewTodoForm = ({
  newTask,
}: {
  newTask: (name: FormDataEntryValue | null) => void;
}) => {
  const formRef = useRef<HTMLFormElement | null>(null);

  const onFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const task = formData.get("task");
    newTask(task);
    formRef.current?.reset();
  };
  return (
    <form
      ref={formRef}
      onSubmit={onFormSubmit}
      className="flex flex-col space-y-2 rounded-xl border border-stone-200 bg-stone-50 p-4 sm:flex-row sm:space-x-2 sm:space-y-0"
    >
      <div className="relative w-full">
        <label className="sr-only" htmlFor="task">
          Please type in the task to be completed
        </label>
        <input
          id="task"
          name="task"
          type="text"
          placeholder="Add a task"
          className="w-full rounded border border-stone-200 bg-white px-4 py-3 text-base transition-opacity focus:border-red-300 focus:ring-1 focus:ring-red-300 focus-visible:outline-none disabled:opacity-50"
        />
      </div>
      <button
        type="submit"
        className="min-w-[128px] rounded border border-red-600 bg-red-500 px-2 text-base font-medium leading-10 text-white hover:bg-red-600 focus-visible:outline-2  focus-visible:outline-offset-4 focus-visible:outline-blue-300 disabled:border-transparent disabled:bg-gray-200"
      >
        Add
      </button>
    </form>
  );
};

export default NewTodoForm;
