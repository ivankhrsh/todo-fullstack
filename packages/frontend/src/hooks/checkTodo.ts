import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from '../modules/common/consts/app-keys.const';
import { ITodo } from '../modules/common/types/todo.types';
import { handleUpdateTodo } from '../modules/todo/utils/service.utils';
import { errorHandler } from '../modules/todo/utils/errorHandler.utils';

export const useCheckTodo = () => {
  const queryClient = useQueryClient();

  const onSuccess = () => {
    queryClient.invalidateQueries([QUERY_KEYS.TODOS], {
      refetchInactive: true
    });
    queryClient.invalidateQueries([QUERY_KEYS.TODO]);
  };

  const { mutate } = useMutation((todo: ITodo) => handleUpdateTodo(todo), {
    onSuccess,
    onError: errorHandler
  });
  const updateTodo = (todo: ITodo, checkValue: boolean, value: 'isPrivate' | 'isCompleted') => {
    const newData = { ...todo };
    newData[value] = !checkValue;
    mutate(newData);
  };

  return { updateTodo };
};
