import { all, call, put, takeLatest } from 'redux-saga/effects';
// import AsyncStorage from "@react-native-community/async-storage"
import { showMessage } from 'react-native-flash-message';

// config
import { BASE_URL } from 'src/config/app';
// import {appConfig} from 'src/config/app';

// utils
import XHR from 'src/utils/XHR';

// types
import types from './types';

// actions
import {
  getPrivacyPolicyFailure,
  getPrivacyPolicySuccess,
  getUserPrivacyPolicyidFailure,
  getUserPrivacyPolicyidSuccess,
} from './actions';

async function getPrivacyPolicyDataAPI() {
  const URL = `${BASE_URL}/api/v1/privacy_terms/`;
  // const authToken = await AsyncStorage.getItem("authToken")

  const options = {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  };
  return XHR(URL, options);
}

function* getPrivacyPolicyData({}) {
  try {
    const response = yield call(getPrivacyPolicyDataAPI);

    yield put(getPrivacyPolicySuccess(response.data));
  } catch (e) {
    yield put(getPrivacyPolicyFailure());

    showMessage({
      message: 'Unable to load data, something went wrong.',
      type: 'danger',
    });
  }
}
async function getUserPrivacyPolicyidDataAPI(id) {
  const URL = `${BASE_URL}/api/v1/privacy_terms/`;
  // const authToken = await AsyncStorage.getItem("authToken")

  const options = {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  };
  return XHR(URL, options);
}

function* getUserPrivacyPolicyidData({ id }) {
  try {
    const response = yield call(getUserPrivacyPolicyidDataAPI, id);

    yield put(getUserPrivacyPolicyidSuccess(response.data));
  } catch (e) {
    yield put(getUserPrivacyPolicyidFailure());

    showMessage({
      message: 'Unable to load data, something went wrong.',
      type: 'danger',
    });
  }
}

export default all([
  takeLatest(types.getPrivacyPolicy, getPrivacyPolicyData),
  takeLatest(types.getUserPrivacyPolicyid, getUserPrivacyPolicyidData),
]);
