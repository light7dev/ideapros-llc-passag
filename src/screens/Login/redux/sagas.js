import { all, call, put, takeLatest } from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage } from 'react-native-flash-message';

// config
import { BASE_URL } from 'src/config/app';
// utils
import XHR from 'src/utils/XHR';

// types
import {
  FORGOT_PASSWORD,
  GET_TOKEN_REQUEST,
  LOGIN_REQUEST,
  LOGIN_VIA_FACEBOOK_REQUEST,
  LOGIN_VIA_GMAIL_REQUEST,
  LOGIN_VIA_APPLE_REQUEST,
  RESET_PASS_REQUEST,
  RESEND_FORGOT_PASSWORD,
} from './types';

//actions
import {
  dotsSecond,
  loginSuccess,
  loginFaluire,
  loginViaFacebookSuccess,
  loginViaFacebookFaluire,
  loginViaGmailSuccess,
  loginViaGmailFaluire,
  loginViaAppleSuccess,
  loginViaAppleFaluire,
  forgotPasswordSuccess,
  forgotPasswordFaluire,
  getTokenSuccess,
  getTokenFaluire,
  resetPassSuccess,
  resetPassFaluire,
  dotsSecondReset,
  getAccessTokenSuccess,
  reSendForgotPasswordSuccess,
  reSendForgotPasswordFaluire,
} from './actions';
import { navigate, navigateAndSimpleReset } from '../../../navigator/NavigationService';

function loginAPI(data) {
  const URL = `${BASE_URL}/api/v1/login/`;
  const options = {
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    method: 'POST',
    data,
  };

  return XHR(URL, options);
}

function* login({ data }) {
  try {
    const response = yield call(loginAPI, data);
    yield put(loginSuccess(response?.data?.user));
    AsyncStorage.setItem('authToken', response?.data?.token);
    yield put(getAccessTokenSuccess(true));
  } catch (e) {
    let err =
      e?.response && e.response?.data && e.response.data?.non_field_errors
        ? e.response.data.non_field_errors[0]
        : e?.response && e.response?.data && e.response.data?.email
        ? e.response.data.email[0]
        : e?.response && e.response?.data && e.response.data?.password
        ? e.response.data.password[0]
        : 'Something went wrong.';
    yield put(loginFaluire(err));
    showMessage({
      message: err,
      type: 'danger',
    });
  }
}

function loginViaFacebookAPI(data) {
  const URL = `${BASE_URL}/api/v1/login/facebook/`;
  const options = {
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    method: 'POST',
    data: { access_token: data },
  };

  return XHR(URL, options);
}

function* loginViaFacebook({ data }) {
  try {
    const response = yield call(loginViaFacebookAPI, data);
    const token = AsyncStorage.setItem('authToken', response?.data?.token);
    yield put(loginViaFacebookSuccess(response?.data?.key));
    yield put(loginSuccess(response.data.user));

    yield put(getAccessTokenSuccess(true));
  } catch (e) {
    if (e.message == 'Network Error') {
      yield put(loginViaFacebookFaluire('Connection Error'));
    } else {
      yield put(loginViaFacebookFaluire(e.response));

      showMessage({
        message: 'Unable to login via Facebook, something went wrong!',
        type: 'danger',
      });
    }
  }
}

function loginViaGmailAPI(data) {
  const URL = `${BASE_URL}/api/v1/login/google/`;
  const options = {
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    method: 'POST',
    data: { access_token: data },
  };

  return XHR(URL, options);
}

function* loginViaGmail({ data }) {
  try {
    const response = yield call(loginViaGmailAPI, data);
    AsyncStorage.setItem('authToken', response?.data?.token);
    yield put(loginViaGmailSuccess(response?.data?.user));
    yield put(getAccessTokenSuccess(true));
  } catch (e) {
    let err =
      e.response && e.response.data && e.response.data.detail
        ? e.response.data.detail
        : 'Something went wrong.';
    if (e.message == 'Network Error') {
      yield put(loginViaGmailFaluire('Connection Error'));
    } else {
      yield put(loginViaGmailFaluire(err));
      showMessage({
        message: err,
        type: 'danger',
      });
    }
  }
}

