import {
  PAYMENT_REQUEST,
  PAYMENT_FAILURE,
  PAYMENT_SUCCESS,
  CREATE_SUBSCRIPTION_FAILURE,
  CREATE_SUBSCRIPTION_REQUEST,
  CREATE_SUBSCRIPTION_SUCCESS,
  DISCOUNT_REQUEST,
  DISCOUNT_REQUEST_FAILURE,
  DISCOUNT_REQUEST_SUCCESS,
  SET_PLANS_DATA,
} from './types';

const initialState = {
  requesting: false,
  error: false,
  requestingSubscription: false,
  requestingDiscount: false,
  validCode: false,
  couponCode: false,
  codeResponse: false,
  plans: false,
  planName: false,
  addCardStatus: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PAYMENT_REQUEST:
      return {
        ...state,
        requesting: true,
      };

    case PAYMENT_SUCCESS:
      return {
        ...state,
        requesting: false,
        addCardStatus: action.data,
      };

    case PAYMENT_FAILURE:
      return {
        ...state,
        requesting: false,
        error: action.data,
      };
    case CREATE_SUBSCRIPTION_REQUEST:
      return {
        ...state,
        requestingSubscription: true,
      };

    case CREATE_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        requestingSubscription: false,
      };

    case CREATE_SUBSCRIPTION_FAILURE:
      return {
        ...state,
        requestingSubscription: false,
        error: action.data,
      };
    case DISCOUNT_REQUEST:
      return {
        ...state,
        requestingDiscount: true,
      };

    case DISCOUNT_REQUEST_SUCCESS:
      return {
        ...state,
        requestingDiscount: false,
        validCode: true,
        codeResponse: action.data,
        couponCode: action.data.id,
      };

    case DISCOUNT_REQUEST_FAILURE:
      return {
        ...state,
        requestingDiscount: false,
        error: action.data,
      };

    default:
      return state;
  }
};
