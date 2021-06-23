import {
  ActionProps,
  CountActionTypes,
  CountProps,
  CountUpdateData,
} from '../../../types';

const initialState: CountProps = {
  data: {},
};

export const reducer =
(state: CountProps = initialState, action: ActionProps): CountProps => {
  switch (action.type) {
    case CountActionTypes.COUNT_INIT: {
      return initialState;
    }
    case CountActionTypes.COUNT_FAILURE: {
      return state;
    }
    case CountActionTypes.COUNT_SUCCESS: {
      // console.log('here with: ', action.payload.data);
      const myCountData: CountUpdateData =
        action.payload.data as CountUpdateData;
      const newState = {...state};
      const newData = newState.data;
      newData[myCountData.key] = myCountData.count;
      return newState;
    }
    default:
      return state;
  }
};
