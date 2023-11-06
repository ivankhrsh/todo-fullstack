import React, { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Button, Typography, Container } from '@mui/material';
import { SPACES } from '../../../../theme';
import { BUTTON } from '../../../../theme/sizes.const';
import { AuthForm } from '../authForm/authForm';
import { RegisterForm } from '../registerForm/registerForm';
import { ForgotPasswordForm } from '../forgotPasswordForm/forgotPasswordForm';

const buttonStyle = {
  width: BUTTON.s
};

export const AuthContainer = () => {
  const [loginClicked, setLoginClicked] = useState(false);
  const [registerClicked, setRegisterClicked] = useState(false);
  const [forgotPasswordClicked, setForgotPasswordClicked] = useState(false);

  const handleLoginClick = () => {
    setLoginClicked((prevState: boolean) => !prevState);
  };

  const handleRegisterClick = () => {
    setRegisterClicked((prevState: boolean) => !prevState);
  };

  const handleForgotPasswordClick = () => {
    setForgotPasswordClicked((prevState: boolean) => !prevState);
  };

  if (registerClicked) {
    return <RegisterForm onClose={handleRegisterClick} />;
  }

  if (loginClicked) {
    return <AuthForm onClose={handleLoginClick} />;
  }

  if (forgotPasswordClicked) {
    return <ForgotPasswordForm onClose={handleForgotPasswordClick} />;
  }

  return (
    <Container
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        gap: SPACES.m
      }}
    >
      <Typography variant="h4" gutterBottom>
        Todo app ✅
      </Typography>
      <Button variant="contained" style={buttonStyle} onClick={handleLoginClick}>
        Login
      </Button>
      <Button variant="contained" style={buttonStyle} onClick={handleRegisterClick}>
        Register
      </Button>
      <Button variant="text" style={buttonStyle} onClick={handleForgotPasswordClick}>
        Forgot password?
      </Button>
    </Container>
  );
};
