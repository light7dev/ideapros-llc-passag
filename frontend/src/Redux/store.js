import { combinedReducers } from './mainReducer';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { mainSaga } from './mainSaga';
import { createBrowserHistory } from 'history';
import storage from 'redux-persist/lib/storage';
import { persistCombineReducers } from 'redux-persist';
import { routerMiddleware } from 'connected-react-router';
const sagaMiddleware = createSagaMiddleware();
export const history = createBrowserHistory();
/**
 * this app uses React Native Debugger, but it works without it
 */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = [
  routerMiddleware(history),
  sagaMiddleware /** more middlewares if any goes here */,
];
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['Login'],
};
const persistedReducer = persistCombineReducers(persistConfig, combinedReducers(history));
const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(...middlewares)));
sagaMiddleware.run(mainSaga);
export { store };
