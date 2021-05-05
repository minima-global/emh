import {
  AppDispatch,
  LogsActionTypes,
  LogsProps,
  Logs,
  CmdActionTypes,
  TxActionTypes,
  TxData,
} from '../../types';

import {
  Remote,
  Post,
} from '../../../config';

import {write} from '../../actions';

const txInit: TxData = {
  code: '',
  summary: '',
  time: '',
};

export const init = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(write({data: txInit})(TxActionTypes.TX_INIT));
  };
};

export const initTx = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(write({data: txInit})(TxActionTypes.TX_INIT));
  };
};

export const command = (cmd: string) => {
  return async (dispatch: AppDispatch) => {
    const data = {
      cmd: cmd,
    };

    fetch(Remote.cmdURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
        .then((response) => {
          // console.log(response)

          if (!response.ok) {
            dispatch(write({data: []})(CmdActionTypes.CMD_FAILURE));
          }
          return response.json();
        })
        .then((data) => {
          dispatch(write({data: data})(CmdActionTypes.CMD_SUCCESS));
        })
        .catch((error) => {
          dispatch(write({data: []})(CmdActionTypes.CMD_FAILURE));
        });
  };
};

const sortLogs = (logsData: LogsProps): Logs[] => {
  return logsData.data.sort((a: Logs, b: Logs) =>
    b.date.localeCompare(a.date));
};

export const getLogs = () => {
  return async (dispatch: AppDispatch) => {
    /* const url = `${dbase}${Remote.logsPath}`;
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
        const logsData: LogsProps = {
          data: result,
        };
        // console.log("log results: ", result)
        const theseLogs = sortLogs(logsData);
        dispatch(write({data: theseLogs})(LogsActionTypes.LOGS_SUCCESS));

        const txData = {
          code: '200',
          summary: `${Post.getSuccess}`,
          time: `${dateText}`,
        };
        dispatch(write({data: txData})(TxActionTypes.TX_SUCCESS));
      }
    } catch ( error ) {
      console.error( error.message );
    }*/
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
