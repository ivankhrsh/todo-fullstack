import { useMutation, useQueryClient } from 'react-query';
import { message } from 'mui-message';
import { IUser } from '../../common/types/user.types';
import authHandler from '../utils/authHandler.utils';
import { errorHandler } from '../../todo/utils/errorHandler.utils';
import { QUERY_KEYS, STORAGE_KEYS } from '../../common/consts/app-keys.const';

export const useLogin = () => {
  const queryClient = useQueryClient();

  const onSuccess = ({
    authorizationToken,
    email,
    id
  }: {
    authorizationToken: string;
    email: string;
    id: string;
  }) => {
    message.success('Login is successful');
    localStorage.setItem(STORAGE_KEYS.TOKEN, authorizationToken);
    queryClient.invalidateQueries(QUERY_KEYS.AUTH);
    localStorage.setItem(STORAGE_KEYS.EMAIL, email);
    queryClient.invalidateQueries(QUERY_KEYS.EMAIL);
    localStorage.setItem(STORAGE_KEYS.ID, id);
    queryClient.invalidateQueries(QUERY_KEYS.ID);
  };

  const { mutate, isLoading } = useMutation((user: IUser) => authHandler.handleLogin(user), {
    onSuccess,
    onError: errorHandler
  });

  const login = (user: IUser) => mutate(user);

  return { login, isLoading };
};
