import { 
  LIFESTORY_REQUEST, 
  LIFESTORY_SUCCESS, 
  LIFESTORY_FALUIRE,
  GET_LIFESTORY_REQUEST, 
  GET_LIFESTORY_SUCCESS, 
  GET_LIFESTORY_FALUIRE,
} from './types';

export const lifeStoryRequest = (data) => ({
  type: LIFESTORY_REQUEST,
  data,
});

export const lifeStorySuccess = (data) => ({
  type: LIFESTORY_SUCCESS,
  data,
});

export const lifeStoryFaluire = (data) => ({
  type: LIFESTORY_FALUIRE,
  data,
});

export const getLifeStoryRequest = (data) => ({
  type: GET_LIFESTORY_REQUEST,
  data,
});

export const getLifeStorySuccess = (data) => ({
  type: GET_LIFESTORY_SUCCESS,
  data,
});

export const getLifeStoryFaluire = (data) => ({
  type: GET_LIFESTORY_FALUIRE,
  data,
});
