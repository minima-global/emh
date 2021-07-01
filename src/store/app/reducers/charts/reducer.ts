import {
  ActionProps,
  ChartsActionTypes,
  ChartProps,
  ChartUpdateData,
} from '../../../types';

const initialState: ChartProps = {
  data: {},
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

      const newState = {...state};
      const newData = newState.data;
      newData[myChartData.key] = myChartData.data;
      return newState;
    }
    default:
      return state;
  }
};
