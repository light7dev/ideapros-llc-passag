import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, Router, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { store, history } from './Redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import RouteGuard from './RouterGuard';

import AuthLayout from 'layouts/Auth.js';
import AdminLayout from 'layouts/Admin.js';
import App from 'App';

import 'bootstrap/dist/css/bootstrap.css';
import 'assets/scss/paper-dashboard.scss?v=1.2.0';
import 'assets/demo/demo.css';
import 'perfect-scrollbar/css/perfect-scrollbar.css';

const persistor = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
