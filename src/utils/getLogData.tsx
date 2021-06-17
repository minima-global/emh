import {
  LogsProps,
  Logs,
} from '../store/types';

export const getLogData =
    (
        logs: LogsProps,
        logType: string,
        action: string,
        searchRegex: string): LogsProps => {
      const data: LogsProps = {
        data: [],
      };
      logs.data.map( ( log: Logs, index: number ) => {
        // const thisDate = new Date(+log.DATE);
        const dataJSON = JSON.parse(log.DATA);
        const thisAction = dataJSON.action;
        const thisData = dataJSON.data;
        const thisType = log.LOGGINGTYPE;
        const regex = new RegExp(searchRegex, 'g');
        if ( thisType === logType &&
               thisAction === action ) {
          const thisMatch = thisData.match(regex);
          const thisMatchString = thisMatch ? thisMatch.toString().trim() : '';
          if ( thisMatchString.length ) {
            data.data.push(log);
          }
        }
      });
      return data;
    };

