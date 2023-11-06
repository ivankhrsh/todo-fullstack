import { useFormik } from 'formik';
import { useLogin } from '../../../../auth/hooks/login';
import { validationSchema } from '../../../schemas/loginUser.schema';

export const AuthFormControl = () => {
  const { login, isLoading } = useLogin();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema,
    onSubmit: (values) => {
      login(values);
    }
  });

  return { login, isLoading, formik };
};
