import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  CANCEL_SUBSCRIPTION_REQUEST,
  GET_CARD_REQUEST,
  GET_SUBSCRIPTION_LIST_REQUEST,
} from './types';
import { push } from 'connected-react-router';
// import toast from "react-hot-toast"
import { BASE_URL } from 'config/app';
import XHR from 'utils/XHR';
import {
  CancelSubscriptionFailure,
  CancelSubscriptionSuccess,
  GetCardFaluire,
  GetCardSuccess,
  GetSubscriptionListFailure,
  GetSubscriptionListSuccess,
} from './action';
import toast from 'react-hot-toast';

import { checkSubscription } from '../../../AuthScreen/Login/redux/action';

async function CancelSubscriptionAPI(data) {
  const accessToken = await sessionStorage.getItem('accessToken');
  const URL = `${BASE_URL}/api/v2/stripe_payment/remove_subscription/`;
  const options = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${accessToken}`,
    },
    method: 'DELETE',
    data,
  };

  return XHR(URL, options);
}

function* CancelSubscription({ data }) {
  try {
    // console.log("Data show Id", data);
    const response = yield call(CancelSubscriptionAPI, data);
    yield put(CancelSubscriptionSuccess(response?.data));
    yield put(checkSubscription(false));
    yield put(
      push({
        pathname: '/payment/payment-subscription',
      }),
    );
  } catch (e) {
    const { response } = e;
    yield put(CancelSubscriptionFailure(response));
    toast.error('no such subscriptions');
  }
}

async function GetSubscriptonAPI(data) {
  // console.log('data', data);
  const accessToken = await sessionStorage.getItem('accessToken');
  const URL = `${BASE_URL}/api/v2/stripe_payment/subscription_list/`;
  const options = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${accessToken}`,
    },
    method: 'GET',
  };

  return XHR(URL, options);
}

async function GetCardDataAPI(data) {
  // console.log('data', data);
  const accessToken = await sessionStorage.getItem('accessToken');
  const URL = `${BASE_URL}/api/v2/stripe_payment/list_cards/`;
  const options = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${accessToken}`,
    },
    method: 'GET',
  };

  return XHR(URL, options);
}

function* GetSubscriptionData({ data }) {
  try {
    const response = yield call(GetSubscriptonAPI, data);
    // console.log("getSubscriptionList Success..........", response.data)
    yield put(GetSubscriptionListSuccess(response?.data));
  } catch (e) {
    const { response } = e;
    // console.log("getBusinessAccounts failure..........", response)
    yield put(GetSubscriptionListFailure(response));
  }
}

function* GetCardData({ data }) {
  try {
    const response = yield call(GetCardDataAPI, data);
    // console.log("getCard Success..........", response.data)
    yield put(GetCardSuccess(response?.data));
  } catch (e) {
    const { response } = e;
    // console.log("getBusinessAccounts failure..........", response)
    yield put(GetCardFaluire(response));
  }
}

export default all([
  takeLatest(GET_CARD_REQUEST, GetCardData),
  takeLatest(CANCEL_SUBSCRIPTION_REQUEST, CancelSubscription),
  takeLatest(GET_SUBSCRIPTION_LIST_REQUEST, GetSubscriptionData),
]);
