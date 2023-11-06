import { AxiosError } from 'axios';
import { message } from 'mui-message';

export const errorHandler = (data: AxiosError) => {
  const errorMessage =
    (data.response?.data as { message?: string })?.message ||
    'Something went wrong, try again later';
  message.error(errorMessage);
};
