import {ActionProps, ChartsActionTypes, ChartProps} from '../../../types';

const initialState: ChartProps = {
  data: [],
};

export const reducer =
(state: ChartProps = initialState, action: ActionProps): ChartProps => {
  if ( action.type == ChartsActionTypes.CHARTS_SUCCESS ) {
    const myChartData: ChartProps = action.payload as ChartProps;
    return {...state, data: myChartData.data};
  } else {
    return state;
  }
};
