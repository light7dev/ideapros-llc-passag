import {
  LOGIN,
  RESET,
  LOGIN_FAILED,
  SET_ERROR,
  SET_ACCESS_TOKEN,
  CONTINUE_AS_GUEST,
  LOGOUT,
  CHANGE_PASSWORD,
  RESET_CHANGE_PASSWORD,
} from './types';

const initialState = {
  requesting: false,
  backendErrors: false,
  accessToken: false,
  isGuest: false,
  requestingPassword: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        requesting: true,
      };

    case LOGIN_FAILED:
      return {
        ...state,
        requesting: false,
        isGuest: false,
        backendErrors: action.error,
      };

    case CONTINUE_AS_GUEST:
      return {
        ...state,
        isGuest: true,
      };

    case SET_ACCESS_TOKEN:
      return {
        ...state,
        requesting: false,
        isGuest: false,
        accessToken: action.data,
      };

    case SET_ERROR:
      return {
        ...state,
        backendErrors: action.error,
      };

    case RESET:
      return {
        ...state,
        ...initialState,
      };
    case LOGOUT:
      return {
        ...state,
        requesting: false,
        backendErrors: false,
        accessToken: false,
        isGuest: false,
      };

    case CHANGE_PASSWORD:
      return {
        ...state,
        requestingPassword: true,
      };

    case RESET_CHANGE_PASSWORD:
      return { ...state, requestingPassword: false };

    default:
      return state;
  }
};
