
import {
  ActionProps,
  StatusActionTypes,
  StatusProps,
} from '../../../types';


const initialState: StatusProps = {
  data: [],
};

export const reducer =
(state: StatusProps = initialState, action: ActionProps): StatusProps => {
  switch (action.type) {
    case StatusActionTypes.STATUS_INIT: {
      return initialState;
    }
    case StatusActionTypes.STATUS_FAILURE: {
      return state;
    }
    case StatusActionTypes.STATUS_SUCCESS: {
      const statusData: StatusProps = action.payload as StatusProps;
      return {...state, data: statusData.data};
    }
    default:
      return state;
  }
};
