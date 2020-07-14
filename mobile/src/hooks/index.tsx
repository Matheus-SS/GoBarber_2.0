import React from 'react';
import { AuthProvider } from './AuthContext';

const AppGlobalProvider: React.FC = ({ children }) => (
  <AuthProvider>{children}</AuthProvider>
);

export default AppGlobalProvider;
