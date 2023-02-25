import axios from 'axios';
import { BASE_URL } from '../config/app';

const APP_PLATFORM = 'Mobile';

export const request = axios.create({
  headers: {
    app_platform: APP_PLATFORM,
    app_version: 1,
  },
});

export function setupHttpConfig(callBack) {
  request.defaults.baseURL = BASE_URL;
  request.defaults.timeout = null;
  axios.defaults.headers['Content-Type'] = 'application/json';

  callBack();
}
