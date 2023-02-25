import {
  GET_SUBSCRIPTION_LIST,
  GET_SUBSCRIPTION_SUCCESS,
  GET_SUBSCRIPTION_FAILURE,
  GET_PLANS_LIST,
  GET_PLANS_LIST_SUCCESS,
  GET_PLANS_LIST_FAILURE,
} from './types';

export const getSubscriptionList = (data) => ({
  type: GET_SUBSCRIPTION_LIST,
  data,
});

export const getSubscriptionListSuccess = (data) => ({
  type: GET_SUBSCRIPTION_SUCCESS,
  data,
});

export const getSubscriptionListFailure = (data) => ({
  type: GET_SUBSCRIPTION_FAILURE,
  data,
});

export const getPlanList = (data) => ({
  type: GET_PLANS_LIST,
  data,
});

export const getPlanListSuccess = (data) => ({
  type: GET_PLANS_LIST_SUCCESS,
  data,
});

export const getPlanListFailure = (data) => ({
  type: GET_PLANS_LIST_FAILURE,
  data,
});
