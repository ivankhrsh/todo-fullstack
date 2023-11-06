import { useMutation } from 'react-query';
import { message } from 'mui-message';
import { errorHandler } from '../../todo/utils/errorHandler.utils';
import authHandler from '../utils/authHandler.utils';

export const useForgotPassword = () => {
  const { mutate, isLoading, isSuccess } = useMutation(
    (email: string) => authHandler.forgotPassword(email),
    {
      onSuccess: () => {
        message.success('Please check your email');
      },
      onError: errorHandler
    }
  );
  const forgot = (email: string) => mutate(email);
  return { forgot, isLoading, isSuccess };
};
