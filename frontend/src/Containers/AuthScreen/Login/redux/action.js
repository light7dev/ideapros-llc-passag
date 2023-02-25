import {
  LOGING_FALUIRE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  GET_ACCESS_TOKEN,
  SET_STATES_FALSE,
  SET_PLANS_DATA,
  CHECK_SUBSCRIPTION_STATE,
} from './types';

export const loginRequest = (data) => ({
  type: LOGIN_REQUEST,
  data,
});

export const loginSuccess = (data) => ({
  type: LOGIN_SUCCESS,
  data,
});

export const loginFaluire = (data) => ({
  type: LOGING_FALUIRE,
  data,
});

export const getAccessToken = (data) => ({
  type: GET_ACCESS_TOKEN,
  data,
});

export const logout = () => ({
  type: SET_STATES_FALSE,
});

export const setPlansData = (data) => ({
  type: SET_PLANS_DATA,
  data,
});

export const checkSubscription = (data) => ({
  type: CHECK_SUBSCRIPTION_STATE,
  data,
});
