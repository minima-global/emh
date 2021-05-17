import {Minima} from 'minima';

import {
  AppDispatch,
  ActionTypes,
  SuccessAndFailType,
  TxPoWActionTypes,
  AddressActionTypes,
  TokenActionTypes,
  TriggerActionTypes,
  LogsActionTypes,
  TxActionTypes,
  CmdActionTypes,
  TxData,
} from '../../types';

import {
  App,
  Dbase,
  SQL,
} from '../../../config';

import {write} from '../../actions';

/**
 * Initialises the app
 * @return {function}
 */
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
 * Logs stuff going into the database
 * @param {string} typeId - the key of the type
 * @param {string} type - the type of the log entry
 * @param {string} data - relevant data for the log entry
 * @return {function}
 */
export const doLog = (typeId: string, type: string, data: string) => {
  return async (dispatch: AppDispatch) => {
    const table = Dbase.tables.log.name;
    const date = Date.now();
    const insertSQL = 'INSERT INTO ' +
        table +
        ' (loggingTypeId, loggingType, date, data) ' +
        'VALUES (' +
        '\'' + typeId + '\', ' +
        '\'' + type + '\', ' +
        '\'' + date + '\', ' +
        '\'' + data + '\'' +
      ')';
    Minima.sql(insertSQL, function(result: any) {
      if ( !result.status ) {
        Minima.log(App.appName +
          ' Error logging ' +
          typeId + ' ' +
          type + ' ' +
          data,
        );
      }
    });
  };
};

/**
 * Runs a Minima command
 * @param {string} cmd - the command to run
 * @return {function}
 */
export const command = (cmd: string) => {
  return async (dispatch: AppDispatch) => {
    // console.log('Got command', cmd);
    const successAction: ActionTypes = CmdActionTypes.CMD_SUCCESS;
    Minima.cmd(cmd, function(msg: any) {
      let command = cmd.substr(0, cmd.indexOf(' '));
      let params = cmd.substr(cmd.indexOf(' ') + 1);
      if ( command === '' ) {
        command = params;
        params = '';
      }
      dispatch(doLog(command, 'COMMAND', params));
      dispatch(write({data: msg.response})(successAction));
    });
  };
};

/*
const sortLogs = (logsData: LogsProps): Logs[] => {
  return logsData.data.sort((a: Logs, b: Logs) =>
    b.DATE.localeCompare(a.DATE));
};
*/

/**
 * Gets the Dbase action type
 * @param {string} table - the table for which to get the action type
 * @return {object}
 */
const getActionTypes = (table: string): SuccessAndFailType => {
  let actionType: SuccessAndFailType = {
    success: AddressActionTypes.ADDRESS_SUCCESS,
    fail: AddressActionTypes.ADDRESS_FAILURE,
  };

  switch (table) {
    case Dbase.tables.address.name:
      actionType = {
        success: AddressActionTypes.ADDRESS_SUCCESS,
        fail: AddressActionTypes.ADDRESS_FAILURE,
      };
      break;
    case Dbase.tables.token.name:
      actionType = {
        success: TokenActionTypes.TOKEN_SUCCESS,
        fail: TokenActionTypes.TOKEN_FAILURE,
      };
      break;
    case Dbase.tables.trigger.name:
      actionType = {
        success: TriggerActionTypes.TRIGGER_SUCCESS,
        fail: TriggerActionTypes.TRIGGER_FAILURE,
      };
      break;
    case Dbase.tables.log.name:
      actionType = {
        success: LogsActionTypes.LOGS_SUCCESS,
        fail: LogsActionTypes.LOGS_FAILURE,
      };
      break;
    case Dbase.tables.txpow.name:
      actionType = {
        success: TxPoWActionTypes.TXPOW_SUCCESS,
        fail: TxPoWActionTypes.TXPOW_FAILURE,
      };
      break;
    default:
      break;
  }

  return actionType;
};

