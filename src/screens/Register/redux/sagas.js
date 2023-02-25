import { all, call, put, takeLatest } from 'redux-saga/effects';

import { showMessage } from 'react-native-flash-message';

// config
import { BASE_URL } from 'src/config/app';

// utils
import XHR from 'src/utils/XHR';

// types
import { REGISTER_REQUEST, CREATE_STRIPE_CUSTOMER_REQUEST } from './types';
import {
  registerFaluire,
  registerSuccess,
  createStripeCustomerSuccess,
  createStripeCustomerFaluire,
} from './actions';
import { navigate, navigateAndSimpleReset } from 'src/navigator/NavigationService';

function registerAPI(data) {
  const URL = `${BASE_URL}/api/v1/signup/`;
  const options = {
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    method: 'POST',
    data,
  };

  return XHR(URL, options);
}

function* register({ data }) {
  try {
    const res = yield call(registerAPI, data);
    showMessage({
      message: 'You have successfully registered!',
      type: 'success',
    });
    yield put(registerSuccess(res?.data));
    navigate('Login');
  } catch (e) {
    let err =
      e?.response && e.response?.data && e.response.data?.email
        ? e.response.data.email[0]
        : e.response && e.response?.data && e.response.data?.password
        ? e.response.data.password[0]
        : 'Something went wrong.';
    if (e.message == 'Network Error') {
      yield put(registerFaluire('Connection Error'));
      showMessage({
        message: 'Connection Error',
        type: 'danger',
      });
    } else {
      yield put(registerFaluire(err));
      showMessage({
        message: err,
        type: 'danger',
      });
    }
  }
}

async function createStripeCustomerAPI(data) {
  const token = await AsyncStorage.getItem('authToken');
  const URL = `${BASE_URL}/api/v1/stripe_payment/save_stripe_info/`;
  const options = {
    headers: { Authorization: `Token ${token}` },
    method: 'POST',
    data,
  };

  return XHR(URL, options);
}

function* createStripeCustomer({ data }) {
  try {
    const response = yield call(createStripeCustomerAPI, data);
    yield put(createStripeCustomerSuccess(response.data));
  } catch (e) {
    if (e.message == 'Network Error') {
      yield put(createStripeCustomerFaluire('Connection Error'));
    } else {
      yield put(createStripeCustomerFaluire(e));
    }
  }
}

export default all([
  takeLatest(REGISTER_REQUEST, register),
  takeLatest(CREATE_STRIPE_CUSTOMER_REQUEST, createStripeCustomer),
]);
