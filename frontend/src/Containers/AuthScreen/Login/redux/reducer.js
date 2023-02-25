import {
  LOGING_FALUIRE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  GET_ACCESS_TOKEN,
  SET_STATES_FALSE,
  SET_PLANS_DATA,
  CHECK_SUBSCRIPTION_STATE,
} from './types';

const initialState = {
  user: false,
  requesting: false,
  error: false,
  accessToken: false,
  plans: false,
  planName: false,
  isSubscription: false,
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
        requesting: false,
        user: action.data,
      };

    case LOGING_FALUIRE:
      return {
        ...state,
        requesting: false,
        error: action.data,
      };

    case GET_ACCESS_TOKEN:
      return {
        ...state,
        requesting: false,
        accessToken: action.data,
      };

    case SET_PLANS_DATA:
      return {
        ...state,
        plans: action.data.plans,
        planName: action.data.planName,
      };

    case CHECK_SUBSCRIPTION_STATE:
      return {
        ...state,
        requesting: false,
        isSubscription: action.data,
      };

    case SET_STATES_FALSE:
      return {
        ...state,
        user: false,
        requesting: false,
        error: false,
        accessToken: false,
        plans: false,
        planName: false,
        isSubscription: false,
      };

    default:
      return state;
  }
};
