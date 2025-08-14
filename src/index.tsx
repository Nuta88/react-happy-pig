import { ConfigProvider } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { theme } from './assets/theme';
import reportWebVitals from './reportWebVitals';
import AppRouters from './routes';
import { store } from './store/store';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider theme={theme}>
        <AppRouters />
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
