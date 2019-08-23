import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { create } from '@wix/fedops-logger';
import createFedopsLogger from './middleware/fedopsLogger';
import rootReducer from '../reducers/index';
import rootSaga from '../sagas';
import { AppState } from '../types/store';
import logger from '../helpers/logger';

export function configureStore(initialState: AppState) {
  const sagaMiddleware = createSagaMiddleware({
    logger: (level, ...args) => {
      // use DDT for better SSR debugging
      logger[level]([...args]);
    },
    onError: error => {
      logger.error('Uncaught error in saga', error);
    },
  });
  const middleware = [sagaMiddleware];

  if (typeof window !== 'undefined') {
    middleware.push(createFedopsLogger(create('da-browse')) as any);
  }

  const store = createStore<AppState, any, {}, {}>(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  );
  const saga = sagaMiddleware.run(rootSaga);
  return { store, saga };
}
