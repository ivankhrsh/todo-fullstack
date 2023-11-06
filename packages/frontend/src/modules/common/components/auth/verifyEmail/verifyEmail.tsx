import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router';
import { SPACES } from '../../../../theme';
import { ROUTER_KEYS } from '../../../consts/app-keys.const';
import { useVerifyEmail } from '../../../../auth/hooks/verifyEmail';

const VerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const resetCode = searchParams.get('passwordResetCode') || '';
  const { verify } = useVerifyEmail(resetCode);

  const handleVerify = () => {
    navigate(ROUTER_KEYS.ROOT);
    if (resetCode) {
      verify();
    }
  };

  const style = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    gap: SPACES.m
  };

  return (
    <Box sx={style}>
      <Typography variant="h5" gutterBottom textAlign="center">
        Click to verify
      </Typography>

      <Button variant="contained" onClick={handleVerify}>
        Verify
      </Button>
    </Box>
  );
};

export default VerifyEmail;
