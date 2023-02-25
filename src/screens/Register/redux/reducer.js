import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  RESET_SIGNUP,
  REGISTER_FALUIRE,
  CREATE_STRIPE_CUSTOMER_REQUEST,
  CREATE_STRIPE_CUSTOMER_SUCCESS,
  CREATE_STRIPE_CUSTOMER_FALUIRE,
} from './types';

const initialState = {
  requesting: false,
  data: false,
  dataSuccess: false,
  error: false,
  email: false,
  customer: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return {
        ...state,
        requesting: true,
        data: action.data,
      };

    case REGISTER_SUCCESS:
      return {
        ...state,
        requesting: false,
        dataSuccess: action.data,
      };

    case REGISTER_FALUIRE:
      return {
        ...state,
        requesting: false,
        error: action.error,
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
        customer: action.data,
      };

    case CREATE_STRIPE_CUSTOMER_FALUIRE:
      return {
        ...state,
        requesting: false,
        error: action.error,
      };

    case RESET_SIGNUP:
      return {
        ...state,
        requesting: false,
        error: false,
      };

    default:
      return state;
  }
};
