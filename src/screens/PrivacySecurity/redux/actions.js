import { DELETEACCOUNT_REQUEST, DELETEACCOUNT_SUCCESS, DELETEACCOUNT_FALUIRE } from './types';

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
