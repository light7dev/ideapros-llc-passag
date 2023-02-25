import {
  PAYMENT_REQUEST,
  PAYMENT_SUCCESS,
  PAYMENT_FAILURE,
  CREATE_SUBSCRIPTION_FAILURE,
  CREATE_SUBSCRIPTION_REQUEST,
  CREATE_SUBSCRIPTION_SUCCESS,
  DISCOUNT_REQUEST,
  DISCOUNT_REQUEST_FAILURE,
  DISCOUNT_REQUEST_SUCCESS,
} from './types';

export const paymentRequest = (data) => ({
  type: PAYMENT_REQUEST,
  data,
});

export const paymentSuccess = (data) => ({
  type: PAYMENT_SUCCESS,
  data,
});

export const paymentFaluire = (data) => ({
  type: PAYMENT_FAILURE,
  data,
});

export const createSubscriptionRequest = (data) => ({
  type: CREATE_SUBSCRIPTION_REQUEST,
  data,
});

export const createSubscriptionSuccess = () => ({
  type: CREATE_SUBSCRIPTION_SUCCESS,
});

export const createSubscriptionFaluire = (data) => ({
  type: CREATE_SUBSCRIPTION_FAILURE,
  data,
});

export const discountCode = (data) => ({
  type: DISCOUNT_REQUEST,
  data,
});

export const discountCodeSuccess = (data) => ({
  type: DISCOUNT_REQUEST_SUCCESS,
  data,
});

export const discountCodeFaluire = (data) => ({
  type: DISCOUNT_REQUEST_FAILURE,
  data,
});
