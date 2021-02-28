import {
  createStore,
  compose,
  applyMiddleware,
  Middleware,
  Reducer,
} from 'redux';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import ReduxThunk from 'redux-thunk';

import type { CommonsAction, CommonsState } from './modules/commons/types';
import type { AuthAction, AuthState } from './modules/auth/types';

import persistedReducer from './modules/persistReducers';

import reducers from './modules/rootReducer';
import sagas from './modules/rootSaga';

export interface StoreState {
  auth: AuthState;
  commons: CommonsState;
}

export type StoreAction = AuthAction | CommonsAction;

const middlewares = [ReduxThunk];

const sagaMonitor = __DEV__ ? console.tron.createSagaMonitor() : null;

const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

middlewares.push(sagaMiddleware);

const composer = __DEV__
  ? compose(applyMiddleware(...middlewares), console.tron.createEnhancer())
  : compose(applyMiddleware(...middlewares));

// const rootReducers: Reducer<StoreState, StoreAction> = reducers;

const store = createStore(persistedReducer(reducers), composer);
const persistor = persistStore(store);

sagaMiddleware.run(sagas);

export { store, persistor };

// CÓDIGO DE EXEMPLO

// import createSagaMiddleware from 'redux-saga';
// import type { Middleware } from 'redux';
// import { persistStore } from 'redux-persist';

// import createStore from './createStore';
// import rootReducer from './modules/rootReducer';
// import rootSaga from './modules/rootSaga';

// const sagaMiddlewares = createSagaMiddleware();

// const middlewares: Middleware[] = [sagaMiddlewares];

// const store = createStore(rootReducer, middlewares);
// const persistor = persistStore(store);

// sagaMiddlewares.run(rootSaga);

// export { store, persistor };
