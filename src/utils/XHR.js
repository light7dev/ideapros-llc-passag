import axios from 'axios';
// config
import { appConfig } from '../config/app';

// axios.defaults.headers.common['apiKey'] = appConfig.apiKey;

function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json ? response.json() : response;
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  error.status = response.status;
  throw error;
}

export default (url, options) => axios(url, options).then(checkStatus).then(parseJSON);
