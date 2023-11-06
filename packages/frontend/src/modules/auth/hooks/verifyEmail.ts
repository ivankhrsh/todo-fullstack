import { message } from 'mui-message';
import { useMutation } from 'react-query';
import { errorHandler } from '../../todo/utils/errorHandler.utils';
import authHandler from '../utils/authHandler.utils';

export const useVerifyEmail = (code: string) => {
  const onSuccess = () => {
    message.success('Email verified');
  };

  const { mutate, isLoading, isSuccess } = useMutation(() => authHandler.verifyEmail(code), {
    onSuccess,
    onError: errorHandler
  });
  const verify = () => mutate();

  return { verify, isLoading, isSuccess };
};
