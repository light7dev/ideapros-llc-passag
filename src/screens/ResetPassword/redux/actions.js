import {
  LOGIN,
  RESET,
  LOGIN_FAILED,
  SET_ERROR,
  SET_ACCESS_TOKEN,
  CONTINUE_AS_GUEST,
  SET_DEFAULT_COUNTRY,
  LOGOUT,
  CHANGE_PASSWORD,
  RESET_CHANGE_PASSWORD,
} from './types';

export const login = data => ({
  type: LOGIN,
  data,
});

export const loginFailed = error => ({
  type: LOGIN_FAILED,
  error,
});

export const reset = () => ({
  type: RESET,
});

export const setError = error => ({
  type: SET_ERROR,
  error,
});

export const setAccessToken = data => ({
  type: SET_ACCESS_TOKEN,
  data,
});

export const continueAsGuest = () => ({
  type: CONTINUE_AS_GUEST,
});

export const setDefaultCountry = data => ({
  type: SET_DEFAULT_COUNTRY,
  data,
});

export const logout = () => ({
  type: LOGOUT,
});

export const changePassword = data => ({
  type: CHANGE_PASSWORD,
  data,
});

export const resetChangePassword = () => ({
  type: RESET_CHANGE_PASSWORD,
});
