import React from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler';

import { Container, ButtonText } from './styles';

interface ButtonPropsInterface extends RectButtonProperties {
  children: string;
}
const Button: React.FC<ButtonPropsInterface> = ({
  children,
  ...restOfProps
}) => (
  <Container {...restOfProps}>
    <ButtonText>{children}</ButtonText>
  </Container>
);
export default Button;
