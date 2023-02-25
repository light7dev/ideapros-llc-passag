import { 
  CONTENT_EVENT_REQUEST, 
  CONTENT_EVENT_SUCCESS, 
  CONTENT_EVENT_FALUIRE ,

  CONTENT_DELETE_EVENT_REQUEST, 
  CONTENT_DELETE_EVENT_SUCCESS, 
  CONTENT_DELETE_EVENT_FALUIRE ,
} from './types';

const initialState = {
  contentEvent: false,
  contentEventSuccess:false,
  contentDeleteEvent: false,
  requesting: false,
  error: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CONTENT_EVENT_REQUEST:
      return {
        ...state,
        requesting: true,
      };

    case CONTENT_EVENT_SUCCESS:
      return {
        ...state,
        requesting: false,
        contentEvent: action.data,
        contentEventSuccess:true,
      };

    case CONTENT_EVENT_FALUIRE:
      return {
        ...state,
        requesting: false,
        err: action.error,
      };

    case CONTENT_DELETE_EVENT_REQUEST:
      return {
        ...state,
        requesting: true,
      };

    case CONTENT_DELETE_EVENT_SUCCESS:
      return {
        ...state,
        requesting: false,
        contentDeleteEvent: action.data,
      };

    case CONTENT_DELETE_EVENT_FALUIRE:
      return {
        ...state,
        requesting: false,
        err: action.error,
      };

    default:
      return state;
  }
};
