import { CATEGORY_REQUEST, CATEGORY_SUCCESS, CATEGORY_FALUIRE } from './types';

export const categoryRequest = () => ({
  type: CATEGORY_REQUEST,
});

export const categorySuccess = (data) => ({
  type: CATEGORY_SUCCESS,
  data,
});

export const categoryFaluire = (data) => ({
  type: CATEGORY_FALUIRE,
  data,
});
