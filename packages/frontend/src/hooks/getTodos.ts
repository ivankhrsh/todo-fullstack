import { useQuery } from 'react-query';
import { QUERY_KEYS } from '../modules/common/consts/app-keys.const';
import { getTodos } from '../modules/todo/utils/service.utils';

export const useGetTodos = (filters: string) => {
  const { isError, isLoading, data } = useQuery([QUERY_KEYS.TODOS, filters], () =>
    getTodos(filters)
  );

  return { todos: data?.todos || [], limit: data?.limit || 0, isLoading, isError };
};
