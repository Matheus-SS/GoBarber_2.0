import React from 'react';
import { useTransition } from 'react-spring';

import Toast from './Toast';

import { ToastMessageInterface, useToast } from '../../hooks/ToastContext';

import { Container } from './styles';

interface ToastContainerPropsInterface {
  messages: ToastMessageInterface[];
}

const ToastContainer: React.FC<ToastContainerPropsInterface> = ({
  messages,
}) => {
  const messagesWithTransitions = useTransition(
    messages,
    message => message.id,
    {
      from: { right: '-120%' },
      enter: { right: '0%' },
      leave: { right: '-120%' },
    },
  );

  return (
    <Container>
      {messagesWithTransitions.map(({ item, key, props }) => (
        <Toast key={key} style={props} message={item} />
      ))}
    </Container>
  );
};

export default ToastContainer;
