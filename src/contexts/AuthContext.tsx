import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from 'react';

import AuthService from '../services/AuthService';
import { api } from '../services/api';

interface SignInRequest {
  email: string;
  password: string;
}

interface AuthContextData {
  isAuthenticated: boolean;
  signIn: (data: SignInRequest) => Promise<void>;
  signOut: () => void;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('smartorder:accessToken');
  });

  useEffect(() => {
    const interceptorId = api.interceptors.request.use(config => {
      const accessToken = localStorage.getItem('smartorder:accessToken');

      if (accessToken) {
        config.headers.setAuthorization(`Bearer ${accessToken}`);
      }

      return config;
    });

    return () => api.interceptors.request.eject(interceptorId);
  }, []);

  const signIn = useCallback(async ({ email, password }: SignInRequest) => {
    const { accessToken } = await AuthService.signIn({ email, password });

    localStorage.setItem('smartorder:accessToken', accessToken);

    setIsAuthenticated(true);
  }, []);

  const signOut = useCallback(() => {
    localStorage.clear();
    setIsAuthenticated(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
