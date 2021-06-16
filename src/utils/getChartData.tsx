import {
  LogsProps,
  Logs,
  ChartValues,
  ChartData,
  ChartSummary,
} from '../store/types';

import {getRandomColour} from './colourGenererator';

export const getChartData =
    (
        logs: LogsProps,
        logType: string,
        action: string,
        searchString: string,
        searchStringLength: number): ChartSummary => {
      let total = 0;
      const data: ChartData = {};
      logs.data.map( ( log: Logs, index: number ) => {
        // const thisDate = new Date(+log.DATE);
        const dataJSON = JSON.parse(log.DATA);
        const thisAction = dataJSON.action;
        const thisData = dataJSON.data;
        const thisType = log.LOGGINGTYPE;
        if ( thisType === logType &&
               thisAction === action &&
               thisData.includes(searchString, 0)) {
          let id =
              thisData.substr(
                  thisData.indexOf(searchString),
                  searchStringLength,
              ).trim();
          if (!data[id]) {
            const chartValues: ChartValues = {
              count: 1,
              colour: getRandomColour(),
            };
            data[id] = chartValues;
          } else {
            data[id].count += 1;
          }
          total = total + 1;
        }
      });
      const summary: ChartSummary = {
        data: data,
        total: total,
      };
      return summary;
    };

