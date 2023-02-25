import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

// reducers
import register from '../screens/Register/redux/reducer';
import login from '../screens/Login/redux/reducer';
import dotsSecond from '../screens/Login/redux/reducer';
import auth from '../screens/Login/redux/reducer';
import setting from '../screens/Setting/redux/reducer';
import category from '../screens/Category/redux/reducer';

import createLifeStory from '../screens/CreateLifeStory/redux/reducer';
import managePayments from '../screens/ManagePayments/redux/reducer';
import myContentScreen from '../screens/MyContentScreen/redux/reducer';

import profile from '../screens/MyProfile/redux/reducer';
import PrivacyPolicy from '../screens/PrivacyPolicy/redux/reducer';

import mainScreen from '../screens/MainScreen/redux/reducer';

const appPersistConfig = {
  key: 'login',
  storage: AsyncStorage,
  timeout: null,
};

const profilePersistConfig = {
  key: 'profile',
  storage: AsyncStorage,
  timeout: null,
};

export default {
  login: persistReducer(appPersistConfig, login),
  dotsSecond,
  auth,
  register,
  setting,
  category,
  mainScreen,
  createLifeStory,
  managePayments,
  myContentScreen,
  profile: persistReducer(profilePersistConfig, profile),
  PrivacyPolicy,
};
