import { useNavigate } from 'react-router-dom';
import { message } from 'mui-message';
import { useMutation } from 'react-query';
import { ROUTER_KEYS } from '../../common/consts/app-keys.const';
import { IResetPassword } from '../../common/types/user.types';
import authHandler from '../utils/authHandler.utils';
import { errorHandler } from '../../todo/utils/errorHandler.utils';

export const useResetPassword = () => {
  const navigate = useNavigate();
  const onSuccess = () => {
    navigate(ROUTER_KEYS.ROOT);
    message.success('Password changed');
  };

  const { mutate, isLoading } = useMutation(
    (data: IResetPassword) => authHandler.resetPassword(data),
    {
      onSuccess,
      onError: errorHandler
    }
  );

  const reset = (data: IResetPassword) => mutate(data);
  return { reset, isLoading };
};
