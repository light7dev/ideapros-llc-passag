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

const initialState = {
  listCard: [],
  deleteCard: false,
  payment: false,
  requesting: false,
  error: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DELETECARD_REQUEST:
      return {
        ...state,
        requesting: true,
      };

    case DELETECARD_SUCCESS:
      return {
        ...state,
        requesting: false,
        deleteCard: action.data,
      };

    case DELETECARD_FALUIRE:
      return {
        ...state,
        requesting: false,
        err: action.error,
      };

    case LISTCARD_REQUEST:
      return {
        ...state,
        requesting: true,
      };

    case LISTCARD_SUCCESS:
      return {
        ...state,
        requesting: false,
        listCard: action.data,
      };

    case LISTCARD_FALUIRE:
      return {
        ...state,
        requesting: false,
        err: action.error,
      };

    case PAYMENTS_REQUEST:
      return {
        ...state,
        requesting: true,
      };

    case PAYMENTS_SUCCESS:
      return {
        ...state,
        requesting: false,
        payment: action.data,
      };

    case PAYMENTS_FALUIRE:
      return {
        ...state,
        requesting: false,
        err: action.error,
      };

    default:
      return state;
  }
};
