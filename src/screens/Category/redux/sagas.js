import { all, call, put, takeLatest } from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { showMessage } from 'react-native-flash-message';

// config
import { BASE_URL } from '../../../config/app';

// utils
import XHR from '../../../utils/XHR';

// types
import { CATEGORY_REQUEST } from './types';

// actions
import { categorySuccess, categoryFaluire } from './actions';

async function homeDataAPI() {
  const token = await AsyncStorage.getItem('authToken');
  const URL = `${BASE_URL}/api/v1/category/`;
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

function* category() {
  try {
    const response = yield call(homeDataAPI);
    yield put(categorySuccess(response?.data));
  } catch (e) {
    yield put(categoryFaluire(e));
  }
}

export const getSubscriptionAPI = (token) => {
  const URL = `${BASE_URL}/api/v1/category/has_subscription/`;
  const options = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`
    },
    method: 'GET',
  };

  return XHR(URL, options);
}

export default all([takeLatest(CATEGORY_REQUEST, category)]);
