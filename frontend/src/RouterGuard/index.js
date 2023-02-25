import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

const RouteGuard = ({ isProtected = false, isSubscription, component: Component, ...rest }) => {
  const accessToken1 = sessionStorage.getItem('accessToken');
  // const authToken = sessionStorage.getItem('authToken');
  return (
    <>
      <Route
        {...rest}
        render={(props) => {
          if (isProtected) {
            return accessToken1 ? (
              <Component {...props} />
            ) : (
              <Redirect to={{ pathname: '/auth/login' }} />
            );
          } else {
            return accessToken1 ? (
              isSubscription ? (
                <Redirect
                  to={{
                    pathname: '/admin/active-subscription',
                  }}
                />
              ) : (
                <Redirect
                  to={{
                    pathname: '/payment/payment-subscription',
                  }}
                />
              )
            ) : (
              <Component {...props} />
            );
          }
        }}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  // accessToken: state.Login.accessToken,
  // userDetails: state.signIn.userDetails,
  // timerRef: state.flightSearch.timerRef
  isSubscription: state.Login.isSubscription,
});

// const mapStateToProps = createStructuredSelector({
//     user: makeSelectUser(),
// });

export default connect(mapStateToProps)(RouteGuard);
