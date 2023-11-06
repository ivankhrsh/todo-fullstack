import { useMutation, useQueryClient } from 'react-query';
import { message } from 'mui-message';
import { QUERY_KEYS } from '../modules/common/consts/app-keys.const';
import { ITodo } from '../modules/common/types/todo.types';
import { handleAddTodo } from '../modules/todo/utils/service.utils';
import { errorHandler } from '../modules/todo/utils/errorHandler.utils';

export const useAddTodo = () => {
  const queryClient = useQueryClient();

  const onSuccess = () => {
    queryClient.invalidateQueries([QUERY_KEYS.TODOS]);
    message.success('Todo added');
  };

  const { mutate } = useMutation((todo: ITodo) => handleAddTodo(todo), {
    onSuccess,
    onError: errorHandler
  });
  const addTodo = (todo: ITodo) => mutate(todo);
  return addTodo;
};
