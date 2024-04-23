import { CanceledError } from 'axios';
import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { toast } from 'react-toastify';

import { User } from '../@types/User';
import AuthService from '../services/AuthService';
import UsersService from '../services/UsersService';
import { api } from '../services/api';

interface SignInRequest {
  email: string;
  password: string;
}

interface AuthContextData {
  isAuthenticated: boolean;
  user: User;
  signIn: (data: SignInRequest) => Promise<void>;
  signOut: () => void;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>({} as User);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('smartorder:accessToken');
  });

  useLayoutEffect(() => {
    const interceptorId = api.interceptors.request.use(config => {
      const accessToken = localStorage.getItem('smartorder:accessToken');

      if (accessToken) {
        config.headers.setAuthorization(`Bearer ${accessToken}`);
      }

      return config;
    });

    return () => api.interceptors.request.eject(interceptorId);
  }, []);

  useLayoutEffect(() => {
    const interceptorId = api.interceptors.response.use(
      response => response,
      error => {
        const accessToken = localStorage.getItem('smartorder:accessToken');

        if (accessToken && error.response?.status === 401) {
          localStorage.clear();
          setIsAuthenticated(false);
        }

        return Promise.reject(error);
      },
    );

    return () => api.interceptors.response.eject(interceptorId);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function getCurrentUser() {
      try {
        if (isAuthenticated) {
          const currentUser = await UsersService.getUser(controller.signal);

          setUser(currentUser);
        }
      } catch (error) {
        if (error instanceof CanceledError) return;

        toast.error('Ocorreu um erro ao buscar as informações do usuário');
      }
    }

    getCurrentUser();

    return () => controller.abort();
  }, [isAuthenticated]);

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
    <AuthContext.Provider value={{ isAuthenticated, user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
