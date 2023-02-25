import { 
  LIFESTORY_REQUEST, 
  LIFESTORY_SUCCESS, 
  LIFESTORY_FALUIRE,

  GET_LIFESTORY_REQUEST, 
  GET_LIFESTORY_SUCCESS, 
  GET_LIFESTORY_FALUIRE,
} from './types';

const initialState = {
  lifeStory: false,
  createLifeStory:false,
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
        err: action.data,
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
        err: action.data,
      };


    default:
      return state;
  }
};
