import { fetcher } from "@/lib/fetcher";
import { ApiResponse, type Todo } from "@/lib/todos-lib";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

export const useTodos = () => {
  const { data, error, isLoading, mutate } = useSWR<Todo[]>("/todos", fetcher);

  return {
    todos: data ?? [],
    isLoading,
    isError: error !== undefined,
    error,
    mutate,
  };
};

export const useOptimisticTodos = () => {
  const { trigger } = useSWRMutation<
    Todo[],
    any,
    any,
    Promise<ApiResponse<Todo[]>>
  >("/todos", fetcher);
  return {
    trigger,
  };
};
