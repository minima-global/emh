import {
  combineReducers,
  Reducer,
  Store,
  createStore,
  applyMiddleware,
} from 'redux';
import ReduxThunk from 'redux-thunk';

import {ApplicationState, ActionProps} from './types';

import {reducer as balanceReducer} from './app/reducers/balance/reducer';
import {reducer as logsReducer} from './app/reducers/logs/reducer';
import {reducer as addressReducer} from './app/reducers/addresses/reducer';
import {reducer as tokensReducer} from './app/reducers/tokens/reducer';
import {reducer as triggersReducer} from './app/reducers/triggers/reducer';
import {reducer as cmdReducer} from './app/reducers/cmd/reducer';
import {reducer as txReducer} from './app/reducers/tx/reducer';

export const rootReducer: Reducer<ApplicationState, ActionProps> =
combineReducers<ApplicationState, ActionProps>({
  balanceData: balanceReducer,
  logsData: logsReducer,
  addressData: addressReducer,
  tokensData: tokensReducer,
  triggersData: triggersReducer,
  cmdData: cmdReducer,
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
