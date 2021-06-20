import {
  ActionProps,
  ChartsActionTypes,
  ChartProps,
  ChartUpdateData,
} from '../../../types';

import {
  Chart,
} from '../../../../config';

const initialState: ChartProps = {
  data: new Array(Chart.chartInfo.length),
};

export const reducer =
(state: ChartProps = initialState, action: ActionProps): ChartProps => {
  if ( action.type == ChartsActionTypes.CHARTS_SUCCESS ) {
    const myChartData: ChartUpdateData = action.payload.data as ChartUpdateData;
    const thisData = myChartData.data;
    const index = myChartData.index;
    const newData = [...state.data];
    newData[index] = thisData;
    return {
      ...state,
      data: newData,
    };
  } else {
    return state;
  }
};
