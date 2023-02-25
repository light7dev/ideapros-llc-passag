import combinedReducers from './mainReducer';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistCombineReducers } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { mainSaga } from './mainSaga';

const sagaMiddleware = createSagaMiddleware();

/**
 * this app uses React Native Debugger, but it works without it
 */

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = [sagaMiddleware /** more middlewares if any goes here */];

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['login'],
};

const persistedReducer = persistCombineReducers(persistConfig, combinedReducers);

const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(...middlewares)));

sagaMiddleware.run(mainSaga);

export { store };
