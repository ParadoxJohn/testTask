import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
// Рендеринг додатку з використанням Redux Provider для доступу до store
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
