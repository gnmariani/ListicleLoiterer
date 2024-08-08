import { useRef, useState } from "react";
import { FormEvent } from "react";
import { HiOutlineXCircle } from "react-icons/hi2";

export const NewTodoForm = ({
  newTask,
}: {
  newTask: (name: FormDataEntryValue | null) => void;
}) => {
  const [isFormInValid, setIsFormInValid] = useState<boolean | undefined>(true);

  const formRef = useRef<HTMLFormElement | null>(null);

  const onFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const task = formData.get("task");
    newTask(task);
    // Reset Form and Submit button
    formRef.current?.reset();
    setIsFormInValid(true);
  };

  return (
    <form
      ref={formRef}
      onSubmit={onFormSubmit}
      onReset={() => setIsFormInValid(true)}
      className="flex flex-col space-y-2 rounded-xl border border-stone-200 bg-stone-50 p-4 sm:flex-row sm:space-x-2 sm:space-y-0"
    >
      <div className="relative w-full">
        <label className="sr-only" htmlFor="task">
          Please type in the task to be completed
        </label>
        <div className="flex items-center justify-between rounded border border-stone-200 bg-white pr-4 text-base focus-within:border-red-300 focus-within:ring-1 focus-within:ring-red-300">
          <input
            required
            id="task"
            name="task"
            type="text"
            placeholder="Add a task"
            onChange={() => setIsFormInValid(!formRef.current?.checkValidity())}
            className="w-full py-3 pl-4 transition-opacity focus-visible:outline-none "
          />
          {!isFormInValid && (
            <button
              aria-label="Clear form"
              onClick={() => formRef.current?.reset()}
              className="rounded-full focus:outline-none focus-visible:ring focus-visible:ring-red-300 focus-visible:ring-offset-1"
            >
              <HiOutlineXCircle className="h-5 w-5 text-slate-500 hover:text-red-400" />
            </button>
          )}
        </div>
      </div>
      <button
        disabled={isFormInValid}
        type="submit"
        className="min-w-[128px] rounded border border-red-600 bg-red-500 px-2 text-base font-medium leading-10 text-white hover:bg-red-600 focus-visible:outline-2  focus-visible:outline-offset-4 focus-visible:outline-blue-300 disabled:border-transparent disabled:bg-gray-200"
      >
        Add
      </button>
    </form>
  );
};

export default NewTodoForm;
