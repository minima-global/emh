import {
  combineReducers,
  Reducer,
  Store,
  createStore,
  applyMiddleware,
} from 'redux';
import ReduxThunk from 'redux-thunk';

import {ApplicationState, ActionProps} from './types';

import {reducer as appDataReducer} from './app/reducers/app/reducer';
import {reducer as logsReducer} from './app/reducers/logs/reducer';
import {reducer as cmdReducer} from './app/reducers/cmd/reducer';
import {reducer as txReducer} from './app/reducers/tx/reducer';

export const rootReducer: Reducer<ApplicationState, ActionProps> =
combineReducers<ApplicationState, ActionProps>({
  appData: appDataReducer,
  logsData: logsReducer,
  cmdData: cmdReducer,
  tx: txReducer,
});

/**
 * @function configureStore
 * @param {object} initialState
 * @return {object}
*/
export function configureStore(
    initialState: ApplicationState,
): Store<ApplicationState, ActionProps> {
  // create the redux-saga middleware
  const store = createStore(
      rootReducer,
      initialState,
      applyMiddleware(ReduxThunk),
  );

  return store;
}
