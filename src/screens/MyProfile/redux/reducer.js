import {
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FALUIRE,
  REQUEST_CHANGE_PASSWORD,
  PROFILE_EVENT_REQUEST,
  PROFILE_EVENT_SUCCESS,
  PROFILE_EVENT_FALUIRE,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FALUIRE,
} from './types';

const initialState = {
  profileEvent: false,
  data: false,
  profile: false,
  myProfile: false,
  deleteAccount: false,
  requesting: false,
  error: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE_REQUEST:
      return {
        ...state,
        requesting: true,
      };

    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        requesting: false,
        profile: action.data,
        error: false,
      };

    case GET_PROFILE_FALUIRE:
      return {
        ...state,
        requesting: false,
        error: action.error,
      };

    case UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        requesting: true,
      };

    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        requesting: false,
        profile: action.data,
        // myProfile: action.data,
        error: false,
      };

    case UPDATE_PROFILE_FALUIRE:
      return {
        ...state,
        requesting: false,
        error: action.data,
      };

    case PROFILE_EVENT_REQUEST:
      return {
        ...state,
        requesting: true,
      };

    case PROFILE_EVENT_SUCCESS:
      return {
        ...state,
        requesting: false,
        profileEvent: action.data,
      };

    case PROFILE_EVENT_FALUIRE:
      return {
        ...state,
        requesting: false,
        error: action.error,
      };

    default:
      return state;
  }
};
