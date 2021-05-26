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
        dispatch(getTokens());
      } else if ( msg.event == 'newbalance' ) {
        dispatch(getBalance());
        dispatch(getTokens());
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

        // since Minima is first, we ignore that
        for ( let i=1; i < tokens.length; i++ ) {
          // console.log("this token: ", tokens[i])

          const thisToken: Token = {
            tokenId: tokens[i].tokenid,
            tokenName: tokens[i].token,
            scale: tokens[i].scale,
            total: tokens[i].total,
          };

          tokenData.data.push(thisToken);
        }

        dispatch(write({data: tokenData.data})(TokenActionTypes.TOKEN_SUCCESS));

        // console.log("tokens: ", tokenData)
      } else {
        Minima.log('tokens failed');
      }
    });
  };
};

/*
const getBlock = () => {
  return async (dispatch: AppDispatch) => {
    const chainInfo: ChainInfoProps = {
      data: {
        block: Minima.block,
      },
    };

    dispatch(write({data: chainInfo.data})(ChainInfoActionTypes.ADD_BLOCK));
  };
};
*/

const getBalance = () => {
  return async (dispatch: AppDispatch) => {
    const balanceData: BalanceProps = {
      data: [],
    };

    for ( let i = 0; i < Minima.balance.length; i++ ) {
      const thisBalance: Balance = {
        token: Minima.balance[i].token,
        sendable: Minima.balance[i].sendable,
        confirmed: Minima.balance[i].confirmed,
        unconfirmed: Minima.balance[i].unconfirmed,
        mempool: Minima.balance[i].mempool,
      };

      balanceData.data.push(thisBalance);
    }

    dispatch(
        write({data: balanceData.data})(BalanceActionTypes.BALANCE_SUCCESS));
  };
};
