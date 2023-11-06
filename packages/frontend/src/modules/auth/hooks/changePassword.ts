import { useMutation } from 'react-query';
import { message } from 'mui-message';
import { errorHandler } from '../../todo/utils/errorHandler.utils';
import authHandler from '../utils/authHandler.utils';
import { IChangePasswordPayload } from '../../common/types/user.types';

export const useChangePassword = () => {
  const { mutate, isLoading, isSuccess } = useMutation(
    (payload: IChangePasswordPayload) => authHandler.changePassword(payload),
    {
      onSuccess: () => {
        message.success('Success');
      },
      onError: errorHandler
    }
  );

  const change = (payload: IChangePasswordPayload) => mutate(payload);
  return { change, isLoading, isSuccess };
};
