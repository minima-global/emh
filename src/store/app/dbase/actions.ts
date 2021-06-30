// import {Minima, Token as Balance} from 'minima';
import {Minima} from 'minima';

import {
  AppDispatch,
  ActionTypes,
  SuccessAndFailType,
  TxActionTypes,
  ChartsActionTypes,
  ChartUpdateData,
  ChartData,
  CountActionTypes,
  CountUpdateData,
} from '../../types';

import {
  App,
  Dbase,
  SQL,
  Chart,
} from '../../../config';

// Tokens as TokensVars,

import {write} from '../../actions';

/**
 * Logs stuff going into the database
 * @param {string} type - the type of the log entry
 * @param {string} action - the action the log entry performed
 * @param {string} data - the data pertaining to the action
 * @param {string} extra - any extra data needed to make sense of the call
 * @return {function}
 */
export const doLog =
  (type: string, action: string, data: string, extra: string = '') => {
    return async (dispatch: AppDispatch) => {
      const table = Dbase.tables.log.name;
      const date = Date.now();
      const insertSQL = 'INSERT INTO ' +
        table +
        ' (DATE, LOGGINGTYPE, ACTION, DATA, EXTRA) ' +
        'VALUES (' +
        '\'' + date + '\', ' +
        '\'' + type + '\', ' +
        '\'' + action + '\', ' +
        '\'' + data + '\', ' +
        '\'' + extra + '\'' +
      ')';
      Minima.sql(insertSQL, function(result: any) {
        if ( !result.status ) {
          Minima.log(App.appName +
            ' Error logging ' +
            type + ' ' +
            action + ' ' +
            data + ' ' +
            extra,
          );
        }
      });
    };
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
 * @param {Array} values - the table values
 * @return {function}
 */
export const addRow = (
    table: string,
    columns: Array<string>,
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
    const thisData = values[0];
    const thisExtra = values[1] ? values[1] : '';

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
        dispatch(
            doLog(
                table,
                Dbase.defaultActions.insert,
                thisData,
                thisExtra),
        );
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
    const thisData = key[0];
    const thisExtra = key[1] ? key[1] : '';


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
        dispatch(doLog(
            table, Dbase.defaultActions.delete, thisData, thisExtra));
        dispatch(write({data: txData})(txSuccessAction));
      }
    });
  };
};

/**
 * Queries the database
 * @param {string} query - SELECT * FROM LOGGING etc...
 * @param {object} actionType -
 * Defines the action to take on completion of the query
 * @return {function}
 */
export const getTableEntries =
  (query: string, actionType: SuccessAndFailType) => {
    return async (dispatch: AppDispatch) => {
      const successAction = actionType.success;
      const failAction = actionType.fail;
      const txSuccessAction: ActionTypes = TxActionTypes.TX_SUCCESS;
      const txFailAction: ActionTypes = TxActionTypes.TX_FAILURE;
      const d = new Date(Date.now());
      const dateText = d.toString();
      let txData = {
        code: '200',
        summary: SQL.selectSuccess,
        time: dateText,
      };

      // console.log(query);

      Minima.sql(query, function(result: any) {
        if ( !result.status ) {
          txData = {
            code: '503',
            summary: SQL.selectFailure,
            time: dateText,
          };
          dispatch(write({data: []})(failAction));
          dispatch(write({data: txData})(txFailAction));
        } else {
          // console.log(query, result);
          const data = result.response.rows.slice();
          dispatch(write({data: data})(successAction));
          dispatch(write({data: txData})(txSuccessAction));
        }
      });
    };
  };

/**
 * Counts rows in the database
 * @param {string} query - SELECT COUNT(*) FROM LOGGING etc...
 * @return {function}
 */
export const countTableEntries =
 (query: string) => {
   return async (dispatch: AppDispatch) => {
     const successAction = CountActionTypes.COUNT_SUCCESS;
     const failAction = CountActionTypes.COUNT_FAILURE;
     const txSuccessAction: ActionTypes = TxActionTypes.TX_SUCCESS;
     const txFailAction: ActionTypes = TxActionTypes.TX_FAILURE;
     const d = new Date(Date.now());
     const dateText = d.toString();
     let txData = {
       code: '200',
       summary: SQL.selectSuccess,
       time: dateText,
     };

     // console.log(query);

     Minima.sql(query, function(result: any) {
       // console.log('got result', query, result);
       if ( !result.status ) {
         txData = {
           code: '503',
           summary: SQL.selectFailure,
           time: dateText,
         };
         dispatch(write({data: []})(failAction));
         dispatch(write({data: txData})(txFailAction));
       } else {
         const count = result.response.rows[0]['COUNT(*)'];
         const updateData: CountUpdateData = {
           count: count,
           key: query,
         };
         dispatch(write({data: updateData})(successAction));
         dispatch(write({data: txData})(txSuccessAction));
       }
     });
   };
 };

/**
 * Queries the database and dispatches chart data
 * @param {string} query - SELECT * FROM LOGGING etc...
 * @param {string} chartName - the chart for which we're getting data *
 * @param {string} countKey - the object key of the count returned in the SELECT
 * @param {string} dataKey - the object key of the data returned in the SELECT
 * @return {function}
 */
export const getChartEntries =
  (query: string, chartName: string, countKey: string, dataKey: string) => {
    return async (dispatch: AppDispatch) => {
      // , getState: Function
      // const state = getState();
      const successAction = ChartsActionTypes.CHARTS_SUCCESS;
      const failAction = ChartsActionTypes.CHARTS_FAILURE;
      const txSuccessAction: ActionTypes = TxActionTypes.TX_SUCCESS;
      const txFailAction: ActionTypes = TxActionTypes.TX_FAILURE;
      const d = new Date(Date.now());
      const dateText = d.toString();
      let txData = {
        code: '200',
        summary: SQL.selectSuccess,
        time: dateText,
      };
      const chartIndex = Chart.chartInfo.indexOf(chartName);

      if ( chartIndex != -1 ) {
        // console.log('got query', query);
        Minima.sql(query, function(result: any) {
          if ( !result.status ) {
            txData = {
              code: '503',
              summary: SQL.selectFailure,
              time: dateText,
            };
            dispatch(write({data: []})(failAction));
            dispatch(write({data: txData})(txFailAction));
          } else {
            // console.log(query, result);
            const data: Array<object> = result.response.rows.slice();
            const updateData: ChartUpdateData = {
              data: {},
              index: chartIndex,
            };
            const chartData: ChartData = {};
            data.map( ( row: any ) => {
              // eslint-disable-next-line max-len
              // console.log('row', row, dataKey, countKey, row[dataKey], row[countKey], chartIndex);
              const thisData = row[dataKey];
              const thisCount = row[countKey];
              chartData[thisData] = thisCount;
            });
            updateData.data = chartData;
            dispatch(write({data: updateData})(successAction));
            dispatch(write({data: txData})(txSuccessAction));
          }
        });
      } else {
        txData = {
          code: '503',
          summary: SQL.selectFailure,
          time: dateText,
        };
        dispatch(write({data: []})(failAction));
        dispatch(write({data: txData})(txFailAction));
      }
    };
  };
