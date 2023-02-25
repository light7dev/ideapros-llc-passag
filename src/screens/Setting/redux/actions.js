import {
  DELETEACCOUNT_REQUEST,
  DELETEACCOUNT_SUCCESS,
  DELETEACCOUNT_FALUIRE,

  REQUEST_CHANGE_PASSWORD,
  REQUEST_CHANGE_PASSWORD_SUCCESS,
  REQUEST_CHANGE_PASSWORD_FAILURE,
  RESET,

  SIGN_OUT,
} from './types';

export const deleteAccountRequest = (data) => ({
  type: DELETEACCOUNT_REQUEST,
  data,
});

export const deleteAccountSuccess = (data) => ({
  type: DELETEACCOUNT_SUCCESS,
  data,
});

export const deleteAccountFaluire = (error) => ({
  type: DELETEACCOUNT_FALUIRE,
  error,
});

export const requestChangePassword = (data) => ({
    type: REQUEST_CHANGE_PASSWORD,
    data
});

export const requestChangePasswordSuccess = () => ({
    type: REQUEST_CHANGE_PASSWORD_SUCCESS,
});

export const requestChangePasswordFailure = errors => ({
    type: REQUEST_CHANGE_PASSWORD_FAILURE,
    errors,
});

export const reset = () => ({
    type: RESET,
});
