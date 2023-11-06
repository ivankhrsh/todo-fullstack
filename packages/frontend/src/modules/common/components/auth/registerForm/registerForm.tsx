import React, { FC } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { COLORS, SPACES } from '../../../../theme';
import { Loader } from '../../loader/Loader';
import { RegisterFormControl } from './registerFormControl';

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

interface Props {
  onClose: () => void;
}

export const RegisterForm: FC<Props> = ({ onClose }) => {
  const handleClose = () => {
    onClose();
  };

  const { isLoading, formik } = RegisterFormControl(handleClose);

  if (isLoading) {
    <Box sx={style}>
      <Loader />
    </Box>;
  }

  return (
    <Box sx={style}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Registration
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Box display="flex" flexDirection="column" gap={SPACES.m} mb={SPACES.s}>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
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

      <Box display="flex" justifyContent="flex-start" marginTop={SPACES.l}>
        <Button variant="outlined" onClick={handleClose}>
          Back
        </Button>
      </Box>
    </Box>
  );
};
