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

export const updateProfileRequest = (data, user_id) => ({
  type: UPDATE_PROFILE_REQUEST,
  data,
  user_id,
});

export const updateProfileSuccess = (data, user_id) => ({
  type: UPDATE_PROFILE_SUCCESS,
  data,
  user_id,
});

export const updateProfileFaluire = (data) => ({
  type: UPDATE_PROFILE_FALUIRE,
  data,
});

export const getProfileRequest = (data) => ({
  type: GET_PROFILE_REQUEST,
  data,
});

export const getProfileSuccess = (data) => ({
  type: GET_PROFILE_SUCCESS,
  data,
});

export const getProfileFaluire = (error) => ({
  type: GET_PROFILE_FALUIRE,
  error,
});

export const profileEventRequest = () => ({
  type: PROFILE_EVENT_REQUEST,
});

export const profileEventSuccess = (data) => ({
  type: PROFILE_EVENT_SUCCESS,
  data,
});

export const profileEventFaluire = (error) => ({
  type: PROFILE_EVENT_FALUIRE,
  error,
});
