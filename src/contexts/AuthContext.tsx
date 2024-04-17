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

  useEffect(() => {
    async function getCurrentUser() {
      try {
        if (isAuthenticated) {
          const currentUser = await UsersService.getUser();

          setUser(currentUser);
        }
      } catch {
        toast.error('Ocorreu um erro ao buscar as informações do usuário');
      }
    }

    getCurrentUser();
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
