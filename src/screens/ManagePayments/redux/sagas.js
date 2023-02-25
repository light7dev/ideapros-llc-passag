import { all, call, put, takeLatest } from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { showMessage } from 'react-native-flash-message';

// config
import { BASE_URL } from 'src/config/app';

// utils
import XHR from 'src/utils/XHR';

// types
import { DELETECARD_REQUEST, PAYMENTS_REQUEST, LISTCARD_REQUEST } from './types';

// actions
import {
  listCardSuccess,
  listCardFaluire,
  deleteCardSuccess,
  deleteCardFaluire,
  paymentsSuccess,
  paymentsFaluire,
} from './actions';

async function listCardAPI() {
  const token = await AsyncStorage.getItem('authToken');

  const URL = `${BASE_URL}/api/v1/stripe_payment/list_cards/`;
  const options = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',

      Authorization: `Token ${token}`,
    },
    method: 'GET',
  };

  return XHR(URL, options);
}

function* listCard() {
  try {
    const response = yield call(listCardAPI);

    yield put(listCardSuccess(response?.data.data));
  } catch (e) {
    yield put(listCardFaluire(e));
    showMessage({
      message: 'Unable to List Payments, something went wrong!',
      type: 'danger',
    });
  }
}

async function deleteCardAPI(data) {
  const token = await AsyncStorage.getItem('authToken');
  const URL = `${BASE_URL}/api/v1/stripe_payment/delete_card/`;
  const options = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',

      Authorization: `Token ${token}`,
    },
    method: 'DELETE',
    data: {
      card_id: data,
    },
  };

  return XHR(URL, options);
}

function* deleteCardCalled({ data }) {
  try {
    const response = yield call(deleteCardAPI, data);
    showMessage({
      message: 'deleteCard successfully!.',
      type: 'success',
    });
    yield put(deleteCardSuccess(response));
  } catch (e) {
    yield put(deleteCardFaluire(e));
    showMessage({
      message: 'Unable to deleteCard, something went wrong!',
      type: 'danger',
    });
  }
}

async function paymentsAPI(data) {
  const { name, card_num, cvc, expiry_month, expiry_year } = data;
  const token = await AsyncStorage.getItem('authToken');

  const URL = `${BASE_URL}/api/v1/stripe_payment/create_card/`;
  const options = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
    method: 'POST',
    data: {
      name: name,
      card_num: card_num,
      expiry_month: expiry_month,
      expiry_year: expiry_year,
      cvc: cvc,
    },
  };

  return XHR(URL, options);
}

function* paymentsCalled({ data }) {
  try {
    const response = yield call(paymentsAPI, data);

    yield put(paymentsSuccess(response?.data));
  } catch (e) {
    yield put(paymentsFaluire(e));
    showMessage({
      message: 'something went wrong please try again.',
      type: 'danger',
    });
  }
}

export default all([
  takeLatest(DELETECARD_REQUEST, deleteCardCalled),
  takeLatest(PAYMENTS_REQUEST, paymentsCalled),
  takeLatest(LISTCARD_REQUEST, listCard),
]);
