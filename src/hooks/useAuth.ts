import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { authorizedPaths } from '../constants/apiUrls';

export const useAuth = <T extends Partial<T>>(): {
  isUserAuthorized: boolean;
  isAuthorizedPaths: boolean;
  onLogin: (user: T) => void;
  onRegister: (user: T) => void;
  onLogout: () => void
} => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const onLogin = useCallback((user: T): void => {
    localStorage.setItem('user', JSON.stringify(user));
    navigate('/');
  }, []);

  const onRegister = useCallback((user: T): void => {
    onLogin(user);
  }, []);

  const onLogout = useCallback((): void => {
    localStorage.removeItem('user');
    navigate('/login');
  }, []);

  return {
    isUserAuthorized: !!localStorage.getItem('user'),
    isAuthorizedPaths: authorizedPaths.includes(pathname),
    onLogin,
    onRegister,
    onLogout
  };
};
