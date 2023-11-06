import { useQuery, useQueryClient } from 'react-query';
import { message } from 'mui-message';
import { QUERY_KEYS, STORAGE_KEYS } from '../../common/consts/app-keys.const';
import authHandler from '../utils/authHandler.utils';

export const useAuth = () => {
  const queryClient = useQueryClient();
  const { isLoading, data } = useQuery(QUERY_KEYS.AUTH, authHandler.getCurrentUser, {
    retry: 1
  });

  const logout = () => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    queryClient.setQueryData(QUERY_KEYS.AUTH, false);
    message.success('You are logged out');
  };

  const isUserLogin = data && !isLoading;
  const email = data?.email;

  return { isUserLogin, isLoading, logout, email };
};
