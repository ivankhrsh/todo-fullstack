import React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useLocation } from 'react-router';
import { COLORS, SPACES } from '../../../../theme';
import { Loader } from '../../loader/Loader';
import { ResetPasswordControl } from './resetPasswordControl';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  bgcolor: 'background.paper',
  border: '1px solid',
  borderColor: COLORS.black,
  boxShadow: 24,
  p: 4
};

export const ResetPasswordForm = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const resetCode = searchParams.get('passwordResetCode') || '';

  const { isLoading, formik } = ResetPasswordControl(resetCode);

  if (isLoading) {
    <Box sx={style}>
      <Loader />
    </Box>;
  }
  return (
    <Box sx={style}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Please enter new password
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Box display="flex" flexDirection="column" gap={SPACES.m} mb={SPACES.s}>
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <TextField
            fullWidth
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
          />
          <Button color="success" variant="contained" fullWidth type="submit">
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};
