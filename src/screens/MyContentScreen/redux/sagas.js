import { all, call, put, takeLatest } from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';

// config
import { BASE_URL } from 'src/config/app';

// utils
import XHR from 'src/utils/XHR';

// types contentEvent
import { CONTENT_EVENT_REQUEST, CONTENT_DELETE_EVENT_REQUEST } from './types';

// actions
import {
  contentEventRequest,
  contentEventSuccess,
  contentEventFaluire,
  contentEventDeleteSuccess,
  contentEventDeleteFaluire,
} from './actions';
import { navigate } from 'src/navigator/NavigationService';

async function contentEventAPI(data) {
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

function* contentEventCalled({}) {
  try {
    const response = yield call(contentEventAPI);

    yield put(contentEventSuccess(response?.data));
  } catch (e) {
    yield put(contentEventFaluire(e));
  }
}

async function contentEventDeleteAPI(id) {
  const token = await AsyncStorage.getItem('authToken');

  const URL = `${BASE_URL}/api/v1/all_event/${id}/`;
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

function* contentEventDeleteCalled({ id }) {
  try {
    const response = yield call(contentEventDeleteAPI, id);
    yield put(contentEventDeleteSuccess(response));
    yield put(contentEventRequest());
  } catch (e) {
    yield put(contentEventDeleteFaluire(e));
  }
}

export default all([
  takeLatest(CONTENT_EVENT_REQUEST, contentEventCalled),
  takeLatest(CONTENT_DELETE_EVENT_REQUEST, contentEventDeleteCalled),
]);
