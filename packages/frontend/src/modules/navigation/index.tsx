import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MessageBox } from 'mui-message';
import { APP_KEYS } from '../common/consts';
import TodoPage from './todo';
import { ProtectedRoute, RedirectRoute } from './utils/routes.utils';
import HomePage from './home';
import { ROUTER_KEYS } from '../common/consts/app-keys.const';
import ResetPasswordPage from './resetPassword';
import VerifyEmailPage from './verifyEmail';

export const MainRouter = () => (
  <>
    <MessageBox />
    <Router>
      <Routes>
        <Route
          path={APP_KEYS.ROUTER_KEYS.ROOT}
          element={<RedirectRoute element={<HomePage />} redirectTo="/todo" />}
        />

        <Route
          path={APP_KEYS.ROUTER_KEYS.TODO}
          element={<ProtectedRoute element={<TodoPage />} redirectTo={ROUTER_KEYS.ROOT} />}
        />

        <Route path={ROUTER_KEYS.RESET} element={<ResetPasswordPage />} />
        <Route path={ROUTER_KEYS.VERIFY} element={<VerifyEmailPage />} />
      </Routes>
    </Router>
  </>
);
