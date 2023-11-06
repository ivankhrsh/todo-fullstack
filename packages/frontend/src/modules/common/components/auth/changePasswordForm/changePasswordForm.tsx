import React from 'react';
import { Box, Button, TextField } from '@mui/material';
import { SPACES } from '../../../../theme';
import { Loader } from '../../loader/Loader';
import { ChangePasswordFormControl } from './changePasswordFormControl';

export const ChangePasswordForm = () => {
  const { isLoading, formik } = ChangePasswordFormControl();
  if (isLoading) {
    <Loader />;
  }

  return (
    <Box>
      <form onSubmit={formik.handleSubmit}>
        <Box display="flex" flexDirection="column" gap={SPACES.m} mb={SPACES.s}>
          <TextField
            fullWidth
            id="currentPassword"
            name="currentPassword"
            label="Current password"
            type="password"
            value={formik.values.currentPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.currentPassword && Boolean(formik.errors.currentPassword)}
            helperText={formik.touched.currentPassword && formik.errors.currentPassword}
          />
          <TextField
            fullWidth
            id="newPassword"
            name="newPassword"
            label="New password"
            type="password"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
            helperText={formik.touched.newPassword && formik.errors.newPassword}
          />
          <TextField
            fullWidth
            id="confirmNewPassword"
            name="confirmNewPassword"
            label="Confirm password"
            type="password"
            value={formik.values.confirmNewPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.confirmNewPassword && Boolean(formik.errors.confirmNewPassword)}
            helperText={formik.touched.confirmNewPassword && formik.errors.confirmNewPassword}
          />
          <Button color="success" variant="contained" fullWidth type="submit">
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};
