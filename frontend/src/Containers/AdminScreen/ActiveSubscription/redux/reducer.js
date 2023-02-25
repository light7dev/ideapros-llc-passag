import {
  GET_CARD_SUCCESS,
  GET_CARD_REQUEST,
  GET_CARD_FALUIRE,
  CANCEL_SUBSCRIPTION_REQUEST,
  CANCEL_SUBSCRIPTION_SUCCESS,
  CANCEL_SUBSCRIPTION_FAILURE,
  GET_SUBSCRIPTION_LIST_REQUEST,
  GET_SUBSCRIPTION_LIST_SUCCESS,
  GET_SUBSCRIPTION_LIST_FAILURE,
} from './types';

const initialState = {
  user: false,
  requesting: false,
  error: false,
  cardData: false,
  subscriptionList: false,
  cancelRequest: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CARD_REQUEST:
      return {
        ...state,
        requesting: true,
      };

    case GET_CARD_SUCCESS:
      return {
        ...state,
        requesting: false,
        cardData: action.data,
      };

    case GET_CARD_FALUIRE:
      return {
        ...state,
        requesting: false,
        // error: action.data,
      };

    case CANCEL_SUBSCRIPTION_REQUEST:
      return {
        ...state,
        cancelRequest: true,
      };

    case CANCEL_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        cancelRequest: false,
      };

    case CANCEL_SUBSCRIPTION_FAILURE:
      return {
        ...state,
        cancelRequest: false,
        // error: action.data,
      };

    case GET_SUBSCRIPTION_LIST_REQUEST:
      return {
        ...state,
        requesting: true,
      };

    case GET_SUBSCRIPTION_LIST_SUCCESS:
      return {
        ...state,
        requesting: false,
        subscriptionList: action.data,
      };

    case GET_SUBSCRIPTION_LIST_FAILURE:
      return {
        ...state,
        requesting: false,
        // error: action.data,
      };

    default:
      return state;
  }
};
