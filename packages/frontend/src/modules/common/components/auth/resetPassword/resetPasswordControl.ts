import { useFormik } from 'formik';
import { validationSchema } from '../../../schemas/recoverPassword.schema';
import { useResetPassword } from '../../../../auth/hooks/resetPassword';

export const ResetPasswordControl = (resetCode: string) => {
  const { reset, isLoading } = useResetPassword();
  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
      passwordResetCode: resetCode
    },
    validationSchema,
    onSubmit: ({ password, passwordResetCode }) => {
      if (passwordResetCode) {
        reset({ password, passwordResetCode });
      }
    }
  });

  return { isLoading, formik };
};
