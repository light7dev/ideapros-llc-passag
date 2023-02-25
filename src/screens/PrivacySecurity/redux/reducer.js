import { DELETEACCOUNT_REQUEST, DELETEACCOUNT_SUCCESS, DELETEACCOUNT_FALUIRE } from './types';

const initialState = {
  deleteAccount: false,
  requesting: false,
  error: false,
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

    default:
      return state;
  }
};
