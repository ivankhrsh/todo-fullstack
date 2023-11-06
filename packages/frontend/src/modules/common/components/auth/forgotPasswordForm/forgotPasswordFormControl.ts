import { useFormik } from 'formik';
import { validationSchema } from '../../../schemas/forgotPassword.schema';
import { useForgotPassword } from '../../../../auth/hooks/forgotPassword';

export const ForgotPasswordFormControl = (handleClose: () => void) => {
  const { forgot, isLoading } = useForgotPassword();

  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema,
    onSubmit: (values) => {
      forgot(values.email);
      handleClose();
    }
  });

  return { isLoading, formik };
};
