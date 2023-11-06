import React, { FC, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { COLORS, SPACES } from '../../../../theme';
import { STORAGE_KEYS } from '../../../consts/app-keys.const';
import { useAuth } from '../../../../auth/hooks/checkAuth';
import { ChangePasswordForm } from '../../auth/changePasswordForm/changePasswordForm';

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

export const UserProfile: FC<Props> = ({ onClose }) => {
  const [openChangePassword, setOpenChangePassword] = useState(false);

  const { logout } = useAuth();

  const handleOpenChangePassword = () => setOpenChangePassword(true);
  const handleCloseChangePassword = () => setOpenChangePassword(false);

  const handleCloseProfileModal = () => onClose();

  const handleLogout = () => {
    logout();
  };

  const userEmail = localStorage.getItem(STORAGE_KEYS.EMAIL);
  const userId = localStorage.getItem(STORAGE_KEYS.ID);

  return (
    <Box sx={style}>
      <Typography variant="body1" gutterBottom>
        {`Your email: ${userEmail}`}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {`Your id: ${userId}`}
      </Typography>

      <Box
        display="flex"
        justifyContent="center"
        marginTop={SPACES.l}
        flexDirection="column"
        gap={SPACES.l}
      >
        {!openChangePassword && (
          <Button variant="outlined" onClick={handleOpenChangePassword} color="secondary">
            Change password
          </Button>
        )}

        {openChangePassword && <ChangePasswordForm />}

        <Button variant="outlined" onClick={handleLogout} color="error">
          Logout
        </Button>
      </Box>
      <Box display="flex" justifyContent="space-between" marginTop={SPACES.l}>
        <Button variant="outlined" onClick={handleCloseProfileModal}>
          Back
        </Button>
        {openChangePassword && (
          <Button variant="outlined" onClick={handleCloseChangePassword} color="error">
            Cancel
          </Button>
        )}
      </Box>
    </Box>
  );
};