/**
 * Turns table values into a string that can be used in an INSERT
 * @function stringifyColumns
 * @param {Array} columns - the columns to stringify
 * @return {string}
 */
 const stringifyColumns = (columns: Array<string>): string => {
  let thisColumn = '(';
  const columnsLength = columns.length;

  for (let i = 0; i < columnsLength; i ++ ) {
    if ( i == columnsLength - 1) {
      thisColumn += columns[i] + ') ';
    } else {
      thisColumn += columns[i] + ', ';
    }
  }

  return thisColumn;
};

/**
 * Turns table values into a string that can be used in an INSERT
 * @function stringifyValues
 * @param {Array} values - the values to stringify to ru
 * @return {string}
 */
const stringifyValues = (values: Array<string>): string => {
  let thisValue = '(';
  const valuesLength = values.length;

  for (let i = 0; i < valuesLength; i ++ ) {
    if ( i == valuesLength - 1) {
      thisValue += '\'' + values[i] + '\')';
    } else {
      thisValue += '\'' + values[i] + '\', ';
    }
  }
  return thisValue;
};

/**
 * Adds a row to the database
 * @param {string} table - the table to which to add
 * @param {Array} columns - the table columns
 * @param {string} key - the table primary key
 * @param {Array} values - the table values
 * @return {function}
 */
export const addRow = (
    table: string,
    columns: Array<string>,
    key: Array<string>,
    values: Array<string>,
) => {
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

    const thisColumns = stringifyColumns(columns);
    const thisValues = stringifyValues(values);
    const thisKey = key.join(' ');

    const insertSQL = 'INSERT INTO ' +
      table + ' ' +
      thisColumns +
      ' VALUES ' +
      thisValues;

    // console.log('insert!', insertSQL);

    Minima.sql(insertSQL, function(result: any) {
      if ( !result.status ) {
        txData = {
          code: '503',
          summary: SQL.insertFailure,
          time: dateText,
        };
        dispatch(write({data: txData})(txFailAction));
      } else {
        dispatch(doLog(thisKey, table, 'insert'));
        dispatch(write({data: txData})(txSuccessAction));
      }
    });
  };
};

/**
 * Deletes a row from the database
 * @param {string} table - the table to which to add
 * @param {Array} columns - the table's primary keys
 * @param {Array} key - the table's primary keys
 * @param {Array} values - the value(s) for the key
 * @return {function}
 */
export const deleteRow = (
    table: string,
    columns: Array<string>,
    key: Array<string>,
) => {
  return async (dispatch: AppDispatch) => {
    const txSuccessAction: ActionTypes = TxActionTypes.TX_SUCCESS;
    const txFailAction: ActionTypes = TxActionTypes.TX_FAILURE;
    const d = new Date(Date.now());
    const dateText = d.toString();
    let txData = {
      code: '200',
      summary: SQL.deleteSuccess,
      time: dateText,
    };

    const thisColumns = stringifyColumns(columns);
    const thisValues = stringifyValues(key);
    const thisKey = key.join(' ');

    const deleteSQL = 'DELETE FROM ' +
      table +
      ' WHERE ' +
      thisColumns + ' = ' +
      thisValues;

    Minima.sql(deleteSQL, function(result: any) {
      if ( !result.status ) {
        txData = {
          code: '503',
          summary: SQL.deleteFailure,
          time: dateText,
        };
        dispatch(write({data: txData})(txFailAction));
      } else {
        dispatch(doLog(thisKey, table, 'delete'));
        dispatch(write({data: txData})(txSuccessAction));
      }
    });
  };
};


/**
 * Gets rows from the database
 * @param {string} table - the table to which to add
 * @param {string} successAction - the Redux action type that indicates success
 * @param {string} failAction - the Redux action type that indicates failure
 * @return {function}
 */

export const getDbaseEntries = (table: string) => {
  return async (dispatch: AppDispatch) => {
    const successFailType = getActionTypes(table);
    const successAction = successFailType.success;
    const failAction = successFailType.fail;
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

/**

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
*/
