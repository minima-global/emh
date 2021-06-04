import {
  combineReducers,
  Reducer,
  Store,
  createStore,
  applyMiddleware,
} from 'redux';
import ReduxThunk from 'redux-thunk';

import {ApplicationState, ActionProps} from './types';

import {reducer as txReducer} from './app/reducers/tx/reducer';

export const rootReducer: Reducer<ApplicationState, ActionProps> =
combineReducers<ApplicationState, ActionProps>({
  tx: txReducer,
});

/**
 * Redux store
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
