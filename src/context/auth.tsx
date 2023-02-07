import React from 'react';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { useMutation, UseMutationResult, useQuery } from 'react-query';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useClient } from '../hooks';
import { ISession } from '../types/interfaces';
import { toast } from 'react-toastify';

export interface IAuthContext {
  user?: ISession;
  login: any;
  register: any;
  logout: () => void;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider = ({ children }: { children: ReactNode }): any => {
  const { client } = useClient();
  const [user, setUser] = useState<ISession | undefined>(undefined);
  const [token, setToken] = useState<ISession | undefined>(undefined);
  const navigate: NavigateFunction = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || 'VITE_API_URL';

  const { refetch } = useQuery(
    ['user'],
    async () =>
      await client<any>(`${API_URL}/user`, 'GET', {
        isAuthRequired: true,
      }),
    {
      retry: false,
      enabled: false,
      refetchOnWindowFocus: false,
      onSuccess: (user) => {
        setUser(user);
        navigate('/');
      },
      onError: (error) => {
        setUser(undefined);
        localStorage.removeItem('token');
        navigate('/login');
      },
    }
  );

  const loginMutation = useMutation<ISession>(
    (profile) =>
      client(`${API_URL}/auth/login`, 'POST', {
        isAuthRequired: true,
        data: profile,
      }),
    {
      onSuccess: (user) => {
        setUser(user);
        localStorage.setItem('token', JSON.stringify(user.token));
        navigate('/');
      },
      onError: (error: any) => {
        if (error?.response?.data?.message) {
          toast.error(error?.response?.data?.message);
        } else {
          toast.error('Ocurrio un error, verifique e intente nuevamente');
        }
      },
    }
  );

  const registerMutation = useMutation<ISession>(
    (profile) =>
      client(`${API_URL}/auth/register`, 'POST', {
        isAuthRequired: true,
        data: profile,
      }),
    {
      onSuccess: (user) => {
        setUser(user);
        localStorage.setItem('token', JSON.stringify(user.token));
        navigate('/');
      },
      onError: (error: any) => {
        if (error?.response?.data?.message) {
          toast.error(error?.response?.data?.message);
        } else {
          toast.error('Ocurrio un error, verifique e intente nuevamente');
        }
      },
    }
  );

  useEffect(() => {
    const userStorage = localStorage.getItem('token');
    if (userStorage) {
      refetch();
    }
  }, []);

  const logout = () => {
    setUser(undefined);
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login: loginMutation,
        register: registerMutation,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
