import { all, call, put, takeLatest } from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { showMessage } from 'react-native-flash-message';

// config
import { BASE_URL } from '../../../config/app';

// utils
import XHR from '../../../utils/XHR';
import { navigate, navigateAndSimpleReset } from '../../../navigator/NavigationService';

// types
import { LIFESTORY_REQUEST, EDIT_LIFESTORY_REQUEST } from './types';

// actions
import {
  lifeStorySuccess,
  lifeStoryFaluire,
  editLifeStoryFaluire,
  editLifeStorySuccess,
} from './actions';

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

    navigate('Category', { screen: 'MyContentScreen' });
  } catch (e) {
    yield put(
      lifeStoryFaluire(
        e.response.data?.low_storage
          ? e.response.data.low_storage
          : 'Something went wrong please try again.',
      ),
    );
    showMessage({
      message: e.response.data?.low_storage
        ? e.response.data.low_storage
        : 'Something went wrong please try again.',
      type: 'danger',
    });
  }
}

async function editLifeStoryAPI(data, id) {
  const token = await AsyncStorage.getItem('authToken');
  const URL = `${BASE_URL}/api/v1/all_event/${id}`;

  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Token ${token}`,
    },
    data,
  };

  return XHR(URL, options);
}

function* editLifeStoryCalled({ data, id }) {
  try {
    const response = yield call(editLifeStoryAPI, data, id);
    showMessage({
      message: 'Your data has been saved',
      type: 'success',
    });

    yield put(editLifeStorySuccess(response?.data));
    navigate('MyContentScreen');
  } catch (e) {
    yield put(
      editLifeStoryFaluire(
        e.response.data?.low_storage
          ? e.response.data.low_storage
          : 'Something went wrong please try again.',
      ),
    );
    showMessage({
      message: e.response.data?.low_storage
        ? e.response.data.low_storage
        : 'Something went wrong please try again.',
      type: 'danger',
    });
  }
}

export default all([
  takeLatest(LIFESTORY_REQUEST, lifeStoryCalled),
  takeLatest(EDIT_LIFESTORY_REQUEST, editLifeStoryCalled),
]);
