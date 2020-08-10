import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface User {
  id: string;
  avatar_url: string;
  name: string;
}

interface AuthStateInterface {
  token: string;
  user: User;
}

interface SignInCredentialsInterface {
  email: string;
  password: string;
}

interface AuthContextDataInterface {
  user: User;
  signIn(credentials: SignInCredentialsInterface): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextDataInterface>(
  {} as AuthContextDataInterface,
);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthStateInterface>(() => {
    const token = localStorage.getItem('@GoBarber:token');
    const user = localStorage.getItem('@GoBarber:user');

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthStateInterface;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem('@GoBarber:token', token);
    localStorage.setItem('@GoBarber:user', JSON.stringify(user));

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@GoBarber:token');
    localStorage.removeItem('@GoBarber:user');

    setData({} as AuthStateInterface);
  }, []);
  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextDataInterface {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
