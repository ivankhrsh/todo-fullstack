import React, { FC } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { COLORS, SPACES } from '../../../../theme';
import { Loader } from '../../loader/Loader';
import { ForgotPasswordFormControl } from './forgotPasswordFormControl';

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

export const ForgotPasswordForm: FC<Props> = ({ onClose }) => {
  const handleClose = () => {
    onClose();
  };
  const { isLoading, formik } = ForgotPasswordFormControl(handleClose);

  if (isLoading) {
    <Box sx={style}>
      <Loader />
    </Box>;
  }

  return (
    <Box sx={style}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Password recovery
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
