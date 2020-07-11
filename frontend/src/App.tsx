import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import GlobalStyle from './styles/global';

import AppGlobalProvider from './hooks';

import Routes from './routes';

const App: React.FC = () => (
  <BrowserRouter>
    <AppGlobalProvider>
      <Routes />
    </AppGlobalProvider>

    <GlobalStyle />
  </BrowserRouter>
);
export default App;
