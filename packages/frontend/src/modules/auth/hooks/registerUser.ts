import { useMutation } from 'react-query';
import { message } from 'mui-message';
import { errorHandler } from '../../todo/utils/errorHandler.utils';
import { IUser } from '../../common/types/user.types';
import authHandler from '../utils/authHandler.utils';

export const useRegister = () => {
  const onSuccess = () => {
    message.success('Registration is successful, please verify email');
  };

  const { mutate, isLoading, isSuccess } = useMutation(
    (user: IUser) => authHandler.handleRegister(user),
    {
      onSuccess,
      onError: errorHandler
    }
  );

  const register = (user: IUser) => mutate(user);

  return { register, isLoading, isSuccess };
};
