import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_VIA_FACEBOOK_FALUIRE,
  LOGIN_VIA_FACEBOOK_REQUEST,
  LOGIN_VIA_FACEBOOK_SUCCESS,
  LOGIN_VIA_GMAIL_FALUIRE,
  LOGIN_VIA_GMAIL_REQUEST,
  LOGIN_VIA_GMAIL_SUCCESS,
  LOGIN_VIA_APPLE_FALUIRE,
  LOGIN_VIA_APPLE_REQUEST,
  LOGIN_VIA_APPLE_SUCCESS,
  LOGING_FALUIRE,
  CREATE_STRIPE_CUSTOMER_REQUEST,
  CREATE_STRIPE_CUSTOMER_SUCCESS,
  CREATE_STRIPE_CUSTOMER_FALUIRE,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FALUIRE,
  GET_TOKEN_REQUEST,
  GET_TOKEN_SUCCESS,
  GET_TOKEN_FALUIRE,
  DOTS_SECONDS,
  DOTS_SECONDS_RESET,
  RESET_ERRORS,
  RESEND_FORGOT_PASSWORD,
  RESEND_FORGOT_PASSWORD_SUCCESS,
  RESEND_FORGOT_PASSWORD_FALUIRE,
  GET_ACCESS_TOKEN,
  GET_ACCESS_TOKEN_SUCCESS,
  GET_ACCESS_TOKEN_FALUIRE,
} from './types';
import { SIGN_OUT } from '../../Setting/redux/types';
import { dotsSecond } from './actions';

const initialState = {
  isAuth: false,
  data: false,
  loginViaGoogle: false,
  dotsSecond: 0,
  error: false,
  forgotError: false,
  email: false,
  customer: false,
  forgotPass: false,
  requesting: false,
  socialRequesting: false,
  getTokenPass: false,
  accessToken: false,
  resendForgotPass: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        requesting: true,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        error: false,
        requesting: false,
        data: action.data,
      };

    case LOGING_FALUIRE:
      return {
        ...state,
        requesting: false,
        error: action.data,
      };

    case LOGIN_VIA_FACEBOOK_REQUEST:
      return {
        ...state,
        socialRequesting: true,
      };

    case LOGIN_VIA_FACEBOOK_SUCCESS:
      return {
        ...state,
        error: false,
        socialRequesting: false,
        data: action.data,
      };

    case LOGIN_VIA_FACEBOOK_FALUIRE:
      return {
        ...state,
        socialRequesting: false,
        error: action.data,
      };

    case LOGIN_VIA_GMAIL_REQUEST:
      return {
        ...state,
        socialRequesting: true,
      };

    case LOGIN_VIA_GMAIL_SUCCESS:
      return {
        ...state,
        error: false,
        socialRequesting: false,
        data: action.data,
        loginViaGoogle: true,
      };

    case LOGIN_VIA_GMAIL_FALUIRE:
      return {
        ...state,
        socialRequesting: false,
        error: action.data,
      };

    case LOGIN_VIA_APPLE_REQUEST:
      return {
        ...state,
        socialRequesting: true,
      };

    case LOGIN_VIA_APPLE_SUCCESS:
      return {
        ...state,
        socialRequesting: false,
        error: false,
        data: action.data,
      };

    case DOTS_SECONDS:
      return { ...state, dotsSecond: state.dotsSecond + 1 };

    case DOTS_SECONDS_RESET:
      return { ...state, dotsSecond: 0 };

    case LOGIN_VIA_APPLE_FALUIRE:
      return {
        ...state,
        socialRequesting: false,
        error: action.data,
      };

    case CREATE_STRIPE_CUSTOMER_REQUEST:
      return {
        ...state,
        requesting: true,
        email: action.data,
      };

    case CREATE_STRIPE_CUSTOMER_SUCCESS:
      return {
        ...state,
        requesting: false,
        error: false,
        customer: action.data,
      };

    case CREATE_STRIPE_CUSTOMER_FALUIRE:
      return {
        ...state,
        requesting: false,
        error: action.data,
      };

    case FORGOT_PASSWORD:
      return {
        ...state,
        requesting: true,
      };

    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        requesting: false,
        error: false,
        forgotPass: action.data,
        forgotEmailError: false,
      };

    case FORGOT_PASSWORD_FALUIRE:
      return {
        ...state,
        requesting: false,
        forgotError: action.error,
        forgotPass: false,
      };

    case RESEND_FORGOT_PASSWORD:
      return {
        ...state,
        // requesting: true,
      };

    case RESEND_FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        requesting: false,
        error: false,
        resendForgotPass: action.data,
        forgotEmailError: false,
      };

    case RESEND_FORGOT_PASSWORD_FALUIRE:
      return {
        ...state,
        requesting: false,
        resendForgotPass: action.error,
        forgotPass: false,
      };

    case GET_TOKEN_REQUEST:
      return {
        ...state,
        requesting: true,
      };

    case GET_TOKEN_SUCCESS:
      return {
        ...state,
        requesting: false,
        error: false,
        getTokenPass: action.data,
      };

    case GET_TOKEN_FALUIRE:
      return {
        ...state,
        requesting: false,
        error: action.error,
      };

    case SIGN_OUT:
      return {
        ...initialState,
      };

    case RESET_ERRORS:
      return {
        ...state,
        requesting: false,
        error: false,
      };

    case GET_ACCESS_TOKEN:
      return {
        ...state,
        requesting: true,
      };

    case GET_ACCESS_TOKEN_SUCCESS:
      return {
        ...state,
        requesting: false,
        error: false,
        isAuth: action.data,
      };

    case GET_ACCESS_TOKEN_FALUIRE:
      return {
        ...state,
        requesting: false,
        error: action.error,
      };

    default:
      return state;
  }
};
