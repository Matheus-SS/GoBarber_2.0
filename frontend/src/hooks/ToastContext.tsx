import React, { useState, createContext, useCallback, useContext } from 'react';
import { uuid } from 'uuidv4';

import ToastContainer from '../components/ToastContainer';

export interface ToastMessageInterface {
  id: string;
  type?: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}
interface ToastContextDataInteface {
  addToast(message: Omit<ToastMessageInterface, 'id'>): void;
  removeToast(id: string): void;
}

const ToastContext = createContext<ToastContextDataInteface>(
  {} as ToastContextDataInteface,
);

const ToastProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<ToastMessageInterface[]>([]);

  const addToast = useCallback(
    ({ type, title, description }: Omit<ToastMessageInterface, 'id'>) => {
      const id = uuid();

      const toast = {
        id,
        type,
        title,
        description,
      };
      setMessages(oldMessagesState => [...oldMessagesState, toast]);
    },
    [],
  );

  const removeToast = useCallback((id: string) => {
    setMessages(oldMessagesState =>
      oldMessagesState.filter(message => message.id !== id),
    );
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  );
};

function useToast(): ToastContextDataInteface {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

export { ToastProvider, useToast };
