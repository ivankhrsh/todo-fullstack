import { useFormik } from 'formik';
import { useRegister } from '../../../../auth/hooks/registerUser';
import { validationSchema } from '../../../schemas/registerUser.schema';

export const RegisterFormControl = (handleClose: () => void) => {
  const { register, isLoading } = useRegister();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema,
    onSubmit: ({ email, password }) => {
      register({ email, password });
      handleClose();
    }
  });

  return { isLoading, formik };
};
