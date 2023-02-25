import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, Router, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { store, history } from './Redux/store';
import { connect, Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import RouteGuard from './RouterGuard';

import AuthLayout from 'layouts/Auth.js';
import AdminLayout from 'layouts/Admin.js';
import PaymentLayout from 'layouts/Payment.js';

const App = (props) => {
  const { accessToken, userData, isSubscription } = props;

  const accessToken1 = sessionStorage.getItem('accessToken');

  return (
    <>
      <Router history={history}>
        <Switch>
          <RouteGuard path="/auth" component={(props) => <AuthLayout {...props} />} />
          {!isSubscription && (
            <RouteGuard
              path="/payment"
              component={(props) => <PaymentLayout {...props} />}
              isProtected
            />
          )}
          {isSubscription && (
            <RouteGuard
              path="/admin"
              component={(props) => <AdminLayout {...props} />}
              isProtected
            />
          )}

          <Redirect to="/auth/login" />
        </Switch>
      </Router>
    </>
  );
};

const mapStateToProps = (state) => ({
  accessToken: state.Login.accessToken,
  isSubscription: state.Login.isSubscription,
  userData: state.Login.user,
});

const mapDispatchToProps = (dispatch) => ({
  // getSubscriptionList: () => dispatch(getSubscriptionList()),
  // getPlanList: () => dispatch(getPlanList()),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
