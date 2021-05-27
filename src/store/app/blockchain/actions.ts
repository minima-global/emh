import {Minima} from 'minima';

import {
  AppDispatch,
  ActionTypes,
  TokenActionTypes,
  TokenProps,
  Token,
  TxActionTypes,
  CmdActionTypes,
  BalanceProps,
  Balance,
  BalanceActionTypes,
  StatusProps,
  Status,
  StatusActionTypes,
  TxData,
} from '../../types';

import {Dbase} from '../../../config';

import {doLog, getDbaseEntries} from '../dbase/actions';
import {write} from '../../actions';

/**
 * Initialises the app
 * @return {function}
 */
export const init = () => {
  return async (dispatch: AppDispatch) => {
    Minima.init( function(msg: any) {
      if (msg.event == 'connected') {
        dispatch(getBalance());
        dispatch(getTokens());
        dispatch(getStatus());
        dispatch( getDbaseEntries(Dbase.tables.log.name, 'DATE', 'DESC'));
      } else if ( msg.event == 'newbalance' ) {
        dispatch(getBalance());
        dispatch(getTokens());
        dispatch(getStatus());
        dispatch( getDbaseEntries(Dbase.tables.log.name, 'DATE', 'DESC'));
      }
    });
  };
};

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

/**
 * Runs a Minima command
 * @param {string} endpoint - the endpoint called
 * @param {string} cmd - the command to run
 * @return {function}
 */
export const command = (endpoint: string, cmd: string) => {
  return async (dispatch: AppDispatch) => {
    console.log('Got command', cmd);
    const successAction: ActionTypes = CmdActionTypes.CMD_SUCCESS;
    Minima.cmd(cmd, function(msg: any) {
      dispatch(doLog(endpoint, Dbase.extraLogTypes.COMMAND, cmd));
      dispatch(write({data: msg.response})(successAction));
    });
  };
};


export const getTokens = () => {
  return async (dispatch: AppDispatch) => {
    // Find all known tokens
    Minima.cmd('tokens;', function(respJSON: any) {
      if ( Minima.util.checkAllResponses(respJSON) ) {
        const tokenData: TokenProps = {
          data: [],
        };
        const tokens = respJSON[0].response.tokens;
        for ( let i=0; i < tokens.length; i++ ) {
          const thisToken: Token = tokens[i];
          tokenData.data.push(thisToken);
        }
        dispatch(write({data: tokenData.data})(TokenActionTypes.TOKEN_SUCCESS));
      } else {
        Minima.log('tokens failed');
      }
    });
  };
};

const getBalance = () => {
  return async (dispatch: AppDispatch) => {
    const balanceData: BalanceProps = {
      data: [],
    };

    for ( let i = 0; i < Minima.balance.length; i++ ) {
      const thisBalance: Balance = Minima.balance[i];
      balanceData.data.push(thisBalance);
    }

    dispatch(
        write({data: balanceData.data})(BalanceActionTypes.BALANCE_SUCCESS));
  };
};

export const getStatus = () => {
  return async (dispatch: AppDispatch) => {
    Minima.cmd('status;', function(respJSON: any) {
      if ( Minima.util.checkAllResponses(respJSON) ) {
        const statusData: StatusProps = {
          data: [],
        };
        const status: Status = respJSON[0].response;
        statusData.data.push(status);
        dispatch(write(
            {data: statusData.data})(StatusActionTypes.STATUS_SUCCESS));
      } else {
        Minima.log('status failed');
      }
    });
  };
};
