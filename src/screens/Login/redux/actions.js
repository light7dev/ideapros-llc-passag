import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGING_FALUIRE,
  LOGIN_VIA_FACEBOOK_REQUEST,
  LOGIN_VIA_FACEBOOK_SUCCESS,
  LOGIN_VIA_FACEBOOK_FALUIRE,
  LOGIN_VIA_GMAIL_REQUEST,
  LOGIN_VIA_GMAIL_SUCCESS,
  LOGIN_VIA_GMAIL_FALUIRE,
  LOGIN_VIA_APPLE_REQUEST,
  LOGIN_VIA_APPLE_SUCCESS,
  LOGIN_VIA_APPLE_FALUIRE,
  CREATE_STRIPE_CUSTOMER_REQUEST,
  CREATE_STRIPE_CUSTOMER_SUCCESS,
  CREATE_STRIPE_CUSTOMER_FALUIRE,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FALUIRE,
  GET_TOKEN_REQUEST,
  GET_TOKEN_SUCCESS,
  GET_TOKEN_FALUIRE,
  RESET_PASS_REQUEST,
  RESET_PASS_SUCCESS,
  RESET_PASS_FALUIRE,
  DOTS_SECONDS,
  DOTS_SECONDS_RESET,
  RESET_ERRORS,
  GET_ACCESS_TOKEN,
  GET_ACCESS_TOKEN_SUCCESS,
  GET_ACCESS_TOKEN_FALUIRE,
  RESEND_FORGOT_PASSWORD,
  RESEND_FORGOT_PASSWORD_FALUIRE,
  RESEND_FORGOT_PASSWORD_SUCCESS,
} from './types';
import { SIGN_OUT } from '../../Setting/redux/types';

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

export const loginViaFacebookRequest = (data) => ({
  type: LOGIN_VIA_FACEBOOK_REQUEST,
  data,
});

export const loginViaFacebookSuccess = (data) => ({
  type: LOGIN_VIA_FACEBOOK_SUCCESS,
  data,
});

export const loginViaFacebookFaluire = (error) => ({
  type: LOGIN_VIA_FACEBOOK_FALUIRE,
  error,
});

export const loginViaGmailRequest = (data) => ({
  type: LOGIN_VIA_GMAIL_REQUEST,
  data,
});

export const loginViaGmailSuccess = (data) => ({
  type: LOGIN_VIA_GMAIL_SUCCESS,
  data,
});

export const loginViaGmailFaluire = (error) => ({
  type: LOGIN_VIA_GMAIL_FALUIRE,
  error,
});

export const loginViaAppleRequest = (data) => ({
  type: LOGIN_VIA_APPLE_REQUEST,
  data,
});

export const loginViaAppleSuccess = (data) => ({
  type: LOGIN_VIA_APPLE_SUCCESS,
  data,
});

export const loginViaAppleFaluire = (error) => ({
  type: LOGIN_VIA_APPLE_FALUIRE,
  error,
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

export const forgotPasswordRequest = (data) => ({
  type: FORGOT_PASSWORD,
  data,
});

export const forgotPasswordSuccess = (data) => ({
  type: FORGOT_PASSWORD_SUCCESS,
  data,
});

export const forgotPasswordFaluire = (error) => ({
  type: FORGOT_PASSWORD_FALUIRE,
  error,
});

export const reSendForgotPasswordRequest = (data) => ({
  type: RESEND_FORGOT_PASSWORD,
  data,
});

export const reSendForgotPasswordSuccess = (data) => ({
  type: RESEND_FORGOT_PASSWORD_SUCCESS,
  data,
});

export const reSendForgotPasswordFaluire = (error) => ({
  type: RESEND_FORGOT_PASSWORD_FALUIRE,
  error,
});

export const getAccessToken = (data) => ({
  type: GET_ACCESS_TOKEN,
  data,
});

export const getAccessTokenSuccess = (data) => ({
  type: GET_ACCESS_TOKEN_SUCCESS,
  data,
});

export const getAccessTokenFaluire = (error) => ({
  type: GET_ACCESS_TOKEN_FALUIRE,
  error,
});

export const dotsSecond = (data) => ({
  type: DOTS_SECONDS,
  data,
});

export const dotsSecondReset = (data) => ({
  type: DOTS_SECONDS_RESET,
  data,
});

export const resetPassRequest = (data) => ({
  type: RESET_PASS_REQUEST,
  data,
});

export const resetPassSuccess = (data) => ({
  type: RESET_PASS_SUCCESS,
  data,
});

export const resetPassFaluire = (error) => ({
  type: RESET_PASS_FALUIRE,
  error,
});

export const signOut = () => ({
  type: SIGN_OUT,
});

export const resetErrors = () => ({
  type: RESET_ERRORS,
});

export const getTokenRequest = (data) => ({
  type: GET_TOKEN_REQUEST,
  data,
});

export const getTokenSuccess = (data) => ({
  type: GET_TOKEN_SUCCESS,
  data,
});

export const getTokenFaluire = (error) => ({
  type: GET_TOKEN_FALUIRE,
  error,
});
