import { all, call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import toast from 'react-hot-toast';
// import AsyncStorage from '@react-native-community/async-storage';

// import { showMessage } from 'react-native-flash-message';

// config
import { BASE_URL } from '../../../../config/app';

// utils
import XHR from '../../../../utils/XHR';
import { CREATE_SUBSCRIPTION_REQUEST, PAYMENT_REQUEST, DISCOUNT_REQUEST } from './types';
import {
  paymentSuccess,
  paymentFaluire,
  createSubscriptionSuccess,
  createSubscriptionFaluire,
  discountCodeFaluire,
  discountCodeSuccess,
} from './action';

import { checkSubscription } from '../../Login/redux/action';

async function paymentAPI(data) {
  const accessToken = await sessionStorage.getItem('accessToken');
  const URL = `${BASE_URL}/api/v2/stripe_payment/create_card/`;
  const options = {
    headers: {
      Accept: 'application/json',
      Authorization: `Token ${accessToken}`,
    },
    method: 'POST',
    data,
  };
  return XHR(URL, options);
}

function* payment({ data }) {
  try {
    const response = yield call(paymentAPI, data.data);
    yield put(paymentSuccess(response?.data));
    // toast.success(`Payment Successful`);
    // yield put(
    //   push({
    //     pathname: '/admin/active-subscription',
    //   }),
    // );
    // sessionStorage.setItem('authToken', data.token);
  } catch (e) {
    const { response } = e;
    yield put(paymentFaluire(response.data));
    toast.error('Payment Failed');
  }
}

async function createSubscriptionAPI(data) {
  const accessToken = await sessionStorage.getItem('accessToken');
  const URL = `${BASE_URL}/api/v2/stripe_payment/create_subscription/`;
  const options = {
    headers: {
      Accept: 'application/json',
      Authorization: `Token ${accessToken}`,
    },
    method: 'POST',
    data,
  };
  return XHR(URL, options);
}

function* createSubscription({ data }) {
  try {
    const response = yield call(createSubscriptionAPI, data);
    yield put(createSubscriptionSuccess(response.data));
    yield put(checkSubscription(true));
    // sessionStorage.setItem('authToken', data.token);
    toast.success(`Created Successfully`);
    yield put(
      push({
        pathname: '/admin/active-subscription',
      }),
    );
  } catch (e) {
    const { response } = e;
    yield put(createSubscriptionFaluire(response.data));
    // toast.error('Failed');
  }
}
async function discountAPI(data) {
  const accessToken = await sessionStorage.getItem('accessToken');
  const URL = `${BASE_URL}/api/v2/stripe_payment/apply_coupon/`;
  const options = {
    headers: {
      Accept: 'application/json',
      Authorization: `Token ${accessToken}`,
    },
    method: 'POST',
    data,
  };
  return XHR(URL, options);
}

function* discountRequest({ data }) {
  try {
    const response = yield call(discountAPI, data);
    yield put(discountCodeSuccess(response.data));
  } catch (e) {
    const { response } = e;
    yield put(discountCodeFaluire(response.data));
  }
}

export default all([
  takeLatest(PAYMENT_REQUEST, payment),
  takeLatest(CREATE_SUBSCRIPTION_REQUEST, createSubscription),
  takeLatest(DISCOUNT_REQUEST, discountRequest),
]);
