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
        searchRegex: string): ChartSummary => {
      let total = 0;
      const data: ChartData = {};
      logs.data.map( ( log: Logs, index: number ) => {
        // const thisDate = new Date(+log.DATE);
        const thisAction = log.ACTION;
        const thisData = log.DATA;
        const thisType = log.LOGGINGTYPE;
        const regex = new RegExp(searchRegex, 'g');
        if ( thisType === logType &&
               thisAction === action ) {
          const thisMatch = thisData.match(regex);
          const thisMatchString = thisMatch ? thisMatch.toString().trim() : '';
          if ( thisMatchString.length ) {
            // console.log('Matched! ', thisMatchString);
            if (!data[thisMatchString]) {
              const chartValues: ChartValues = {
                count: 1,
                colour: getRandomColour(),
              };
              data[thisMatchString] = chartValues;
            } else {
              data[thisMatchString].count += 1;
            }
            total = total + 1;
          }
        }
      });
      const summary: ChartSummary = {
        data: data,
        total: total,
      };
      return summary;
    };

