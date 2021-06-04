import {
  AppDispatch,
  ActionTypes,
  TxActionTypes,
  TxData,
} from '../types';

import {write} from '../actions';

/**
 * Initialises the Redux Tx store
 * @return {function}
 */
export const initTx = () => {
  return async (dispatch: AppDispatch) => {
    const initAction: ActionTypes = TxActionTypes.TX_INIT;
    const txInit: TxData = {
      code: '',
      summary: '',
      time: '',
    };
    dispatch(write({data: txInit})(initAction));
  };
};
