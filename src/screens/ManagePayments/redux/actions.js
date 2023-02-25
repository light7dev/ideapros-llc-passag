import {
  LISTCARD_REQUEST,
  LISTCARD_SUCCESS,
  LISTCARD_FALUIRE,
  DELETECARD_REQUEST,
  DELETECARD_SUCCESS,
  DELETECARD_FALUIRE,
  PAYMENTS_REQUEST,
  PAYMENTS_SUCCESS,
  PAYMENTS_FALUIRE,
} from './types';

export const listCardRequest = () => ({
  type: LISTCARD_REQUEST,
});

export const listCardSuccess = (data) => ({
  type: LISTCARD_SUCCESS,
  data,
});

export const listCardFaluire = (error) => ({
  type: LISTCARD_FALUIRE,
  error,
});

export const deleteCardRequest = (data) => ({
  type: DELETECARD_REQUEST,
  data,
});

export const deleteCardSuccess = (data) => ({
  type: DELETECARD_SUCCESS,
  data,
});

export const deleteCardFaluire = (error) => ({
  type: DELETECARD_FALUIRE,
  error,
});

export const paymentsRequest = (data) => ({
  type: PAYMENTS_REQUEST,
  data,
});

export const paymentsSuccess = (data) => ({
  type: PAYMENTS_SUCCESS,
  data,
});

export const paymentsFaluire = (error) => ({
  type: PAYMENTS_FALUIRE,
  error,
});
