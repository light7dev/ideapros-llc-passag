import { all, call, put, takeLatest } from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { showMessage } from 'react-native-flash-message';

// config
import { BASE_URL } from 'src/config/app';

// utils
import XHR from 'src/utils/XHR';

// types
import { UPDATE_PROFILE_REQUEST, PROFILE_EVENT_REQUEST, GET_PROFILE_REQUEST } from './types';

// actions
import {
  updateProfileSuccess,
  updateProfileFaluire,
  profileEventSuccess,
  profileEventFaluire,
  getProfileSuccess,
  getProfileFaluire,
  getProfileRequest,
} from './actions';
import { navigate } from 'src/navigator/NavigationService';

async function profileEventAPI() {
  const token = await AsyncStorage.getItem('authToken');

  const URL = `${BASE_URL}/api/v1/all_event/`;
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

function* profileEventCalled() {
  try {
    const response = yield call(profileEventAPI);
    yield put(profileEventSuccess(response?.data));
    showMessage({
      message: 'profile Event successfully!.',
      type: 'success',
    });
  } catch (e) {
    yield put(profileEventFaluire(e));
  }
}

async function updateProfileAPI(data, user_id) {
  const token = await AsyncStorage.getItem('authToken');
  const URL = `${BASE_URL}/api/v1/update_user_profile/${user_id}/`;

  const options = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: 'Token ' + token,
    },
    method: 'PATCH',
    data,
  };

  return XHR(URL, options);
}

function* updateProfileCalled({ data, user_id }) {
  console.log('Saga Data =>', data, user_id);
  try {
    const response = yield call(updateProfileAPI, data, user_id);
    yield put(updateProfileSuccess(response.data));
    yield call(getProfileRequest(user_id));
    showMessage({
      message: 'updateProfile successfully!.',
      type: 'success',
    });
  } catch (e) {
    yield put(updateProfileFaluire(e));
  }
}

async function getProfileAPI(data) {
  const token = await AsyncStorage.getItem('authToken');

  const URL = `${BASE_URL}/api/v1/update_user_profile/${data}/`;

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  };

  return XHR(URL, options);
}

function* getProfileCalled({ data }) {
  try {
    const response = yield call(getProfileAPI, data);
    yield put(getProfileSuccess(response.data));
    // showMessage({
    //   message: 'updateProfile successfully!.',
    //   type: 'success',
    // });
  } catch (e) {
    yield put(getProfileFaluire(e));
  }
}

export default all([
  takeLatest(UPDATE_PROFILE_REQUEST, updateProfileCalled),
  takeLatest(GET_PROFILE_REQUEST, getProfileCalled),
  takeLatest(PROFILE_EVENT_REQUEST, profileEventCalled),
]);
