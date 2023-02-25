import {
  LIFESTORY_REQUEST,
  LIFESTORY_SUCCESS,
  LIFESTORY_FALUIRE,
  GET_LIFESTORY_REQUEST,
  GET_LIFESTORY_SUCCESS,
  GET_LIFESTORY_FALUIRE,
  EDIT_LIFESTORY_REQUEST,
  EDIT_LIFESTORY_FALUIRE,
  EDIT_LIFESTORY_SUCCESS,
} from './types';

const initialState = {
  lifeStory: false,
  createLifeStory: false,
  lifeStoryData: [],
  requesting: false,
  error: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LIFESTORY_REQUEST:
      return {
        ...state,
        requesting: true,
      };

    case LIFESTORY_SUCCESS:
      return {
        ...state,
        requesting: false,
        lifeStory: action.data,
      };

    case LIFESTORY_FALUIRE:
      return {
        ...state,
        requesting: false,
        error: action.data,
      };
    case GET_LIFESTORY_REQUEST:
      return {
        ...state,
        requesting: true,
      };

    case GET_LIFESTORY_SUCCESS:
      return {
        ...state,
        requesting: false,
        lifeStoryData: action.data,
      };

    case GET_LIFESTORY_FALUIRE:
      return {
        ...state,
        requesting: false,
        error: action.error,
      };

    case EDIT_LIFESTORY_REQUEST:
      return {
        ...state,
        requesting: true,
      };

    case EDIT_LIFESTORY_SUCCESS:
      return {
        ...state,
        requesting: false,
        lifeStory: action.data,
      };

    case EDIT_LIFESTORY_FALUIRE:
      return {
        ...state,
        requesting: false,
        error: action.error,
      };

    default:
      return state;
  }
};
