import { SIGNUP_REQUEST, SIGNUP_REQUEST_FALUIRE, SIGNUP_REQUEST_SUCCESS } from './types';

export const registerRequest = (data) => (
  {
  type: SIGNUP_REQUEST,
  data,
});

export const registerSuccess = (data) => (
  {
  type: SIGNUP_REQUEST_SUCCESS,
  data,
});

export const registerFaluire = (data) => (
  {
  type: SIGNUP_REQUEST_FALUIRE,
  data,
});
