import {Minima} from 'minima';

import {
  AppDispatch,
  ActionTypes,
  LogInfo,
  TxActionTypes,
  CmdActionTypes,
  BalanceProps,
  BalanceActionTypes,
  StatusProps,
  StatusActionTypes,
  TxData,
} from '../../types';

import {Dbase} from '../../../config';

import {doLog} from '../dbase/actions';
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
        dispatch(getStatus());

        // need this empty listener, apparently...
        Minima.minidapps.listen(function(msg) {
          null;
        });
      } else if ( msg.event == 'newbalance' ) {
        dispatch(getBalance());
        dispatch(getStatus());
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
    // console.log('Got command', cmd);
    const successAction: ActionTypes = CmdActionTypes.CMD_SUCCESS;
    Minima.cmd(cmd, function(msg: any) {
      // console.log('Command?: ', msg);
      const logData: LogInfo = {
        id: endpoint,
        info: {
          action: Dbase.defaultActions.run,
          data: endpoint + ' ' + cmd,
        },
      };
      dispatch(doLog(Dbase.extraLogTypes.COMMAND, logData));
      dispatch(write({data: msg.response})(successAction));
    });
  };
};

const getBalance = () => {
  return async (dispatch: AppDispatch) => {
    const balanceData: BalanceProps = {
      data: [],
    };

    for ( let i = 0; i < Minima.balance.length; i++ ) {
      balanceData.data.push(Minima.balance[i]);
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
        const status = respJSON[0].response;
        statusData.data.push(status);
        dispatch(write(
            {data: statusData.data})(StatusActionTypes.STATUS_SUCCESS));
      } else {
        Minima.log('status failed');
      }
    });
  };
};
