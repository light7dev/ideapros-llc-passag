// import Buttons from 'views/components/Buttons.js'

// new screens
import Login from 'Containers/AuthScreen/Login';
import Subscription from 'Containers/AuthScreen/Subscripton';
import Payment from 'Containers/AuthScreen/Payment';
import ActiveSubscription from 'Containers/AdminScreen/ActiveSubscription';
import Registration from 'Containers/AuthScreen/Registration';
// import { Redirect } from 'react-router';
// import React from 'react';

const routes = [
  // {
  //   path: '/',
  //   exact: true,
  //   layout: '/auth',
  //   component: () => <Redirect to="/login" />,
  // },
  //Auth Routes
  {
    path: '/login',
    name: 'Login',
    // mini: 'L',
    component: Login,
    layout: '/auth',
  },
  {
    path: '/registration',
    name: 'Registration',
    component: Registration,
    layout: '/auth',
  },
  {
    path: '/payment-subscription',
    name: 'Subscription',
    component: Subscription,
    layout: '/payment',
  },
  {
    path: '/payment-details',
    name: 'Payment',
    component: Payment,
    layout: '/payment',
  },

  // Admin Routes
  {
    path: '/active-subscription',
    name: 'ActiveSubscription',
    component: ActiveSubscription,
    layout: '/admin',
  },
];

export default routes;
