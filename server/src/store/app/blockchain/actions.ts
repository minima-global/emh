import {Minima} from 'minima';

import {
  AppDispatch,
  ActionTypes,
  TxActionTypes,
  CmdActionTypes,
  TxData,
} from '../../types';

import {
  Remote,
  SQL,
  Post,
} from '../../../config';

import {write} from '../../actions';

export const init = () => {
  return async (dispatch: AppDispatch) => {
    const initAction: ActionTypes = TxActionTypes.TX_INIT;
    const txInit: TxData = {
      code: '',
      summary: '',
      time: '',
    };
    Minima.init( function(msg: any) {
      if (msg.event == 'connected') {
        dispatch(write({data: txInit})(initAction));
      }
    });
  };
};

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

export const command = (cmd: string) => {
  return async (dispatch: AppDispatch) => {
    const successAction: ActionTypes = CmdActionTypes.CMD_SUCCESS;
    const failureAction: ActionTypes = CmdActionTypes.CMD_FAILURE;
    Minima.net.POST(Remote.cmdURL, cmd, function(msg: any) {
      const cmdObject = JSON.parse(msg.result);
      if ( cmdObject.status ) {
        dispatch(write({data: cmdObject.response})(successAction));
      } else {
        dispatch(write({data: []})(failureAction));
      }
    });
  };
};

export const addCall = (table: string, address: string, url: string) => {
  return async (dispatch: AppDispatch) => {
    const txSuccessAction: ActionTypes = TxActionTypes.TX_SUCCESS;
    const txFailAction: ActionTypes = TxActionTypes.TX_FAILURE;
    const d = new Date(Date.now());
    const dateText = d.toString();
    let txData = {
      code: '200',
      summary: SQL.insertSuccess,
      time: dateText,
    };

    const insertSQL = 'INSERT INTO ' +
      table +
      ' (address, url) ' +
      'VALUES (' +
      '\'' + address + '\', ' +
      '\'' + url + '\'' +
    ')';

    Minima.sql(insertSQL, function(result: any) {
      // console.log(result);
      if ( !result.status ) {
        txData = {
          code: '503',
          summary: SQL.insertFailure,
          time: dateText,
        };
        dispatch(write({data: txData})(txFailAction));
      } else {
        dispatch(write({data: txData})(txSuccessAction));
      }
    });
  };
};

export const addToken = (table: string, id: string, url: string) => {
  return async (dispatch: AppDispatch) => {
    console.log(table, id, url);
    const txSuccessAction: ActionTypes = TxActionTypes.TX_SUCCESS;
    const txFailAction: ActionTypes = TxActionTypes.TX_FAILURE;
    const d = new Date(Date.now());
    const dateText = d.toString();
    let txData = {
      code: '200',
      summary: SQL.insertSuccess,
      time: dateText,
    };

    const insertSQL = 'INSERT INTO ' +
      table +
      ' (id, url) ' +
      'VALUES (' +
      '\'' + id + '\', ' +
      '\'' + url + '\'' +
    ')';

    console.log(insertSQL);
    Minima.sql(insertSQL, function(result: any) {
      console.log(result);
      if ( !result.status ) {
        txData = {
          code: '503',
          summary: SQL.insertFailure,
          time: dateText,
        };
        dispatch(write({data: txData})(txFailAction));
      } else {
        dispatch(write({data: txData})(txSuccessAction));
      }
    });
  };
};

/*
const sortLogs = (logsData: LogsProps): Logs[] => {
  return logsData.data.sort((a: Logs, b: Logs) =>
    b.DATE.localeCompare(a.DATE));
};
*/

export const getDbaseEntries =
  (
      table: string,
      successAction: ActionTypes,
      failAction: ActionTypes,
  ) => {
    return async (dispatch: AppDispatch) => {
      const txSuccessAction: ActionTypes = TxActionTypes.TX_SUCCESS;
      const txFailAction: ActionTypes = TxActionTypes.TX_FAILURE;
      const d = new Date(Date.now());
      const dateText = d.toString();
      let txData = {
        code: '200',
        summary: SQL.selectSuccess,
        time: dateText,
      };

      const selectSQL = 'Select * from ' + table;

      /**
      const selectSQL = 'Select * from ' +
      table +
      ' ORDER BY DATE DESC';
      */

      Minima.sql(selectSQL, function(result: any) {
        console.log('Got result', result);
        if ( !result.status ) {
          txData = {
            code: '503',
            summary: SQL.selectFailure,
            time: dateText,
          };
          dispatch(write({data: []})(failAction));
          dispatch(write({data: txData})(txFailAction));
        } else {
          const data = result.response.rows.slice();
          dispatch(write({data: data})(successAction));
          dispatch(write({data: txData})(txSuccessAction));
        }
      });
    };
  };


const get = (url: string, actionType: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const d = new Date(Date.now());
      const dateText = d.toString();

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const statusText = response.statusText;
        return response.json()
            .then((data) => {
              throw new Error(`${Post.getFailure}: ${statusText}`);
            });
      } else {
        const result = await response.json();
        dispatch(write({data: result})(actionType));
        const txData = {
          code: '200',
          summary: `${Post.getSuccess}`,
          time: `${dateText}`,
        };
        dispatch(write({data: txData})(TxActionTypes.TX_SUCCESS));
      }
    } catch ( error ) {
      console.error( error.message );
    }
  };
};

const post = (url: string, data: object) => {
  return async (dispatch: AppDispatch) => {
    // console.log("Post: ", url, data)
    const d = new Date(Date.now());
    const dateText = d.toString();
    let txData: TxData = {
      code: '404',
      summary: Post.postFailure,
      time: `${dateText}`,
    };

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
        .then((response) => {
          if (!response.ok) {
            const status = response.status;
            const statusText = response.statusText;
            return response.json()
                .then((data) => {
                  txData = {
                    code: status.toString(),
                    summary: `${Post.postFailure}: ${statusText}`,
                    time: `${dateText}`,
                  };
                  throw new Error();
                });
          }
          return response.json();
        })
        .then((data) => {
          txData = {
            code: '200',
            summary: `${Post.postSuccess}`,
            time: `${dateText}`,
          };
          dispatch(write({data: txData})(TxActionTypes.TX_SUCCESS));
        })
        .catch((error) => {
          dispatch(write({data: txData})(TxActionTypes.TX_FAILURE));
        });
  };
};
