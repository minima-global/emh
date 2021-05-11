import {Minima} from 'minima';

import {
  AppDispatch,
  ActionTypes,
  TxActionTypes,
  CmdActionTypes,
  LogsActionTypes,
  TxData,
} from '../../types';

import {
  Remote,
  Post,
  Dbase,
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
    /*
    try {
      console.log('trying');
      const response = await axios({
        method: 'POST',
        url: Remote.cmdURL,
        headers: {
          'Content-Type': 'application/json',
        },
        data: cmd,
      });
      console.log('trying', response);
      dispatch(write({data: response.data})(CmdActionTypes.CMD_SUCCESS));
    } catch (error) {
      console.log('oops', error);
      dispatch(write({data: []})(CmdActionTypes.CMD_FAILURE));
      return {};
    }
    */
  };
};

/*
const sortLogs = (logsData: LogsProps): Logs[] => {
  return logsData.data.sort((a: Logs, b: Logs) =>
    b.DATE.localeCompare(a.DATE));
};
*/

export const getLogs = () => {
  return async (dispatch: AppDispatch) => {
    const successAction: ActionTypes = LogsActionTypes.LOGS_SUCCESS;
    // const failureAction: ActionTypes = LogsActionTypes.LOGS_FAILURE;
    const txSuccessAction: ActionTypes = TxActionTypes.TX_SUCCESS;
    const txFailureAction: ActionTypes = TxActionTypes.TX_FAILURE;
    const d = new Date(Date.now());
    const dateText = d.toString();
    let txData = {
      code: '200',
      summary: Post.getSuccess,
      time: dateText,
    };

    const tableName = Dbase.tables.log.name;
    const selectSQL = 'Select * from ' +
      tableName +
      ' ORDER BY DATE DESC';

    Minima.sql(selectSQL, function(result: any) {
      // console.log(result);
      if ( !result.status ) {
        txData = {
          code: '503',
          summary: Post.getFailure,
          time: dateText,
        };
        dispatch(write({data: txData})(txFailureAction));
      } else {
        const theseLogs = result.response.rows.slice();
        dispatch(write({data: theseLogs})(successAction));
        dispatch(write({data: txData})(txSuccessAction));
      }
    });
  };
};

export const getDbaseEntries =
  (tableName: string,
      successAction: ActionTypes,
      failAction: ActionTypes,
  ) => {
    return async (dispatch: AppDispatch) => {
      const txSuccessAction: ActionTypes = TxActionTypes.TX_SUCCESS;
      const txFailureAction: ActionTypes = TxActionTypes.TX_FAILURE;
      const d = new Date(Date.now());
      const dateText = d.toString();
      let txData = {
        code: '200',
        summary: Post.getSuccess,
        time: dateText,
      };

      const selectSQL = 'Select * from ' +
      tableName +
      ' ORDER BY DATE DESC';

      Minima.sql(selectSQL, function(result: any) {
      // console.log(result);
        if ( !result.status ) {
          txData = {
            code: '503',
            summary: Post.getFailure,
            time: dateText,
          };
          dispatch(write({data: []})(txFailureAction));
          dispatch(write({data: txData})(txFailureAction));
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
