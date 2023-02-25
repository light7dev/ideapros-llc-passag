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

export const GetCardRequest = (data) => ({
  type: GET_CARD_REQUEST,
  data,
});

export const GetCardSuccess = (data) => ({
  type: GET_CARD_SUCCESS,
  data,
});

export const GetCardFaluire = (data) => ({
  type: GET_CARD_FALUIRE,
  data,
});

export const CancelSubscriptionRequest = (data) => ({
  type: CANCEL_SUBSCRIPTION_REQUEST,
  data,
});

export const CancelSubscriptionSuccess = (data) => ({
  type: CANCEL_SUBSCRIPTION_SUCCESS,
  data,
});

export const CancelSubscriptionFailure = (data) => ({
  type: CANCEL_SUBSCRIPTION_FAILURE,
  data,
});

export const GetSubscriptionListRequest = (data) => ({
  type: GET_SUBSCRIPTION_LIST_REQUEST,
  data,
});

export const GetSubscriptionListSuccess = (data) => ({
  type: GET_SUBSCRIPTION_LIST_SUCCESS,
  data,
});

export const GetSubscriptionListFailure = (data) => ({
  type: GET_SUBSCRIPTION_LIST_FAILURE,
  data,
});
