import {Minima} from 'minima';

import {
  AppDispatch,
  ActionTypes,
  LogInfo,
  SuccessAndFailType,
  TxPoWActionTypes,
  AddressActionTypes,
  TokenIdActionTypes,
  TriggerActionTypes,
  LogsActionTypes,
  TxActionTypes,
} from '../../types';

import {
  App,
  Dbase,
  SQL,
} from '../../../config';

import {write} from '../../actions';

/**
 * Logs stuff going into the database
 * @param {string} type - the type of the log entry
 * @param {object} logInfo - relevant data for the log entry
 * @return {function}
 */
export const doLog = (type: string, logInfo: LogInfo) => {
  return async (dispatch: AppDispatch) => {
    const table = Dbase.tables.log.name;
    const thisData = JSON.stringify(logInfo.info);
    const date = Date.now();
    const insertSQL = 'INSERT INTO ' +
        table +
        ' (LOGGINGTYPEID, LOGGINGTYPE, DATE, DATA) ' +
        'VALUES (' +
        '\'' + logInfo.id + '\', ' +
        '\'' + type + '\', ' +
        '\'' + date + '\', ' +
        '\'' + thisData + '\'' +
      ')';
    Minima.sql(insertSQL, function(result: any) {
      if ( !result.status ) {
        Minima.log(App.appName +
          ' Error logging ' +
          logInfo.id + ' ' +
          type + ' ' +
          thisData,
        );
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
        success: TokenIdActionTypes.TOKENID_SUCCESS,
        fail: TokenIdActionTypes.TOKENID_FAILURE,
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
        // If Minima.sql gave me back the id of the row created,
        // I could use it as the 'id' here...
        const logData: LogInfo = {
          id: thisKey,
          info: {
            action: Dbase.defaultActions.insert,
            data: table + thisValues,
          },
        };
        dispatch(doLog(table, logData));
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
        const logData: LogInfo = {
          id: thisKey,
          info: {
            action: Dbase.defaultActions.delete,
            data: table,
          },
        };
        dispatch(doLog(table, logData));
        dispatch(write({data: txData})(txSuccessAction));
      }
    });
  };
};


/**
 * Gets rows from the database
 * @param {string} table - the table to which to add
 * @param {string} sortField - e.g ID
 * @param {string} sortOrder - e.g DESC
 * @param {string} limitLow - first row to return
 * @param {string} offset - row offset
 * @return {function}
 */
export const getDbaseEntries = (
    table: string,
    sortField: string = '',
    sortOrder: string = 'DESC',
    limitLow: number = 0,
    offset: number = Dbase.maxLimit) => {
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

    let selectSQL = 'SELECT * FROM ' + table;
    if ( sortField ) {
      selectSQL += ' ORDER BY ' +
          sortField + ' ' +
          sortOrder;
    }
    selectSQL += ' LIMIT ' +
        limitLow + ', ' +
        offset;

    // console.log(selectSQL);

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
