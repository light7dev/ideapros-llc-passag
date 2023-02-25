import { all } from 'redux-saga/effects';
// import {push} from 'connected-react-router'
import Login from 'Containers/AuthScreen/Login/redux/saga';
import Registration from 'Containers/AuthScreen/Registration/redux/saga';
import Subscription from 'Containers/AuthScreen/Subscripton/redux/saga';
import Payment from 'Containers/AuthScreen/Payment/redux/saga';
import ActiveSubscription from 'Containers/AdminScreen/ActiveSubscription/redux/saga';

export function* mainSaga() {
  yield all([Login, Registration, Subscription, Payment, ActiveSubscription]);
}
