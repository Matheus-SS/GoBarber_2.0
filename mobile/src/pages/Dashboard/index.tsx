import React from 'react';
import { View } from 'react-native';
import Button from '../../components/Button';
// import { Container } from './styles';

import { useAuth } from '../../hooks/AuthContext';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();
  return (
    <View style={{ flex: 1 }}>
      <Button onPress={signOut}>Sair</Button>
    </View>
  );
};

export default Dashboard;
