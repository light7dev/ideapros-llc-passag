import { all, call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import toast from 'react-hot-toast';
// import AsyncStorage from '@react-native-community/async-storage';

// import { showMessage } from 'react-native-flash-message';

// config
import { BASE_URL } from '../../../../config/app';

// utils
import XHR from '../../../../utils/XHR';
import { SIGNUP_REQUEST } from './types';
import { registerFaluire, registerSuccess } from './actions';

function signUpAPI(data) {
  const URL = `${BASE_URL}/api/v1/signup/`;
  const options = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    data,
  };
  // console.log('HERE');
  return XHR(URL, options);
}

function* signUp({ data }) {
  try {
    const response = yield call(signUpAPI, data);
    // console.log('Signup api Success.........', response);
    // console.log('CALLED 1');
    yield put(registerSuccess(response?.data));
    toast.success(`Register Successfully`);
    yield put(
      push({
        pathname: '/auth/login',
      }),
    );
  } catch (e) {
    // console.log('CALLED 2');
    const { response } = e;
    yield put(registerFaluire(response?.data));
    // console.log("******************",response?.data);
    try {
      toast.error(`${response?.data?.non_field_errors[0]}`);
    } catch (e) {}
  }
}

export default all([takeLatest(SIGNUP_REQUEST, signUp)]);
