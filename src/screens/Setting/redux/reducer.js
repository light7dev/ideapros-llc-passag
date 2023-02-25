import {
  DELETEACCOUNT_REQUEST,
  DELETEACCOUNT_SUCCESS,
  DELETEACCOUNT_FALUIRE,
  REQUEST_CHANGE_PASSWORD,
  REQUEST_CHANGE_PASSWORD_SUCCESS,
  REQUEST_CHANGE_PASSWORD_FAILURE,
} from './types';

const initialState = {
  deleteAccount: false,
  requesting: false,
  error: false,
  backendErrors: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DELETEACCOUNT_REQUEST:
      return {
        ...state,
        requesting: true,
      };

    case DELETEACCOUNT_SUCCESS:
      return {
        ...state,
        requesting: false,
        deleteAccount: action.data,
      };

    case DELETEACCOUNT_FALUIRE:
      return {
        ...state,
        requesting: false,
        err: action.error,
      };

    case REQUEST_CHANGE_PASSWORD:
      return { ...state, requesting: true };

    case REQUEST_CHANGE_PASSWORD_SUCCESS:
      return { ...state, ...initialState };

    case REQUEST_CHANGE_PASSWORD_FAILURE:
      return { ...state, requesting: false, backendErrors: action.errors };

    default:
      return state;
  }
};
