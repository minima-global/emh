import {
  combineReducers,
  Reducer,
  Store,
  createStore,
  applyMiddleware,
} from 'redux';
import ReduxThunk from 'redux-thunk';

import {ApplicationState, ActionProps} from './types';

import {reducer as chartsReducer} from './app/reducers/charts/reducer';
import {reducer as balanceReducer} from './app/reducers/balance/reducer';
import {reducer as statusReducer} from './app/reducers/status/reducer';
import {reducer as logsReducer} from './app/reducers/logs/reducer';
import {reducer as addressReducer} from './app/reducers/addresses/reducer';
import {reducer as tokenIdsReducer} from './app/reducers/tokenIds/reducer';
import {reducer as triggersReducer} from './app/reducers/triggers/reducer';
import {reducer as cmdReducer} from './app/reducers/cmd/reducer';
import {reducer as countReducer} from './app/reducers/counts/reducer';
import {reducer as txReducer} from './app/reducers/tx/reducer';

export const rootReducer: Reducer<ApplicationState, ActionProps> =
combineReducers<ApplicationState, ActionProps>({
  chartsData: chartsReducer,
  balanceData: balanceReducer,
  statusData: statusReducer,
  logsData: logsReducer,
  addressData: addressReducer,
  tokenIdsData: tokenIdsReducer,
  triggersData: triggersReducer,
  cmdData: cmdReducer,
  countData: countReducer,
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
