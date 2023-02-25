import { all, call, put, takeLatest } from 'redux-saga/effects';
import { LOGIN_REQUEST } from './types';
import { push } from 'connected-react-router';
import toast from 'react-hot-toast';
import { BASE_URL } from 'config/app';
import XHR from 'utils/XHR';
import { loginFaluire, loginSuccess, getAccessToken, checkSubscription } from './action';

async function signInAPI(data) {
  const URL = `${BASE_URL}/api/v2/login/`;
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
    const response = yield call(signInAPI, data);
    console.warn('Response testing...........>', response);
    sessionStorage.setItem('user', JSON.stringify(response.data.user));
    sessionStorage.setItem('accessToken', response.data.token);
    yield put(getAccessToken(response.data.token));
    yield put(loginSuccess(response.data));
    toast.success(`LoggedIn Successfully`);
    if (response.data.user_subscriptions.data.length > 0) {
      yield put(checkSubscription(true));
      sessionStorage.setItem('authToken', response.data.token);
      yield put(
        push({
          pathname: '/admin/active-subscription',
        }),
      );
    } else {
      yield put(
        push({
          pathname: '/payment/payment-subscription',
        }),
      );
    }
    // yield put(loginSuccess());
  } catch (e) {
    const { response } = e;
    // console.log('FAILURE//////////////////', response.data);
    yield put(loginFaluire(response?.data));
    try {
      toast.error(`${response?.data?.non_field_errors[0]}`);
    } catch (e) {}
  }
}

export default all([takeLatest(LOGIN_REQUEST, login)]);
