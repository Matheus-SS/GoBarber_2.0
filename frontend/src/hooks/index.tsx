import React from 'react';
import { AuthProvider } from './AuthContext';
import { ToastProvider } from './ToastContext';

const AppGlobalProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <ToastProvider>{children}</ToastProvider>
  </AuthProvider>
);

export default AppGlobalProvider;