function loginViaAppleAPI(data) {
  const URL = `${BASE_URL}/api/v1/login/apple/`;
  const options = {
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    method: 'POST',
    data,
  };

  return XHR(URL, options);
}

function* loginViaApple({ data }) {
  try {
    const response = yield call(loginViaAppleAPI, data);
    AsyncStorage.setItem('authToken', response?.data?.token);
    yield put(loginViaAppleSuccess(response?.data?.user));
    yield put(getAccessTokenSuccess(true));
  } catch (e) {
    let err =
      e.response && e.response.data && e.response.data.detail
        ? e.response.data.detail
        : 'Something went wrong.';
    if (e.message == 'Network Error') {
      yield put(loginViaAppleFaluire('Connection Error'));
    } else {
      yield put(loginViaAppleFaluire(e));
    }
  }
}

async function forgotPasswordAPI(data) {
  const URL = `${BASE_URL}/api/v1/password/reset/`;
  const options = {
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    method: 'POST',
    data: { email: data },
  };

  return XHR(URL, options);
}

function* forgotPassword({ data }) {
  try {
    const response = yield call(forgotPasswordAPI, data);
    yield put(forgotPasswordSuccess(response.data));
    yield put(dotsSecond());
  } catch (e) {
    let err =
      e?.response && e.response?.data && e.response.data?.email
        ? e.response.data.email
        : 'Something went wrong';
    if (e.message == 'Network Error') {
      yield put(forgotPasswordFaluire('Connection Error'));
    } else {
      yield put(forgotPasswordFaluire(err));
    }
  }
}

async function getTokenAPI(data) {
  const URL = `${BASE_URL}/api/v1/password/reset/validate_token/`;

  const options = {
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    method: 'POST',
    data: { token: data },
  };

  return XHR(URL, options);
}

function* getToken({ data }) {
  try {
    const response = yield call(getTokenAPI, data);

    yield put(getTokenSuccess(response.data));
    yield put(dotsSecond());
  } catch (e) {
    if (e.message == 'Network Error') {
      yield put(getTokenFaluire('Connection Error'));
    } else {
      yield put(getTokenFaluire('Invalid Token'));
    }
  }
}

async function resetPassAPI(data) {
  const URL = `${BASE_URL}/api/v1/password/reset/confirm/`;
  const options = {
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    method: 'POST',
    data,
  };

  return XHR(URL, options);
}

function* resetPassword({ data }) {
  try {
    const response = yield call(resetPassAPI, data);
    yield put(resetPassSuccess(response.data));
    showMessage({
      message: 'Password reset successfully.',
      type: 'success',
    });
    yield put(dotsSecondReset());
  } catch (e) {
    if (e.message == 'Network Error') {
      yield put(resetPassFaluire('Connection Error'));
    } else {
      yield put(resetPassFaluire(e.response));
    }
  }
}

async function resendforgotPasswordAPI(data) {
  const URL = `${BASE_URL}/api/v1/password/reset/`;
  const options = {
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    method: 'POST',
    data: { email: data },
  };

  return XHR(URL, options);
}

function* resendforgotPassword({ data }) {
  try {
    const response = yield call(resendforgotPasswordAPI, data);
    yield put(reSendForgotPasswordSuccess(response.data));
  } catch (e) {
    let err =
      e?.response && e.response?.data && e.response.data?.email
        ? e.response.data.email
        : 'Something went wrong';
    if (e.message == 'Network Error') {
      yield put(reSendForgotPasswordFaluire('Connection Error'));
    } else {
      yield put(reSendForgotPasswordFaluire(err));
    }
  }
}

export default all([
  takeLatest(LOGIN_REQUEST, login),
  takeLatest(LOGIN_VIA_FACEBOOK_REQUEST, loginViaFacebook),
  takeLatest(LOGIN_VIA_GMAIL_REQUEST, loginViaGmail),
  takeLatest(LOGIN_VIA_APPLE_REQUEST, loginViaApple),
  takeLatest(FORGOT_PASSWORD, forgotPassword),
  takeLatest(GET_TOKEN_REQUEST, getToken),
  takeLatest(RESET_PASS_REQUEST, resetPassword),
  takeLatest(RESEND_FORGOT_PASSWORD, resendforgotPassword),
]);
