import { useMutation, useQueryClient } from 'react-query';
import { message } from 'mui-message';
import { QUERY_KEYS } from '../modules/common/consts/app-keys.const';
import { handleDeleteTodo } from '../modules/todo/utils/service.utils';
import { errorHandler } from '../modules/todo/utils/errorHandler.utils';

export const useDeleteTodo = (id: string) => {
  const queryClient = useQueryClient();

  const onSuccess = () => {
    queryClient.invalidateQueries([QUERY_KEYS.TODOS], {
      refetchInactive: true
    });

    message.success('Todo deleted');
  };

  const { mutate } = useMutation(() => handleDeleteTodo(id), { onSuccess, onError: errorHandler });
  const deleteTodo = () => mutate();
  return deleteTodo;
};
