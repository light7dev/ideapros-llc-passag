import {
  CONTENT_EVENT_REQUEST,
  CONTENT_EVENT_SUCCESS,
  CONTENT_EVENT_FALUIRE,
  CONTENT_DELETE_EVENT_REQUEST,
  CONTENT_DELETE_EVENT_SUCCESS,
  CONTENT_DELETE_EVENT_FALUIRE,
} from './types';

export const contentEventRequest = () => ({
  type: CONTENT_EVENT_REQUEST,
});

export const contentEventSuccess = (data) => ({
  type: CONTENT_EVENT_SUCCESS,
  data,
});

export const contentEventFaluire = (error) => ({
  type: CONTENT_EVENT_FALUIRE,
  error,
});

export const contentEvenDeletetRequest = (id) => ({
  type: CONTENT_DELETE_EVENT_REQUEST,
  id,
});

export const contentEventDeleteSuccess = (id) => ({
  type: CONTENT_DELETE_EVENT_SUCCESS,
  id,
});

export const contentEventDeleteFaluire = (error) => ({
  type: CONTENT_EVENT_FALUIRE,
  error,
});
