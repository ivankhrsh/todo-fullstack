import { useFormik } from 'formik';
import { validationSchema } from '../../../schemas/changePassword.schema';
import { useChangePassword } from '../../../../auth/hooks/changePassword';

export const ChangePasswordFormControl = () => {
  const { change, isLoading } = useChangePassword();

  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    },
    validationSchema,
    onSubmit: (value) => {
      const payload = { password: value.currentPassword, newPassword: value.newPassword };
      change(payload);
    }
  });

  return { isLoading, formik };
};
