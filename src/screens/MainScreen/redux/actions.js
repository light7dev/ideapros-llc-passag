import { GET_INFO_REQUEST, GET_INFO_SUCCESS, GET_INFO_FALUIRE } from './types';

export const getIntroAction = () => ({
  type: GET_INFO_REQUEST,
});

export const getIntroSuccess = (data) => ({
  type: GET_INFO_SUCCESS,
  data,
});

export const getIntroFaluire = (error) => ({
  type: GET_INFO_FALUIRE,
  error,
});
