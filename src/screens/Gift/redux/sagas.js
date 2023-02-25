import { all, call, put, takeLatest } from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { showMessage } from 'react-native-flash-message';

// config
import { BASE_URL } from '../../../config/app';

// utils
import XHR from '../../../utils/XHR';

// types
import { LIFESTORY_REQUEST } from './types';

// actions
import { lifeStorySuccess, lifeStoryFaluire } from './actions';

async function lifeStoryAPI(data) {
  const token = await AsyncStorage.getItem('authToken');
  const URL = `${BASE_URL}/api/v1/all_event/`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Token ${token}`,
    },
    data,
  };

  return XHR(URL, options);
}

function* lifeStoryCalled({ data }) {
  try {
    const response = yield call(lifeStoryAPI, data);
    showMessage({
      message: 'Your data has been saved',
      type: 'success',
    });

    yield put(lifeStorySuccess(response?.data));
  } catch (e) {
    showMessage({
      message: 'Your data not been save',
      type: 'danger',
    });

    yield put(lifeStoryFaluire(e));
  }
}

export default all([takeLatest(LIFESTORY_REQUEST, lifeStoryCalled)]);
