import {Minima, Token as Balance} from 'minima';

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
  Logs,
} from '../../types';

import {
  App,
  Dbase,
  SQL,
  Chart,
  Tokens as TokensVars,
} from '../../../config';

import {write} from '../../actions';

/**
 * Logs stuff going into the database
 * @param {string} type - the type of the log entry
 * @param {string} action - the action the log entry performed
 * @param {string} data - the data pertaining to the action
 * @return {function}
 */
export const doLog = (type: string, action: string, data: string) => {
  return async (dispatch: AppDispatch) => {
    const table = Dbase.tables.log.name;
    const date = Date.now();
    const insertSQL = 'INSERT INTO ' +
        table +
        ' (DATE, LOGGINGTYPE, ACTION, DATA) ' +
        'VALUES (' +
        '\'' + date + '\', ' +
        '\'' + type + '\', ' +
        '\'' + action + '\', ' +
        '\'' + data + '\'' +
      ')';
    Minima.sql(insertSQL, function(result: any) {
      if ( !result.status ) {
        Minima.log(App.appName +
          ' Error logging ' +
          type + ' ' +
          action + ' ' +
          data,
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
                values.toString().replace(/,/g, ' ')),
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
        dispatch(doLog(table, Dbase.defaultActions.delete, thisKey));
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
         // console.log('Got count!', count);
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
 * @param {string} filterRegex - the regex used to filter data
 * @return {function}
 */
export const getChartEntries =
  (query: string, chartName: string, filterRegex: string) => {
    return async (dispatch: AppDispatch, getState: Function) => {
      const state = getState();
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
            const data: Array<Logs> = result.response.rows.slice();
            const updateData: ChartUpdateData = {
              data: {},
              index: chartIndex,
            };
            const chartData: ChartData = {};
            data.map( ( log: Logs, index: number ) => {
              // const thisDate = new Date(+log.DATE);
              const thisData = log.DATA;
              const thisMatch = thisData.match(filterRegex);
              const thisMatchString =
                thisMatch ? thisMatch.toString().trim() : '';
              if ( thisMatchString.length ) {
                if (!chartData[thisMatchString]) {
                  chartData[thisMatchString] = 1;
                } else {
                  chartData[thisMatchString] += 1;
                }
              }

              if ( chartName === TokensVars.chartHeading) {
                const tokens: ChartData = {};
                state.balanceData.data.forEach((token: Balance) => {
                  if ( token.tokenid in chartData) {
                    const tokenName = token.token;
                    tokens[tokenName] = chartData[token.tokenid];
                  }
                });
                updateData.data = tokens;
              } else {
                updateData.data = chartData;
              }
            });
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
