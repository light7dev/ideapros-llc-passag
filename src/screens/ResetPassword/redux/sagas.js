import { all, call, put, takeLatest } from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { showMessage } from 'react-native-flash-message';

// config
import { BASE_URL } from 'src/config/app';

// utils
import XHR from 'src/utils/XHR';

// types
import { LOGIN, CHANGE_PASSWORD } from './types';

// actions
import { reset, setAccessToken as setAccessTokeAction, resetChangePassword } from './actions';

// navigation


function loginAPI(data) {
  const URL = `${BASE_URL}/api/v1/token/login/`;
  const options = {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    data,
  };

  return XHR(URL, options);
}

function* login({ data }) {
  try {
    const res = yield call(loginAPI, data);
    yield put(reset());
    AsyncStorage.setItem('accessToken', res.data.access);

    yield put(setAccessTokeAction(res.data.access));
  } catch (e) {

    yield put(reset());

    showMessage({
      message: 'Unable to login, something went wrong.',
      type: 'danger',
    });
  }
}

async function changePasswordAPI(data) {
  const URL = `${BASE_URL}/api/change-password`;
  const accessToken = await AsyncStorage.getItem('accessToken');
  const options = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    method: 'POST',
    data,
  };

  return XHR(URL, options);
}

function* changePassword({ data }) {
  try {
    const response = yield call(changePasswordAPI, data);
    yield put(resetChangePassword());
    showMessage({
      message: response.data.message,
      type: 'success',
    });
  } catch (e) {
    const { response } = e;
    yield put(resetChangePassword());
    showMessage({
      message: response ? response.data.message : appConfig.networkStatus,
      type: 'danger',
    });
  }
  goBack();
}

export default all([takeLatest(LOGIN, login), takeLatest(CHANGE_PASSWORD, changePassword)]);
