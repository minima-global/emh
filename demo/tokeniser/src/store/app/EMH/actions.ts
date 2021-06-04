import {
  AppDispatch,
  ActionTypes,
  NewToken,
  Token,
  TxActionTypes,
  TxData,
} from '../../types';

import {
  Transaction,
} from '../../../config';

import {write} from '../../actions';

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

export const createToken = (token: NewToken) => {
  return async (dispatch: AppDispatch) => {
    const time = new Date(Date.now()).toString();
    const pendingData: TxData = {
      code: '200',
      summary: Transaction.pending,
      time: time,
    };
    dispatch(write({data: pendingData})(TxActionTypes.TX_PENDING));
  };
};

export const getBalance = () => {
  return async (dispatch: AppDispatch) => {
    const time = new Date(Date.now()).toString();
    const pendingData: TxData = {
      code: '200',
      summary: Transaction.pending,
      time: time,
    };
    dispatch(write({data: pendingData})(TxActionTypes.TX_PENDING));
  };
};
