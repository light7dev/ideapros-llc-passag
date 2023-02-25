import { all, call, put, takeLatest } from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { showMessage } from 'react-native-flash-message';

// config
import { BASE_URL } from 'src/config/app';

// utils
import XHR from 'src/utils/XHR';

// types
import { DELETEACCOUNT_REQUEST } from './types';

// actions
import { deleteAccountSuccess, deleteAccountFaluire } from './actions';
import { navigate } from 'src/navigator/NavigationService';

async function deleteAccountAPI(data) {
  const token = await AsyncStorage.getItem('authToken');

  const URL = `${BASE_URL} /api/v1/update_user_profile/user_id/`;
  const options = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',

      Authorization: `Token ${token}`,
    },
    method: 'POST',
    data,
  };

  return XHR(URL, options);
}

function* deleteAccountCalled({ data }) {
  try {
    const response = yield call(deleteAccountAPI, data);
    // showMessage({
    //   message: 'deleteAccount successfully!.',
    //   type: 'success',
    // });
    yield put(deleteAccountSuccess(response?.data));
    // navigate('Setting');
  } catch (e) {
    yield put(deleteAccountFaluire(e));
    showMessage({
      message: 'Unable to deleteAccount, something went wrong!',
      type: 'danger',
    });
  }
}

export default all([takeLatest(DELETEACCOUNT_REQUEST, deleteAccountCalled)]);
