import { CATEGORY_REQUEST, CATEGORY_SUCCESS, CATEGORY_FALUIRE } from './types';

const initialState = {
  category: [],
  requesting: false,
  error: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CATEGORY_REQUEST:
      return {
        ...state,
        requesting: true,
      };

    case CATEGORY_SUCCESS:
      return {
        ...state,
        requesting: false,
        category: action.data,
      };

    case CATEGORY_FALUIRE:
      return {
        ...state,
        requesting: false,
        err: action.data,
      };

    default:
      return state;
  }
};
