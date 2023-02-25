import { all, call, put, takeLatest } from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { showMessage } from 'react-native-flash-message';

// config
import { BASE_URL } from 'src/config/app';

// utils
import XHR from 'src/utils/XHR';

// types
import { DELETEACCOUNT_REQUEST, REQUEST_CHANGE_PASSWORD } from './types';

// actions
import {
  deleteAccountSuccess,
  deleteAccountFaluire,
  requestChangePasswordSuccess,
  requestChangePasswordFailure,
} from './actions';
import { getAccessTokenSuccess } from '../../Login/redux/actions';

async function changePasswordAPI(data) {
  const URL = `${BASE_URL}/api/v1/password/change/`;
  const token = await AsyncStorage.getItem('authToken');
  const options = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
    method: 'POST',
    data,
  };

  return XHR(URL, options);
}

function* changePassword({ data }) {
  try {
    const response = yield call(changePasswordAPI, data);
    yield put(requestChangePasswordSuccess());
    showMessage({
      message: 'Changed password successfully',
      type: 'success',
    });
  } catch (e) {
    let err = e?.response?.data?.old_password
      ? e.response.data.old_password[0]
      : 'something went wrong please try again.';
    yield put(requestChangePasswordFailure());
    showMessage({
      message: err,
      type: 'danger',
    });
  }
}

async function deleteAccountAPI(data) {
  const token = await AsyncStorage.getItem('authToken');
  const URL = `${BASE_URL}/api/v1/update_user_profile/${data}/`;
  const options = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',

      Authorization: `Token ${token}`,
    },
    method: 'DELETE',
  };

  return XHR(URL, options);
}

function* deleteAccountCalled({ data }) {
  try {
    const response = yield call(deleteAccountAPI, data);

    yield put(deleteAccountSuccess(response));
    yield put(getAccessTokenSuccess(false));
  } catch (e) {
    yield put(deleteAccountFaluire(e));
  }
}

export default all([
  takeLatest(DELETEACCOUNT_REQUEST, deleteAccountCalled),
  takeLatest(REQUEST_CHANGE_PASSWORD, changePassword),
]);
