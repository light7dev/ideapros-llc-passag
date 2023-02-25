import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import {connectRouter} from 'connected-react-router'
import Login from 'Containers/AuthScreen/Login/redux/reducer';
import Registration from 'Containers/AuthScreen/Registration/redux/reducer';
import Subscription from 'Containers/AuthScreen/Subscripton/redux/reducer';
import Payment from 'Containers/AuthScreen/Payment/redux/reducer';
import ActiveSubscription from 'Containers/AdminScreen/ActiveSubscription/redux/reducer';

const signInPersistConfig = {
  key: 'Login',
  storage,
  timeout: null,
};

export const combinedReducers = (history) => ({
  Login: persistReducer(signInPersistConfig, Login),
  Registration,
  Subscription,
  Payment,
  ActiveSubscription,
});
