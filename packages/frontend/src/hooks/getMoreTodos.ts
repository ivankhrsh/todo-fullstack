import { useMutation, useQuery } from 'react-query';
import { useState } from 'react';
import { QUERY_KEYS } from '../modules/common/consts/app-keys.const';
import { getTodos } from '../modules/todo/utils/service.utils';
import { ITodoWithId } from '../modules/common/types/todo.types';

export const useGetMoreTodos = (filters: string, prev: ITodoWithId[]) => {
  const [newTodos, setTodos] = useState<ITodoWithId[]>(prev);

  const onSuccess = (newData: { todos: ITodoWithId[] }) => {
    setTodos((prevTodos) => [...prevTodos, ...newData.todos]);
  };

  const { isError, isLoading, data } = useQuery([QUERY_KEYS.TODOS, filters], () =>
    getTodos(filters)
  );

  const { mutate } = useMutation(() => getTodos(filters), {
    onSuccess
  });

  const loadMore = () => {
    mutate();
  };

  return { newTodos, limit: data?.limit || 0, isLoading, isError, loadMore };
};
