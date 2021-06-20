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
  switch (action.type) {
    case ChartsActionTypes.CHARTS_INIT: {
      return initialState;
    }
    case ChartsActionTypes.CHARTS_FAILURE: {
      return state;
    }
    case ChartsActionTypes.CHARTS_SUCCESS: {
      // console.log("here with: ", action.payload.data)
      const myChartData: ChartUpdateData =
        action.payload.data as ChartUpdateData;
      const thisData = myChartData.data;
      const index = myChartData.index;
      const newData = [...state.data];
      newData[index] = thisData;
      return {
        ...state,
        data: newData,
      };
    }
    default:
      return state;
  }
};
