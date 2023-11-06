import { message } from 'mui-message';
import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from '../modules/common/consts/app-keys.const';
import { ITodo } from '../modules/common/types/todo.types';
import { handleUpdateTodo } from '../modules/todo/utils/service.utils';
import { errorHandler } from '../modules/todo/utils/errorHandler.utils';

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  const onSuccess = () => {
    queryClient.invalidateQueries([QUERY_KEYS.TODOS], {
      refetchInactive: true
    });
    queryClient.invalidateQueries([QUERY_KEYS.TODO]);

    message.success('Todo updated');
  };

  const { mutate } = useMutation((todo: ITodo) => handleUpdateTodo(todo), {
    onSuccess,
    onError: errorHandler
  });
  const updateTodo = (todo: ITodo) => mutate(todo);
  return updateTodo;
};
