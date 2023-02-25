import { all, call, put, takeLatest } from 'redux-saga/effects';
// config
import { BASE_URL } from 'src/config/app';

// utils
import XHR from 'src/utils/XHR';

// types
import { GET_INFO_REQUEST } from './types';

// actions
import { getIntroSuccess, getIntroFaluire } from './actions';

function getIntroAPI() {
  const URL = `${BASE_URL}/api/v1/intro/`;
  const options = {
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    method: 'GET',
  };

  return XHR(URL, options);
}

function* getIntro() {

  try {
    const response = yield call(getIntroAPI);

    yield put(getIntroSuccess(response?.data[0]));
  } catch (e) {

    yield put(getIntroFaluire(e));
  }
}

export default all([takeLatest(GET_INFO_REQUEST, getIntro)]);
