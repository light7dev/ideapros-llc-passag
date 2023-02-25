import { all } from 'redux-saga/effects';

// sagas
import register from '../screens/Register/redux/sagas';
import login from '../screens/Login/redux/sagas';
import setting from '../screens/Setting/redux/sagas';
import category from '../screens/Category/redux/sagas';
import CreateLifeStory from '../screens/CreateLifeStory/redux/sagas';
import managePayments from '../screens/ManagePayments/redux/sagas';
import myContentScreen from '../screens/MyContentScreen/redux/sagas';
import profile from '../screens/MyProfile/redux/sagas';
import PrivacyPolicy from '../screens/PrivacyPolicy/redux/sagas';
import mainScreen from '../screens/MainScreen/redux/sagas';
export function* mainSaga() {
  yield all([
    login,
    register,
    setting,
    category,
    CreateLifeStory,
    mainScreen,
    managePayments,
    myContentScreen,
    profile,
    PrivacyPolicy,
  ]);
}
