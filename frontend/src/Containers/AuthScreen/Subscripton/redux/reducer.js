import {
  GET_SUBSCRIPTION_LIST,
  GET_SUBSCRIPTION_SUCCESS,
  GET_SUBSCRIPTION_FAILURE,
  GET_PLANS_LIST,
  GET_PLANS_LIST_SUCCESS,
  GET_PLANS_LIST_FAILURE,
} from './types';

const initialState = {
  requestingSubscription: false,
  requestingCancel: false,
  requestingList: false,
  error: false,
  subscriptionsData: false,
  plansData: false,
  requestingPlans: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SUBSCRIPTION_LIST:
      return {
        ...state,
        requestingList: true,
      };

    case GET_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        requestingList: false,
        subscriptionsData: action.data,
      };

    case GET_SUBSCRIPTION_FAILURE:
      return {
        ...state,
        requestingList: false,
      };
    case GET_PLANS_LIST:
      return {
        ...state,
        requestingPlans: true,
      };

    case GET_PLANS_LIST_SUCCESS:
      return {
        ...state,
        requestingPlans: false,
        plansData: action.data,
      };

    case GET_PLANS_LIST_FAILURE:
      return {
        ...state,
        requestingPlans: false,
      };
    default:
      return state;
  }
};
