import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FALUIRE,
  RESET_SIGNUP,
  CREATE_STRIPE_CUSTOMER_REQUEST,
  CREATE_STRIPE_CUSTOMER_SUCCESS,
  CREATE_STRIPE_CUSTOMER_FALUIRE,
} from './types';

export const registerRequest = (data) => ({
  type: REGISTER_REQUEST,
  data,
});

export const registerSuccess = (data) => ({
  type: REGISTER_SUCCESS,
  data,
});

export const registerFaluire = (error) => ({
  type: REGISTER_FALUIRE,
  error,
});

export const resetSignup = () => ({
  type: RESET_SIGNUP,
});

export const createStripeCustomerRequest = (data) => ({
  type: CREATE_STRIPE_CUSTOMER_REQUEST,
  data,
});

export const createStripeCustomerSuccess = (data) => ({
  type: CREATE_STRIPE_CUSTOMER_SUCCESS,
  data,
});

export const createStripeCustomerFaluire = (error) => ({
  type: CREATE_STRIPE_CUSTOMER_FALUIRE,
  error,
});
