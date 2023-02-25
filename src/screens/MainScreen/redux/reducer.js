import { GET_INFO_REQUEST, GET_INFO_SUCCESS, GET_INFO_FALUIRE } from './types';

const initialState = {
  data: false,
  requesting: false,
  error: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_INFO_REQUEST:
      return {
        ...state,
        requesting: true,
      };

    case GET_INFO_SUCCESS:
      return {
        ...state,
        requesting: false,
        data: action.data,
      };

    case GET_INFO_FALUIRE:
      return {
        ...state,
        requesting: false,
        err: action.error,
      };

    default:
      return state;
  }
};
