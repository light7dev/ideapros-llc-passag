import {
  LIFESTORY_REQUEST,
  LIFESTORY_SUCCESS,
  LIFESTORY_FALUIRE,
  RESET_ERROS,
  GET_LIFESTORY_REQUEST,
  GET_LIFESTORY_SUCCESS,
  GET_LIFESTORY_FALUIRE,
  EDIT_LIFESTORY_REQUEST,
  EDIT_LIFESTORY_FALUIRE,
  EDIT_LIFESTORY_SUCCESS,
} from './types';

export const lifeStoryRequest = (data) => ({
  type: LIFESTORY_REQUEST,
  data,
});

export const lifeStorySuccess = (data) => ({
  type: LIFESTORY_SUCCESS,
  data,
});

export const lifeStoryFaluire = (error) => ({
  type: LIFESTORY_FALUIRE,
  error,
});

export const getLifeStoryRequest = (data) => ({
  type: GET_LIFESTORY_REQUEST,
  data,
});

export const getLifeStorySuccess = (data) => ({
  type: GET_LIFESTORY_SUCCESS,
  data,
});

export const getLifeStoryFaluire = (error) => ({
  type: GET_LIFESTORY_FALUIRE,
  error,
});

export const editLifeStory = (data, id) => ({
  type: EDIT_LIFESTORY_REQUEST,
  data,
  id,
});

export const editLifeStorySuccess = (data, id) => ({
  type: EDIT_LIFESTORY_SUCCESS,
  data,
  id,
});

export const editLifeStoryFaluire = (error) => ({
  type: EDIT_LIFESTORY_FALUIRE,
  error,
});

export const resetErrors = () => ({
  type: RESET_ERROS,
});
