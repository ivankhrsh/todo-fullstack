import { Box, CircularProgress } from '@mui/material';
import React from 'react';

export const Loader = () => (
  <Box
    sx={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    <CircularProgress />
  </Box>
);
