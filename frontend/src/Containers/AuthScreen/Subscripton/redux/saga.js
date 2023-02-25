import { all, call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import toast from 'react-hot-toast';
// import AsyncStorage from '@react-native-community/async-storage';

// import { showMessage } from 'react-native-flash-message';

// config
import { BASE_URL } from '../../../../config/app';

// utils
import XHR from '../../../../utils/XHR';
import { GET_SUBSCRIPTION_LIST, GET_PLANS_LIST } from './types';
import {
  getSubscriptionListSuccess,
  getSubscriptionListFailure,
  getPlanListSuccess,
  getPlanListFailure,
} from './action';

async function getSubscriptionsAPI() {
  const accessToken = await sessionStorage.getItem('accessToken');
  // console.log('accessToken =>', accessToken);
  const URL = `${BASE_URL}/api/v2/stripe_payment/get_stripe_products/`;
  // console.log('URL =>', URL);
  const options = {
    headers: {
      Accept: 'application/json',
      Authorization: `Token ${accessToken}`,
    },
    method: 'GET',
  };
  return XHR(URL, options);
}

function* getSubscriptions({ data }) {
  try {
    const response = yield call(getSubscriptionsAPI, data);
    // console.log('getSubscriptions success............', response.data);
    yield put(getSubscriptionListSuccess(response.data));
    // toast.success(`Subscription cancelled Successfully`);
    // yield put(
    //   push({
    //     pathname: "/auth/login"
    //   })
    // )
  } catch (e) {
    const { response } = e;
    console.log('getSubscriptions failur............', response);
    yield put(getSubscriptionListFailure(response?.data));
  }
}

async function getPlansAPI() {
  const accessToken = await sessionStorage.getItem('accessToken');
  // console.log('accessToken =>', accessToken);
  const URL = `${BASE_URL}/api/v2/stripe_payment/get_plans/`;
  // console.log('URL =>', URL);
  const options = {
    headers: {
      Accept: 'application/json',
      Authorization: `Token ${accessToken}`,
    },
    method: 'GET',
  };
  return XHR(URL, options);
}

function* getPlans({ data }) {
  try {
    const response = yield call(getPlansAPI, data);
    // console.log('getPlans success............', response.data);
    yield put(getPlanListSuccess(response.data));
    // toast.success(`Subscription cancelled Successfully`);
    // yield put(
    //   push({
    //     pathname: "/auth/login"
    //   })
    // )
  } catch (e) {
    const { response } = e;
    yield put(getPlanListFailure(response?.data));
  }
}

export default all([
  takeLatest(GET_SUBSCRIPTION_LIST, getSubscriptions),
  takeLatest(GET_PLANS_LIST, getPlans),
]);
