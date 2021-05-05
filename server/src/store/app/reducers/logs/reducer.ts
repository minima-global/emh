import {ActionProps, LogsActionTypes, LogsProps} from '../../../types';

const initialState: LogsProps = {
  data: [],
};

export const reducer =
(state: LogsProps = initialState, action: ActionProps): LogsProps => {
  if ( action.type == LogsActionTypes.LOGS_SUCCESS ) {
    const myLogsData: LogsProps = action.payload as LogsProps;
    return {...state, data: myLogsData.data};
  } else {
    return state;
  }
};
